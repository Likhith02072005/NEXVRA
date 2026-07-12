import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXVRA Digital | Award-Winning Web Design & AI Automation Agency",
  description: "We build high-converting websites and scale businesses using high-ROAS Meta Ads and seamless AI workflows. Based in Bengaluru, India.",
  keywords: "web design agency, AI automation, Bengaluru, website developer, Meta Ads expert, NEXVRA Digital",
  openGraph: {
    title: "NEXVRA Digital | We Build Websites That Print Money",
    description: "Award-winning design meets raw marketing execution. Web development, Meta Ads, and AI automation.",
    url: "https://nexvra.in",
    siteName: "NEXVRA Digital",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="bg-[#050508] text-slate-100 font-sans selection:bg-[#00d4ff]/30 selection:text-white">
        <SmoothScrollProvider>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
