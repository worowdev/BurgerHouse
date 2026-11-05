import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      <div className="bg-[#F5F1E9] border-b border-[#EAE5DC] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#57534E] hover:text-[#1F1D1A] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 bg-white border border-[#E0D8CB] px-3 py-1 rounded-full mb-3 shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-xs font-semibold text-[#1F1D1A]">Customer Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1D1A] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[#57534E] text-sm mt-2">
            Last updated: November 2026 · Burger House Sri Lanka
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-[#E0D8CB] rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-[#44403C] leading-relaxed shadow-xs">
          <section>
            <h2 className="text-lg font-bold text-[#1F1D1A] mb-2">1. Information We Do Not Collect</h2>
            <p className="text-[#57534E]">
              Burger House does not collect or store credit card numbers, banking details, or customer payment credentials on this website. All online order processing, payment settlement, and delivery dispatch are conducted externally via certified aggregator platforms (such as Uber Eats).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F1D1A] mb-2">2. Local Browser Preferences</h2>
            <p className="text-[#57534E]">
              To provide a seamless experience, our website stores non-sensitive functional preferences locally in your browser (such as your selected branch preference for Nugegoda or Moratuwa). This data remains on your personal device and is not shared with third party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F1D1A] mb-2">3. Contact Inquiries</h2>
            <p className="text-[#57534E]">
              When you submit an inquiry through our contact form, your name and phone number or email are used solely by Burger House staff to respond to your specific request. We never sell or share contact details with outside marketing companies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F1D1A] mb-2">4. External Services</h2>
            <p className="text-[#57534E]">
              This website provides links to external services including Uber Eats, Google Maps, and Instagram. Each external service operates under its own privacy policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
