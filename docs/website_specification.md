# NEXVRA Website Overhaul Specification

Use this document to specify exactly how you want to change each section of your website. I have loaded the current code of each section for your reference. Fill in your prompt under "Your Prompt / Changes to make:" and refer to any screenshot or mockup image.

---

## Brand-Wide Settings (Fonts, Colors & Themes)

### Current Brand Values
* Primary Font: Arial / Inter
* Secondary Font: Space Grotesk / Arial
* Background: `#0a0a12`
* Accents: Cyan (`#00d4ff`) & Violet (`#7c3aed`)

### Your Prompt / Brand Changes:
> Write any general brand-wide changes (e.g. font links, color modifications) here...

### Font Style to Use in Brand Settings:
> [e.g. font-family: 'Space Grotesk', sans-serif; font-weight: 700;]

---

## 1. Navbar Section
* **File Location:** `components/sections/Navbar.tsx`

### Current Code:
```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-bg-primary/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center text-xl font-extrabold tracking-tight text-[#f5f0e8]" data-cursor-label="NEXVRA">
            <span className="relative w-8 h-8 rounded-lg overflow-hidden mr-2.5">
              <Image 
                src="/brand-assets/nexvra-icon-square.jpg" 
                alt="NEXVRA" 
                fill 
                sizes="32px"
                className="object-cover"
              />
            </span>
            NEXVRA <span className="text-[#00d4ff] ml-1.5 font-medium">Digital</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-text-secondary text-sm">
            <li>
              <a href="#services" className="relative hover:text-[#f5f0e8] transition-colors group py-1" data-cursor-label="Services">
                Services
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b8860b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a href="#results" className="relative hover:text-[#f5f0e8] transition-colors group py-1" data-cursor-label="Results">
                Results
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b8860b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a href="#process" className="relative hover:text-[#f5f0e8] transition-colors group py-1" data-cursor-label="Process">
                Process
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b8860b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a href="#pricing" className="relative hover:text-[#f5f0e8] transition-colors group py-1" data-cursor-label="Pricing">
                Pricing
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#b8860b] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </li>
            <li>
              <a 
                href="#booking" 
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-semibold text-xs tracking-wide shadow-[0_4px_12px_rgba(0,212,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] transition-all hover:scale-105"
                data-cursor-label="Book Call"
              >
                Book a Call
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden flex flex-col justify-between w-6 h-5 z-50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-xl font-bold text-text-primary transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a href="#services" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Services</a>
        <a href="#results" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Results</a>
        <a href="#process" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Process</a>
        <a href="#pricing" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Pricing</a>
        <a 
          href="#booking" 
          onClick={closeMenu} 
          className="px-7 py-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary text-base shadow-[0_4px_12px_rgba(0,212,255,0.25)]"
        >
          Book a Call
        </a>
      </div>
    </>
  );
}

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Navbar:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/navbar-reference.png]

---

## 2. Hero Section
* **File Location:** `components/sections/Hero.tsx`

### Current Code:
```tsx
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
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden', pointerEvents: 'none', userSelect: 'none', opacity: 0.8 }}
        className="z-0"
      >
        <Ballpit
          count={100}
          gravity={0.01}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={['#00d4ff', '#7c3aed', '#b8860b']}
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

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Hero:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/hero-reference.png]

---

## 3. Trusted By Bar
* **File Location:** Inline in `app/page.tsx`

### Current Code:
```tsx
{/* Trusted By Bar */}
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
</section>
```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Trusted By Bar:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/trusted-reference.png]

---

## 4. Problem Section
* **File Location:** `components/sections/Problem.tsx`

