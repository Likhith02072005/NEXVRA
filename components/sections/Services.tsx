'use client';

import { FontDuo } from '@/components/ui/FontDuo';
import { Tilt3D } from '@/components/ui/Tilt3D';
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
}

function ServiceCard({ icon, title, desc, tags }: ServiceCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-white/60 border border-black/5 hover:border-[#B25F4C]/25 transition-all duration-300 hover:scale-[1.01] hover:bg-white flex flex-col items-start shadow-[0_4px_20px_rgba(42,42,42,0.015)]" data-cursor-label="Services">
      <div className="w-12 h-12 rounded-xl bg-[#B25F4C]/5 border border-[#B25F4C]/10 flex items-center justify-center text-[#B25F4C] mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-rankim font-normal text-[#2A2A2A] mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow font-nothern font-light">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] font-resist-mono font-medium uppercase tracking-[0.08em] px-2.5 py-1.5 rounded-full bg-black/5 border border-black/5 text-[#2A2A2A]/70">
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
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-[#B25F4C]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-[#B25F4C]/2 blur-[120px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] bg-[#B25F4C]/5 px-3.5 py-1.5 rounded-full border border-[#B25F4C]/10 uppercase">
              What I Do
            </span>
            <h2 className="mt-6 mb-4 leading-[1.2]">
              <FontDuo 
                serifText="Services That Move" 
                scriptText="The Revenue" 
                serifClassName="text-3xl md:text-5xl font-light tracking-tight text-[#2A2A2A]"
                scriptClassName="text-2xl md:text-4xl text-[#B25F4C] left-[35%] top-[25%] rotate-[-3deg]"
              />
              <span className="block text-3xl md:text-5xl font-luthon-serif font-light tracking-tight text-[#2A2A2A] mt-2">Needle</span>
            </h2>
            <p className="text-text-secondary text-base font-nothern font-light leading-relaxed">
              End-to-end digital solutions designed for Bangalore businesses that want to dominate their market.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <StaggerReveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Tilt3D maxTilt={10} scale={1.02}>
            <ServiceCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B25F4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
              }
              title="Custom Web Development"
              desc="Blazing-fast, mobile-first websites built with modern tech that load in under 2 seconds and convert visitors into paying customers."
              tags={["React / Next.js", "Responsive", "SEO Ready", "CMS Integrated"]}
            />
          </Tilt3D>

          <Tilt3D maxTilt={10} scale={1.02}>
            <ServiceCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B25F4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              }
              title="Meta Ads Management"
              desc="Data-driven Facebook & Instagram ad campaigns with precise targeting, compelling creatives, and relentless A/B testing to maximize your ROAS."
              tags={["Facebook Ads", "Instagram Ads", "Retargeting", "Analytics"]}
            />
          </Tilt3D>

          <Tilt3D maxTilt={10} scale={1.02}>
            <ServiceCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B25F4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              }
              title="High-Converting Landing Pages"
              desc="Single-purpose pages engineered to do one thing: convert. Every word, image, and button is strategically placed based on conversion psychology."
              tags={["A/B Tested", "Speed Optimized", "Copy Included", "Lead Capture"]}
            />
          </Tilt3D>

          <Tilt3D maxTilt={10} scale={1.02}>
            <ServiceCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B25F4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              }
              title="Brand Identity & Strategy"
              desc="From logo design to full brand guidelines — I build visual identities that make your business look like a million bucks and stand out in the crowd."
              tags={["Logo Design", "Brand Guide", "Social Kit", "Typography"]}
            />
          </Tilt3D>

        </StaggerReveal>

      </div>
    </section>
  );
}
