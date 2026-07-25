import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are NEXVRA's AI assistant — a friendly, professional chatbot embedded on nexvra.in. You help visitors learn about NEXVRA Digital, a web development and performance marketing agency based in Bangalore, India.

ABOUT NEXVRA:
- Full-service digital agency specializing in web development, brand architecture, and performance marketing
- Based in Bangalore, Karnataka, India
- Founded in 2025
- 40+ projects delivered, 3.0x average ROAS, 200% average lead increase
- Contact Phone: +91 96066 10059 (Call or WhatsApp)
- Contact Email: nexvratech@gmail.com
- Instagram: https://www.instagram.com/nexvra.in?igsh=MXdicmRiaGFwbHR0Yw==

SERVICES:
1. Web Development — Custom React/Next.js websites, landing pages, e-commerce. Brutalist, modern, immersive designs with GSAP animations.
2. Performance Marketing — Meta Ads (Facebook/Instagram), Google Ads, campaign strategy, A/B testing, conversion optimization. Average 3x ROAS.
3. Landing Pages — High-converting, single-purpose pages designed for ad campaigns and lead generation.
4. Brand Architecture — Logo design, visual identity systems, brand guidelines, typography, color systems.

PRICING TIERS:
- Starter (₹15K–30K): Single-page website or landing page, basic brand kit, 1 revision round
- Growth (₹40K–80K): Multi-page website, full brand identity, Meta Ads setup, 3 revision rounds
- Enterprise (₹1L+): Full digital transformation, custom web app, ongoing marketing, unlimited revisions

PROCESS:
1. Discovery — Understanding business goals, target audience, competitors
2. Strategy — Technical architecture, marketing roadmap, timeline
3. Design — UI/UX mockups, brand identity, content planning
4. Build — Development, testing, optimization
5. Launch — Deployment, analytics setup, campaign activation

RULES:
- Be concise but helpful. Keep responses under 100 words unless the user asks for detail.
- If someone asks about pricing, give the tier overview and suggest a free consultation for exact quotes.
- If someone wants to get started, direct them to the contact form on the website or ask them to call +91 96066 10059.
- Never make up information. If you don't know something, say "I'd recommend reaching out to our team directly for that."
- Use a professional but approachable tone. No emojis overuse — max 1 per message if needed.
- You can respond in English or Hindi based on the user's language.`;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Chat service not configured' });
  }

  // Rate limiting
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // Build conversation contents for Gemini
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Add conversation history (last 10 messages max)
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role && msg.text) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          });
        }
      }
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Call Gemini API with model fallback
    const modelsToTry = ['gemini-2.5-flash', 'gemini-flash-latest'];
    let reply = '';
    let lastError = '';

    for (const model of modelsToTry) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              contents,
              generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 300,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (reply) break;
        } else {
          lastError = await geminiRes.text();
          console.error(`Gemini API model ${model} error:`, geminiRes.status, lastError);
        }
      } catch (e: any) {
        lastError = e?.message || String(e);
      }
    }

    if (!reply) {
      console.error('All Gemini API models failed:', lastError);
      return res.status(502).json({ error: 'AI service temporarily unavailable' });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
