'use client';

import React from 'react';
import FoodImage from '@/components/FoodImage';
import { MenuItem } from '@/types';
import { useBranch } from '@/context/BranchContext';
import { ShoppingBag, Eye, Star } from 'lucide-react';

interface InteractiveFoodCardProps {
  item: MenuItem;
}

export default function InteractiveFoodCard({ item }: InteractiveFoodCardProps) {
  const { 
    selectedBranch, 
    openItemModal, 
    openOrderHandoff 
  } = useBranch();

  const isAvailable = item.branchAvailability.includes(selectedBranch);
  const optionCount = item.variants?.length ?? 0;

  return (
    <div className="bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full group">
      
      {/* Food Photo Container */}
      <div className="relative w-full h-48 bg-[#F5F2EB] overflow-hidden cursor-pointer" onClick={() => openItemModal(item)}>
        <FoodImage
          item={item}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="group-hover:scale-104 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {item.isFeatured && (
            <span className="bg-[#FFC72C] text-[#1F1D1A] text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              <span>Popular</span>
            </span>
          )}
        </div>

        {/* Price Pill in Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs border border-[#E0D8CB] text-[#1F1D1A] font-bold text-xs px-2.5 py-1 rounded-lg shadow-xs">
          {item.priceFormatted}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C8275] mb-1.5 uppercase tracking-wide">
            <span>{item.categoryLabel}</span>
            {isAvailable ? (
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-200">
                Available at {selectedBranch}
              </span>
            ) : (
              <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-medium">
                Other branch
              </span>
            )}
          </div>

          {/* Item Name */}
          <h3 
            onClick={() => openItemModal(item)}
            className="font-bold text-lg text-[#1F1D1A] group-hover:text-[#D97706] transition-colors cursor-pointer leading-snug"
          >
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#57534E] line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>

          {/* Price options */}
          {optionCount > 1 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.variants!.map((v) => (
                <span key={v.label} className="rounded-md border border-[#EAE5DC] bg-[#FAF7F2] px-2 py-1 text-[11px] text-[#57534E]">
                  {v.label} <strong className="text-[#1F1D1A]">{v.priceLKR.toLocaleString('en-US')}</strong>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions Row */}
        <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center gap-2">
          <button
            type="button"
            onClick={() => openItemModal(item)}
            className="flex-1 bg-[#F5F1E9] hover:bg-[#EAE4D7] text-[#1F1D1A] text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#78716C]" />
            <span>Details</span>
          </button>

          <button
            type="button"
            onClick={() => openOrderHandoff(item)}
            className="bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] text-xs font-bold py-2.5 px-4 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all transform active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>

      </div>

    </div>
  );
}
