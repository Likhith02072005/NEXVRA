import { FontDuo } from '@/components/ui/FontDuo';
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal';

export default function Problem() {
  return (
    <section id="problems" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Subtle details */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),transparent)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),transparent)] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] bg-[#B25F4C]/5 px-3.5 py-1.5 rounded-full border border-[#B25F4C]/10 uppercase">
              The Problem
            </span>
            <h2 className="mt-6 mb-4 leading-[1.2]">
              <FontDuo 
                serifText="Your Competitors Are Eating" 
                scriptText="Your Lunch" 
                serifClassName="text-3xl md:text-5xl font-light tracking-tight text-[#2A2A2A]"
                scriptClassName="text-2xl md:text-4xl text-[#B25F4C] left-[35%] top-[25%] rotate-[-3deg]"
              />
              <span className="block text-3xl md:text-5xl font-luthon-serif font-light tracking-tight text-[#2A2A2A] mt-2">Here&apos;s Why.</span>
            </h2>
            <p className="text-text-secondary text-base font-nothern font-light leading-relaxed">
              Most local businesses in Bangalore are bleeding money on bad websites and worse ads. Sound familiar?
            </p>
          </div>
        </ScrollReveal>

        {/* Problems Grid */}
        <StaggerReveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white/60 border border-black/5 hover:border-[#B25F4C]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-white shadow-[0_4px_20px_rgba(42,42,42,0.015)]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#B25F4C]/5 text-[#B25F4C] text-xl mb-6">💸</span>
            <h3 className="text-lg font-rankim font-normal text-[#2A2A2A] mb-3 leading-snug">Burning Money on Ads That Don't Convert</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-nothern font-light">
              You're pouring ₹10,000/month into Meta Ads but getting nothing back. No leads, no calls, no ROI. Your ad spend is funding Meta's shareholders, not your growth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white/60 border border-black/5 hover:border-[#B25F4C]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-white shadow-[0_4px_20px_rgba(42,42,42,0.015)]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#B25F4C]/5 text-[#B25F4C] text-xl mb-6">🕸️</span>
            <h3 className="text-lg font-rankim font-normal text-[#2A2A2A] mb-3 leading-snug">Your Website Looks Like It's From 2010</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-nothern font-light">
              Visitors land on your site and bounce in 3 seconds. A slow, ugly, mobile-unfriendly website is silently killing your credibility and costing you customers every single day.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white/60 border border-black/5 hover:border-[#B25F4C]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-white shadow-[0_4px_20px_rgba(42,42,42,0.015)]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#B25F4C]/5 text-[#B25F4C] text-xl mb-6">📉</span>
            <h3 className="text-lg font-rankim font-normal text-[#2A2A2A] mb-3 leading-snug">Competitors Are Stealing Your Customers</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-nothern font-light">
              While you're stuck with a generic template site, your competitors have polished funnels, retargeting pixels, and automated follow-ups. They're playing chess; you're playing checkers.
            </p>
          </div>

        </StaggerReveal>

      </div>
    </section>
  );
}

