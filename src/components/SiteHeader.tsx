'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useBranch } from '@/context/BranchContext';
import { 
  MapPin, 
  ChevronDown, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  PhoneCall,
  Check
} from 'lucide-react';
import { TikTokIcon, FacebookIcon, InstagramIcon } from '@/components/SocialIcons';
import { BRANCH_LIST } from '@/data/branches';

export default function SiteHeader() {
  const pathname = usePathname();
  const { 
    selectedBranch, 
    setBranch, 
    currentBranch, 
    openOrderHandoff 
  } = useBranch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setBranchDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Locations', href: '/locations' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FFC72C] focus:text-[#1F1D1A] focus:font-bold focus:rounded-full shadow-lg"
      >
        Skip to main content
      </a>

      {/* Main Header Bar with Brand Red Background matching design */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#B91C1C]/95 backdrop-blur-md shadow-md py-2.5 border-b border-red-900/40 text-white'
            : 'bg-[#C52228] text-white py-3 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border-2 border-[#FFC72C] shrink-0">
              <Image
                src="/logo.jpg"
                alt="Burger House Logo"
                fill
                sizes="40px"
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-none">
                Burger House
              </span>
              <span className="text-[11px] font-medium text-amber-200 mt-0.5">
                Nugegoda & Moratuwa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#1F1D1A] bg-[#FFC72C]'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: Social Links, Branch Selector, Yellow Pill Button */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Social Icons Header Pill */}
            <div className="flex items-center gap-1.5 text-white/80 pr-2 border-r border-white/20">
              <a
                href="https://www.tiktok.com/@burgerhouse.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FFC72C] hover:text-[#1F1D1A] flex items-center justify-center transition-colors"
                title="Follow us on TikTok"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100054414552549"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FFC72C] hover:text-[#1F1D1A] flex items-center justify-center transition-colors"
                title="Follow us on Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/burger.house_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FFC72C] hover:text-[#1F1D1A] flex items-center justify-center transition-colors"
                title="Follow us on Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Branch Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className="flex items-center gap-1.5 bg-black/20 hover:bg-black/30 text-white border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
                aria-expanded={branchDropdownOpen}
                aria-label="Select Restaurant Branch"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span className="capitalize">{currentBranch.id}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${branchDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {branchDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white border border-[#E0D8CB] rounded-2xl shadow-xl p-2 z-50 text-[#1F1D1A] animate-in fade-in slide-in-from-top-1 duration-150"
                  role="menu"
                >
                  <div className="px-3 py-2 text-[11px] font-bold text-[#78716C] uppercase tracking-wider border-b border-[#F2ECE1]">
                    Select Branch
                  </div>
                  {BRANCH_LIST.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setBranch(b.id);
                        setBranchDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between mt-1 cursor-pointer ${
                        selectedBranch === b.id
                          ? 'bg-[#FEF9C3] text-[#1F1D1A] font-semibold border border-[#FDE047]'
                          : 'text-[#44403C] hover:bg-[#F8F5EE]'
                      }`}
                      role="menuitem"
                    >
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-1.5">
                          {b.name}
                          {selectedBranch === b.id && <Check className="w-3.5 h-3.5 text-[#D97706]" />}
                        </div>
                        <div className="text-[11px] text-[#78716C] truncate max-w-[190px] mt-0.5">
                          {b.mapAddress}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Call Button */}
            <a
              href={currentBranch.telephoneUri}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 border border-white/20 text-[#FFC72C] flex items-center justify-center transition-colors"
              title={`Call ${currentBranch.name}`}
              aria-label={`Call ${currentBranch.name}`}
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            {/* Yellow Pill Order CTA Button matching design reference */}
            <button
              onClick={() => openOrderHandoff()}
              className="bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openOrderHandoff()}
              className="bg-[#FFC72C] text-[#1F1D1A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Order</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white hover:bg-white/10 rounded-lg focus:outline-none"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />

          <div className="bg-[#FBF9F5] border-t border-[#EAE5DC] rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DC]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFC72C]">
                  <Image src="/logo.jpg" alt="Burger House" fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <span className="font-bold text-lg text-[#1F1D1A] block leading-tight">Burger House</span>
                  <span className="text-[11px] text-[#78716C]">Nugegoda & Moratuwa</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#78716C] hover:text-[#1F1D1A] rounded-full bg-[#F3EFEA]"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Social Links inside Mobile Drawer */}
            <div className="py-3 border-b border-[#EAE5DC] flex items-center justify-center gap-4">
              <a
                href="https://www.tiktok.com/@burgerhouse.official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-[#E0D8CB] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1F1D1A]"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100054414552549"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-[#E0D8CB] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1F1D1A]"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/burger.house_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-[#E0D8CB] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1F1D1A]"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Branch Switcher inside Mobile */}
            <div className="py-4 border-b border-[#EAE5DC]">
              <div className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2">
                Active Branch
              </div>
              <div className="grid grid-cols-2 gap-2">
                {BRANCH_LIST.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBranch(b.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                      selectedBranch === b.id
                        ? 'bg-[#FEF9C3] text-[#1F1D1A] border-[#FDE047] shadow-xs'
                        : 'bg-white text-[#57534E] border-[#E5E0D5]'
                    }`}
                  >
                    <div className="capitalize font-bold">{b.id}</div>
                    <div className="text-[10px] font-normal text-[#78716C] truncate mt-0.5">{b.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Nav Links */}
            <nav className="py-4 flex flex-col gap-1 border-b border-[#EAE5DC]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-[#1F1D1A] hover:bg-[#F2EDE4] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-[#A8A29E] text-xs">→</span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openOrderHandoff();
                }}
                className="w-full bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-bold py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order on Uber Eats ({currentBranch.id})</span>
              </button>

              <a
                href={currentBranch.telephoneUri}
                className="w-full bg-white text-[#1F1D1A] font-semibold py-3 rounded-full border border-[#E5E0D5] flex items-center justify-center gap-2 text-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#D97706]" />
                <span>Call {currentBranch.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
