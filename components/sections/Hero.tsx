'use client';

import { useState, useEffect } from 'react';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { NoiseBackground } from '@/components/ui/noise-background';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';

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
      <div className="text-text-secondary text-xs md:text-sm font-medium mt-1">{label}</div>
    </div>
  );
}

const marqueeImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1531535934200-8734bb9ce7c1?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80"
];

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

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-[1.1] font-display min-h-[2.2em] lg:min-h-[2.4em]">
              <EncryptedText 
                text="We Build Websites That" 
                revealDelayMs={30}
                revealedClassName="text-text-primary"
              />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] glow-hover inline-block">
                <EncryptedText 
                  text="Print Money" 
                  revealDelayMs={40}
                  revealedClassName="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
                />
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

      {/* Full-bleed 3D marquee background covering the entire hero space */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-45 border-[5px] border-red-600">
        <ThreeDMarquee images={marqueeImages} className="h-full w-full bg-transparent border-none rounded-none" />
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
