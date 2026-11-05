'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  PhoneCall, 
  ExternalLink, 
  Clock, 
  ChevronUp
} from 'lucide-react';
import { TikTokIcon, FacebookIcon, InstagramIcon } from '@/components/SocialIcons';
import { BRANCH_LIST } from '@/data/branches';

export default function SiteFooter() {
  return (
    <footer className="bg-[#EFEAE1] border-t border-[#DFD8CC] text-[#292524]">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-xs border-2 border-[#FFC72C] shrink-0">
              <Image src="/logo.jpg" alt="Burger House" fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-[#1F1D1A] leading-none">
                Burger House
              </span>
              <span className="text-[11px] font-medium text-[#78716C] mt-0.5">
                Nugegoda & Moratuwa
              </span>
            </div>
          </Link>
          <p className="text-xs text-[#57534E] mt-4 leading-relaxed max-w-xs font-normal">
            Delicious crispy chicken burgers, loaded fries, hot kottu, and wok-fried rice made fresh for takeaway and Uber Eats delivery.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2 mt-5">
            <a
              href="https://www.tiktok.com/@burgerhouse.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FFC72C] hover:text-[#1F1D1A] border border-[#D5CDC0] flex items-center justify-center transition-colors shadow-2xs"
              title="TikTok"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100054414552549"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FFC72C] hover:text-[#1F1D1A] border border-[#D5CDC0] flex items-center justify-center transition-colors shadow-2xs"
              title="Facebook"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
            </a>
            <a
              href="https://www.instagram.com/burger.house_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FFC72C] hover:text-[#1F1D1A] border border-[#D5CDC0] flex items-center justify-center transition-colors shadow-2xs"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
            </a>
          </div>
        </div>

        {/* Locations Column */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1D1A] mb-4">
            Our Branches
          </h4>
          <div className="space-y-4">
            {BRANCH_LIST.map((branch) => (
              <div key={branch.id} className="text-xs">
                <div className="font-bold text-[#1F1D1A] mb-1">{branch.name}</div>
                <div className="text-[#57534E] flex items-start gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D97706]" />
                  <span>{branch.mapAddress}</span>
                </div>
                <div className="text-[#57534E] flex items-center gap-1.5 mb-1.5">
                  <PhoneCall className="w-3.5 h-3.5 shrink-0 text-[#D97706]" />
                  <a href={branch.telephoneUri} className="font-semibold text-[#1F1D1A] hover:underline">
                    {branch.phone}
                  </a>
                </div>
                <div className="flex gap-2">
                  <a
                    href={branch.uberEatsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#D97706] hover:underline flex items-center gap-0.5"
                  >
                    Uber Eats <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className="text-[#A8A29E]">·</span>
                  <a
                    href={branch.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#57534E] hover:underline flex items-center gap-0.5"
                  >
                    Google Maps <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1D1A] mb-4">
            Quick Links
          </h4>
          <nav className="flex flex-col gap-2.5" aria-label="Footer links">
            {[
              { name: 'Browse Menu', href: '/menu' },
              { name: 'Locations & Directions', href: '/locations' },
              { name: 'Customer Reviews', href: '/#reviews' },
              { name: 'Frequently Asked Questions', href: '/#faq' },
              { name: 'Contact Us', href: '/contact' },
              { name: 'Privacy Policy', href: '/privacy' },
              { name: 'Terms & Conditions', href: '/terms' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-[#57534E] hover:text-[#1F1D1A] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hours & Ordering Column */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1D1A] mb-4">
            Opening Hours
          </h4>
          <div className="bg-white border border-[#DFD8CC] p-4 rounded-2xl shadow-2xs space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#1F1D1A] font-bold">
              <Clock className="w-4 h-4 text-[#D97706]" />
              <span>Open 7 Days a Week</span>
            </div>
            <p className="text-[#57534E]">
              8:00 AM to 1:00 AM daily across both Nugegoda and Moratuwa branches.
            </p>
            <p className="text-[11px] text-[#78716C] pt-2 border-t border-[#F2ECE1]">
              Call directly or order delivery via Uber Eats.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#DFD8CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between text-xs text-[#78716C]">
          <p>© 2026 Burger House. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 bg-white hover:bg-[#F8F5EE] border border-[#D5CDC0] rounded-xl text-[#44403C] hover:text-[#1F1D1A] transition-colors"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
