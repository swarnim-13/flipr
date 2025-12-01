// frontend/src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hero - tuned to match the provided design.
 * Expects these files in public/assets:
 *   - /assets/3.svg        -> main hero background
 *   - /assets/5.svg        -> big translucent blue circle (decor)
 *   - /assets/16.svg       -> diagonal lines on right (optional)
 */

export default function Hero() {
  const nav = useNavigate();

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="hero-bg h-[560px] md:h-[680px] bg-cover bg-center relative"
        style={{ backgroundImage: `url('/assets/3.svg')` }}
      >
        {/* subtle left-to-right teal overlay to dim right side a touch */}
        <div className="absolute inset-0 pointer-events-none hero-overlay"></div>

        {/* Decorative left circle (big) */}
        <img
          src="/assets/5.svg"
          alt=""
          className="hidden md:block absolute decor-circle pointer-events-none"
        />

        {/* Decorative diagonal lines on right (optional if present) */}
        <img
          src="/assets/6.svg"
          alt=""
          className="hidden md:block absolute decor-lines pointer-events-none"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Content container */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="hero-headline">
              Meaningful investments in <br /> Main Street businesses
            </h1>

            <p className="mt-4 text-lg hero-sub">
              Browse vetted investment offerings in communities all over the US.
            </p>

            <div className="mt-8">
              <button
                onClick={() => nav("/browse")}
                className="hero-cta"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