### Current Code:
```tsx
'use client';

export default function Problem() {
  return (
    <section id="problems" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Subtle details */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] bg-[#7c3aed]/10 px-3.5 py-1.5 rounded-full border border-[#7c3aed]/15">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-4 leading-tight font-display">
            Your Competitors Are Eating<br />Your Lunch. Here's Why.
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            Most local businesses in Bangalore are bleeding money on bad websites and worse ads. Sound familiar?
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#7c3aed]/20 transition-all hover:-translate-y-1 hover:bg-white/[0.04]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 text-2xl mb-6">💸</span>
            <h3 className="text-lg font-bold text-text-primary mb-3">Burning Money on Ads That Don't Convert</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              You're pouring ₹10,000/month into Meta Ads but getting nothing back. No leads, no calls, no ROI. Your ad spend is funding Meta's shareholders, not your growth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#7c3aed]/20 transition-all hover:-translate-y-1 hover:bg-white/[0.04]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 text-2xl mb-6">🕸️</span>
            <h3 className="text-lg font-bold text-text-primary mb-3">Your Website Looks Like It's From 2010</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Visitors land on your site and bounce in 3 seconds. A slow, ugly, mobile-unfriendly website is silently killing your credibility and costing you customers every single day.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#7c3aed]/20 transition-all hover:-translate-y-1 hover:bg-white/[0.04]" data-cursor-label="Pain Point">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-2xl mb-6">📉</span>
            <h3 className="text-lg font-bold text-text-primary mb-3">Competitors Are Stealing Your Customers</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              While you're stuck with a generic template site, your competitors have polished funnels, retargeting pixels, and automated follow-ups. They're playing chess; you're playing checkers.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Problem Section:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/problem-reference.png]

---

## 5. Services Section
* **File Location:** `components/sections/Services.tsx`

### Current Code:
```tsx
'use client';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
}

function ServiceCard({ icon, title, desc, tags }: ServiceCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00d4ff]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04] flex flex-col items-start" data-cursor-label="Services">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#00d4ff]/15 flex items-center justify-center text-text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-text-secondary">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-[#00d4ff]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-[#7c3aed]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 px-3.5 py-1.5 rounded-full border border-[#00d4ff]/15">
            What I Do
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-4 leading-tight font-display">
            Services That Move<br />The Revenue Needle
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            End-to-end digital solutions designed for Bangalore businesses that want to dominate their market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <ServiceCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
            }
            title="Custom Web Development"
            desc="Blazing-fast, mobile-first websites built with modern tech that load in under 2 seconds and convert visitors into paying customers."
            tags={["React / Next.js", "Responsive", "SEO Ready", "CMS Integrated"]}
          />

          <ServiceCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
            }
            title="Meta Ads Management"
            desc="Data-driven Facebook & Instagram ad campaigns with precise targeting, compelling creatives, and relentless A/B testing to maximize your ROAS."
            tags={["Facebook Ads", "Instagram Ads", "Retargeting", "Analytics"]}
          />

          <ServiceCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            }
            title="High-Converting Landing Pages"
            desc="Single-purpose pages engineered to do one thing: convert. Every word, image, and button is strategically placed based on conversion psychology."
            tags={["A/B Tested", "Speed Optimized", "Copy Included", "Lead Capture"]}
          />

          <ServiceCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            }
            title="Brand Identity & Strategy"
            desc="From logo design to full brand guidelines — I build visual identities that make your business look like a million bucks and stand out in the crowd."
            tags={["Logo Design", "Brand Guide", "Social Kit", "Typography"]}
          />

        </div>

      </div>
    </section>
  );
}

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Services:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/services-reference.png]

---

## 6. Results / Social Proof Section
* **File Location:** `components/sections/Results.tsx`

### Current Code:
```tsx
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
    <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
      {prefix}{decimals ? end.toFixed(1) : end}{suffix}
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

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Results:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/results-reference.png]

---

## 7. Process Section
* **File Location:** `components/sections/Process.tsx`

### Current Code:
```tsx
'use client';

