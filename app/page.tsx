'use client';

import { useState } from 'react';
import Ballpit from '@/components/ui/ballpit';

export default function Home() {
  const [followCursor, setFollowCursor] = useState(true);
  const [count, setCount] = useState(100);
  const [gravity, setGravity] = useState(0.0);
  const [friction, setFriction] = useState(0.998);
  const [wallBounce, setWallBounce] = useState(0.95);

  // Dynamic colors matching the screenshot (white, purple, dark gray, violet)
  const colors = [0xffffff, 0x7c3aed, 0x1f1f2e, 0x00d4ff];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#07070b] text-[#f5f0e8] flex flex-col font-sans select-none">
      
      {/* Navbar overlay */}
      <nav className="absolute top-0 left-0 w-full z-20 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-transparent backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00d4ff] to-[#7c3aed] flex items-center justify-center font-bold text-black text-sm tracking-wider">
            N
          </div>
          <span className="font-display font-black text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#f5f0e8] via-[#a8a4b8] to-[#f5f0e8]">
            NEXVRA
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#a8a4b8]">
          <span className="hover:text-[#f5f0e8] transition-colors cursor-pointer">Features</span>
          <span className="hover:text-[#f5f0e8] transition-colors cursor-pointer">About</span>
        </div>
        <button className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-colors shadow-lg">
          Sign up
        </button>
      </nav>

      {/* Interactive Ballpit Full-Screen Background */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <Ballpit
          count={count}
          gravity={gravity}
          friction={friction}
          wallBounce={wallBounce}
          followCursor={followCursor}
          colors={colors}
          ambientColor={0xffffff}
          ambientIntensity={1.5}
          lightIntensity={300}
          minSize={0.4}
          maxSize={1.2}
          size0={1.5}
          maxVelocity={0.18}
        />
      </div>

      {/* Main hero section content overlay */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-24 pb-48 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#00d4ff] mb-6 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"></span>
          New: Just shipped v2.0
        </div>
        <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-black font-display text-white tracking-tight leading-[1.05] mb-8">
          Balls! What's not to like about them?
        </h1>
        <div className="flex items-center gap-4">
          <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] text-white text-sm font-bold shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/20">
            Get started
          </button>
          <button className="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white text-sm font-bold backdrop-blur-md transition-all active:scale-[0.98]">
            Learn more
          </button>
        </div>
      </main>

      {/* Interactive Customize Controls Panel at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-20 px-6 pb-8 pt-4 bg-gradient-to-t from-[#07070b]/90 via-[#07070b]/60 to-transparent backdrop-blur-[1px]">
        <div className="max-w-5xl mx-auto border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
          <h2 className="text-sm uppercase font-bold tracking-widest text-[#a8a4b8] mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#00d4ff]"></span>
            Customize
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Display Cursor Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
              <span className="text-xs font-semibold text-[#a8a4b8]">Display Cursor</span>
              <button 
                onClick={() => setFollowCursor(!followCursor)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out border border-white/10 ${followCursor ? 'bg-gradient-to-r from-[#7c3aed] to-[#00d4ff]' : 'bg-white/5'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${followCursor ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>

            {/* Ball Count Slider */}
            <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex justify-between text-xs font-semibold text-[#a8a4b8]">
                <span>Ball Count</span>
                <span className="font-mono text-white">{count}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="400" 
                value={count} 
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
              />
            </div>

            {/* Gravity Slider */}
            <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex justify-between text-xs font-semibold text-[#a8a4b8]">
                <span>Gravity</span>
                <span className="font-mono text-white">{gravity.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1" 
                value={gravity} 
                onChange={(e) => setGravity(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
              />
            </div>

            {/* Friction Slider */}
            <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] md:col-span-1">
              <div className="flex justify-between text-xs font-semibold text-[#a8a4b8]">
                <span>Friction</span>
                <span className="font-mono text-white">{friction.toFixed(4)}</span>
              </div>
              <input 
                type="range" 
                min="0.95" 
                max="0.999" 
                step="0.001" 
                value={friction} 
                onChange={(e) => setFriction(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
              />
            </div>

            {/* Wall Bounce Slider */}
            <div className="flex flex-col gap-2 p-3.5 rounded-xl border border-white/5 bg-white/[0.02] md:col-span-2">
              <div className="flex justify-between text-xs font-semibold text-[#a8a4b8]">
                <span>Wall Bounce</span>
                <span className="font-mono text-white">{wallBounce.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="1" 
                step="0.01" 
                value={wallBounce} 
                onChange={(e) => setWallBounce(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
