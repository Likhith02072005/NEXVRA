'use client';

import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Services from '@/components/sections/Services';
import Results from '@/components/sections/Results';
import Process from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import Booking from '@/components/sections/Booking';
import Footer from '@/components/sections/Footer';
import CookieConsent from '@/components/sections/CookieConsent';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
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

        <Problem />
        <Services />
        <Results />
        <Process />
        <Pricing />
        <Booking />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
