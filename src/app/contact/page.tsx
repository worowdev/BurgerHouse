'use client';

import React, { useState } from 'react';
import {
  Mail, PhoneCall, MapPin, Send, CheckCircle, AlertCircle, Clock
} from 'lucide-react';
import { BRANCH_LIST } from '@/data/branches';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    emailOrPhone: '',
    branch: 'general',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      
      {/* Header */}
      <div className="bg-[#F5F1E9] border-b border-[#EAE5DC] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E0D8CB] px-3 py-1 rounded-full mb-3 shadow-2xs">
            <Mail className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-xs font-semibold text-[#1F1D1A]">Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1D1A] tracking-tight">
            Contact Burger House
          </h1>
          <p className="text-[#57534E] text-sm sm:text-base mt-2 max-w-xl">
            Questions about our menu, large catering orders, or branch visits? We are here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Branch Contact Details */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#1F1D1A] uppercase tracking-wide">
              Direct Branch Contact
            </h2>
            <p className="text-xs text-[#57534E] leading-relaxed">
              For urgent inquiries, today&apos;s opening status, or phone takeaway orders, calling the branch directly is always fastest.
            </p>

            {BRANCH_LIST.map((branch) => (
              <div key={branch.id} className="bg-white border border-[#E0D8CB] rounded-2xl p-5 space-y-3 shadow-2xs">
                <div>
                  <h3 className="font-bold text-base text-[#1F1D1A]">{branch.name}</h3>
                  <p className="text-xs text-[#78716C]">{branch.tagline}</p>
                </div>
                
                <div className="space-y-2 text-xs text-[#44403C]">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#D97706]" />
                    <a href={branch.telephoneUri} className="font-bold text-[#1F1D1A] hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D97706]" />
                    <span>{branch.mapAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{branch.hoursDisplay}</span>
                  </div>
                </div>

                <a
                  href={branch.telephoneUri}
                  className="block w-full bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] text-center text-xs font-bold py-2.5 rounded-xl shadow-2xs transition-colors mt-2"
                >
                  Call {branch.name}
                </a>
              </div>
            ))}

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Dietary & Allergy Notice:</strong> For questions regarding ingredients, gluten, or kitchen prep, please call our branch staff directly before ordering.
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-emerald-300 rounded-3xl p-10 text-center shadow-xs">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#1F1D1A] mb-2">
                  Message Sent
                </h2>
                <p className="text-sm text-[#57534E] max-w-sm mx-auto">
                  Thank you for contacting Burger House. We will get back to you promptly. For urgent assistance, please call the branch directly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', emailOrPhone: '', branch: 'general', category: 'general', message: '' });
                  }}
                  className="mt-6 bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#E0D8CB] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F1D1A]">Send Us a Message</h2>
                  <p className="text-xs text-[#57534E] mt-1">We typically reply within 24 hours.</p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#1F1D1A] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#FBF9F5] border border-[#D5CDC0] rounded-xl px-4 py-2.5 text-sm text-[#1F1D1A] placeholder-[#78716C] focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] focus:outline-none transition-all"
                    placeholder="e.g. Ruwan Perera"
                  />
                </div>

                {/* Phone or Email */}
                <div>
                  <label htmlFor="contact" className="block text-xs font-semibold text-[#1F1D1A] mb-1.5">
                    Phone Number or Email *
                  </label>
                  <input
                    id="contact"
                    type="text"
                    required
                    value={formState.emailOrPhone}
                    onChange={(e) => setFormState({ ...formState, emailOrPhone: e.target.value })}
                    className="w-full bg-[#FBF9F5] border border-[#D5CDC0] rounded-xl px-4 py-2.5 text-sm text-[#1F1D1A] placeholder-[#78716C] focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] focus:outline-none transition-all"
                    placeholder="077 123 4567 or email@domain.com"
                  />
                </div>

                {/* Branch & Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="branch" className="block text-xs font-semibold text-[#1F1D1A] mb-1.5">
                      Branch
                    </label>
                    <select
                      id="branch"
                      value={formState.branch}
                      onChange={(e) => setFormState({ ...formState, branch: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#D5CDC0] rounded-xl px-3 py-2.5 text-sm text-[#1F1D1A] focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] focus:outline-none"
                    >
                      <option value="general">Both / General</option>
                      <option value="nugegoda">Nugegoda</option>
                      <option value="moratuwa">Moratuwa</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-xs font-semibold text-[#1F1D1A] mb-1.5">
                      Subject
                    </label>
                    <select
                      id="category"
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full bg-[#FBF9F5] border border-[#D5CDC0] rounded-xl px-3 py-2.5 text-sm text-[#1F1D1A] focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] focus:outline-none"
                    >
                      <option value="general">General Question</option>
                      <option value="catering">Catering or Bulk Orders</option>
                      <option value="feedback">Feedback or Compliment</option>
                      <option value="dietary">Dietary or Allergen Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#1F1D1A] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#FBF9F5] border border-[#D5CDC0] rounded-xl px-4 py-2.5 text-sm text-[#1F1D1A] placeholder-[#78716C] focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] focus:outline-none resize-none transition-all"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button (Yellow) */}
                <button
                  type="submit"
                  className="w-full bg-[#FFC72C] hover:bg-[#F5B800] text-[#1F1D1A] font-bold py-3.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
