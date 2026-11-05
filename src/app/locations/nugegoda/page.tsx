'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  PhoneCall, 
  Clock, 
  ShoppingBag, 
  ArrowLeft,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { BRANCHES } from '@/data/branches';
import { MENU_ITEMS } from '@/data/menu';
import InteractiveFoodCard from '@/components/InteractiveFoodCard';
import { useBranch } from '@/context/BranchContext';

export default function NugegodaBranchPage() {
  const branch = BRANCHES.nugegoda;
  const { openOrderHandoff } = useBranch();
  const branchItems = MENU_ITEMS.filter((item) => item.branchAvailability.includes('nugegoda'));

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      
      {/* Header */}
      <div className="bg-[#F5F1E9] border-b border-[#EAE5DC] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/locations"
            className="inline-flex items-center gap-1.5 text-xs text-[#57534E] hover:text-[#1F1D1A] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Locations</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block mb-1">
                {branch.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1D1A] tracking-tight">
                {branch.name}
              </h1>
              <p className="text-[#57534E] text-sm mt-1">
                {branch.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => openOrderHandoff()}
                className="bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-bold py-3 px-6 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all transform active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order on Uber Eats</span>
              </button>
              <a
                href={branch.telephoneUri}
                className="bg-white hover:bg-[#F8F5EE] border border-[#D5CDC0] text-[#1F1D1A] font-semibold py-3 px-5 rounded-xl flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#D97706]" />
                <span>{branch.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Branch Info Card */}
        <div className="bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-8 shadow-xs max-w-3xl space-y-4">
          <h2 className="text-xl font-bold text-[#1F1D1A]">Branch Information</h2>
          
          <div className="space-y-3 text-sm text-[#44403C]">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
              <div>
                <p className="font-semibold text-[#1F1D1A]">{branch.mapAddress}</p>
                <p className="text-xs text-[#78716C] mt-0.5">Stanley Thilakarathna Mawatha, Nugegoda</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 shrink-0 text-[#D97706]" />
              <a href={branch.telephoneUri} className="font-bold text-[#1F1D1A] hover:underline">
                {branch.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 shrink-0 text-[#D97706]" />
              <span>{branch.hoursDisplay}</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap gap-2">
            <a
              href={branch.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#F5F1E9] hover:bg-[#EAE4D7] text-[#1F1D1A] px-3.5 py-2 rounded-xl transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Nugegoda Menu Items */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#EAE5DC]">
            <div>
              <h2 className="text-2xl font-bold text-[#1F1D1A]">
                Nugegoda Menu ({branchItems.length} Items)
              </h2>
              <p className="text-xs text-[#78716C] mt-0.5">
                Popular items available for pickup or Uber Eats delivery in Nugegoda.
              </p>
            </div>
            <Link
              href="/menu"
              className="text-xs font-bold text-[#D97706] hover:underline"
            >
              Browse complete menu →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchItems.map((item) => (
              <InteractiveFoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
