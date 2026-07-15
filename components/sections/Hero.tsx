'use client';

import { useState, useEffect } from 'react';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { NoiseBackground } from '@/components/ui/noise-background';
import GradientBlinds from '@/components/ui/GradientBlinds';
import { FontDuo } from '@/components/ui/FontDuo';
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal';

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
      <div className="text-3xl md:text-4xl font-nothern font-semibold text-[#B25F4C]">
        {prefix}{decimals ? end.toFixed(1) : end}{suffix}
      </div>
      <div className="text-text-secondary text-[11px] font-resist-mono font-medium tracking-[0.08em] uppercase mt-1.5">{label}</div>
    </div>
  );
}


export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#FAF8F5]">
      
      {/* GradientBlinds WebGL Background */}
      <div 
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none', userSelect: 'none' }}
        className="z-0"
      >
        <GradientBlinds
          gradientColors={['#F9F9F6', '#F3F3EF', '#F2E4DF']}
          angle={20}
          noise={0.15}
          blindCount={16}
          blindMinWidth={60}
          spotlightRadius={0.4}
          spotlightSoftness={1.2}
          spotlightOpacity={0.2}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="multiply"
        />
      </div>

      {/* Light overlay for text contrast */}
      <div className="absolute inset-0 z-10 bg-[#FAF8F5]/60 lg:bg-gradient-to-r lg:from-[#FAF8F5]/90 lg:via-[#FAF8F5]/70 lg:to-[#FAF8F5]/20 pointer-events-none select-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side text */}
          <StaggerReveal stagger={0.12} delay={0.15} className="lg:col-span-10 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B25F4C]/20 bg-[#B25F4C]/5 text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B25F4C] animate-pulse"></span>
              Now accepting 3 new clients for July
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] leading-[1.0] mb-8">
              <span className="font-luthon-serif font-light tracking-tight text-[#2A2A2A] block mb-2 sm:mb-4">We Build Websites That</span>
              <span className="block mt-[-0.1em]">
                <FontDuo 
                  serifText="PRINT" 
                  scriptText="Money" 
                  serifClassName="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold text-[#2A2A2A] tracking-[0.05em]"
                  scriptClassName="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-[#B25F4C] left-[25%] top-[15%] rotate-[-4deg]"
                />
              </span>
            </h1>

            <p className="text-text-secondary text-base md:text-lg font-nothern font-light max-w-xl mb-10 leading-[1.75] tracking-wide">
              Full-stack web development + Meta Ads that turn your Bangalore business into a lead-generating machine. No fluff — just results.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <NoiseBackground
                containerClassName="p-[1px] rounded-full overflow-hidden"
                className="rounded-full overflow-hidden"
                gradientColors={["rgb(178, 95, 76)", "rgb(210, 124, 105)", "rgb(249, 249, 246)"]}
                noiseIntensity={0.05}
                speed={0.15}
              >
                <a 
                  href="#booking" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B25F4C] text-[#F9F9F6] font-rankim text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#B25F4C]/90 shadow-[0_4px_12px_rgba(178,95,76,0.2)]"
                  data-cursor-label="Book Call"
                >
                  Book Your Free Strategy Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </NoiseBackground>

              <NoiseBackground
                containerClassName="p-[1px] rounded-full overflow-hidden"
                className="rounded-full overflow-hidden"
                gradientColors={["rgb(42, 42, 42)", "rgb(94, 94, 94)", "rgb(243, 243, 239)"]}
                noiseIntensity={0.05}
                speed={0.15}
              >
                <a 
                  href="#results" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F3F3EF] text-[#2A2A2A] font-rankim text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#F3F3EF]/80 border border-black/5"
                  data-cursor-label="See Proof"
                >
                  See Results
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </a>
              </NoiseBackground>
            </div>

            <div className="grid grid-cols-3 gap-6 md:gap-10 border-t border-black/5 pt-8 w-full max-w-lg">
              <StatCounter end={40} suffix="+" label="Projects Delivered" />
              <StatCounter end={3} suffix="x" decimals={true} label="Avg. ROAS" />
              <StatCounter end={15} prefix="₹" suffix="L+" label="Ad Spend Managed" />
            </div>
          </StaggerReveal>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-black/5 rounded-full flex justify-center p-1.5 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A] animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
