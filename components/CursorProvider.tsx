'use client';

import { usePathname } from 'next/navigation';
import SplashCursor from '@/components/ui/splash-cursor';

export default function CursorProvider() {
  const pathname = usePathname();

  // Exclude cursor effect from the specification dashboard
  if (pathname === '/spec-dashboard') {
    return null;
  }

  return <SplashCursor />;
}
