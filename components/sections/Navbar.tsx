'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center text-xl font-extrabold tracking-tight text-white" data-cursor-label="NEXVRA">
            <span className="relative w-8 h-8 rounded-lg overflow-hidden mr-2.5">
              <Image 
                src="/brand-assets/nexvra-icon-square.jpg" 
                alt="NEXVRA" 
                fill 
                sizes="32px"
                className="object-cover"
              />
            </span>
            NEXVRA <span className="text-[#00d4ff] ml-1.5 font-medium">Digital</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-slate-300 text-sm">
            <li><a href="#services" className="hover:text-white transition-colors" data-cursor-label="Services">Services</a></li>
            <li><a href="#results" className="hover:text-white transition-colors" data-cursor-label="Results">Results</a></li>
            <li><a href="#process" className="hover:text-white transition-colors" data-cursor-label="Process">Process</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors" data-cursor-label="Pricing">Pricing</a></li>
            <li>
              <a 
                href="#booking" 
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-semibold text-xs tracking-wide shadow-[0_4px_12px_rgba(0,212,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] transition-all hover:scale-105"
                data-cursor-label="Book Call"
              >
                Book a Call
              </a>
            </li>
          </ul>

          {/* Hamburger */}
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
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#050508]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-xl font-bold text-slate-100 transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a href="#services" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Services</a>
        <a href="#results" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Results</a>
        <a href="#process" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Process</a>
        <a href="#pricing" onClick={closeMenu} className="hover:text-[#00d4ff] transition-colors">Pricing</a>
        <a 
          href="#booking" 
          onClick={closeMenu} 
          className="px-7 py-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white text-base shadow-[0_4px_12px_rgba(0,212,255,0.25)]"
        >
          Book a Call
        </a>
      </div>
    </>
  );
}
