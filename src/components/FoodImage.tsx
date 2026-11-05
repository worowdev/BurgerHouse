'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CupSoda, Drumstick, Sandwich, Soup, Utensils } from 'lucide-react';
import type { MenuItem } from '@/types';

const ICONS: Partial<Record<NonNullable<MenuItem['imagePlaceholderCategory']>, React.ElementType>> = {
  drink: CupSoda,
  chicken: Drumstick,
  sub: Sandwich,
  pasta: Soup,
};

/**
 * Menu photo with a branded fallback: items without a photo (or whose
 * photo fails to load) get a warm gradient tile with the item name.
 */
export default function FoodImage({
  item,
  sizes,
  className = '',
}: {
  item: MenuItem;
  sizes: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (item.image && !failed) {
    return (
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes={sizes}
        className={`object-cover ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  const Icon = ICONS[item.imagePlaceholderCategory ?? 'burger'] ?? Utensils;
  return (
    <div
      role="img"
      aria-label={item.name}
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,#FFD866,#F5A623_55%,#C52228)] p-4 text-center"
    >
      <Icon className="h-10 w-10 text-white/90 drop-shadow" strokeWidth={1.75} />
      <span className="font-display text-2xl leading-none tracking-wide text-white drop-shadow-sm">{item.name}</span>
    </div>
  );
}
