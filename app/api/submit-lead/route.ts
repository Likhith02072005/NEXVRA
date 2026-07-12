import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import getEmailHtml from '@/lib/email-template';

const redisUrl = process.env.REDIS_URL;
let redis: Redis | null = null;

if (redisUrl) {
  redis = new Redis(redisUrl);
} else {
  console.error("❌ Missing REDIS_URL environment variable!");
}

// CORS Helper
function corsHeaders(req: NextRequest) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Credentials', 'true');
  
  const origin = req.headers.get('origin') || 'https://nexvra.in';
  if (origin === 'https://nexvra.in' || origin === 'https://www.nexvra.in' || origin.startsWith('http://localhost') || origin.endsWith('.vercel.app')) {
    headers.set('Access-Control-Allow-Origin', origin);
  } else {
    headers.set('Access-Control-Allow-Origin', 'https://nexvra.in');
  }

  headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  return headers;
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(req)
  });
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req);

  if (!redis) {
    return NextResponse.json({ error: 'Database connection not initialized' }, { status: 500, headers });
  }

  try {
    const body = await req.json();
    const { name, email, phone, businessType, date, time } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields (name, email)' }, { status: 400, headers });
    }

    // 1. Detect client IP
    const clientIp = req.headers.get('x-vercel-forwarded-for') || 
                     req.headers.get('cf-connecting-ip') || 
                     req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     '8.8.8.8';
    const ip = clientIp.split(',')[0].trim();

    // 2. Perform validations asynchronously
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
            } else {
              console.error("❌ IPStack API Error:", data.error || data);
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
            } else {
              console.error("❌ Numverify API Error:", data.error || data);
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

    // Fetch existing CRM data
    const rawData = await redis.get('nexvra_crm_data');
    const data = rawData ? JSON.parse(rawData) : { leads: [], events: [], counters: {}, checklist: {}, dailyLog: {} };

    if (!data.leads) data.leads = [];
    if (!data.events) data.events = [];

    const leadId = Date.now();

    // Build report notes
    let validationNotes = '';
    if (ipDetails && ipDetails.country_name) {
      validationNotes += `\n\n📍 Visitor Location: ${ipDetails.city || 'Unknown City'}, ${ipDetails.region_name || ''}, ${ipDetails.country_name} (IP: ${ip})`;
    }
    if (phoneDetails && phoneDetails.valid !== undefined) {
      validationNotes += `\n📞 Phone Check: ${phoneDetails.valid ? '✅ Valid' : '❌ Invalid'} (Type: ${phoneDetails.line_type || '—'}, Carrier: ${phoneDetails.carrier || '—'}, country: ${phoneDetails.country_name || '—'})`;
    }

    // 3. Construct new Lead
    const newLead = {
      id: leadId,
      name: name,
      business: businessType || 'Unknown Business',
      industry: businessType || 'other',
      value: 35000,
      phone: phone || '',
      email: email,
      instagram: '',
      source: 'website',
      notes: `Booked via NEXVRA website. Preferred date: ${date || '—'} at ${time || '—'}${validationNotes}`,
      status: 'call',
      createdAt: new Date().toISOString(),
      ipDetails: ipDetails,
      phoneDetails: phoneDetails,
      history: [
        { date: new Date().toISOString(), action: `Lead created & Call booked for ${date || '—'} at ${time || '—'}`, status: 'call' }
      ]
    };

    // 4. Construct Calendar Event
    const newEvent = {
      id: leadId + 1,
      title: `📞 Call: ${name} (${businessType || 'Biz'})`,
      date: date || new Date().toISOString().split('T')[0],
      time: time || '12:00',
      leadId: leadId,
      type: 'call'
    };

    data.leads.push(newLead);
    data.events.push(newEvent);

    await redis.set('nexvra_crm_data', JSON.stringify(data));

    // ===== SEND PREMIUM HTML EMAIL ALERT (via Resend) =====
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const htmlTemplate = getEmailHtml(name, email, phone, date, time);
        
        const resendResponse = await fetch('https://api.resend.com/emails', {
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
        
        const resendData = await resendResponse.json();
        if (resendResponse.ok) {
          console.log('✉️ Premium HTML email sent successfully via Resend:', resendData);
        } else {
          console.error('❌ Resend API returned error:', resendData);
        }
      } catch (err) {
        console.error('❌ Resend email dispatch failed:', err);
      }
    } else {
      console.log('ℹ️ RESEND_API_KEY environment variable is not configured. Skipping HTML email dispatch.');
    }

    return NextResponse.json({ success: true, leadId }, { status: 200, headers });
  } catch (error: any) {
    console.error("❌ Submit Lead API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500, headers });
  }
}