export default function Process() {
  return (
    <section id="process" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 px-3.5 py-1.5 rounded-full border border-[#00d4ff]/15">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-4 leading-tight font-display">
            From Zero to Revenue<br />in 3 Simple Steps
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            No complexity. No buzzwords. Just a proven system that gets your business online and growing.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[linear-gradient(90deg,rgba(0,212,255,0.05)_0%,rgba(124,58,237,0.05)_50%,transparent_100%)] hidden md:block z-0 pointer-events-none" />

          {/* Step 1 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 1">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">Book Your Free Call</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              We hop on a 30-minute strategy call. I learn about your business, your goals, and your competition. Zero obligation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 2">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">We Build Your System</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              I design and develop your website + ad campaigns in 7-14 days. You get unlimited revisions until it's perfect.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 3">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">You Watch It Grow</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Leads start flowing. Your phone rings. Your calendar fills up. You focus on running your business while I handle the digital machine.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Process:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/process-reference.png]

---

## 8. Pricing Tiers Section
* **File Location:** `components/sections/Pricing.tsx`

### Current Code:
```tsx
'use client';

import ElectricBorder from '@/components/ui/electric-border';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7c3aed] bg-[#7c3aed]/10 px-3.5 py-1.5 rounded-full border border-[#7c3aed]/15">
            Investment
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-4 leading-tight font-display">
            Choose Your Growth Plan
          </h2>
          <p className="text-text-secondary text-sm md:text-base">
            Transparent pricing. No hidden fees. Every plan includes a personal strategy call before we start.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Starter Plan */}
          <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col hover:bg-white/[0.02] transition-colors" data-cursor-label="Starter">
            <span className="text-xs font-semibold uppercase text-text-secondary tracking-wider block mb-2">Starter</span>
            <h3 className="text-xl font-bold text-text-primary mb-4">Landing Page</h3>
            <div className="text-3xl font-extrabold text-text-primary mb-6">
              ₹15,000 <span className="text-sm text-text-secondary font-normal">one-time</span>
            </div>
            <p className="text-text-secondary text-xs md:text-sm mb-6 leading-relaxed">
              Perfect for businesses that need a single, high-converting page to capture leads.
            </p>
            <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-text-secondary flex-grow">
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Custom Landing Page Design</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Mobile Responsive</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> SEO Optimized</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Contact Form / Lead Capture</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 7-Day Delivery</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 2 Rounds of Revision</li>
            </ul>
            <a href="#booking" className="w-full text-center py-3.5 rounded-full border border-white/10 hover:border-[#00d4ff]/20 text-text-primary font-bold text-xs tracking-wider transition-all hover:bg-white/5">
              Get Started →
            </a>
          </div>

          {/* Growth Plan (Popular) */}
          <ElectricBorder
            color="#00d4ff"
            speed={1.2}
            chaos={0.08}
            borderRadius={16}
            className="h-full flex flex-col relative"
            style={{ width: '100%' }}
          >
            <div className="p-8 rounded-2xl bg-[#00d4ff]/5 border border-[#00d4ff]/10 flex flex-col h-full relative" data-cursor-label="Popular!">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider z-[3]">
                ⚡ Most Popular
              </span>
              <span className="text-xs font-semibold uppercase text-[#00d4ff] tracking-wider block mb-2 mt-2">Growth</span>
              <h3 className="text-xl font-bold text-text-primary mb-4">Full Website + Ads</h3>
              <div className="text-3xl font-extrabold text-text-primary mb-6">
                ₹35,000 <span className="text-sm text-text-secondary font-normal">one-time</span>
              </div>
              <p className="text-text-secondary text-xs md:text-sm mb-6 leading-relaxed">
                The complete package for businesses ready to generate consistent leads online.
              </p>
              <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-text-primary flex-grow">
                <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Multi-page Custom Website</li>
                <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Meta Ads Setup & 1st Campaign</li>
                <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Pixel & Analytics Installation</li>
                <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Content Strategy Guide</li>
                <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 14-Day Delivery</li>
                <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Unlimited Revisions</li>
                <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> 30-Day Post-Launch Support</li>
              </ul>
              <a href="#booking" className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(0,212,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] transition-all hover:scale-102">
                Get Started →
              </a>
            </div>
          </ElectricBorder>

          {/* Scale Plan */}
          <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col hover:bg-white/[0.02] transition-colors" data-cursor-label="Scale">
            <span className="text-xs font-semibold uppercase text-text-secondary tracking-wider block mb-2">Scale</span>
            <h3 className="text-xl font-bold text-text-primary mb-4">Everything + Retainer</h3>
            <div className="text-3xl font-extrabold text-text-primary mb-6">
              ₹75,000 <span className="text-xs text-text-secondary font-normal">/month</span>
            </div>
            <p className="text-text-secondary text-xs md:text-sm mb-6 leading-relaxed">
              For businesses that want a full-time digital partner managing everything month over month.
            </p>
            <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-text-secondary flex-grow">
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Everything in Growth</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Monthly Ad Management</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> A/B Testing & Optimization</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Monthly Performance Reports</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Content Creation (4 posts/week)</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Priority WhatsApp Support</li>
              <li className="flex items-center gap-2"><span className="text-[#00d4ff] font-bold">✓</span> Brand Strategy Sessions</li>
            </ul>
            <a href="#booking" className="w-full text-center py-3.5 rounded-full border border-white/10 hover:border-[#00d4ff]/20 text-text-primary font-bold text-xs tracking-wider transition-all hover:bg-white/5">
              Get Started →
            </a>
          </div>

        </div>

        <div className="text-center p-6 rounded-2xl bg-white/[0.01] border border-white/5 max-w-2xl mx-auto">
          <p className="text-text-secondary text-xs md:text-sm">
            🛡️ <strong>100% Satisfaction Guarantee</strong> — If you're not happy with the final product, I'll revise until you are, or you don't pay. Zero risk.
          </p>
        </div>

      </div>
    </section>
  );
}

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Pricing:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/pricing-reference.png]

