import type { VercelRequest, VercelResponse } from '@vercel/node';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
let redis: Redis | null = null;

if (redisUrl) {
  redis = new Redis(redisUrl);
} else {
  console.error("❌ Missing REDIS_URL environment variable!");
}

function verifyAuth(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  
  const passcode = authHeader.split(' ')[1];
  const correctPasscode = process.env.CRM_PASSCODE || '9366';
  return passcode === correctPasscode;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
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

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,DELETE,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
  }

  if (!redis) {
    return res.status(500).json({ error: 'Database connection not initialized' });
  }

  try {
    if (req.method === 'GET') {
      const rawData = await redis.get('nexvra_crm_data');
      const data = rawData ? JSON.parse(rawData) : { leads: [], events: [], counters: {}, checklist: {}, dailyLog: {} };
      return res.status(200).json(data);
    } else if (req.method === 'POST') {
      const body = req.body;
      if (!body) {
        return res.status(400).json({ error: 'Missing request body' });
      }
      await redis.set('nexvra_crm_data', JSON.stringify(body));
      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error: any) {
    console.error("❌ /api/leads error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
