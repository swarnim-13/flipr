

// frontend/src/components/FooterNewsletter.jsx
import React, { useState } from "react";

/**
 * FooterNewsletter.jsx
 * Drop-in footer that matches the screenshot:
 * - Logo left
 * - Two nav columns in the center
 * - Newsletter input + pink submit button (left area like screenshot)
 * - Social icons on the right
 *
 * Images expected in: /public/assets/
 *   - logo.svg
 *   - 001-facebook.svg
 *   - 003-twitter.svg
 *   - 004-instagram.svg
 *
 * The component will POST to /api/newsletter if available, otherwise falls back to saving locally.
 */

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // '', 'loading','success','error'

  async function submitNewsletter(e) {
    e?.preventDefault();
    setStatus("");

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setEmail("");
        setStatus("success");
        return;
      }
      // if server responds but with error, fallback below
    } catch (err) {
      // network error or server not running -> fallback
      console.warn("Newsletter POST failed, using fallback", err);
    }

    // Fallback: save to localStorage
    try {
      const list = JSON.parse(localStorage.getItem("newsletter_fallback") || "[]");
      list.push({ email, createdAt: new Date().toISOString() });
      localStorage.setItem("newsletter_fallback", JSON.stringify(list));
      setEmail("");
      setStatus("success");
    } catch (err) {
      console.error("Fallback save failed", err);
      setStatus("error");
    }
  }

  // Minimal image component to keep markup neat
  const Img = ({ src, alt, className }) => <img src={src} alt={alt} className={className} />;

  return (
    <footer className="bg-[#f3f3f3] text-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8">

          {/* Left: Logo & copyright */}
          <div className="w-full md:w-1/4">
            <div className="flex items-center gap-4">
              <Img src="/assets/4.svg" alt="Next Invest" className="w-36 h-auto object-contain" />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Copyright © {new Date().getFullYear()}. Next Invest. All rights reserved.
            </p>
          </div>

          {/* Center: navigation columns */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold mb-3">Services</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Email Marketing</li>
                  <li>Campaigns</li>
                  <li>Branding</li>
                  <li>Offline</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">About</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Our Story</li>
                  <li>Benefits</li>
                  <li>Team</li>
                  <li>Careers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: newsletter + social */}
          <div className="w-full md:w-1/4">
            <h4 className="text-sm font-semibold mb-3">Subscribe to our newsletter</h4>

            <form onSubmit={submitNewsletter} className="flex items-center">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-3 border border-gray-200 rounded-l text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-3 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-r text-sm"
                aria-label="Subscribe"
              >
                {/* arrow icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <div className="mt-3 h-6">
              {status === "success" && <div className="text-sm text-green-700">Subscribed — thank you!</div>}
              {status === "error" && <div className="text-sm text-red-600">Please enter a valid email.</div>}
            </div>

            <div className="mt-6 flex items-center gap-4 justify-end">
              <a href="https://www.facebook.com/" aria-label="facebook"><Img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151299463.jpg?semt=ais_hybrid&w=740&q=80" alt="fb" className="w-5 h-5" /></a>
              <a href="#" aria-label="https://x.com/"><Img src="/assets/003-twitter.svg" alt="tw" className="w-5 h-5" /></a>
              <a href="#" aria-label="https://www.instagram.com/"><Img src="/assets/004-instagram.svg" alt="ig" className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-gray-200 py-3">
        <div className="container mx-auto px-6 text-center text-xs text-gray-600">
          Built with ❤️ — Next Invest demo
        </div>
      </div>
    </footer>
  );
}
