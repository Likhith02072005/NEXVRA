'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-[#050508] text-slate-100 min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-xl font-extrabold tracking-widest text-white font-display uppercase hover:opacity-85 transition-opacity">
            <span className="text-[#00d4ff]">NEX</span>VRA
          </Link>
          <h1 className="text-3xl font-extrabold font-display text-white mt-6 mb-2">Privacy Policy</h1>
          <div className="text-xs text-slate-500 font-semibold">Last updated: July 12, 2026</div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
          
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5">
            <p>
              NEXVRA Digital ("NEXVRA," "we," "us," or "our") operates the website <strong>nexvra.in</strong> (the "Site"). This Privacy Policy explains how we collect, use, and protect information when you visit our Site, book a consultation, or interact with our services.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">1. Information We Collect</h2>
            <p className="mb-4">
              <strong>Information you provide directly:</strong> When you book a call or submit a form on our Site, we collect the information you enter, which may include your name, email address, phone number, business name or industry, and preferred date/time for a consultation.
            </p>
            <p className="mb-4">
              <strong>Information collected automatically:</strong> When you visit our Site, we automatically collect certain technical information, including your IP address, browser type, device type, pages visited, time spent on pages, and referring website, via analytics tools such as Google Analytics.
            </p>
            <p>
              <strong>Cookies:</strong> We use cookies and similar tracking technologies to operate our Site securely and understand how it's used. See Section 4 below for details.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Respond to booking requests and schedule consultations</li>
              <li>Communicate with you about our services</li>
              <li>Operate and secure our internal CRM and booking systems</li>
              <li>Analyze Site traffic and improve user experience</li>
              <li>Send service-related notifications (such as booking confirmations)</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">3. How We Share Information</h2>
            <p className="mb-3">We may share information with third-party service providers who help us operate our Site and business, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics</strong> — for website traffic analysis</li>
              <li><strong>Resend</strong> — to send HTML booking emails</li>
              <li><strong>Vercel</strong> — our website hosting and serverless functions provider</li>
              <li><strong>Upstash Redis</strong> — for secure database record storage</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">4. Cookies</h2>
            <p className="mb-4">We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Essential cookies</strong> — required for core site functionality, such as securing our CRM and booking systems. These cannot be disabled.</li>
              <li><strong>Analytics cookies</strong> — help us understand site traffic and performance (e.g., Google Analytics).</li>
            </ul>
            <p>
              You can control or disable non-essential cookies through your browser settings or, where available, our cookie preference tool. Disabling essential cookies may affect Site functionality.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">5. Data Retention</h2>
            <p>
              We retain personal information collected through bookings and forms for as long as necessary to provide our services and maintain business records, or as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">6. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or request deletion of your personal information. To make such a request, contact us using the details in Section 8.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">7. Data Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect your information, including HTTPS encryption and access controls on our internal systems. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#00d4ff] mb-3 border-b border-white/5 pb-2 font-display">8. Contact Us</h2>
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 font-bold text-white space-y-1">
              <div>NEXVRA Digital</div>
              <div className="text-slate-400 font-semibold">Bengaluru, India</div>
              <div>Email: <a href="mailto:nexvratech@gmail.com" className="text-[#00d4ff] underline hover:text-[#7c3aed] transition-colors">nexvratech@gmail.com</a></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-slate-500 font-semibold">
          NEXVRA Digital &copy; 2026 &bull; All rights reserved. &bull; <Link href="/" className="text-[#00d4ff] underline hover:text-white transition-colors ml-1">Back to Home</Link>
        </div>

      </div>
    </div>
  );
}
