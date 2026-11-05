'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Utensils } from 'lucide-react';
import InteractiveFoodCard from '@/components/InteractiveFoodCard';
import {
  MENU_ITEMS,
  CATEGORIES,
  BURGER_ADDONS,
  SUB_PASTA_ADDONS,
  RICE_KOTTU_EXTRA_PORTIONS,
  SAUCE_EXTRAS,
  MEAL_UPGRADES,
  formatLKR,
} from '@/data/menu';
import type { MenuExtra } from '@/types';
import { useBranch } from '@/context/BranchContext';
import type { MenuCategory } from '@/types';

export default function MenuPage() {
  const { selectedBranch } = useBranch();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBranchOnly, setShowBranchOnly] = useState(false);

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS;

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (showBranchOnly) {
      items = items.filter((item) => item.branchAvailability.includes(selectedBranch));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(q))) ||
          (item.ingredients && item.ingredients.some((ing) => ing.toLowerCase().includes(q)))
      );
    }

    return items;
  }, [activeCategory, searchQuery, showBranchOnly, selectedBranch]);

  const activeCategoryData = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <div className="doodle-bg doodle-bg--full min-h-screen bg-[#FBF9F5]">
      
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="max-w-7xl mx-auto bg-white border border-[#EAE5DC] rounded-3xl p-6 sm:p-10 glow-card">
          <div className="inline-flex items-center gap-2 bg-[#FBF9F5] border border-[#E0D8CB] px-3 py-1 rounded-full mb-3 shadow-2xs">
            <Utensils className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-xs font-semibold text-[#1F1D1A]">Our Complete Menu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1D1A] tracking-tight">
            Menu & Pricing
          </h1>
          <p className="text-[#57534E] text-sm sm:text-base mt-2 max-w-xl">
            Burgers, submarines, fried rice, kottu, pasta, fries and drinks. In-store prices with no service charge. Delivery app prices may differ.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
            <input
              type="text"
              placeholder="Search burgers, subs, kottu, rice, drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E0D8CB] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1F1D1A] placeholder-[#78716C] focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] focus:outline-none transition-all shadow-2xs"
            />
          </div>

          {/* Branch Toggle */}
          <label className="flex items-center gap-2 text-xs font-medium text-[#57534E] cursor-pointer bg-white border border-[#E0D8CB] px-3.5 py-2.5 rounded-xl shadow-2xs">
            <input
              type="checkbox"
              checked={showBranchOnly}
              onChange={(e) => setShowBranchOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#FFC72C] focus:ring-[#FFC72C] border-[#D5CDC0]"
            />
            <Filter className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Show only items available at <strong className="capitalize text-[#1F1D1A]">{selectedBranch}</strong></span>
          </label>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all'
              ? MENU_ITEMS.length
              : MENU_ITEMS.filter((item) => item.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFC72C] text-[#1F1D1A] shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#E0D8CB] hover:bg-[#F5F1E9]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-black/10 text-[#1F1D1A]' : 'bg-[#F5F1E9] text-[#78716C]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#78716C] mb-6 pb-3 border-b border-[#EAE5DC]">
          <span>Showing {filteredItems.length} items</span>
          <span>{activeCategoryData.description}</span>
        </div>

        {/* Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <InteractiveFoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-12 text-center max-w-md mx-auto my-12">
            <p className="text-[#57534E] text-sm mb-4">
              No menu items found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setShowBranchOnly(false);
              }}
              className="bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Add-ons, extra portions & meal upgrades */}
        <section className="mt-16 border-t border-[#EAE5DC] pt-10" aria-labelledby="extras-heading">
          <div className="heading-card">
            <h2 id="extras-heading" className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1A] tracking-tight">
              Add-ons &amp; Meal Upgrades
            </h2>
            <p className="text-sm text-[#57534E] mt-1">
              Customise any order. Rice and kottu: Normal is for 2 persons, Full is for 3 persons. No service charge.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEAL_UPGRADES.map((m) => (
              <div key={m.id} className="rounded-2xl bg-[#BA1C22] text-white p-5 shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-3xl leading-none tracking-wide">{m.name}</h3>
                    <p className="text-xs text-white/75 mt-1">{m.appliesTo}</p>
                  </div>
                  <span className="rounded-full bg-[#FFC72C] px-3 py-1 text-sm font-extrabold text-[#1F1D1A] whitespace-nowrap">
                    +{formatLKR(m.priceLKR)}
                  </span>
                </div>
                <ul className="mt-4 space-y-1 text-sm text-white/90">
                  {m.includes.map((x) => (
                    <li key={x} className="flex gap-2"><span className="text-[#FFC72C]">●</span>{x}</li>
                  ))}
                </ul>
              </div>
            ))}

            <ExtrasCard title="Burger Add-ons" items={BURGER_ADDONS} />
            <ExtrasCard title="Submarine & Pasta Add-ons" items={SUB_PASTA_ADDONS} />
            <ExtrasCard title="Rice & Kottu: Additional Portions" items={RICE_KOTTU_EXTRA_PORTIONS} />
            <ExtrasCard title="Sauces" items={SAUCE_EXTRAS} />
          </div>
        </section>

      </div>
    </div>
  );
}

function ExtrasCard({ title, items }: { title: string; items: MenuExtra[] }) {
  return (
    <div className="rounded-2xl border border-[#EAE5DC] bg-white p-5 shadow-2xs">
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#1F1D1A] mb-3">{title}</h3>
      <dl className="divide-y divide-[#F0EBE1] text-sm">
        {items.map((x) => (
          <div key={x.name} className="flex items-center justify-between py-1.5">
            <dt className="text-[#57534E]">{x.name}</dt>
            <dd className="font-bold text-[#1F1D1A]">{x.priceLKR == null ? '-' : formatLKR(x.priceLKR)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
