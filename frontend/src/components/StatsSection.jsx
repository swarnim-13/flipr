// frontend/src/components/StatsSection.jsx
import React from "react";

export default function StatsSection() {
  return (
    <section className="relative bg-[#eef8fb] overflow-hidden py-20">
      
      {/* LEFT WAVE BACKGROUND — your 15.svg */}
      <img
        src="/assets/15.svg"
        alt=""
        className="absolute left-0 bottom-0 w-[420px] opacity-95 pointer-events-none"
      />

      {/* TOP-RIGHT DECORATION — your 14.svg */}
      <img
        src="/assets/14.svg"
        alt=""
        className="absolute right-10 top-10 w-[120px] opacity-90 pointer-events-none"
      />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-20">
        
        {/* LEFT TEXT BLOCK */}
        <div>
          {/* small icon circle */}
          <div className="w-10 h-10 rounded-full bg-[#0f8b73] flex items-center justify-center mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 12L12 5L19 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h3 className="text-3xl font-bold mb-2">$7M+ paid out to investors</h3>

          <p className="text-gray-600 leading-relaxed">
            Next Invest has already paid out over $7M in cash returns
            to investors. Earn potential cash payments through unique
            revenue-share and debt financing investments.
          </p>
        </div>

        {/* RIGHT SIDE STATIC GRAPH IMAGE — your 16.svg */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/assets/16.svg"
            alt="Graph"
            className="w-[420px] rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
