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
