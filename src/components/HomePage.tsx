'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  MapPin, 
  ShoppingBag, 
  PhoneCall, 
  Clock, 
  Star,
  Utensils
} from 'lucide-react';
import { TikTokIcon, FacebookIcon, InstagramIcon } from '@/components/SocialIcons';
import InteractiveFoodCard from '@/components/InteractiveFoodCard';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import CheeseDrip from '@/components/CheeseDrip';
import { useBranch } from '@/context/BranchContext';
import { MENU_ITEMS } from '@/data/menu';
import { BRANCH_LIST } from '@/data/branches';

export default function HomePage() {
  const { openOrderHandoff, selectedBranch } = useBranch();

  return (
    <div className="bg-[#FBF9F5] text-[#1F1D1A]">
      
      {/* ═══════════════════════════════════════════════════════
          HERO: dark poster. Type + actions left, burger right,
          menu ticker along the bottom.
      ═══════════════════════════════════════════════════════ */}
      <section className="hero-grain relative isolate overflow-hidden bg-[#0E0605] text-white">
        {/* Cheese melting off the nav */}
        <CheeseDrip className="absolute inset-x-0 top-0 z-0 h-[48px] sm:h-[65px] lg:h-[84px]" />

        {/* Red rim light behind the burger + warm floor glow */}
        <div className="pointer-events-none absolute -right-[10%] top-1/2 -z-10 h-[120%] w-[85%] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(225,30,38,0.8),rgba(160,14,20,0.35)_55%,transparent_75%)] blur-2xl lg:w-[70%]" />
        <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[#C52228]/25 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 pb-10 pt-10 sm:px-8 sm:pt-12 lg:min-h-[min(calc(100svh-126px),820px)] lg:grid-cols-12 lg:gap-4 lg:py-10">
          {/* ── Left: type + actions ─────────────────────── */}
          <div className="relative z-20 order-2 lg:order-1 lg:col-span-6 xl:col-span-5">
            <span className="font-display inline-block -rotate-2 bg-[#D3161F] px-3 py-1 text-xl leading-none tracking-wide text-[#F7E3C6] shadow-lg shadow-black/40 sm:text-2xl">
              Colombo&apos;s Favorite
            </span>

            <h1 className="font-display mt-4 leading-[0.84] tracking-tight" style={{ fontSize: 'clamp(5.5rem, 13vw, 11.5rem)' }}>
              <span className="block text-[#F7E3C6]">Burger</span>
              <span className="block text-[#FFC72C]">
                House<span className="text-[#D3161F]">.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-md border-l-2 border-[#D3161F] pl-4 text-[15px] leading-relaxed text-white/75 sm:text-base">
              Crispy double-patty chicken burgers, loaded fries, authentic kottu and wok-fried rice.
              Delivered hot in minutes across Nugegoda and Moratuwa.
            </p>

            <HeroActions onOrder={() => openOrderHandoff()} />
          </div>

          {/* ── Right: burger ────────────────────────────── */}
          <div className="relative order-1 lg:order-2 lg:col-span-6 xl:col-span-7">
            {/* Giant outlined word behind the burger */}
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute left-1/2 -top-[4%] -z-0 -translate-x-1/2 select-none whitespace-nowrap leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(247,227,198,0.32)]"
              style={{ fontSize: 'clamp(7rem, 22vw, 20rem)' }}
            >
              Fresh
            </span>

            <div className="hero-float relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[540px] lg:max-w-none">
              <Image
                src="/hero-burger-hq.jpg"
                alt="Sesame cheeseburger with bacon, lettuce, tomato and melted cheese"
                fill
                priority
                sizes="(max-width: 640px) 420px, (max-width: 1024px) 540px, 720px"
                className="select-none object-contain [mask-image:radial-gradient(closest-side,black_80%,transparent_100%)]"
              />
            </div>

            {/* Floating chips */}
            <div className="absolute left-0 top-[18%] hidden rotate-[-4deg] rounded-2xl border border-white/10 bg-black/50 px-4 py-3 shadow-2xl backdrop-blur-md sm:block lg:left-[2%]">
              <div className="font-display text-2xl leading-none text-[#FFC72C]">Double Patty</div>
              <div className="mt-1 text-xs text-white/60">Smashed &amp; stacked</div>
            </div>
            <div className="absolute bottom-[14%] right-0 hidden rotate-[3deg] rounded-2xl bg-[#D3161F] px-4 py-3 shadow-2xl shadow-black/50 sm:block lg:right-[4%]">
              <div className="font-display text-2xl leading-none text-[#F7E3C6]">Hot in Minutes</div>
              <div className="mt-1 text-xs text-white/80">Nugegoda · Moratuwa</div>
            </div>
          </div>
        </div>

        {/* ── Menu ticker ───────────────────────────────── */}
        <div className="relative border-y border-[#FFC72C]/30 bg-[#D3161F] py-3">
          <div className="hero-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {['Burgers', 'Kottu', 'Fried Rice', 'Loaded Fries', 'Pasta', 'Everything in one place'].map((item) => (
                  <span key={item} className="font-display flex items-center whitespace-nowrap px-5 text-2xl leading-none tracking-wide text-[#F7E3C6] sm:text-3xl">
                    {item}
                    <span className="ml-10 text-[#FFC72C]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: MID-PAGE PROMO BANNER (matching Design Reference)
      ═══════════════════════════════════════════════════════ */}
      <section className="doodle-bg py-12 lg:py-16 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#BA1C22] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-7 space-y-4 text-center md:text-left z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFC72C] flex items-center justify-center md:justify-start gap-1">
                  <span>Fast & Fresh Every Day</span>
                  <span>❯</span>
                </span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Order Fast Food <br className="hidden sm:inline" />
                  in Minutes
                </h2>

                <p className="text-sm sm:text-base text-white/90 max-w-lg leading-relaxed">
                  Craving late night burgers, loaded chicken fries, or sizzling cheese kottu? Select your branch and complete your order through Uber Eats with fast doorstep delivery.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => openOrderHandoff()}
                    className="bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-extrabold text-sm px-7 py-3.5 rounded-full shadow-md transition-all transform active:scale-95 cursor-pointer"
                  >
                    Order Delivery
                  </button>
                </div>
              </div>

              {/* Right promo burger visual */}
              <div className="md:col-span-5 flex justify-center items-center relative">
                <div className="relative w-72 sm:w-80 md:w-full md:max-w-[420px] aspect-square rotate-2 transition-transform duration-300 hover:rotate-0">
                  <Image
                    src="/fast-fresh-spread.png"
                    alt="Burger House spread: submarine, cheeseburger, chicken kottu, fried rice, cola and milkshakes"
                    fill
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover rounded-3xl border-4 border-white/20 shadow-2xl"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: THREE COLOR CARDS (matching Design Reference)
      ═══════════════════════════════════════════════════════ */}
      <section className="doodle-bg py-12 lg:py-16 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="heading-card mx-auto text-center mb-12">
            <span className="text-sm font-extrabold uppercase tracking-wider text-[#BA1C22] block mb-1">
              Popular Choices
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1A] tracking-tight">
              Best Sellers Across Our Branches
            </h2>
            <p className="text-[#57534E] text-sm mt-1 max-w-md mx-auto">
              Our most-ordered burgers, made fresh to order.
            </p>
          </div>

          {/* 3 Color Cards from Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Card 1: Red Card */}
            <div className="bg-[#BA1C22] text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-black/10">
                  <Image
                    src={MENU_ITEMS.find((it) => it.id === 'burger-house-special-chicken')?.image ?? '/hero-burger-hq.jpg'}
                    alt="Burger House Special (Chicken)"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-[#FFC72C] font-bold text-xs px-2.5 py-1 rounded-lg">
                    LKR 910
                  </div>
                </div>

                <h3 className="font-extrabold text-xl mb-1 text-white">
                  Burger House Special
                </h3>
                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  Two chicken patties stacked with cheese, egg, lettuce, onion, tomato and cheesy mayonnaise. Beef or crispy chicken from LKR 1,330.
                </p>
              </div>

              <button
                onClick={() => openOrderHandoff()}
                className="w-full bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-extrabold text-xs uppercase tracking-wider py-3 rounded-full transition-colors cursor-pointer"
              >
                Order Now
              </button>
            </div>

            {/* Card 2: Golden Yellow Card */}
            <div className="bg-[#F59E0B] text-[#1F1D1A] rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-black/10">
                  <Image
                    src="/menu/crispy-chicken-burger.png"
                    alt="Crispy Chicken Burger"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#1F1D1A] font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    From LKR 850
                  </div>
                </div>

                <h3 className="font-extrabold text-xl mb-1 text-[#1F1D1A]">
                  Crispy Chicken Burger
                </h3>
                <p className="text-xs text-[#422006] leading-relaxed mb-6 font-medium">
                  Crispy chicken fillet with lettuce, onion, tomato, cheesy mayonnaise and ketchup. Add cheese or egg for LKR 930.
                </p>
              </div>

              <button
                onClick={() => openOrderHandoff()}
                className="w-full bg-[#1F1D1A] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-full transition-colors cursor-pointer"
              >
                Order Now
              </button>
            </div>

            {/* Card 3: Warm Cream / Tan Card */}
            <div className="bg-[#EAE0D0] text-[#1F1D1A] rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between border border-[#D5CDC0]">
              <div>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-black/5">
                  <Image
                    src="/menu/chicken-burger-with-egg.png"
                    alt="Chicken Burger with Egg"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#1F1D1A] font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    LKR 710
                  </div>
                </div>

                <h3 className="font-extrabold text-xl mb-1 text-[#1F1D1A]">
                  Chicken Burger with Egg
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed mb-6 font-medium">
                  Chicken patty with a fried egg, lettuce, onion, tomato and cheesy mayonnaise. Go Special with cheese too for LKR 790.
                </p>
              </div>

              <button
                onClick={() => openOrderHandoff()}
                className="w-full bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-extrabold text-xs uppercase tracking-wider py-3 rounded-full transition-colors cursor-pointer"
              >
                Order Now
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: FOOD STRIP (Loaded Fries, Kottu, Rice, Shakes)
      ═══════════════════════════════════════════════════════ */}
      <section className="doodle-bg py-12 lg:py-16 bg-[#F5F1E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div className="heading-card">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block mb-1">
                More Delicious Bites
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1A] tracking-tight">
                Loaded Fries, Kottu & Fried Rice
              </h2>
            </div>
            <Link
              href="/menu"
              className="glow-card border bg-white rounded-full px-4 py-2 text-sm font-bold text-[#BA1C22] hover:underline flex items-center gap-1"
            >
              <span>View full menu</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {['loaded-french-fries', 'burger-house-special-kottu', 'chicken-cheese-kottu', 'burger-house-special-rice']
              .map((id) => MENU_ITEMS.find((it) => it.id === id))
              .filter((it): it is NonNullable<typeof it> => Boolean(it))
              .map((item) => (
              <InteractiveFoodCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LOCATIONS & HOURS SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="doodle-bg py-16 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="heading-card mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block mb-1">
              Visit Us in Person
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1A] tracking-tight">
              Our Locations & Hours
            </h2>
            <p className="text-[#57534E] text-sm mt-1">
              Open 7 days a week from 8:00 AM to 1:00 AM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {BRANCH_LIST.map((branch) => (
              <div
                key={branch.id}
                className="bg-white border border-[#E0D8CB] rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] bg-[#FEF9C3] px-2.5 py-0.5 rounded-full border border-[#FDE047]">
                      {branch.badge}
                    </span>
                    {selectedBranch === branch.id && (
                      <span className="text-[11px] font-bold bg-[#1F1D1A] text-white px-2 py-0.5 rounded-full">
                        Active Branch
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#1F1D1A] mb-1">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-[#78716C] mb-4">
                    {branch.tagline}
                  </p>

                  <div className="space-y-2.5 text-xs text-[#44403C] mb-6">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 shrink-0 text-[#D97706] mt-0.5" />
                      <span>{branch.mapAddress}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 shrink-0 text-[#D97706]" />
                      <a href={branch.telephoneUri} className="font-semibold text-[#1F1D1A] hover:underline">
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 shrink-0 text-[#D97706]" />
                      <span>{branch.hoursDisplay}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-4 border-t border-[#F0EBE1]">
                  <a
                    href={branch.uberEatsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-extrabold text-xs py-3 rounded-full text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Online</span>
                  </a>
                  <a
                    href={branch.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#F5F1E9] hover:bg-[#EAE4D7] text-[#1F1D1A] font-semibold text-xs py-3 rounded-full text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Directions</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          REVIEWS & FAQ
      ═══════════════════════════════════════════════════════ */}
      <ReviewsSection />
      <FAQSection />

      {/* ═══════════════════════════════════════════════════════
          SOCIAL CALLOUT BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#BA1C22] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Join the Burger House Community
          </h2>
          <p className="text-sm text-white/90">
            Check out our latest videos, food drops, and announcements on TikTok and Facebook.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://www.tiktok.com/@burgerhouse.official"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 hover:bg-black/50 text-white font-bold text-xs px-5 py-3 rounded-full border border-white/20 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <TikTokIcon className="w-4 h-4" />
              <span>@burgerhouse.official on TikTok</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100054414552549"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 hover:bg-black/50 text-white font-bold text-xs px-5 py-3 rounded-full border border-white/20 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
              <span>Burger House on Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/burger.house_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 hover:bg-black/50 text-white font-bold text-xs px-5 py-3 rounded-full border border-white/20 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
              <span>@burger.house_official</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

const SOCIALS = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@burgerhouse.official', Icon: TikTokIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100054414552549', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/burger.house_official/', Icon: InstagramIcon },
];

function HeroActions({ onOrder }: { onOrder: () => void }) {
  return (
    <div className="mt-7 space-y-5">
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={onOrder}
          className="inline-flex items-center gap-2 rounded-full bg-[#FFC72C] px-5 py-2.5 text-sm font-extrabold text-[#1F1D1A] shadow-lg shadow-black/30 transition-all hover:bg-[#F5B800] active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" />
          Order Now
        </button>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full border border-[#F7E3C6]/40 bg-black/20 px-5 py-2.5 text-sm font-bold text-[#F7E3C6] backdrop-blur-sm transition-colors hover:bg-black/35"
        >
          <Utensils className="h-4 w-4 text-[#FFC72C]" />
          View Menu
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white/90 transition-colors hover:border-[#FFC72C] hover:text-[#FFC72C]"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
