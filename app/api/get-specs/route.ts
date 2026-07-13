import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const defaultRoot = '/Users/likhith/NEXVRA/agency-website';
    const projectRoot = fs.existsSync(defaultRoot) ? defaultRoot : process.cwd();
    const specJsonPath = path.join(projectRoot, 'website_specification.json');

    // 1. Read or initialize JSON
    let specData: any = {
      brandSettings: { prompt: '', font: '', screenshot: '' },
      sections: {
        navbar: { prompt: '', font: '', screenshot: '' },
        hero: { prompt: '', font: '', screenshot: '' },
        trusted_by: { prompt: '', font: '', screenshot: '' },
        problem: { prompt: '', font: '', screenshot: '' },
        services: { prompt: '', font: '', screenshot: '' },
        results: { prompt: '', font: '', screenshot: '' },
        process: { prompt: '', font: '', screenshot: '' },
        pricing: { prompt: '', font: '', screenshot: '' },
        booking: { prompt: '', font: '', screenshot: '' },
        footer: { prompt: '', font: '', screenshot: '' }
      }
    };

    if (fs.existsSync(specJsonPath)) {
      const existing = JSON.parse(fs.readFileSync(specJsonPath, 'utf-8'));
      if (existing.brandSettings) {
        specData.brandSettings = { ...specData.brandSettings, ...existing.brandSettings };
      }
      if (existing.sections) {
        Object.keys(existing.sections).forEach(key => {
          if (specData.sections[key]) {
            specData.sections[key] = { ...specData.sections[key], ...existing.sections[key] };
          } else {
            specData.sections[key] = existing.sections[key];
          }
        });
      }
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