---

## 9. Booking Section
* **File Location:** `components/sections/Booking.tsx`

### Current Code:
```tsx
'use client';

import React, { useState, useEffect } from 'react';

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant / Cafe' },
  { value: 'retail', label: 'Retail / E-commerce' },
  { value: 'fitness', label: 'Fitness / Wellness' },
  { value: 'beauty', label: 'Beauty / Salon' },
  { value: 'healthcare', label: 'Healthcare / Clinic' },
  { value: 'education', label: 'Education / Coaching' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'startup', label: 'Startup / Tech' },
  { value: 'other', label: 'Other' }
];

export default function Booking() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: ''
  });

  // Calendar & Slot State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Render Calendar Helper
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayIndex = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Map Sunday=6, Monday=0
  };

  const year = currentDate.getFullYear();
  const monthIdx = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, monthIdx - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, monthIdx + 1, 1));
  };

  const daysInMonth = getDaysInMonth(year, monthIdx);
  const firstDayIdx = getFirstDayIndex(year, monthIdx);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Generate days array
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayIdx; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  const selectDate = (day: number) => {
    const formatted = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDateStr(formatted);
  };

  const isDaySelected = (day: number) => {
    const formatted = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDateStr === formatted;
  };

  const isDayPast = (day: number) => {
    const d = new Date(year, monthIdx, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  // Form Submit Action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) return setErrorMsg('Full Name is required.');
    if (!formData.email.trim()) return setErrorMsg('Email Address is required.');
    if (!formData.phone.trim()) return setErrorMsg('Phone Number is required.');
    if (!formData.businessType) return setErrorMsg('Please select your business type.');
    if (!selectedDateStr) return setErrorMsg('Please select a preferred date.');
    if (!selectedTimeSlot) return setErrorMsg('Please select a preferred time slot.');

    setIsLoading(true);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessType: formData.businessType,
          date: selectedDateStr,
          time: selectedTimeSlot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking.');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Benefits Info */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 px-3.5 py-1.5 rounded-full border border-[#00d4ff]/15">
              Let's Talk
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-6 leading-tight font-display">
              Book Your Free <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Strategy Call</span>
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              In 30 minutes, I'll show you exactly how to turn your website into a lead-generating machine. No pitch, no pressure — just value.
            </p>

            <ul className="space-y-6">
              {[
                { emoji: '🎯', title: 'Personalized audit of your current digital presence' },
                { emoji: '📊', title: 'Competitor analysis and opportunity mapping' },
                { emoji: '🗺️', title: 'Custom roadmap tailored to your business goals' },
                { emoji: '💰', title: 'Revenue projection based on your industry benchmarks' },
                { emoji: '🤝', title: 'Zero obligation — keep the strategy even if we don\'t work together' }
              ].map((b, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-lg bg-white/5 border border-white/5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">{b.emoji}</span>
                  <span className="text-text-secondary text-sm font-medium pt-1.5">{b.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Dynamic Form Card */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 relative overflow-hidden glass-panel" data-cursor-label="Schedule">
              
              {!success ? (
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">Schedule Your Call</h3>
                  <p className="text-text-secondary text-xs md:text-sm mb-6">Pick a date and time that works for you.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error display */}
                    {errorMsg && (
                      <div className="p-3 text-xs font-semibold text-red-400 bg-red-950/20 border border-red-500/15 rounded-lg">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Phone *</label>
                        <input
                          type="tel"
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Business Type *</label>
                        <select
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          required
                        >
                          <option value="">Select your industry</option>
                          {BUSINESS_TYPES.map((b) => (
                            <option key={b.value} value={b.value}>{b.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Interactive Calendar DatePicker */}
                    <div className="flex flex-col">
                      <label className="text-xs text-text-secondary font-semibold mb-3">Preferred Date *</label>
                      <div className="bg-bg-secondary border border-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-text-primary uppercase tracking-wider">{monthName} {year}</span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-primary text-xs font-bold transition-all"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-primary text-xs font-bold transition-all"
                            >
                              ›
                            </button>
                          </div>
                        </div>

                        {/* Weekday headers */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-text-muted font-bold mb-2">
                          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>

                        {/* Day Cells Grid */}
                        <div className="grid grid-cols-7 gap-1.5">
                          {calendarCells.map((day, idx) => {
                            if (day === null) {
                              return <div key={`empty-${idx}`} />;
                            }

                            const past = isDayPast(day);
                            const selected = isDaySelected(day);

                            return (
                              <button
                                key={`day-${day}`}
                                type="button"
                                disabled={past}
                                onClick={() => selectDate(day)}
                                className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                                  selected
                                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-extrabold shadow-[0_4px_10px_rgba(0,212,255,0.25)]'
                                    : past
                                    ? 'text-slate-700 cursor-not-allowed'
                                    : 'text-text-secondary bg-white/[0.02] hover:bg-white/[0.08]'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Preferred Time slots */}
                    <div className="flex flex-col">
                      <label className="text-xs text-text-secondary font-semibold mb-3">Preferred Time *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 rounded-xl text-center text-xs font-semibold transition-all ${
                              selectedTimeSlot === slot
                                ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary shadow-[0_4px_10px_rgba(0,212,255,0.25)]'
                                : 'bg-bg-secondary border border-white/5 text-text-secondary hover:bg-white/[0.08]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full text-center py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-extrabold text-xs md:text-sm tracking-wider shadow-[0_8px_24px_rgba(0,212,255,0.3)] hover:shadow-[0_8px_35px_rgba(0,212,255,0.5)] transition-all hover:scale-102"
                    >
                      {isLoading ? 'Booking...' : "Confirm Booking — It's Free →"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-2xl text-emerald-400 mb-6 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2 font-display">You're All Set! 🎉</h3>
                  <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
                    Your strategy call has been booked. I'll send a confirmation to your email shortly. Talk soon!
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Booking:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/booking-reference.png]

---

## 10. Footer Section
* **File Location:** `components/sections/Footer.tsx`

### Current Code:
```tsx
'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Logo & Description */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <a href="#" className="flex items-center text-lg font-extrabold text-text-primary">
              <span className="relative w-8 h-8 rounded-lg overflow-hidden mr-2.5">
                <Image 
                  src="/brand-assets/nexvra-icon-square.jpg" 
                  alt="NEXVRA" 
                  fill 
                  sizes="32px"
                  className="object-cover"
                />
              </span>
              NEXVRA <span className="text-[#00d4ff] ml-1.5 font-medium">Digital</span>
            </a>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-sm">
              Premium digital solutions for Bangalore businesses. Web development, Meta Ads, and branding that actually moves the needle.
            </p>
            <div className="flex gap-3 mt-2">
              <a 
                href="https://www.instagram.com/nexvra.in" 
                target="_blank" 
                rel="noopener" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                data-cursor-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                data-cursor-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a 
                href="#" 
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                data-cursor-label="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4l-6.768 6.768"/></svg>
              </a>
              <a 
                href="https://wa.me/919606610059?text=Hi%20NEXVRA%2C%20I%27d%20like%20to%20book%20a%20free%20strategy%20call%20for%20my%20business." 
                target="_blank" 
                rel="noopener" 
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                data-cursor-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs md:text-sm text-text-secondary font-medium">
              <li><a href="#services" className="hover:text-text-primary transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-text-primary transition-colors">Meta Ads</a></li>
              <li><a href="#services" className="hover:text-text-primary transition-colors">Landing Pages</a></li>
              <li><a href="#services" className="hover:text-text-primary transition-colors">Branding</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs md:text-sm text-text-secondary font-medium">
              <li><a href="#results" className="hover:text-text-primary transition-colors">Results</a></li>
              <li><a href="#process" className="hover:text-text-primary transition-colors">Process</a></li>
              <li><a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a></li>
              <li><a href="#booking" className="hover:text-text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-xs md:text-sm text-text-secondary font-medium">
              <li><a href="mailto:nexvratech@gmail.com" className="hover:text-text-primary transition-colors">nexvratech@gmail.com</a></li>
              <li><a href="tel:+919606610059" className="hover:text-text-primary transition-colors">+91 96066 10059</a></li>
              <li><span className="text-text-muted">Bangalore, India</span></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 text-[11px] md:text-xs text-text-muted font-medium">
          <p>© 2026 NEXVRA Digital by Likhith. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

```

### Your Prompt / Changes to make:
> 

### Font Style to Use in Footer:
> 

### Screenshot / Reference Image Path:
> [e.g., brand-assets/footer-reference.png]
