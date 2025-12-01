// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import OfferGrid from '../components/OfferGrid';
import FooterNewsletter from '../components/FooterNewsletter';
import API from '../api';

/**
 * Home page — full file (drop-in).
 *
 * Required public assets (put these in frontend/public/assets/):
 * - 15.svg   (left wave background for stats)
 * - 14.svg   (top-right circle decoration for stats)
 * - 16.svg   (graph image for stats)
 * - cuate.svg (CTA illustration)
 * - shape.svg (CTA decorative shape)
 *
 * Offerings are loaded from GET /api/offerings (API client is imported from ../api).
 */

function StatsSection() {
  return (
    <section className="relative bg-[#eef8fb] overflow-hidden py-20">
      {/* left wave */}
      <img src="/assets/1.svg" alt="" className="absolute left-0 bottom-0 w-[420px] opacity-95 pointer-events-none" />

      {/* top-right decoration */}
      <img src="/assets/14.svg" alt="" className="absolute right-10 top-6 w-[120px] opacity-90 pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-20">
        <div>
          <div className="w-10 h-10 rounded-full bg-[#0f8b73] flex items-center justify-center mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 19V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 12L12 5L19 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-2">$7M+ paid out to investors</h3>
          <p className="text-gray-600 leading-relaxed">
            Next Invest has already paid out over $7M in cash returns to investors. Earn potential cash payments
            through unique revenue-share and debt financing investments.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="bg-white rounded shadow-sm p-4" style={{ width: 420 }}>
            <img src="/assets/16.svg" alt="Paid out chart" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const nav = useNavigate();
  return (
    <section className="relative py-16 overflow-hidden">
      {/* decorative shapes */}
      <img src="/assets/Shape.svg" alt="" className="hidden md:block absolute right-16 top-6 w-48 opacity-80 pointer-events-none" />
      

      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* text */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
              Looking to raise capital for your growing business?
            </h3>

            <p className="text-gray-600 max-w-xl">
              Whether expanding or opening a brand-new concept, we make it easy to raise money from thousands of local investors.
            </p>

            <div className="mt-6">
              <button
                onClick={() => nav('/admin/register')}
                className="px-5 py-3 bg-[#0f8b73] hover:bg-[#0b7a66] text-white rounded font-semibold"
                type="button"
              >
                APPLY ONLINE
              </button>
            </div>
          </div>

          {/* illustration */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src="/assets/2.svg" alt="Illustration" className="max-w-sm md:max-w-md" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    API.get('/offerings')
      .then(res => setOffers(res.data || []))
      .catch(err => {
        console.error('Failed to load offerings', err);
        setOffers([]);
      });
  }, []);

  return (
    <div>
      <Hero />

      <section className="py-14">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Offerings open for investment</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Explore pre-vetted investment opportunities available in a growing number of industry categories.
          </p>

          <div className="mt-10">
            <OfferGrid items={offers} />
          </div>
        </div>
      </section>

      <StatsSection />

      <CTASection />

      <FooterNewsletter />
    </div>
  );
}

