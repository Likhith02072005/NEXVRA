'use client';

import { useState, useEffect, useRef } from 'react';

interface NumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: boolean;
}

function AnimatedNumber({ end, suffix = '', prefix = '', decimals = false }: NumberProps) {
  return (
    <div className="text-3xl md:text-5xl font-semibold text-[#B25F4C] font-nothern">
      {prefix}{decimals ? end.toFixed(1) : end}{suffix}
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] bg-[#B25F4C]/5 px-3.5 py-1.5 rounded-full border border-[#B25F4C]/10 uppercase">
            Proven Results
          </span>
          <h2 className="text-4xl md:text-5xl font-rankim font-light tracking-tight text-[#2A2A2A] mt-6 mb-4 leading-[1.1]">
            Numbers Don't Lie.<br />Neither Do My Clients.
          </h2>
          <p className="text-text-secondary text-base font-nothern font-light leading-relaxed">
            Real results from real Bangalore businesses. This is what happens when strategy meets execution.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-white/50 border border-black/5 text-center shadow-sm">
            <AnimatedNumber end={3} suffix="x" />
            <div className="text-text-secondary text-xs md:text-sm mt-2 font-nothern font-light">Average ROAS</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 border border-black/5 text-center shadow-sm">
            <AnimatedNumber end={200} suffix="%" />
            <div className="text-text-secondary text-xs md:text-sm mt-2 font-nothern font-light">More Qualified Leads</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 border border-black/5 text-center shadow-sm">
            <AnimatedNumber end={40} suffix="+" />
            <div className="text-text-secondary text-xs md:text-sm mt-2 font-nothern font-light">Happy Clients</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 border border-black/5 text-center shadow-sm">
            <AnimatedNumber end={95} suffix="%" />
            <div className="text-text-secondary text-xs md:text-sm mt-2 font-nothern font-light">Client Retention Rate</div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Case 1 */}
          <div className="p-8 rounded-2xl bg-white/60 border border-black/5 flex flex-col justify-between hover:border-[#B25F4C]/25 transition-all duration-300 hover:bg-white shadow-[0_4px_20px_rgba(42,42,42,0.015)]" data-cursor-label="Case Study">
            <div>
              <span className="text-[10px] font-resist-mono font-medium tracking-[0.08em] text-[#B25F4C] bg-[#B25F4C]/5 border border-[#B25F4C]/10 px-2.5 py-1 rounded-full uppercase">
                ✦ Case Study
              </span>
              <h4 className="text-lg font-rankim font-normal text-[#2A2A2A] mt-4 mb-2">BloomCafe — Koramangala</h4>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6 font-nothern font-light">
                A boutique cafe struggling with foot traffic. We rebuilt their website with online ordering, launched hyper-local Meta Ads targeting a 3km radius, and the results spoke for themselves.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-6">
              <div>
                <AnimatedNumber end={340} suffix="%" />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">Increase in Online Orders</div>
              </div>
              <div>
                <AnimatedNumber end={4.2} suffix="x" decimals={true} />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">Return on Ad Spend</div>
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="p-8 rounded-2xl bg-white/60 border border-black/5 flex flex-col justify-between hover:border-[#B25F4C]/25 transition-all duration-300 hover:bg-white shadow-[0_4px_20px_rgba(42,42,42,0.015)]" data-cursor-label="Case Study">
            <div>
              <span className="text-[10px] font-resist-mono font-medium tracking-[0.08em] text-[#B25F4C] bg-[#B25F4C]/5 border border-[#B25F4C]/10 px-2.5 py-1 rounded-full uppercase">
                ✦ Case Study
              </span>
              <h4 className="text-lg font-rankim font-normal text-[#2A2A2A] mt-4 mb-2">UrbanFit Studio — Indiranagar</h4>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6 font-nothern font-light">
                A fitness studio with zero digital presence. We designed a premium landing page with lead capture, ran Meta Ads for trial memberships, and filled their schedule in 30 days.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-6">
              <div>
                <AnimatedNumber end={127} />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">New Members in 30 Days</div>
              </div>
              <div>
                <AnimatedNumber end={67} suffix="%" />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">Reduction in Cost per Lead</div>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-white/40 border border-black/5 flex flex-col justify-between shadow-sm" data-cursor-label="Testimonial">
            <div>
              <div className="text-[#B25F4C] text-sm mb-4">★★★★★</div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed italic mb-6 font-nothern font-light">
                "Likhith completely transformed our online presence. Our website went from embarrassing to stunning, and the Meta Ads are generating 5-6 enquiries daily. Best investment we've made."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B25F4C]/10 border border-[#B25F4C]/20 flex items-center justify-center text-xs font-bold text-[#B25F4C] font-resist-mono">RK</div>
              <div>
                <div className="text-sm font-semibold text-[#2A2A2A] font-nothern">Rajesh Kumar</div>
                <div className="text-text-secondary text-xs font-nothern font-light">Owner, BloomCafe</div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/40 border border-black/5 flex flex-col justify-between shadow-sm" data-cursor-label="Testimonial">
            <div>
              <div className="text-[#B25F4C] text-sm mb-4">★★★★★</div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed italic mb-6 font-nothern font-light">
                "We were spending ₹30K/month on ads with barely any results. Likhith restructured everything — new landing page, better targeting. Now we're getting 3x the leads at half the cost."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B25F4C]/10 border border-[#B25F4C]/20 flex items-center justify-center text-xs font-bold text-[#B25F4C] font-resist-mono">PS</div>
              <div>
                <div className="text-sm font-semibold text-[#2A2A2A] font-nothern">Priya Sharma</div>
                <div className="text-text-secondary text-xs font-nothern font-light">Founder, UrbanFit Studio</div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/40 border border-black/5 flex flex-col justify-between shadow-sm" data-cursor-label="Testimonial">
            <div>
              <div className="text-[#B25F4C] text-sm mb-4">★★★★★</div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed italic mb-6 font-nothern font-light">
                "Professional, creative, and actually delivers on promises. The branding package he created gave our startup an identity that looks like a funded company. Highly recommend."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B25F4C]/10 border border-[#B25F4C]/20 flex items-center justify-center text-xs font-bold text-[#B25F4C] font-resist-mono">AV</div>
              <div>
                <div className="text-sm font-semibold text-[#2A2A2A] font-nothern">Arjun Venkat</div>
                <div className="text-text-secondary text-xs font-nothern font-light">Co-founder, KriyaTech</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
