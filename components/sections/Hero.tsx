'use client';

import { useState, useEffect } from 'react';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { NoiseBackground } from '@/components/ui/noise-background';
import Ballpit from '@/components/Ballpit';

interface StatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: boolean;
  duration?: number;
  label: string;
}

function StatCounter({ end, suffix = '', prefix = '', decimals = false, label }: StatProps) {
  return (
    <div className="flex flex-col">
      <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
        {prefix}{decimals ? end.toFixed(1) : end}{suffix}
      </div>
      <div className="text-text-secondary text-xs md:text-sm font-medium mt-1">{label}</div>
    </div>
  );
}


export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-bg-primary bg-[radial-gradient(circle_at_70%_50%,rgba(124,58,237,0.06)_0%,rgba(0,212,255,0.03)_50%,rgba(10,10,18,1)_100%)]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side text */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-accent/40 bg-gold-accent/5 text-xs font-semibold tracking-wide text-text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-pulse"></span>
              Now accepting 3 new clients for July
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-[1.1] font-display">
              We Build Websites That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] glow-hover inline-block">
                Print Money
              </span>
            </h1>

            <p className="text-text-secondary text-base md:text-lg font-medium max-w-xl mb-10 leading-relaxed">
              Full-stack web development + Meta Ads that turn your Bangalore business into a lead-generating machine. No fluff — just results.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <NoiseBackground
                containerClassName="p-[1px] rounded-full overflow-hidden"
                className="rounded-full overflow-hidden"
                gradientColors={["rgb(0, 212, 255)", "rgb(124, 58, 237)", "rgb(184, 134, 11)"]}
                noiseIntensity={0.12}
                speed={0.15}
              >
                <a 
                  href="#booking" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0a0a12]/95 hover:bg-[#0a0a12]/80 text-text-primary font-bold text-sm tracking-wide transition-all duration-300"
                  data-cursor-label="Book Call"
                >
                  Book Your Free Strategy Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </NoiseBackground>

              <NoiseBackground
                containerClassName="p-[1px] rounded-full overflow-hidden"
                className="rounded-full overflow-hidden"
                gradientColors={["rgb(0, 212, 255)", "rgb(124, 58, 237)", "rgb(184, 134, 11)"]}
                noiseIntensity={0.12}
                speed={0.15}
              >
                <a 
                  href="#results" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0a0a12]/95 hover:bg-[#0a0a12]/80 text-text-primary font-bold text-sm tracking-wide transition-all duration-300"
                  data-cursor-label="See Proof"
                >
                  See Results
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </a>
              </NoiseBackground>
            </div>

            <div className="grid grid-cols-3 gap-6 md:gap-10 border-t border-text-secondary/10 pt-8 w-full max-w-lg">
              <StatCounter end={40} suffix="+" label="Projects Delivered" />
              <StatCounter end={3} suffix="x" decimals={true} label="Avg. ROAS" />
              <StatCounter end={15} prefix="₹" suffix="L+" label="Ad Spend Managed" />
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed 3D Ballpit physics background covering the entire hero space */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', userSelect: 'none', opacity: 0.5 }}
        className="z-0"
      >
        <Ballpit
          count={80}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={[0x00d4ff, 0x7c3aed]}
        />
      </div>

      {/* Primary dark vignette and layout overlay to guarantee high text contrast */}
      <div className="absolute inset-0 z-10 bg-[#0a0a12]/85 lg:bg-gradient-to-r lg:from-[#0a0a12] lg:via-[#0a0a12]/80 lg:to-[#0a0a12]/20 pointer-events-none select-none" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-text-secondary/10 rounded-full flex justify-center p-1.5 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-text-primary animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
