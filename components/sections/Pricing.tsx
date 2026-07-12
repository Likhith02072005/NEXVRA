'use client';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] bg-[#7c3aed]/10 px-3.5 py-1.5 rounded-full border border-[#7c3aed]/15">
            Investment
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-6 mb-4 leading-tight font-display">
            Choose Your Growth Plan
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Transparent pricing. No hidden fees. Every plan includes a personal strategy call before we start.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Starter Plan */}
          <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col hover:bg-white/[0.02] transition-colors" data-cursor-label="Starter">
            <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider block mb-2">Starter</span>
            <h3 className="text-xl font-bold text-white mb-4">Landing Page</h3>
            <div className="text-3xl font-extrabold text-white mb-6">
              ₹15,000 <span className="text-sm text-slate-400 font-normal">one-time</span>
            </div>
            <p className="text-slate-400 text-xs md:text-sm mb-6 leading-relaxed">
              Perfect for businesses that need a single, high-converting page to capture leads.
            </p>
            <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-slate-300 flex-grow">
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Custom Landing Page Design</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Mobile Responsive</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> SEO Optimized</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Contact Form / Lead Capture</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 7-Day Delivery</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 2 Rounds of Revision</li>
            </ul>
            <a href="#booking" className="w-full text-center py-3.5 rounded-full border border-white/10 hover:border-[#00d4ff]/20 text-white font-bold text-xs tracking-wider transition-all hover:bg-white/5">
              Get Started →
            </a>
          </div>

          {/* Growth Plan (Popular) */}
          <div className="p-8 rounded-2xl bg-[#00d4ff]/5 border border-[#00d4ff]/20 flex flex-col relative shadow-[0_8px_30px_rgba(0,212,255,0.05)]" data-cursor-label="Popular!">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
              ⚡ Most Popular
            </span>
            <span className="text-xs font-semibold uppercase text-[#00d4ff] tracking-wider block mb-2 mt-2">Growth</span>
            <h3 className="text-xl font-bold text-white mb-4">Full Website + Ads</h3>
            <div className="text-3xl font-extrabold text-white mb-6">
              ₹35,000 <span className="text-sm text-slate-400 font-normal">one-time</span>
            </div>
            <p className="text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
              The complete package for businesses ready to generate consistent leads online.
            </p>
            <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-slate-200 flex-grow">
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Multi-page Custom Website</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Meta Ads Setup & 1st Campaign</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Pixel & Analytics Installation</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Content Strategy Guide</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 14-Day Delivery</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Unlimited Revisions</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 30-Day Post-Launch Support</li>
            </ul>
            <a href="#booking" className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(0,212,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] transition-all hover:scale-102">
              Get Started →
            </a>
          </div>

          {/* Scale Plan */}
          <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col hover:bg-white/[0.02] transition-colors" data-cursor-label="Scale">
            <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider block mb-2">Scale</span>
            <h3 className="text-xl font-bold text-white mb-4">Everything + Retainer</h3>
            <div className="text-3xl font-extrabold text-white mb-6">
              ₹75,000 <span className="text-xs text-slate-400 font-normal">/month</span>
            </div>
            <p className="text-slate-400 text-xs md:text-sm mb-6 leading-relaxed">
              For businesses that want a full-time digital partner managing everything month over month.
            </p>
            <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-slate-300 flex-grow">
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Everything in Growth</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Monthly Ad Management</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> A/B Testing & Optimization</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Monthly Performance Reports</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Content Creation (4 posts/week)</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Priority WhatsApp Support</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Brand Strategy Sessions</li>
            </ul>
            <a href="#booking" className="w-full text-center py-3.5 rounded-full border border-white/10 hover:border-[#00d4ff]/20 text-white font-bold text-xs tracking-wider transition-all hover:bg-white/5">
              Get Started →
            </a>
          </div>

        </div>

        <div className="text-center p-6 rounded-2xl bg-white/[0.01] border border-white/5 max-w-2xl mx-auto">
          <p className="text-slate-300 text-xs md:text-sm">
            🛡️ <strong>100% Satisfaction Guarantee</strong> — If you're not happy with the final product, I'll revise until you are, or you don't pay. Zero risk.
          </p>
        </div>

      </div>
    </section>
  );
}
