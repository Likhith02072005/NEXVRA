'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import HeroScene with SSR disabled to prevent WebGL/document issues during server build
const HeroScene = dynamic(() => import('../HeroScene'), { ssr: false });

interface StatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: boolean;
  duration?: number;
  label: string;
}

function StatCounter({ end, suffix = '', prefix = '', decimals = false, duration = 1500, label }: StatProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const val = progress * end;
      setCount(decimals ? Math.round(val * 10) / 10 : Math.floor(val));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, decimals, duration]);

  return (
    <div className="flex flex-col">
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
        {prefix}{decimals ? count.toFixed(1) : count}{suffix}
      </div>
      <div className="text-slate-400 text-xs md:text-sm font-medium mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#0a0a12] bg-[radial-gradient(circle_at_70%_50%,rgba(124,58,237,0.06)_0%,rgba(0,212,255,0.03)_50%,rgba(10,10,18,1)_100%)]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />

      {/* 3D background element */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <HeroScene />
      </div>

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-[#0a0a12]/95 via-[#0a0a12]/80 to-[#0a0a12] lg:bg-gradient-to-r lg:from-[#0a0a12] lg:via-[#0a0a12]/85 lg:to-transparent pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side text */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#b8860b]/40 bg-[#b8860b]/5 text-xs font-semibold tracking-wide text-[#f5f0e8] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse"></span>
              Now accepting 3 new clients for July
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              I Build Websites <br />
              That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] glow-hover">Print Money</span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg font-medium max-w-xl mb-10 leading-relaxed">
              Full-stack web development + Meta Ads that turn your Bangalore business into a lead-generating machine. No fluff — just results.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a 
                href="#booking" 
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(0,212,255,0.3)] hover:shadow-[0_8px_35px_rgba(0,212,255,0.5)] transition-all hover:scale-102"
                data-cursor-label="Book Call"
              >
                Book Your Free Strategy Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a 
                href="#results" 
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-sm tracking-wide transition-all"
                data-cursor-label="See Proof"
              >
                See Results
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 md:gap-10 border-t border-white/5 pt-8 w-full max-w-lg">
              <StatCounter end={40} suffix="+" label="Projects Delivered" />
              <StatCounter end={3} suffix="x" decimals={true} label="Avg. ROAS" />
              <StatCounter end={15} prefix="₹" suffix="L+" label="Ad Spend Managed" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/15 rounded-full flex justify-center p-1.5 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
