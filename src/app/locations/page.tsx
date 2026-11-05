'use client';

import React from 'react';
import {
  MapPin, PhoneCall, Clock, ExternalLink, ShoppingBag, Star, Navigation
} from 'lucide-react';
import { BRANCH_LIST } from '@/data/branches';
import { useBranch } from '@/context/BranchContext';

export default function LocationsPage() {
  const { selectedBranch, setBranch } = useBranch();

  return (
    <div className="doodle-bg doodle-bg--full min-h-screen bg-[#FBF9F5]">
      
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="max-w-7xl mx-auto bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-10 glow-card">
          <div className="inline-flex items-center gap-2 bg-[#FBF9F5] border border-[#E0D8CB] px-3 py-1 rounded-full mb-3 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-xs font-semibold text-[#1F1D1A]">Our Locations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1D1A] tracking-tight">
            Burger House Branches
          </h1>
          <p className="text-[#57534E] text-sm sm:text-base mt-2 max-w-xl">
            Two convenient locations in greater Colombo serving fresh hot food daily. Visit us in person or order direct on Uber Eats.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {BRANCH_LIST.map((branch) => (
          <div
            key={branch.id}
            className={`bg-white border rounded-3xl p-6 sm:p-8 transition-shadow ${
              selectedBranch === branch.id
                ? 'border-amber-300 shadow-md ring-1 ring-amber-200'
                : 'border-[#EAE5DC] shadow-xs'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              {/* Branch Information */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#FEF9C3] px-2.5 py-0.5 rounded-full border border-[#FDE047]">
                    {branch.badge}
                  </span>
                  {selectedBranch === branch.id && (
                    <span className="text-xs font-bold bg-[#1F1D1A] text-white px-2.5 py-0.5 rounded-full">
                      Currently Selected
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1A]">
                    {branch.name}
                  </h2>
                  <p className="text-xs text-[#78716C] mt-0.5">{branch.tagline}</p>
                </div>

                <div className="space-y-3 pt-2 text-sm text-[#44403C]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
                    <span>{branch.mapAddress}</span>
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

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {branch.features.map((feat, i) => (
                    <span key={i} className="text-xs bg-[#F5F1E9] text-[#57534E] px-3 py-1 rounded-lg">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons (Yellow Primary) */}
              <div className="flex flex-col gap-2.5 md:min-w-[220px]">
                <a
                  href={branch.uberEatsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-bold py-3 px-5 rounded-xl shadow-xs text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order on Uber Eats</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={branch.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-[#F8F5EE] border border-[#DCD5C8] text-[#1F1D1A] font-semibold py-3 px-5 rounded-xl text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#D97706]" />
                  <span>Google Maps Directions</span>
                </a>

                <a
                  href={branch.telephoneUri}
                  className="bg-[#F5F1E9] hover:bg-[#EAE4D7] text-[#1F1D1A] font-semibold py-3 px-5 rounded-xl text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#D97706]" />
                  <span>Call to Order</span>
                </a>

                {selectedBranch !== branch.id && (
                  <button
                    onClick={() => setBranch(branch.id)}
                    className="text-xs text-[#D97706] hover:underline font-semibold py-1.5 text-center cursor-pointer"
                  >
                    Set as active branch
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}

        {/* Customer Review Snapshot */}
        <div className="bg-white border border-[#EAE5DC] rounded-3xl p-8 text-center max-w-3xl mx-auto mt-8">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#FFC72C] fill-[#FFC72C]" />
            ))}
          </div>
          <h3 className="text-xl font-bold text-[#1F1D1A] mb-1">
            Loved Across Colombo
          </h3>
          <p className="text-xs text-[#57534E] max-w-md mx-auto">
            Consistently rated 4.5 out of 5 stars by hundreds of customers on Uber Eats and food review platforms.
          </p>
        </div>

      </div>
    </div>
  );
}
