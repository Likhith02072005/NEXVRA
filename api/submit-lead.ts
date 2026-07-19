import type { VercelRequest, VercelResponse } from '@vercel/node';
import Redis from 'ioredis';
import getEmailHtml from './email-template';

const redisUrl = process.env.REDIS_URL;
let redis: Redis | null = null;

if (redisUrl) {
  redis = new Redis(redisUrl);
} else {
  console.error("❌ Missing REDIS_URL environment variable!");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  const origin = req.headers.origin as string || 'https://nexvra.in';
  if (
    origin === 'https://nexvra.in' || 
    origin === 'https://www.nexvra.in' || 
    origin.startsWith('http://localhost') || 
    origin.endsWith('.vercel.app')
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://nexvra.in');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!redis) {
    return res.status(500).json({ error: 'Database connection not initialized' });
  }

  try {
    const { name, email, phone, businessType, date, time } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields (name, email)' });
    }

    // 1. Detect Client IP from Vercel Forwarding Headers
    const clientIp = (req.headers['x-vercel-forwarded-for'] as string) || 
                     (req.headers['cf-connecting-ip'] as string) || 
                     (req.headers['x-forwarded-for'] as string) || 
                     (req.headers['x-real-ip'] as string) || 
                     '8.8.8.8';
    const ip = clientIp.split(',')[0].trim();

    // 2. Geolocation & Phone checking
    let ipDetails: any = null;
    let phoneDetails: any = null;

    const ipKey = process.env.IPSTACK_API_KEY;
    const numverifyKey = process.env.NUMVERIFY_API_KEY;
    const promises: Promise<any>[] = [];

    if (ipKey && ip && ip !== '::1' && ip !== '127.0.0.1') {
      promises.push(
        fetch(`http://api.ipstack.com/${ip}?access_key=${ipKey}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.success !== false) {
              ipDetails = data;
            }
          })
          .catch(err => console.error("❌ IPStack fetch failed:", err))
      );
    }

    if (numverifyKey && phone) {
      promises.push(
        fetch(`http://apilayer.net/api/validate?access_key=${numverifyKey}&number=${encodeURIComponent(phone)}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.success !== false) {
              phoneDetails = data;
            }
          })
          .catch(err => console.error("❌ Numverify fetch failed:", err))
      );
    }

    if (promises.length > 0) {
      await Promise.race([
        Promise.all(promises),
        new Promise(resolve => setTimeout(resolve, 3000))
      ]);
    }

    // Load existing database data
    const rawData = await redis.get('nexvra_crm_data');
    const data = rawData ? JSON.parse(rawData) : { leads: [], events: [], counters: {}, checklist: {}, dailyLog: {} };

    if (!data.leads) data.leads = [];
    if (!data.events) data.events = [];

    const leadId = Date.now();

    // Build lead notes
    let validationNotes = '';
    if (ipDetails && ipDetails.country_name) {
      validationNotes += `\n\n📍 Visitor Location: ${ipDetails.city || 'Unknown City'}, ${ipDetails.region_name || ''}, ${ipDetails.country_name} (IP: ${ip})`;
    }
    if (phoneDetails && phoneDetails.valid !== undefined) {
      validationNotes += `\n📞 Phone Check: ${phoneDetails.valid ? '✅ Valid' : '❌ Invalid'} (Type: ${phoneDetails.line_type || '—'}, Carrier: ${phoneDetails.carrier || '—'}, country: ${phoneDetails.country_name || '—'})`;
    }

    // Determine values / services
    const val = 35000; // Default service value
    
    // Construct new Lead
    const newLead = {
      id: String(leadId),
      name: name,
      company: businessType || 'Individual/Personal',
      email: email,
      phone: phone || '',
      status: 'new', // Default status in the new brutalist-crm
      source: 'Website',
      value: val,
      location: ipDetails ? (ipDetails.city || ipDetails.country_name || 'India') : 'India',
      date: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: `Booked Strategy Call on Website. Preferred date: ${date || '—'} at ${time || '—'}${validationNotes}`,
      service: 'Web Development',
      assignedTo: 'Admin'
    };

    // Construct Calendar Event
    const newEvent = {
      id: leadId + 1,
      title: `📞 Call: ${name} (${businessType || 'Biz'})`,
      date: date || new Date().toISOString().split('T')[0],
      time: time || '12:00',
      leadId: String(leadId),
      type: 'call'
    };

    data.leads.push(newLead);
    data.events.push(newEvent);

    // Write back to database
    await redis.set('nexvra_crm_data', JSON.stringify(data));

    // ===== EMAIL ALERT INITIATOR (Resend) =====
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const htmlTemplate = getEmailHtml(name, email, phone, date, time);
        
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'NEXVRA Bookings <onboarding@resend.dev>',
            to: ['nexvratech@gmail.com'],
            subject: `🔥 New Strategy Call: ${name} (${businessType.toUpperCase()})`,
            html: htmlTemplate
          })
        });
      } catch (err) {
        console.error('❌ Resend email dispatch failed:', err);
      }
    }

    return res.status(200).json({ success: true, leadId });
  } catch (error: any) {
    console.error("❌ /api/submit-lead error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
