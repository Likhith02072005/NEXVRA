'use client';

import { useState, useEffect, useRef } from 'react';

interface NumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: boolean;
}

function AnimatedNumber({ end, suffix = '', prefix = '', decimals = false }: NumberProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const duration = 1200;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = progress * end;
            setValue(decimals ? Math.round(val * 10) / 10 : Math.floor(val));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, decimals, hasAnimated]);

  return (
    <div ref={elementRef} className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
      {prefix}{decimals ? value.toFixed(1) : value}{suffix}
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] bg-[#7c3aed]/10 px-3.5 py-1.5 rounded-full border border-[#7c3aed]/15">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-4 leading-tight font-display">
            Numbers Don't Lie.<br />Neither Do My Clients.
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            Real results from real Bangalore businesses. This is what happens when strategy meets execution.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
            <AnimatedNumber end={3} suffix="x" />
            <div className="text-text-secondary text-xs md:text-sm mt-2">Average ROAS</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
            <AnimatedNumber end={200} suffix="%" />
            <div className="text-text-secondary text-xs md:text-sm mt-2">More Qualified Leads</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
            <AnimatedNumber end={40} suffix="+" />
            <div className="text-text-secondary text-xs md:text-sm mt-2">Happy Clients</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-center">
            <AnimatedNumber end={95} suffix="%" />
            <div className="text-text-secondary text-xs md:text-sm mt-2">Client Retention Rate</div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Case 1 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between hover:border-[#00d4ff]/20 transition-all hover:bg-white/[0.04]" data-cursor-label="Case Study">
            <div>
              <span className="text-[10px] font-bold text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                ✦ Case Study
              </span>
              <h4 className="text-lg font-bold text-text-primary mt-4 mb-2">BloomCafe — Koramangala</h4>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6">
                A boutique cafe struggling with foot traffic. We rebuilt their website with online ordering, launched hyper-local Meta Ads targeting a 3km radius, and the results spoke for themselves.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
              <div>
                <AnimatedNumber end={340} suffix="%" />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1">Increase in Online Orders</div>
              </div>
              <div>
                <AnimatedNumber end={4.2} suffix="x" decimals={true} />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1">Return on Ad Spend</div>
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between hover:border-[#7c3aed]/20 transition-all hover:bg-white/[0.04]" data-cursor-label="Case Study">
            <div>
              <span className="text-[10px] font-bold text-[#7c3aed] bg-[#7c3aed]/10 border border-[#7c3aed]/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                ✦ Case Study
              </span>
              <h4 className="text-lg font-bold text-text-primary mt-4 mb-2">UrbanFit Studio — Indiranagar</h4>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6">
                A fitness studio with zero digital presence. We designed a premium landing page with lead capture, ran Meta Ads for trial memberships, and filled their schedule in 30 days.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
              <div>
                <AnimatedNumber end={127} />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1">New Members in 30 Days</div>
              </div>
              <div>
                <AnimatedNumber end={67} suffix="%" />
                <div className="text-text-secondary text-[10px] md:text-xs mt-1">Reduction in Cost per Lead</div>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between" data-cursor-label="Testimonial">
            <div>
              <div className="text-[#00d4ff] text-sm mb-4">★★★★★</div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed italic mb-6">
                "Likhith completely transformed our online presence. Our website went from embarrassing to stunning, and the Meta Ads are generating 5-6 enquiries daily. Best investment we've made."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-xs font-bold text-[#00d4ff]">RK</div>
              <div>
                <div className="text-sm font-bold text-text-primary">Rajesh Kumar</div>
                <div className="text-text-secondary text-xs">Owner, BloomCafe</div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between" data-cursor-label="Testimonial">
            <div>
              <div className="text-[#00d4ff] text-sm mb-4">★★★★★</div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed italic mb-6">
                "We were spending ₹30K/month on ads with barely any results. Likhith restructured everything — new landing page, better targeting. Now we're getting 3x the leads at half the cost."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-xs font-bold text-[#7c3aed]">PS</div>
              <div>
                <div className="text-sm font-bold text-text-primary">Priya Sharma</div>
                <div className="text-text-secondary text-xs">Founder, UrbanFit Studio</div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between" data-cursor-label="Testimonial">
            <div>
              <div className="text-[#00d4ff] text-sm mb-4">★★★★★</div>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed italic mb-6">
                "Professional, creative, and actually delivers on promises. The branding package he created gave our startup an identity that looks like a funded company. Highly recommend."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-xs font-bold text-[#00d4ff]">AV</div>
              <div>
                <div className="text-sm font-bold text-text-primary">Arjun Venkat</div>
                <div className="text-text-secondary text-xs">Co-founder, KriyaTech</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
