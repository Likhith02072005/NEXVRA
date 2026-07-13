import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const defaultRoot = '/Users/likhith/NEXVRA/agency-website';
    const projectRoot = fs.existsSync(defaultRoot) ? defaultRoot : process.cwd();
    const specJsonPath = path.join(projectRoot, 'website_specification.json');

    // 1. Read or initialize JSON
    let specData = {
      brandSettings: { prompt: '', screenshot: '' },
      sections: {
        navbar: { prompt: '', screenshot: '' },
        hero: { prompt: '', screenshot: '' },
        trusted_by: { prompt: '', screenshot: '' },
        problem: { prompt: '', screenshot: '' },
        services: { prompt: '', screenshot: '' },
        results: { prompt: '', screenshot: '' },
        process: { prompt: '', screenshot: '' },
        pricing: { prompt: '', screenshot: '' },
        booking: { prompt: '', screenshot: '' },
        footer: { prompt: '', screenshot: '' }
      }
    };

    if (fs.existsSync(specJsonPath)) {
      specData = JSON.parse(fs.readFileSync(specJsonPath, 'utf-8'));
    }

    // Helper to read code safely
    const getCode = (relPath: string) => {
      const fullPath = path.join(projectRoot, relPath);
      if (fs.existsSync(fullPath)) {
        return fs.readFileSync(fullPath, 'utf-8');
      }
      return '// Code file not found';
    };

    const trustedByCode = `{/* Trusted By Bar */}
<section className="py-10 bg-bg-secondary border-y border-white/5 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
    <p className="text-text-secondary text-xs md:text-sm font-semibold tracking-wider uppercase shrink-0">
      Trusted by businesses across Bangalore
    </p>
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm md:text-base font-extrabold text-text-muted">
      <span className="hover:text-text-secondary transition-colors" data-cursor-label="Client">NEXVRA Studios</span>
      <span className="hover:text-text-secondary transition-colors" data-cursor-label="Client">Makeover by Thirumala</span>
      <span className="hover:text-text-secondary transition-colors" data-cursor-label="Client">BloomCafe</span>
      <span className="hover:text-text-secondary transition-colors" data-cursor-label="Client">UrbanFit Studio</span>
      <span className="hover:text-text-secondary transition-colors" data-cursor-label="Client">KriyaTech</span>
    </div>
  </div>
</section>`;

    // 2. Package all file codes
    const codes = {
      brandSettings: '// Global styling (Tailwind / CSS constants)',
      navbar: getCode('components/sections/Navbar.tsx'),
      hero: getCode('components/sections/Hero.tsx'),
      trusted_by: trustedByCode,
      problem: getCode('components/sections/Problem.tsx'),
      services: getCode('components/sections/Services.tsx'),
      results: getCode('components/sections/Results.tsx'),
      process: getCode('components/sections/Process.tsx'),
      pricing: getCode('components/sections/Pricing.tsx'),
      booking: getCode('components/sections/Booking.tsx'),
      footer: getCode('components/sections/Footer.tsx')
    };

    return NextResponse.json({ specData, codes });
  } catch (error: any) {
    console.error('Error fetching specs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
