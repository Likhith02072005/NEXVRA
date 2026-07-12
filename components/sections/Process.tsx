'use client';

export default function Process() {
  return (
    <section id="process" className="py-24 bg-[#050508] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 px-3.5 py-1.5 rounded-full border border-[#00d4ff]/15">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-6 mb-4 leading-tight font-display">
            From Zero to Revenue<br />in 3 Simple Steps
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
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
            <h3 className="text-lg font-bold text-white mb-2">Book Your Free Call</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We hop on a 30-minute strategy call. I learn about your business, your goals, and your competition. Zero obligation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 2">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">We Build Your System</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              I design and develop your website + ad campaigns in 7-14 days. You get unlimited revisions until it's perfect.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-start relative z-10" data-cursor-label="Step 3">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">You Watch It Grow</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leads start flowing. Your phone rings. Your calendar fills up. You focus on running your business while I handle the digital machine.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
