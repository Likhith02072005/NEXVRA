import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

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

  headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,DELETE,PUT');
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

function verifyAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  const passcode = authHeader ? authHeader.split(' ')[1] : null;
  const correctPasscode = process.env.CRM_PASSCODE || '9366';
  return passcode === correctPasscode;
}

export async function GET(req: NextRequest) {
  const headers = corsHeaders(req);

  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid passcode' }, { status: 401, headers });
  }

  if (!redis) {
    return NextResponse.json({ error: 'Database connection not initialized' }, { status: 500, headers });
  }

  try {
    const rawData = await redis.get('nexvra_crm_data');
    const data = rawData ? JSON.parse(rawData) : { leads: [], events: [], counters: {}, checklist: {}, dailyLog: {} };
    return NextResponse.json(data, { status: 200, headers });
  } catch (error: any) {
    console.error("❌ leads GET error:", error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500, headers });
  }
}

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req);

  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Invalid passcode' }, { status: 401, headers });
  }

  if (!redis) {
    return NextResponse.json({ error: 'Database connection not initialized' }, { status: 500, headers });
  }

  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: 'Missing request body' }, { status: 400, headers });
    }

    await redis.set('nexvra_crm_data', JSON.stringify(body));
    return NextResponse.json({ success: true }, { status: 200, headers });
  } catch (error: any) {
    console.error("❌ leads POST error:", error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500, headers });
  }
}
