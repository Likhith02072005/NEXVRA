'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FontDuo } from '@/components/ui/FontDuo';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface NumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: boolean;
}

function AnimatedNumber({ end, suffix = '', prefix = '', decimals = false }: NumberProps) {
  return (
    <div className="text-3xl md:text-5xl font-semibold text-[#B25F4C] font-nothern">
      {prefix}{decimals ? end.toFixed(1) : end}{suffix}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PARALLAX STAT CARD
   ═══════════════════════════════════════════════════════ */
function ParallaxStat({
  children,
  speed,
  index,
}: {
  children: React.ReactNode;
  speed: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 30, -speed * 30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIAL DATA
   ═══════════════════════════════════════════════════════ */
const testimonials = [
  {
    quote: "Likhith completely transformed our online presence. Our website went from embarrassing to stunning, and the Meta Ads are generating 5-6 enquiries daily. Best investment we've made.",
    name: "Rajesh Kumar",
    role: "Owner, BloomCafe",
    initials: "RK",
  },
  {
    quote: "We were spending ₹30K/month on ads with barely any results. Likhith restructured everything — new landing page, better targeting. Now we're getting 3x the leads at half the cost.",
    name: "Priya Sharma",
    role: "Founder, UrbanFit Studio",
    initials: "PS",
  },
  {
    quote: "Professional, creative, and actually delivers on promises. The branding package he created gave our startup an identity that looks like a funded company. Highly recommend.",
    name: "Arjun Venkat",
    role: "Co-founder, KriyaTech",
    initials: "AV",
  },
  {
    quote: "We needed someone who understood both design and marketing. Likhith built us a site that converts, set up our entire ad funnel, and trained our team. Revenue is up 180% in 3 months.",
    name: "Meera Iyer",
    role: "Director, SpiceRoute Interiors",
    initials: "MI",
  },
  {
    quote: "The speed and quality blew us away. We went from zero digital presence to a fully optimized website with booking system in just 10 days. Our appointment bookings tripled overnight.",
    name: "Karthik Nair",
    role: "Founder, ZenWell Clinic",
    initials: "KN",
  },
];

/* ═══════════════════════════════════════════════════════
   3D TESTIMONIAL CAROUSEL
   ═══════════════════════════════════════════════════════ */
function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  // Resize listener for responsive layout calculation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const count = testimonials.length;

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, count]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % count) + count) % count);
    setIsAutoPlaying(false);
    // Resume auto-play after 10s of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [count]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Swipe handlers
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }

  // Calculate card transforms for 3D cylinder effect dynamically
  function getCardStyle(index: number) {
    let diff = index - activeIndex;
    // Wrap around for shortest path
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    const rotateY = diff * 45; // degrees between cards
    
    // Dynamic dimensions based on current window width
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 1024;
    
    const cardWidth = isMobile ? Math.min(290, windowWidth - 32) : isTablet ? 340 : 400;
    const translateZ = isMobile ? 180 : isTablet ? 280 : 380;
    
    const opacity = Math.abs(diff) === 0 ? 1 : Math.abs(diff) === 1 ? 0.45 : 0.12;
    const scale = Math.abs(diff) === 0 ? 1 : Math.abs(diff) === 1 ? (isMobile ? 0.8 : 0.85) : 0.7;
    const zIndex = count - Math.abs(diff);
    const blur = Math.abs(diff) > 1 ? (isMobile ? 6 : 4) : 0;

    return {
      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      transition: 'all 600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      marginLeft: `${-cardWidth / 2}px`,
      marginTop: '-160px',
      width: `${cardWidth}px`,
    };
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-[1px] bg-[#B25F4C]/40"></div>
        <span className="text-[11px] font-resist-mono font-medium tracking-[0.12em] text-[#B25F4C] uppercase">
          Client Testimonials
        </span>
        <div className="flex-1 h-[1px] bg-black/5"></div>
      </div>

      {/* 3D Carousel */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ height: '400px', maxWidth: '900px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-3d-container relative w-full h-full"
        >
          <div className="preserve-3d relative w-full h-full">
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={getCardStyle(i)}
                className="backface-hidden cursor-pointer"
                onClick={() => goTo(i)}
              >
                <div className="group relative p-8 rounded-2xl bg-[#000000] border border-white/10 flex flex-col justify-between h-[320px] shadow-[0_16px_48px_rgba(0,0,0,0.3)] hover:border-[#B25F4C]/35 transition-all duration-300">
                  {/* Decorative quote mark */}
                  <div className="absolute top-6 right-8 text-[#B25F4C]/10 text-7xl font-rankim leading-none select-none pointer-events-none">
                    &ldquo;
                  </div>

                  <div className="relative z-10 flex-1">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, si) => (
                        <svg key={si} className="w-3.5 h-3.5 text-[#B25F4C]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-[#F9F9F6]/85 text-xs md:text-sm lg:text-base leading-[1.8] font-nothern font-light italic line-clamp-5">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-5 border-t border-white/5 relative z-10">
                    <div className="w-11 h-11 rounded-full bg-[#B25F4C]/15 border border-[#B25F4C]/25 flex items-center justify-center text-xs font-bold text-[#B25F4C] font-resist-mono tracking-wider shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#F9F9F6] font-nothern tracking-wide">{t.name}</div>
                      <div className="text-[#F9F9F6]/40 text-[10px] font-resist-mono font-medium tracking-[0.06em] uppercase mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#2A2A2A] hover:border-[#B25F4C]/30 hover:text-[#B25F4C] transition-all duration-300 cursor-pointer"
          aria-label="Previous testimonial"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'bg-[#B25F4C] w-6'
                  : 'bg-black/15 hover:bg-black/30'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#2A2A2A] hover:border-[#B25F4C]/30 hover:text-[#B25F4C] transition-all duration-300 cursor-pointer"
          aria-label="Next testimonial"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RESULTS SECTION
   ═══════════════════════════════════════════════════════ */
export default function Results() {
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { end: 3, suffix: 'x', label: 'Average ROAS', speed: 0.3 },
    { end: 200, suffix: '%', label: 'More Qualified Leads', speed: 0.5 },
    { end: 40, suffix: '+', label: 'Happy Clients', speed: 0.2 },
    { end: 95, suffix: '%', label: 'Client Retention Rate', speed: 0.4 },
  ];

  return (
    <section id="results" className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-resist-mono font-medium tracking-[0.1em] text-[#B25F4C] bg-[#B25F4C]/5 px-3.5 py-1.5 rounded-full border border-[#B25F4C]/10 uppercase">
              Proven Results
            </span>
            <h2 className="mt-6 mb-4 leading-[1.2]">
              <FontDuo 
                serifText="Numbers Don't Lie." 
                scriptText="Neither Do My" 
                serifClassName="text-3xl md:text-5xl font-light tracking-tight text-[#2A2A2A]"
                scriptClassName="text-2xl md:text-4xl text-[#B25F4C] left-[30%] top-[25%] rotate-[-3deg]"
              />
              <span className="block text-3xl md:text-5xl font-luthon-serif font-light tracking-tight text-[#2A2A2A] mt-2">Clients.</span>
            </h2>
            <p className="text-text-secondary text-base font-nothern font-light leading-relaxed">
              Real results from real Bangalore businesses. This is what happens when strategy meets execution.
            </p>
          </div>
        </ScrollReveal>

        {/* Parallax Stats Row */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <ParallaxStat key={i} speed={stat.speed} index={i}>
              <div className="p-6 rounded-2xl bg-white/50 border border-black/5 text-center shadow-sm hover:shadow-depth transition-shadow duration-300">
                <AnimatedNumber end={stat.end} suffix={stat.suffix} />
                <div className="text-text-secondary text-xs md:text-sm mt-2 font-nothern font-light">{stat.label}</div>
              </div>
            </ParallaxStat>
          ))}
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <ScrollReveal delay={0}>
            <div className="p-8 rounded-2xl bg-white/60 border border-black/5 flex flex-col justify-between hover:border-[#B25F4C]/25 transition-all duration-300 hover:bg-white hover:shadow-depth shadow-[0_4px_20px_rgba(42,42,42,0.015)] h-full" data-cursor-label="Case Study">
              <div>
                <span className="text-[10px] font-resist-mono font-medium tracking-[0.08em] text-[#B25F4C] bg-[#B25F4C]/5 border border-[#B25F4C]/10 px-2.5 py-1 rounded-full uppercase">
                  ✦ Case Study
                </span>
                <h4 className="text-lg font-rankim font-normal text-[#2A2A2A] mt-4 mb-2">BloomCafe — Koramangala</h4>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6 font-nothern font-light">
                  A boutique cafe struggling with foot traffic. We rebuilt their website with online ordering, launched hyper-local Meta Ads targeting a 3km radius, and the results spoke for themselves.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-6">
                <div>
                  <AnimatedNumber end={340} suffix="%" />
                  <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">Increase in Online Orders</div>
                </div>
                <div>
                  <AnimatedNumber end={4.2} suffix="x" decimals={true} />
                  <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">Return on Ad Spend</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="p-8 rounded-2xl bg-white/60 border border-black/5 flex flex-col justify-between hover:border-[#B25F4C]/25 transition-all duration-300 hover:bg-white hover:shadow-depth shadow-[0_4px_20px_rgba(42,42,42,0.015)] h-full" data-cursor-label="Case Study">
              <div>
                <span className="text-[10px] font-resist-mono font-medium tracking-[0.08em] text-[#B25F4C] bg-[#B25F4C]/5 border border-[#B25F4C]/10 px-2.5 py-1 rounded-full uppercase">
                  ✦ Case Study
                </span>
                <h4 className="text-lg font-rankim font-normal text-[#2A2A2A] mt-4 mb-2">UrbanFit Studio — Indiranagar</h4>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6 font-nothern font-light">
                  A fitness studio with zero digital presence. We designed a premium landing page with lead capture, ran Meta Ads for trial memberships, and filled their schedule in 30 days.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-6">
                <div>
                  <AnimatedNumber end={127} />
                  <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">New Members in 30 Days</div>
                </div>
                <div>
                  <AnimatedNumber end={67} suffix="%" />
                  <div className="text-text-secondary text-[10px] md:text-xs mt-1 font-nothern font-light">Reduction in Cost per Lead</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* 3D Testimonial Carousel */}
        <ScrollReveal>
          <TestimonialCarousel />
        </ScrollReveal>

      </div>
    </section>
  );
}
