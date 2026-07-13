'use client';

import Image from 'next/image';

/* Isometric Social Icon Component */
function SocialIcon({ href, label, svgPath, ariaLabel }: { href: string; label: string; svgPath: React.ReactNode; ariaLabel: string }) {
  return (
    <li className="iso-pro relative">
      <a href={href} target="_blank" rel="noopener" aria-label={ariaLabel}>
        <span></span>
        <span></span>
        <span></span>
        <svg className="social-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {svgPath}
        </svg>
      </a>
      <div className="social-text font-resist-mono text-xs">{label}</div>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-black/5 pt-20 pb-10">
      <div className="w-full px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Logo & Description */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <a href="#" className="flex items-center text-lg font-rankim text-[#2A2A2A]">
              <span className="relative w-8 h-8 rounded-lg overflow-hidden mr-2.5">
                <Image 
                  src="/brand-assets/nexvra-icon-square.jpg" 
                  alt="NEXVRA" 
                  fill 
                  sizes="32px"
                  className="object-cover"
                />
              </span>
              NEXVRA <span className="text-[#B25F4C] ml-1.5 font-resist-mono text-xs uppercase tracking-wider font-medium">Digital</span>
            </a>
            <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-sm font-nothern font-light">
              Premium digital solutions for Bangalore businesses. Web development, Meta Ads, and branding that actually moves the needle.
            </p>

            {/* Isometric Social Icons Card */}
            <div className="social-card mt-4">
              <ul className="flex-row!">
                <SocialIcon
                  href="https://www.instagram.com/nexvra.in"
                  label="Instagram"
                  ariaLabel="Instagram"
                  svgPath={<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}
                />
                <SocialIcon
                  href="#"
                  label="LinkedIn"
                  ariaLabel="LinkedIn"
                  svgPath={<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>}
                />
                <SocialIcon
                  href="#"
                  label="Twitter"
                  ariaLabel="Twitter / X"
                  svgPath={<path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4l-6.768 6.768"/>}
                />
                <SocialIcon
                  href="https://wa.me/919606610059?text=Hi%20NEXVRA%2C%20I%27d%20like%20to%20book%20a%20free%20strategy%20call%20for%20my%20business."
                  label="WhatsApp"
                  ariaLabel="WhatsApp"
                  svgPath={<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>}
                />
              </ul>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4">
            <h4 className="text-xs font-resist-mono font-medium text-[#2A2A2A] uppercase tracking-[0.1em]">Services</h4>
            <ul className="space-y-2 text-xs md:text-sm text-text-secondary font-nothern font-light">
              <li><a href="#services" className="hover:text-[#B25F4C] transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-[#B25F4C] transition-colors">Meta Ads</a></li>
              <li><a href="#services" className="hover:text-[#B25F4C] transition-colors">Landing Pages</a></li>
              <li><a href="#services" className="hover:text-[#B25F4C] transition-colors">Branding</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-resist-mono font-medium text-[#2A2A2A] uppercase tracking-[0.1em]">Company</h4>
            <ul className="space-y-2 text-xs md:text-sm text-text-secondary font-nothern font-light">
              <li><a href="#results" className="hover:text-[#B25F4C] transition-colors">Results</a></li>
              <li><a href="#process" className="hover:text-[#B25F4C] transition-colors">Process</a></li>
              <li><a href="#pricing" className="hover:text-[#B25F4C] transition-colors">Pricing</a></li>
              <li><a href="#booking" className="hover:text-[#B25F4C] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-resist-mono font-medium text-[#2A2A2A] uppercase tracking-[0.1em]">Contact</h4>
            <ul className="space-y-2 text-xs md:text-sm text-text-secondary font-nothern font-light">
              <li><a href="mailto:nexvratech@gmail.com" className="hover:text-[#B25F4C] transition-colors font-resist-mono text-xs">nexvratech@gmail.com</a></li>
              <li><a href="tel:+919606610059" className="hover:text-[#B25F4C] transition-colors font-resist-mono text-xs">+91 96066 10059</a></li>
              <li><span className="text-text-muted">Bangalore, India</span></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-black/5 pt-8 text-[11px] md:text-xs text-text-muted font-nothern font-light">
          <p>© 2026 NEXVRA Digital by Likhith. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
