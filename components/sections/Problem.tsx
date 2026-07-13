'use client';

export default function Problem() {
  return (
    <section id="problems" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Subtle details */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] bg-[#7c3aed]/10 px-3.5 py-1.5 rounded-full border border-[#7c3aed]/15 font-nothern">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-4 leading-tight font-durer">
            Your Competitors Are Eating<br />Your Lunch. Here's Why.
          </h2>
          <p className="text-text-secondary text-sm md:text-base font-heming">
            Most local businesses in Bangalore are bleeding money on bad websites and worse ads. Sound familiar?
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#7c3aed]/20 transition-all hover:-translate-y-1 hover:bg-white/[0.04]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 text-2xl mb-6">💸</span>
            <h3 className="text-lg font-bold text-text-primary mb-3 font-nevera">Burning Money on Ads That Don't Convert</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-heming">
              You're pouring ₹10,000/month into Meta Ads but getting nothing back. No leads, no calls, no ROI. Your ad spend is funding Meta's shareholders, not your growth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#7c3aed]/20 transition-all hover:-translate-y-1 hover:bg-white/[0.04]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 text-2xl mb-6">🕸️</span>
            <h3 className="text-lg font-bold text-text-primary mb-3 font-nevera">Your Website Looks Like It's From 2010</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-heming">
              Visitors land on your site and bounce in 3 seconds. A slow, ugly, mobile-unfriendly website is silently killing your credibility and costing you customers every single day.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#7c3aed]/20 transition-all hover:-translate-y-1 hover:bg-white/[0.04]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-2xl mb-6">📉</span>
            <h3 className="text-lg font-bold text-text-primary mb-3 font-nevera">Competitors Are Stealing Your Customers</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-heming">
              While you're stuck with a generic template site, your competitors have polished funnels, retargeting pixels, and automated follow-ups. They're playing chess; you're playing checkers.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
