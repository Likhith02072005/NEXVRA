'use client';

export default function Process() {
  return (
    <section id="process" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] bg-[#B25F4C]/5 px-3.5 py-1.5 rounded-full border border-[#B25F4C]/10 uppercase">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-rankim font-light tracking-tight text-[#2A2A2A] mt-6 mb-4 leading-[1.1]">
            From Zero to Revenue<br />in 3 Simple Steps
          </h2>
          <p className="text-text-secondary text-base font-nothern font-light leading-relaxed">
            No complexity. No buzzwords. Just a proven system that gets your business online and growing.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[linear-gradient(90deg,rgba(42,42,42,0.06)_0%,rgba(178,95,76,0.06)_50%,transparent_100%)] hidden md:block z-0 pointer-events-none" />

          {/* Step 1 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 1">
            <div className="text-5xl font-semibold text-[#B25F4C] mb-4 font-nothern">
              01
            </div>
            <h3 className="text-lg font-rankim font-normal text-[#2A2A2A] mb-2">Book Your Free Call</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-nothern font-light">
              We hop on a 30-minute strategy call. I learn about your business, your goals, and your competition. Zero obligation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 2">
            <div className="text-5xl font-semibold text-[#B25F4C] mb-4 font-nothern">
              02
            </div>
            <h3 className="text-lg font-rankim font-normal text-[#2A2A2A] mb-2">We Build Your System</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-nothern font-light">
              I design and develop your website + ad campaigns in 7-14 days. You get unlimited revisions until it's perfect.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 3">
            <div className="text-5xl font-semibold text-[#B25F4C] mb-4 font-nothern">
              03
            </div>
            <h3 className="text-lg font-rankim font-normal text-[#2A2A2A] mb-2">You Watch It Grow</h3>
            <p className="text-text-secondary text-sm leading-relaxed font-nothern font-light">
              Leads start flowing. Your phone rings. Your calendar fills up. You focus on running your business while I handle the digital machine.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
