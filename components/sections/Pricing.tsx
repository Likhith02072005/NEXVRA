'use client';

import { FontDuo } from '@/components/ui/FontDuo';
import ElectricBorder from '@/components/ui/electric-border';
import { Tilt3D } from '@/components/ui/Tilt3D';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] bg-[#B25F4C]/5 px-3.5 py-1.5 rounded-full border border-[#B25F4C]/10 uppercase">
              Investment
            </span>
            <h2 className="mt-6 mb-4 leading-[1.2]">
              <FontDuo 
                serifText="Choose Your" 
                scriptText="Growth Plan" 
                serifClassName="text-3xl md:text-5xl font-light tracking-tight text-[#2A2A2A]"
                scriptClassName="text-2xl md:text-4xl text-[#B25F4C] left-[35%] top-[25%] rotate-[-3deg]"
              />
            </h2>
            <p className="text-text-secondary text-base font-nothern font-light leading-relaxed">
              Transparent pricing. No hidden fees. Every plan includes a personal strategy call before we start.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Starter Plan */}
          <ScrollReveal delay={0}>
            <Tilt3D maxTilt={5} scale={1.01}>
              <div className="p-8 rounded-2xl bg-white/50 border border-black/5 flex flex-col hover:bg-white transition-all shadow-sm transition-shadow duration-300 hover:shadow-depth-hover" data-cursor-label="Starter">
                <span className="text-xs font-semibold uppercase text-text-secondary tracking-wider block mb-2 font-resist-mono">Starter</span>
                <h3 className="text-xl font-rankim font-normal text-[#2A2A2A] mb-4">Landing Page</h3>
                <div className="text-3xl font-semibold text-[#2A2A2A] mb-6 font-nothern">
                  ₹15,000 <span className="text-sm text-text-secondary font-light">one-time</span>
                </div>
                <p className="text-text-secondary text-xs md:text-sm mb-6 leading-relaxed font-nothern font-light">
                  Perfect for businesses that need a single, high-converting page to capture leads.
                </p>
                <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-text-secondary flex-grow font-nothern font-light">
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Custom Landing Page Design</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Mobile Responsive</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> SEO Optimized</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Contact Form / Lead Capture</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> 7-Day Delivery</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> 2 Rounds of Revision</li>
                </ul>
                <a href="#booking" className="w-full text-center py-3.5 rounded-full border border-black/10 hover:border-[#B25F4C]/20 text-[#2A2A2A] font-bold text-xs tracking-wider transition-all hover:bg-black/5 font-rankim">
                  Get Started →
                </a>
              </div>
            </Tilt3D>
          </ScrollReveal>

          {/* Growth Plan (Popular) */}
          <ScrollReveal delay={0.1}>
            <Tilt3D maxTilt={5} scale={1.01}>
              <div className="float-gentle">
                <ElectricBorder
                  color="#B25F4C"
                  speed={1.2}
                  chaos={0.08}
                  borderRadius={16}
                  className="h-full flex flex-col relative"
                  style={{ width: '100%' }}
                >
                  <div className="p-8 rounded-2xl bg-white border border-[#B25F4C]/35 flex flex-col h-full relative shadow-md transition-shadow duration-300 hover:shadow-depth-hover" data-cursor-label="Popular!">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#B25F4C] to-[#d27c69] text-[#F9F9F6] text-[10px] font-resist-mono font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full z-[3]">
                      ⚡ Most Popular
                    </span>
                    <span className="text-xs font-semibold uppercase text-[#B25F4C] tracking-wider block mb-2 mt-2 font-resist-mono">Growth</span>
                    <h3 className="text-xl font-rankim font-normal text-[#2A2A2A] mb-4">Full Website + Ads</h3>
                    <div className="text-3xl font-semibold text-[#2A2A2A] mb-6 font-nothern">
                      ₹35,000 <span className="text-sm text-text-secondary font-light">one-time</span>
                    </div>
                    <p className="text-text-secondary text-xs md:text-sm mb-6 leading-relaxed font-nothern font-light">
                      The complete package for businesses ready to generate consistent leads online.
                    </p>
                    <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-[#2A2A2A] flex-grow font-nothern font-light">
                      <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Multi-page Custom Website</li>
                      <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Meta Ads Setup & 1st Campaign</li>
                      <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Pixel & Analytics Installation</li>
                      <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Content Strategy Guide</li>
                      <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> 14-Day Delivery</li>
                      <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Unlimited Revisions</li>
                      <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> 30-Day Post-Launch Support</li>
                    </ul>
                    <a href="#booking" className="w-full text-center py-3.5 rounded-full bg-[#B25F4C] text-[#F9F9F6] font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(178,95,76,0.15)] hover:bg-[#B25F4C]/90 transition-all hover:scale-102 font-rankim">
                      Get Started →
                    </a>
                  </div>
                </ElectricBorder>
              </div>
            </Tilt3D>
          </ScrollReveal>

          {/* Scale Plan */}
          <ScrollReveal delay={0.2}>
            <Tilt3D maxTilt={5} scale={1.01}>
              <div className="p-8 rounded-2xl bg-white/50 border border-black/5 flex flex-col hover:bg-white transition-all shadow-sm transition-shadow duration-300 hover:shadow-depth-hover" data-cursor-label="Scale">
                <span className="text-xs font-semibold uppercase text-text-secondary tracking-wider block mb-2 font-resist-mono">Scale</span>
                <h3 className="text-xl font-rankim font-normal text-[#2A2A2A] mb-4">Everything + Retainer</h3>
                <div className="text-3xl font-semibold text-[#2A2A2A] mb-6 font-nothern">
                  ₹75,000 <span className="text-xs text-text-secondary font-light">/month</span>
                </div>
                <p className="text-text-secondary text-xs md:text-sm mb-6 leading-relaxed font-nothern font-light">
                  For businesses that want a full-time digital partner managing everything month over month.
                </p>
                <ul className="space-y-3.5 mb-8 text-xs md:text-sm text-text-secondary flex-grow font-nothern font-light">
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Everything in Growth</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Monthly Ad Management</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> A/B Testing & Optimization</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Monthly Performance Reports</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Content Creation (4 posts/week)</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Priority WhatsApp Support</li>
                  <li className="flex items-center gap-2"><span className="text-[#B25F4C] font-bold">✓</span> Brand Strategy Sessions</li>
                </ul>
                <a href="#booking" className="w-full text-center py-3.5 rounded-full border border-black/10 hover:border-[#B25F4C]/20 text-[#2A2A2A] font-bold text-xs tracking-wider transition-all hover:bg-black/5 font-rankim">
                  Get Started →
                </a>
              </div>
            </Tilt3D>
          </ScrollReveal>

        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center p-6 rounded-2xl bg-white/40 border border-black/5 max-w-2xl mx-auto shadow-sm">
            <p className="text-text-secondary text-xs md:text-sm font-nothern font-light">
              🛡️ <strong>100% Satisfaction Guarantee</strong> — If you&apos;re not happy with the final product, I&apos;ll revise until you are, or you don&apos;t pay. Zero risk.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
