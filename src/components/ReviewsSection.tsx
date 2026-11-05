import React from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { GOOGLE_REVIEWS } from '@/data/reviews';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative h-5 w-5">
            <Star className="absolute inset-0 h-5 w-5 text-[#E2DBD0] fill-[#E2DBD0]" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-5 w-5 text-[#FFC72C] fill-[#FFC72C]" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="doodle-bg py-16 bg-[#FBF9F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="heading-card mx-auto text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block mb-1">
            Google Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1A] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-[#57534E] text-sm mt-1 max-w-lg mx-auto">
            Read what diners say about each branch on Google, or leave a review of your own.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {GOOGLE_REVIEWS.map((b) => (
            <div
              key={b.branch}
              className="bg-white border border-[#EAE5DC] rounded-2xl p-6 shadow-2xs flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#8C8275]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{b.branch} branch</span>
              </div>

              <div className="mt-3 text-5xl font-extrabold text-[#1F1D1A] leading-none">
                {b.rating.toFixed(1)}
              </div>
              <div className="mt-2">
                <Stars rating={b.rating} />
              </div>
              <p className="mt-2 text-xs text-[#78716C]">
                {b.reviewCount ? `${b.reviewCount.toLocaleString('en-US')} Google reviews` : 'Rated on Google'}
              </p>

              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#FFC72C] hover:bg-[#F5B800] px-5 py-3 text-sm font-bold text-[#1F1D1A] transition-colors"
              >
                <span>View reviews</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
