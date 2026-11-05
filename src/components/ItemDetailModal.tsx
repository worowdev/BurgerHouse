'use client';

import React from 'react';
import FoodImage from '@/components/FoodImage';
import { extrasFor, mealUpgradesFor, formatLKR } from '@/data/menu';
import { X, ExternalLink, MapPin, Tag, Layers, ShoppingBag, ShieldAlert } from 'lucide-react';
import { useBranch } from '@/context/BranchContext';

export default function ItemDetailModal() {
  const { activeItemModal, closeItemModal, openOrderHandoff, selectedBranch } = useBranch();

  if (!activeItemModal) return null;
  const item = activeItemModal;
  const extras = extrasFor(item.category);
  const meals = mealUpgradesFor(item.category);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      onClick={closeItemModal}
    >
      <div
        className="bg-white border border-[#E0D8CB] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo Container */}
        <div className="relative w-full h-52 bg-[#F5F2EB] shrink-0">
          <FoodImage item={item} sizes="500px" />
          <button
            onClick={closeItemModal}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#1F1D1A] rounded-full shadow-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-3 bg-[#FFC72C] text-[#1F1D1A] font-bold text-sm px-3 py-1 rounded-lg shadow-sm">
            {item.priceFormatted}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] block mb-1">
              {item.categoryLabel}
            </span>
            <h2 className="text-2xl font-bold text-[#1F1D1A]">
              {item.name}
            </h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Available at {selectedBranch} branch
            </p>
          </div>

          <p className="text-sm text-[#44403C] leading-relaxed">
            {item.description}
          </p>

          {/* Price options */}
          {item.variants && item.variants.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-[#1F1D1A] uppercase tracking-wider mb-2">Prices</h3>
              <div className="divide-y divide-[#F0EBE1] rounded-xl border border-[#EAE5DC] overflow-hidden">
                {item.variants.map((v) => (
                  <div key={v.label} className="flex items-center justify-between px-3.5 py-2.5 text-sm bg-white">
                    <span className="text-[#44403C]">{v.label}</span>
                    <span className="font-bold text-[#1F1D1A]">{formatLKR(v.priceLKR)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.servingNote && (
            <div className="bg-[#FAF7F2] border border-[#EAE5DC] p-3 rounded-xl text-xs text-[#78716C]">
              <strong>Portion:</strong> {item.servingNote}
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-[#1F1D1A] uppercase tracking-wider mb-2">
                Ingredients & Toppings
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span key={i} className="text-xs bg-[#F5F1E9] text-[#44403C] px-2.5 py-1 rounded-lg">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons and meal upgrades */}
          {extras.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold text-[#1F1D1A] uppercase tracking-wider mb-2">{group.title}</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                {group.items.map((x) => (
                  <div key={x.name} className="flex justify-between gap-2 border-b border-dashed border-[#EAE5DC] py-1">
                    <span className="text-[#57534E]">{x.name}</span>
                    <span className="font-semibold text-[#1F1D1A] whitespace-nowrap">{x.priceLKR == null ? '-' : `+${x.priceLKR}`}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {meals.map((m) => (
            <div key={m.id} className="rounded-xl border border-[#FFC72C]/60 bg-[#FFF8E1] p-3 text-xs text-[#44403C]">
              <div className="flex items-center justify-between">
                <strong className="text-[#1F1D1A]">Make it a meal: {m.name}</strong>
                <span className="font-bold text-[#BA1C22]">+{formatLKR(m.priceLKR)}</span>
              </div>
              <p className="mt-1">{m.includes.join(' · ')}</p>
            </div>
          ))}

          <p className="text-[11px] text-[#78716C]">{item.priceNote}</p>

          <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              If you have severe food allergies or dietary inquiries, please contact the branch directly before placing an order.
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-[#F0EBE1] bg-[#FAF7F2] flex gap-3">
          <button
            onClick={() => {
              closeItemModal();
              openOrderHandoff(item);
            }}
            className="flex-1 bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-bold py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order on Uber Eats</span>
          </button>
          <button
            onClick={closeItemModal}
            className="px-5 py-3 bg-white hover:bg-[#F5F1E9] text-[#1F1D1A] border border-[#E0D8CB] rounded-xl font-semibold text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
