import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, AlertCircle } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-xs font-semibold text-[#1F1D1A]">Storefront Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1D1A] tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-[#57534E] text-sm mt-2">
            Storefront use, delivery pricing, and allergy guidelines · Burger House Sri Lanka
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-[#E0D8CB] rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-[#44403C] leading-relaxed shadow-xs">
          <section>
            <h2 className="text-lg font-bold text-[#1F1D1A] mb-2">1. About This Website</h2>
            <p className="text-[#57534E]">
              This website provides general information, menu listings, and links to order food from Burger House branches in Nugegoda and Moratuwa. All delivery orders are placed and processed through authorized third party platforms such as Uber Eats.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F1D1A] mb-2">2. Pricing & Availability</h2>
            <p className="text-[#57534E]">
              Prices shown on this website in Sri Lankan Rupees (LKR) are based on our current in-store menu. Prices on delivery platforms such as Uber Eats may differ. Prices and availability are subject to change without prior notice. Delivery platform prices may vary from in-store takeaway or dine-in prices due to packaging, courier charges, and third-party aggregator commissions.
            </p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-amber-900 mb-1.5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              3. Food Allergies & Dietary Notice
            </h2>
            <p className="text-xs text-amber-800 leading-relaxed">
              Items prepared in our kitchen may contain or come into contact with common allergens such as eggs, dairy, gluten, seafood, prawns, and chili peppers. Customers with severe food allergies must contact branch staff directly before placing any order.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F1D1A] mb-2">3. Orders & Payment</h2>
            <p className="text-[#57534E]">
              When placing an order on Uber Eats, your order confirmation, payment processing, delivery timeline, and fulfillment are handled directly by Uber Eats according to their standard terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
