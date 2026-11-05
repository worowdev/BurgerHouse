'use client';

import React from 'react';
import { X, ExternalLink, MapPin, PhoneCall, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useBranch } from '@/context/BranchContext';

export default function OrderHandoffModal() {
  const { orderHandoffModal, closeOrderHandoff, currentBranch } = useBranch();

  if (!orderHandoffModal?.open) return null;

  const item = orderHandoffModal.item;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Order Online"
      onClick={closeOrderHandoff}
    >
      <div
        className="bg-white border border-[#E0D8CB] rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1F1D1A]">
            {item ? `Order ${item.name}` : 'Order Online'}
          </h2>
          <button
            onClick={closeOrderHandoff}
            className="p-1.5 text-[#78716C] hover:text-[#1F1D1A] rounded-full bg-[#F5F1E9] hover:bg-[#EAE4D7] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Branch */}
        <div className="bg-[#FAF7F2] border border-[#EAE5DC] p-4 rounded-2xl mb-4">
          <div className="flex items-center gap-2 text-[#1F1D1A] font-bold text-sm mb-1">
            <MapPin className="w-4 h-4 text-[#D97706]" />
            <span>{currentBranch.name}</span>
          </div>
          <p className="text-xs text-[#57534E]">
            {currentBranch.mapAddress}
          </p>
        </div>

        {/* Item summary if ordering specific item */}
        {item && (
          <div className="bg-[#FAF7F2] border border-[#EAE5DC] p-3.5 rounded-2xl mb-4 flex items-center justify-between">
            <div>
              <p className="text-[#1F1D1A] font-bold text-sm">{item.name}</p>
              <p className="text-xs text-[#78716C] mt-0.5">{item.categoryLabel}</p>
            </div>
            <div className="font-bold text-sm text-[#1F1D1A] bg-white border border-[#E0D8CB] px-2.5 py-1 rounded-lg">
              {item.priceFormatted}
            </div>
          </div>
        )}

        <div className="text-xs text-[#57534E] mb-5 leading-relaxed">
          You will complete your order securely on Uber Eats for <strong className="text-[#1F1D1A]">{currentBranch.name}</strong>. Delivery and in-store pickup options are available.
        </div>

        {/* Uber Eats Yellow Button */}
        <a
          href={currentBranch.uberEatsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-bold text-base py-3.5 rounded-xl shadow-xs text-center flex items-center justify-center gap-2 transition-all transform active:scale-98"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Continue to Uber Eats</span>
          <ExternalLink className="w-4 h-4 opacity-75" />
        </a>

        {/* Or Call Direct */}
        <a
          href={currentBranch.telephoneUri}
          className="mt-3 w-full bg-[#F5F1E9] hover:bg-[#EAE4D7] border border-[#E0D8CB] text-[#1F1D1A] font-semibold py-3 rounded-xl text-center text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-[#D97706]" />
          <span>Or Call Branch: {currentBranch.phone}</span>
        </a>

        <p className="text-center text-[11px] text-[#A8A29E] mt-3">
          Operating hours: 8:00 AM to 1:00 AM daily
        </p>
      </div>
    </div>
  );
}
