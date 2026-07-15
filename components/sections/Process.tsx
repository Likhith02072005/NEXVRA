'use client';

import { useState } from 'react';
import { FontDuo } from '@/components/ui/FontDuo';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ProcessCardProps {
  step: string;
  title: string;
  description: string;
}

function ProcessCard({ step, title, description }: ProcessCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped((prev) => !prev)}
      data-cursor-label={`Step ${step}`}
    >
      <div className="flip-card-inner">
        {/* Front Face */}
        <div className="flip-card-front bg-white/60 border border-black/5 rounded-2xl p-8 min-h-[250px] md:min-h-[280px] flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-nothern font-semibold text-[#B25F4C] mb-4">
            {step}
          </div>
          <h3 className="text-lg font-rankim font-normal text-[#2A2A2A] mb-4">
            {title}
          </h3>
          <svg
            className="w-5 h-5 text-[#B25F4C]/50 mt-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </div>

        {/* Back Face */}
        <div className="flip-card-back absolute inset-0 bg-[#000000] border border-white/10 rounded-2xl p-8 min-h-[250px] md:min-h-[280px] flex flex-col justify-center">
          <span className="absolute top-4 right-5 text-[#B25F4C]/30 text-sm font-nothern font-semibold">
            {step}
          </span>
          <p className="text-[#F9F9F6]/85 text-sm font-nothern font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    step: '01',
    title: 'Book Your Free Call',
    description:
      'We hop on a 30-minute strategy call. I learn about your business, your goals, and your competition. Zero obligation.',
  },
  {
    step: '02',
    title: 'We Build Your System',
    description:
      'I design and develop your website + ad campaigns in 7-14 days. You get unlimited revisions until it\u2019s perfect.',
  },
  {
    step: '03',
    title: 'You Watch It Grow',
    description:
      'Leads start flowing. Your phone rings. Your calendar fills up. You focus on running your business while I handle the digital machine.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">

        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] bg-[#B25F4C]/5 px-3.5 py-1.5 rounded-full border border-[#B25F4C]/10 uppercase">
              How It Works
            </span>
            <h2 className="mt-6 mb-4 leading-[1.2]">
              <FontDuo
                serifText="From Zero to Revenue"
                scriptText="in 3 Simple"
                serifClassName="text-3xl md:text-5xl font-light tracking-tight text-[#2A2A2A]"
                scriptClassName="text-2xl md:text-4xl text-[#B25F4C] left-[35%] top-[25%] rotate-[-3deg]"
              />
              <span className="block text-3xl md:text-5xl font-luthon-serif font-light tracking-tight text-[#2A2A2A] mt-2">
                Steps
              </span>
            </h2>
            <p className="text-text-secondary text-base font-nothern font-light leading-relaxed">
              No complexity. No buzzwords. Just a proven system that gets your business online and growing.
            </p>
          </div>
        </ScrollReveal>

        {/* Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[linear-gradient(90deg,rgba(42,42,42,0.06)_0%,rgba(178,95,76,0.06)_50%,transparent_100%)] hidden md:block z-0 pointer-events-none" />

          {steps.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.15}>
              <div className="relative z-10">
                <ProcessCard
                  step={item.step}
                  title={item.title}
                  description={item.description}
                />
              </div>
            </ScrollReveal>
          ))}

        </div>

      </div>
    </section>
  );
}
