'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface FontDuoProps {
  serifText: string;
  scriptText: string;
  className?: string;
  serifClassName?: string;
  scriptClassName?: string;
}

export function FontDuo({
  serifText,
  scriptText,
  className,
  serifClassName,
  scriptClassName,
}: FontDuoProps) {
  return (
    <div className={cn("relative inline-block select-none py-3", className)}>
      {/* Background Serif Text */}
      <span
        className={cn(
          "font-luthon-serif text-[#2A2A2A] tracking-normal font-normal",
          serifClassName
        )}
      >
        {serifText}
      </span>
      {/* Overlay Cursive Script Text */}
      <span
        className={cn(
          "absolute left-[30%] top-[35%] font-luthon-script text-[#B25F4C] transform -rotate-[5deg] font-normal pointer-events-none whitespace-nowrap",
          scriptClassName
        )}
      >
        {scriptText}
      </span>
    </div>
  );
}
