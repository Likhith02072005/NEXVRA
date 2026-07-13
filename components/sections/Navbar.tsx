'use client';

import { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Results", href: "#results" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
];

const NavbarButton = ({ name, href, onClick }: { name: string; href: string; onClick?: () => void }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative group flex items-center justify-center overflow-hidden rounded-lg"
    >
      <div className="absolute -bottom-1 translate-y-1/2 size-10 rounded-full bg-[#00d4ff] opacity-0 blur-lg group-hover:opacity-100 cursor-pointer transition-opacity duration-300" />
      <div className="absolute size-6 rounded-full bg-[#7c3aed] opacity-0 blur-xl group-hover:opacity-100 cursor-pointer transition-opacity duration-300" />
      <div className="relative px-5 py-2 rounded-lg text-gray-300 transition-colors duration-300 ease-out group-hover:text-white">
        <div className="text-sm font-rankim cursor-pointer">{name}</div>
      </div>
    </a>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="w-full pt-4 fixed text-white z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo — outside pill on left */}
            <a href="#" className="flex items-center gap-2.5 shrink-0 mr-4" data-cursor-label="NEXVRA">
              <span className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image 
                  src="/brand-assets/nexvra-icon-square.jpg" 
                  alt="NEXVRA" 
                  fill 
                  sizes="32px"
                  className="object-cover"
                />
              </span>
              <span className="text-lg font-baunk tracking-tight text-[#f5f0e8]">
                NEXVRA <span className="text-[#00d4ff] font-heming font-light text-sm">Digital</span>
              </span>
            </a>

            {/* Floating Pill — desktop */}
            <div className="hidden md:flex items-center py-2 px-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              {navLinks.map(({ name, href }) => (
                <NavbarButton key={href} name={name} href={href} />
              ))}
            </div>

            {/* CTA — outside pill on right */}
            <a 
              href="#booking" 
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-[#f5f0e8] font-rankim text-xs tracking-wide shadow-[0_4px_12px_rgba(0,212,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] transition-all hover:scale-105 ml-4"
              data-cursor-label="Book Call"
            >
              Book a Call
            </a>

            {/* Hamburger — mobile */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden flex flex-col justify-between w-6 h-5 z-50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0a0a12]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-xl font-durer text-text-primary transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map(({ name, href }) => (
          <a key={href} href={href} onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors font-rankim text-lg">{name}</a>
        ))}
        <a 
          href="#booking" 
          onClick={closeMenu} 
          className="px-7 py-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-[#f5f0e8] font-rankim text-base shadow-[0_4px_12px_rgba(0,212,255,0.25)]"
        >
          Book a Call
        </a>
      </div>
    </>
  );
}
