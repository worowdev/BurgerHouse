'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS, FAQItem } from '@/data/faq';

function FAQAccordionItem({ item, isOpen, toggle }: { item: FAQItem; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="bg-white border border-[#EAE5DC] rounded-2xl overflow-hidden transition-all shadow-2xs">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-bold text-[#1F1D1A] leading-snug">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#D97706] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#78716C] shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-1 border-t border-[#F5F1E9] bg-white">
          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section id="faq" className="doodle-bg py-16 bg-[#F5F1E9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="heading-card mx-auto text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block mb-1">
            Questions & Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#57534E] text-sm mt-1">
            Everything you need to know about ordering, delivery, and branches.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={openId === index}
              toggle={() => setOpenId(openId === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
