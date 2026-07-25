import type { VercelRequest, VercelResponse } from '@vercel/node';
import Redis from 'ioredis';
function getEmailHtml(name: string, email: string, phone: string, date: string, time: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>New Booking Notification</title></head>
<body style="margin:0;padding:0;background-color:#08080d;color:#ffffff;font-family:sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:30px;background:#12121e;border-radius:16px;border:1px solid #1a1a2e;">
    <h2 style="color:#00d4ff;margin-top:0;">🔥 New Strategy Call Booked</h2>
    <p><strong>Client Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Preferred Date:</strong> ${date}</p>
    <p><strong>Preferred Time:</strong> ${time}</p>
    <div style="margin-top:30px;">
      <a href="https://nexvra.in/crm" style="background:#dc2626;color:#ffffff;padding:12px 24px;border-radius:99px;text-decoration:none;font-weight:600;">View in CRM →</a>
    </div>
  </div>
</body>
</html>`;
}

function getRedisClient() {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    return new Redis(url, {
      connectTimeout: 2000,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy: () => null,
    });
  } catch (e) {
    console.error("❌ Redis init error:", e);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, phone, businessType, business, message, date, time } = body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields (name, email)' });
    }

    const companyName = String(businessType || business || 'Individual/Personal');

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
    const redis = getRedisClient();
    const leadId = Date.now();

    // Build lead notes
    let validationNotes = '';
    if (ipDetails && ipDetails.country_name) {
      validationNotes += `\n\n📍 Visitor Location: ${ipDetails.city || 'Unknown City'}, ${ipDetails.region_name || ''}, ${ipDetails.country_name} (IP: ${ip})`;
    }
    if (phoneDetails && phoneDetails.valid !== undefined) {
      validationNotes += `\n📞 Phone Check: ${phoneDetails.valid ? '✅ Valid' : '❌ Invalid'} (Type: ${phoneDetails.line_type || '—'}, Carrier: ${phoneDetails.carrier || '—'}, country: ${phoneDetails.country_name || '—'})`;
    }

    // Construct new Lead & Event
    const newLead = {
      id: String(leadId),
      name: name,
      company: companyName,
      email: email,
      phone: phone || '',
      status: 'new',
      source: 'Website',
      value: 35000,
      location: ipDetails ? (ipDetails.city || ipDetails.country_name || 'India') : 'India',
      date: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: `Booked Strategy Call on Website. Preferred date: ${date || '—'} at ${time || '—'}\n\nProject Details/Message: ${message || 'None provided'}${validationNotes}`,
      service: 'Web Development',
      assignedTo: 'Admin'
    };

    const newEvent = {
      id: leadId + 1,
      title: `📞 Call: ${name} (${companyName})`,
      date: date || new Date().toISOString().split('T')[0],
      time: time || '12:00',
      leadId: String(leadId),
      type: 'call'
    };

    if (redis) {
      try {
        const rawData = await redis.get('nexvra_crm_data');
        const data = rawData ? JSON.parse(rawData) : { leads: [], events: [], counters: {}, checklist: {}, dailyLog: {} };
        if (!data.leads) data.leads = [];
        if (!data.events) data.events = [];

        data.leads.push(newLead);
        data.events.push(newEvent);

        await redis.set('nexvra_crm_data', JSON.stringify(data));
        redis.disconnect();
      } catch (dbErr) {
        console.error("⚠️ Redis DB write bypassed:", dbErr);
      }
    }

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
            subject: `🔥 New Strategy Call: ${name} (${companyName.toUpperCase()})`,
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
