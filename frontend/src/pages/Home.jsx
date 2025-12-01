// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import OfferGrid from '../components/OfferGrid';
import FooterNewsletter from '../components/FooterNewsletter';
import API from '../api';

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
      {/* Hero (already implemented in ../components/Hero) */}
      <Hero />

      {/* Offerings grid */}
      <section className="py-14">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Offerings open for investment</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Explore pre-vetted investment opportunities available in a growing number of industry categories.
          </p>

          {/* OfferGrid expected to accept items prop */}
          <div className="mt-10">
            <OfferGrid items={offers} />
          </div>
        </div>
      </section>

      {/* Stats section: left text + right graph image + decorative assets */}
      <section className="relative bg-[#eef8fb] overflow-hidden py-20">
        {/* Left wave (15.svg) */}
        <img
          src="/assets/1.svg"
          alt=""
          className="absolute left-0 bottom-0 w-72 md:w-96 opacity-95 pointer-events-none"
        />

        {/* Top-right circle (14.svg) */}
        <img
          src="/assets/14.svg"
          alt=""
          className="absolute right-12 top-6 w-24 md:w-28 opacity-90 pointer-events-none"
        />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-20">
          {/* Left text */}
          <div className="max-w-xl">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0f8b73] text-white mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 19V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12L12 5L19 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-3">$7M+ paid out to investors</h3>

            <p className="text-gray-600 leading-relaxed">
              Next Invest has already paid out over $7M in cash returns to investors.
              Earn potential cash payments through unique revenue-share and debt financing investments.
            </p>
          </div>

          {/* Right: static graph image (16.svg) */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-white rounded shadow-sm p-4" style={{ width: 420 }}>
              <img
                src="/assets/16.svg"
                alt="Paid out to investors chart"
                className="w-full h-auto"
                onError={(e) => {
                  // fallback: small inline SVG or placeholder if asset missing
                  e.currentTarget.src = '/assets/16.svg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold">Looking to raise capital for your growing business?</h3>
            <p className="mt-3 text-gray-600">
              Whether expanding or opening a brand-new concept, we make it easy to raise money from thousands of local investors.
            </p>
            <button
              className="mt-6 px-6 py-3 bg-[#0f8b73] text-white rounded font-semibold"
              onClick={() => window.location.href = '/admin/add-offering'}
            >
              APPLY ONLINE
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            {/* Use public assets folder for illustration; if filename differs update accordingly */}
            <img
              src="/assets/illustration.png"
              alt="illustration"
              className="max-w-sm"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      <FooterNewsletter />
    </div>
  );
}
