'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);

  useEffect(() => {
    // Check if consent already exists
    const consent = document.cookie.split('; ').find(row => row.startsWith('nexvra_cookie_consent='));
    if (!consent) {
      // Small timeout to slide up nicely
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (status: 'accepted' | 'rejected') => {
    // Set main consent cookie (1 year expiry)
    document.cookie = `nexvra_cookie_consent=${status}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    // Set granular analytics consent
    const analytics = status === 'accepted' ? 'true' : 'false';
    document.cookie = `nexvra_analytics_consent=${analytics}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Apply tag configurations (e.g. Google Analytics)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': analytics === 'true' ? 'granted' : 'denied'
      });
    }

    setShowBanner(false);
    setShowModal(false);
  };

  const savePreferences = () => {
    document.cookie = `nexvra_analytics_consent=${allowAnalytics ? 'true' : 'false'}; path=/; max-age=${60 * 60 * 24 * 365}`;
    document.cookie = `nexvra_cookie_consent=accepted; path=/; max-age=${60 * 60 * 24 * 365}`;

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': allowAnalytics ? 'granted' : 'denied'
      });
    }

    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      <div 
        className={`fixed right-6 bottom-6 max-w-[420px] w-[calc(100%-48px)] p-5 rounded-2xl bg-[#0a0a0f]/90 border border-[#00d4ff]/15 backdrop-blur-xl shadow-2xl z-[9999] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showBanner ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
          🍪 We use cookies to keep your session secure, remember your preferences, and understand how visitors use our site. By continuing, you agree to our use of cookies. <a href="#" className="text-[#00d4ff] underline">Privacy Policy</a> · <button onClick={() => setShowModal(true)} className="text-[#00d4ff] underline hover:text-[#7c3aed] transition-colors focus:outline-none">Manage Preferences</button>
        </div>
        <div className="flex gap-3 justify-end text-xs font-bold">
          <button 
            onClick={() => handleConsent('rejected')} 
            className="px-4 py-2 rounded-full border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-colors"
          >
            Reject
          </button>
          <button 
            onClick={() => handleConsent('accepted')} 
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-[0_4px_12px_rgba(0,212,255,0.25)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] transition-all hover:scale-102"
          >
            Accept
          </button>
        </div>
      </div>

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-[#0a0a0f] border border-[#00d4ff]/15 rounded-2xl max-w-[450px] w-full p-8 shadow-2xl text-left">
            <h3 className="text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mb-2">
              Cookie Preferences
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Manage which cookies you allow us to use on your device. Essential cookies are required for basic site security and booking operations.
            </p>

            <div className="space-y-4 mb-8">
              {/* Essential */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5">
                <div>
                  <div className="text-xs md:text-sm font-semibold text-white">Essential Cookies</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Required for security and CRM systems.</div>
                </div>
                <input type="checkbox" checked disabled className="w-5 h-5 rounded accent-[#00d4ff] cursor-not-allowed" />
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5">
                <div>
                  <div className="text-xs md:text-sm font-semibold text-white">Analytics Cookies</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Help us analyze website visitor traffic.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={allowAnalytics}
                  onChange={(e) => setAllowAnalytics(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#00d4ff] cursor-pointer" 
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 text-xs font-bold">
              <button 
                onClick={() => setShowModal(false)} 
                className="px-4 py-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={savePreferences} 
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-[0_4px_12px_rgba(0,212,255,0.25)] transition-all hover:scale-102"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
