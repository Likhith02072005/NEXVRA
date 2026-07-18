import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ===================================================
// CURSOR (Desktop only)
// ===================================================
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ===================================================
// MARQUEE BAR
// ===================================================
function MarqueeBar() {
  const items = [
    'Digital Alchemy Studio',
    'Bangalore India',
    'Web Development',
    'Brand Strategy',
    'Performance Marketing',
    'Digital Alchemy Studio',
    'Bangalore India',
    'Web Development',
    'Brand Strategy',
    'Performance Marketing',
  ];

  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}<span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ===================================================
// NAVIGATION
// ===================================================
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="nav" style={{ borderBottomColor: scrolled ? 'var(--mid-gray)' : 'transparent' }}>
      <div className="nav-logo">NEXVRA<em>.</em></div>
      <ul className="nav-links">
        {[
          { label: 'Services', href: '#services' },
          { label: 'Work', href: '#work' },
          { label: 'Process', href: '#process' },
          { label: 'Investment', href: '#pricing' },
        ].map(link => (
          <li key={link.label}>
            <a href={link.href} className="nav-link">{link.label}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">Start Project</a>
      <button className="nav-menu-btn" aria-label="Menu">///</button>
    </nav>
  );
}

// ===================================================
// HERO SECTION
// ===================================================
function HeroSection() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(eyebrowRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
        .fromTo('.hero-title-inner', { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06 }, '-=0.2')
        .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .fromTo(imageRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section section" id="home">
      <div className="hero-grid">
        <div>
          <div ref={eyebrowRef} className="hero-eyebrow">
            Digital Alchemy Studio / Bangalore, India
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">
              <span className="hero-title-inner">We Architect</span>
            </span>
            <span className="hero-title-line">
              <span className="hero-title-inner hero-title-outline">Digital</span>
            </span>
            <span className="hero-title-line">
              <span className="hero-title-inner hero-title-red">Dominance</span>
            </span>
          </h1>
          <p className="hero-desc">
            Strategic web development, brand architecture, and performance marketing 
            engineered for businesses in Bangalore ready to command their market.
          </p>
          <div ref={statsRef} className="hero-stats">
            <div className="hero-stat">
              <strong>40+</strong>
              Projects Delivered
            </div>
            <div className="hero-stat">
              <strong>3.0x</strong>
              Average ROAS
            </div>
            <div className="hero-stat">
              <strong>95%</strong>
              Client Retention
            </div>
          </div>
        </div>
        <div ref={imageRef} className="hero-image">
          <img
            src="https://images.pexels.com/photos/4328661/pexels-photo-4328661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt="NEXVRA Digital Alchemy Studio Bangalore"
            loading="eager"
          />
          <div className="hero-image-badge">Est. Bangalore</div>
        </div>
      </div>
      <div className="hero-scroll">Scroll to Explore</div>
      <div className="section-index">01 / 08</div>
    </section>
  );
}

// ===================================================
// MANIFESTO SECTION
// ===================================================
function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.manifesto-title',
        { yPercent: 30, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
      gsap.fromTo('.pain-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.pain-list', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const painPoints = [
    {
      title: 'Invisible Digital Presence',
      desc: 'Outdated websites that fail to convert. Zero SEO. No strategy. Your competition is capturing customers you should be winning.',
    },
    {
      title: 'Wasted Marketing Budget',
      desc: 'Ad spend burning with no return. Generic campaigns without targeting precision or conversion optimization.',
    },
    {
      title: 'Fragmented Brand Identity',
      desc: 'Inconsistent visuals across touchpoints. No coherent story. Your brand lacks the authority to command premium pricing.',
    },
  ];

  return (
    <section ref={sectionRef} className="manifesto-section section" id="about">
      <div className="manifesto-left">
        <div>
          <div className="section-label" style={{ color: '#888' }}>02 / The Problem</div>
          <h2 className="manifesto-title">
            Your Digital Presence Is{' '}
            <span className="manifesto-title-strike">Costing</span>{' '}
            You Revenue
          </h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)', paddingTop: 24, marginTop: 40 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, textTransform: 'uppercase', letterSpacing: 3, color: '#888', marginBottom: 12 }}>
            We engineer the solution
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', color: 'var(--red)', lineHeight: 1 }}>
            NEXVRA
          </div>
        </div>
      </div>
      <div className="manifesto-right">
        <p className="manifesto-body">
          Most businesses operate with <strong>fragmented digital infrastructure</strong> — 
          disconnected websites, unfocused marketing, and brand identities that fail to 
          differentiate. The result is lost revenue and missed opportunity.
          <br /><br />
          NEXVRA delivers <strong>integrated digital systems</strong> — strategic web development, 
          precision marketing, and brand architecture designed to convert attention into 
          measurable business outcomes.
        </p>
        <div className="pain-list">
          {painPoints.map((p, i) => (
            <div key={i} className="pain-item">
              <div className="pain-num">0{i + 1}</div>
              <div className="pain-title">{p.title}</div>
              <div className="pain-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================================================
// SERVICES SECTION
// ===================================================
function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.services-grid', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      num: '01',
      icon: '+',
      name: 'Web Development',
      desc: 'High-performance websites built with modern architecture. React, Next.js, and custom solutions engineered for speed, SEO, and conversion.',
      tags: ['React', 'Next.js', 'Performance', 'SEO'],
    },
    {
      num: '02',
      icon: '/',
      name: 'Performance Marketing',
      desc: 'Data-driven Meta Ads and Google campaigns with precise audience targeting, creative testing, and relentless optimization for maximum ROAS.',
      tags: ['Meta Ads', 'Google Ads', 'Analytics', 'CRO'],
    },
    {
      num: '03',
      icon: '=',
      name: 'Landing Pages',
      desc: 'Conversion-focused pages engineered for lead capture. Every element strategically placed based on user psychology and A/B testing data.',
      tags: ['Conversion', 'A/B Testing', 'Lead Capture', 'Speed'],
    },
    {
      num: '04',
      icon: '*',
      name: 'Brand Architecture',
      desc: 'Complete visual identity systems — logo, typography, color, and guidelines that create instant recognition and command authority.',
      tags: ['Identity', 'Logo Design', 'Guidelines', 'Strategy'],
    },
  ];

  return (
    <section ref={sectionRef} className="services-section section" id="services">
      <div className="services-header">
        <div>
          <div className="section-label">03 / Services</div>
          <h2 className="services-title">
            Strategic<br />
            <span style={{ color: 'var(--red)' }}>Capabilities</span>
          </h2>
        </div>
        <div>
          <p className="services-subtitle">
            Integrated digital solutions for Bangalore businesses ready to establish 
            market authority. Strategy, execution, and measurable outcomes.
          </p>
          <a href="#contact" className="btn-brutal btn-brutal-red" style={{ marginTop: 24 }}>
            Discuss Your Project
          </a>
        </div>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.num} className="service-card">
            <div className="service-card-line" />
            <div className="service-num">{s.num}</div>
            <span className="service-icon">{s.icon}</span>
            <h3 className="service-name">{s.name}</h3>
            <p className="service-desc">{s.desc}</p>
            <div className="service-tags">
              {s.tags.map(tag => (
                <span key={tag} className="service-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="section-index">03 / 08</div>
    </section>
  );
}

// ===================================================
// WORK SECTION (Horizontal Scroll — All Viewports)
// ===================================================
function WorkSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const outer = outerRef.current;
      if (!track || !outer) return;

      const panels = track.querySelectorAll('.work-panel');
      const totalPanels = panels.length;
      const getScrollAmount = () => (totalPanels - 1) * window.innerWidth;

      // Set the outer container height to create enough scroll room
      gsap.set(outer, { height: () => window.innerHeight + getScrollAmount() });

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: stickyRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const cases = [
    {
      num: '01',
      tag: 'Brand Identity + Web',
      title: 'VORTEXA FINTECH',
      desc: 'Rebuilt a B2B fintech brand from the ground up. New identity, marketing site, investor deck. Series A raised in 6 weeks.',
      stats: [
        { val: '340%', label: 'Traffic Increase' },
        { val: '6WK', label: 'Series A Close' },
        { val: '98', label: 'Perf. Score' },
      ],
      img: 'https://images.pexels.com/photos/5465156/pexels-photo-5465156.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
    {
      num: '02',
      tag: 'Digital Experience',
      title: 'OBSIDIAN STUDIO',
      desc: 'Award-winning portfolio site for a luxury interior design firm. Full GSAP scroll storytelling, WebGL image distortion.',
      stats: [
        { val: '12', label: 'Awards Won' },
        { val: '3X', label: 'Lead Increase' },
        { val: '4.9s', label: 'Avg. Time on Page' },
      ],
      img: 'https://images.pexels.com/photos/29079328/pexels-photo-29079328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
    {
      num: '03',
      tag: 'SaaS Product Design',
      title: 'AXIOM ANALYTICS',
      desc: 'End-to-end redesign of a data analytics SaaS platform. 40,000 daily active users. Shipped in 10 weeks.',
      stats: [
        { val: '+67%', label: 'Retention Rate' },
        { val: '10WK', label: 'Ship Time' },
        { val: '40K', label: 'Daily Active' },
      ],
      img: 'https://images.pexels.com/photos/32466569/pexels-photo-32466569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
    {
      num: '04',
      tag: 'Motion + Brand',
      title: 'CIPHER RECORDS',
      desc: 'Full visual identity and motion system for an independent music label. Vinyl packaging, web presence, social templates.',
      stats: [
        { val: '2M+', label: 'Impressions' },
        { val: '+180%', label: 'Stream Growth' },
        { val: '5', label: 'Release Campaigns' },
      ],
      img: 'https://images.pexels.com/photos/8303947/pexels-photo-8303947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
  ];

  return (
    <div ref={outerRef} className="work-outer" id="work">
      <div ref={stickyRef} className="work-sticky">
        <div className="work-header-bar">
          <div className="section-label" style={{ color: 'var(--gray)', pointerEvents: 'auto', marginBottom: 0 }}>04 / Selected Work</div>
          <div className="work-scroll-hint" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'var(--gray)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Scroll to Navigate
          </div>
        </div>
        <div ref={trackRef} className="work-track">
          {cases.map((c, idx) => (
            <div key={c.num} className="work-panel">
              <div className="work-panel-bg">
                <img src={c.img} alt={`${c.title} - NEXVRA Digital Case Study`} loading="lazy" />
              </div>
              <div className="work-panel-overlay" />
              <div className="work-panel-num">{c.num}</div>
              <div className="work-panel-content">
                <div className="work-tag">{c.tag}</div>
                <h3 className="work-title">{c.title}</h3>
                <p className="work-desc">{c.desc}</p>
                <div className="work-stats">
                  {c.stats.map(s => (
                    <div key={s.label}>
                      <div className="work-stat-val">{s.val}</div>
                      <div className="work-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="work-nav">
                <span className="work-progress">{String(idx + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================================================
// STATS SECTION
// ===================================================
function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<HTMLSpanElement[]>([]);

  const stats = [
    { val: 3, decimals: 1, suffix: 'x', label: 'Average ROAS' },
    { val: 200, decimals: 0, suffix: '%', label: 'Lead Increase' },
    { val: 40, decimals: 0, suffix: '+', label: 'Projects Delivered' },
    { val: 95, decimals: 0, suffix: '%', label: 'Client Retention' },
  ];

  const clients = ['NEXVRA Studios', 'Makeover by Thirumala', 'BloomCafe', 'UrbanFit Studio', 'KriyaTech'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );

      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i];
        gsap.fromTo({ val: 0 }, { val: target.val }, {
          duration: 1.5, ease: 'power2.out',
          onUpdate: function () {
            const current = this.targets()[0].val as number;
            el.textContent = target.decimals > 0 ? current.toFixed(target.decimals) : Math.round(current).toString();
          },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section section" id="results">
      <div className="section-label" style={{ color: 'rgba(0,0,0,0.5)' }}>05 / Results</div>
      <h2 className="stats-title">
        Measurable<br />
        <span style={{ color: 'var(--red)', WebkitTextStroke: '2px var(--red)', WebkitTextFillColor: 'transparent' }}>Outcomes</span>
      </h2>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-card">
            <div className="stat-num">
              <span ref={el => { if (el) numRefs.current[i] = el; }}>0</span>
              {s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="clients-marquee">
        <div className="clients-track">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <span key={i} className="clients-item">{client}</span>
          ))}
        </div>
      </div>
      <div className="section-index" style={{ color: 'rgba(0,0,0,0.3)' }}>05 / 08</div>
    </section>
  );
}

// ===================================================
// PROCESS SECTION
// ===================================================
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-step',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.process-steps', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      label: 'Phase 01',
      title: 'Discovery',
      desc: 'Strategic analysis of your business, market position, and competitive landscape. We define objectives and success metrics.',
    },
    {
      label: 'Phase 02',
      title: 'Architecture',
      desc: 'Design and development of your digital system — website, brand assets, and marketing infrastructure in 7-14 days.',
    },
    {
      label: 'Phase 03',
      title: 'Deployment',
      desc: 'Launch with analytics, optimization, and ongoing refinement. We measure, iterate, and scale what works.',
    },
  ];

  return (
    <section ref={sectionRef} className="process-section section" id="process">
      <div className="process-header">
        <div>
          <div className="section-label">06 / Process</div>
          <h2 className="process-title">
            Systematic<br />
            <span style={{ color: 'var(--red)' }}>Execution</span>
          </h2>
        </div>
        <div>
          <p className="process-intro">
            Structured methodology for predictable outcomes. No extended timelines. 
            No scope ambiguity. Clear deliverables with measurable milestones.
          </p>
          <div className="process-timeline">
            Average Delivery: <span>7-14 Days</span>
          </div>
        </div>
      </div>
      <div className="process-steps">
        {steps.map((s, i) => (
          <div key={i} className="process-step">
            <div className="process-step-num">0{i + 1}</div>
            <div className="process-step-label">{s.label}</div>
            <h3 className="process-step-title">{s.title}</h3>
            <p className="process-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--mid-gray)', paddingTop: 32, flexWrap: 'wrap', gap: 24 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: 'var(--gray)' }}>
          Transparent pricing. Clear scope. Defined timeline.
        </div>
        <a href="#pricing" className="btn-brutal">View Investment Options</a>
      </div>
      <div className="section-index">06 / 08</div>
    </section>
  );
}

// ===================================================
// PRICING SECTION
// ===================================================
function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.price-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const plans = [
    {
      tier: 'Starter',
      name: 'Landing Page',
      price: '15,000',
      currency: 'INR',
      period: 'One-time',
      featured: false,
      desc: 'Single high-converting page optimized for lead capture and conversion.',
      features: [
        'Custom Landing Page Design',
        'Mobile Responsive',
        'SEO Optimized',
        'Contact Form Integration',
        '7-Day Delivery',
        '2 Revision Rounds',
      ],
    },
    {
      tier: 'Growth',
      name: 'Website + Ads',
      price: '35,000',
      currency: 'INR',
      period: 'One-time',
      featured: true,
      desc: 'Complete digital presence with website and initial marketing campaign.',
      features: [
        'Multi-page Custom Website',
        'Meta Ads Setup + First Campaign',
        'Pixel + Analytics Installation',
        'Content Strategy Guide',
        '14-Day Delivery',
        'Unlimited Revisions',
        '30-Day Post-Launch Support',
      ],
    },
    {
      tier: 'Scale',
      name: 'Full Retainer',
      price: '75,000',
      currency: 'INR',
      period: 'Monthly',
      featured: false,
      desc: 'Ongoing partnership for continuous optimization and growth.',
      features: [
        'Everything in Growth',
        'Monthly Ad Management',
        'A/B Testing + Optimization',
        'Monthly Performance Reports',
        'Content Creation',
        'Priority Support',
        'Strategy Sessions',
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="pricing-section section" id="pricing">
      <div className="pricing-header">
        <div className="section-label" style={{ color: 'rgba(0,0,0,0.5)' }}>07 / Investment</div>
        <h2 className="pricing-title">
          Select Your<br />
          <span style={{ color: 'var(--red)' }}>Engagement</span>
        </h2>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`price-card ${plan.featured ? 'featured' : ''}`}>
            {plan.featured && <div className="price-badge">Recommended</div>}
            <div className="price-tier">{plan.tier}</div>
            <div className="price-amount">{plan.currency} {plan.price}</div>
            <div className="price-period">{plan.period}</div>
            <p className="price-desc">{plan.desc}</p>
            <div className="price-divider" />
            <ul className="price-features">
              {plan.features.map(f => (
                <li key={f} className="price-feature">{f}</li>
              ))}
            </ul>
            <a href="#contact" className="price-cta">Get Started</a>
          </div>
        ))}
      </div>
      <div className="pricing-guarantee">
        <strong>Satisfaction Guarantee</strong> — If the final deliverable does not meet agreed specifications, 
        revisions continue at no additional cost until requirements are satisfied.
      </div>
      <div className="section-index" style={{ color: 'rgba(0,0,0,0.3)' }}>07 / 08</div>
    </section>
  );
}

// ===================================================
// CONTACT SECTION
// ===================================================
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', business: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title',
        { yPercent: 20, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    'Digital presence audit and analysis',
    'Competitive landscape assessment',
    'Strategic recommendations roadmap',
    'Investment and timeline estimate',
    'No obligation to proceed',
  ];

  return (
    <section ref={sectionRef} className="contact-section section" id="contact">
      <div className="contact-bg-text">NEXVRA</div>
      <div className="contact-top">
        <div className="section-label" style={{ marginBottom: 32 }}>08 / Contact</div>
        <h2 className="contact-title">
          <span>Request</span><br />
          <span className="contact-title-outline">Strategy</span><br />
          <span className="contact-title-red">Consultation</span>
        </h2>
        <p className="contact-sub">
          30-minute consultation to assess your digital requirements and 
          outline a strategic approach. No commitment required.
        </p>
      </div>

      <div className="contact-form-wrapper">
        <div className="contact-form-grid">
          <div>
            <h3 className="contact-info-title">Consultation Includes</h3>
            <div className="contact-benefits">
              {benefits.map((item, i) => (
                <div key={item} className="contact-benefit">
                  <span className="contact-benefit-num">0{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="contact-guarantee">
              <span className="contact-guarantee-label">Guarantee</span>
              Complete satisfaction or continued revision at no additional cost. 
              Your investment is protected.
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-row">
                <div>
                  <label className="contact-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="contact-input"
                  />
                </div>
                <div>
                  <label className="contact-label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91"
                    className="contact-input"
                  />
                </div>
              </div>
              <div>
                <label className="contact-label">Business</label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  required
                  placeholder="Your business name and industry"
                  className="contact-input"
                />
              </div>
              <div>
                <label className="contact-label">Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your requirements, objectives, and timeline"
                  rows={4}
                  className="contact-input contact-textarea"
                />
              </div>
              <button type="submit" className="contact-submit">
                Request Consultation
              </button>
              <div className="contact-slots">Limited availability this month</div>
            </form>
          ) : (
            <div className="contact-success">
              <div className="contact-success-title">Received</div>
              <p className="contact-success-text">
                Your request has been submitted. Expect a response 
                within 24 hours via WhatsApp or phone.
              </p>
              <div className="contact-success-badge">Request Confirmed</div>
            </div>
          )}
        </div>
      </div>
      <div className="section-index">08 / 08</div>
    </section>
  );
}

// ===================================================
// TICKER
// ===================================================
function Ticker({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="ticker-section">
      <div className="ticker-track" style={{ animationDirection: reverse ? 'reverse' : 'normal' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">
            {item} <span>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ===================================================
// FOOTER
// ===================================================
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">NEXVRA<em>.</em></div>
          <div className="footer-tagline">
            Digital Alchemy Studio<br />
            Bangalore, India
          </div>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            {['Web Development', 'Performance Marketing', 'Landing Pages', 'Brand Architecture'].map(l => (
              <li key={l}><a href="#services" className="footer-link">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            {[
              { label: 'Work', href: '#work' },
              { label: 'Process', href: '#process' },
              { label: 'Investment', href: '#pricing' },
              { label: 'Contact', href: '#contact' },
            ].map(l => (
              <li key={l.label}><a href={l.href} className="footer-link">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Connect</div>
          <ul className="footer-links">
            <li><a href="https://nexvra.in" target="_blank" rel="noopener noreferrer" className="footer-link">nexvra.in</a></li>
            <li><a href="#contact" className="footer-link">Request Consultation</a></li>
            <li><span className="footer-link">Bangalore, Karnataka</span></li>
          </ul>
          <div className="footer-status">
            <div className="footer-col-title" style={{ marginTop: 24, marginBottom: 8 }}>Status</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: 'var(--concrete)' }}>
              <span className="footer-status-dot" />
              Accepting New Projects
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">2025 NEXVRA Digital. Bangalore, India.</div>
        <div className="footer-socials">
          {['Instagram', 'LinkedIn', 'Twitter'].map(s => (
            <a key={s} href="#" className="footer-social">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ===================================================
// LOADER
// ===================================================
function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.7,
          ease: 'power4.inOut',
          delay: 0.1,
          onComplete,
        });
      }
    });

    tl.to(barRef.current, { width: '100%', duration: 1.2, ease: 'power2.inOut' });
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: function () {
        if (countRef.current) {
          countRef.current.textContent = Math.round(this.targets()[0].val).toString();
        }
      }
    }, 0);
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader-bg">NEXVRA</div>
      <div className="loader-content">
        <div className="loader-header">
          <div className="loader-logo">NEXVRA<em>.</em></div>
          <div className="loader-count"><span ref={countRef}>0</span>%</div>
        </div>
        <div className="loader-bar-track">
          <div ref={barRef} className="loader-bar" />
        </div>
        <div className="loader-text">Initializing</div>
      </div>
    </div>
  );
}

// ===================================================
// APP
// ===================================================
export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // normalizeScroll fixes mobile browser address bar issues with pinned sections
    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      // Delay refresh to allow DOM to fully render
      const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div className="noise-overlay" />
      <Cursor />
      <MarqueeBar />
      <Nav />
      <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <HeroSection />
        <Ticker items={['Web Development', 'Brand Architecture', 'Performance Marketing', 'Landing Pages', 'Digital Strategy']} />
        <ManifestoSection />
        <Ticker items={['React', 'Next.js', 'Meta Ads', 'Google Ads', 'Conversion Optimization', 'SEO']} reverse />
        <ServicesSection />
        <WorkSection />
        <StatsSection />
        <ProcessSection />
        <PricingSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
