"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4">
      <div className="max-w-3xl mx-auto bg-charcoal-900 border border-white/10 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-beige-200 font-light leading-relaxed flex-1">
          We use essential cookies to make our site work. By clicking Accept, you also allow us to use analytics cookies to improve your experience. See our{" "}
          <Link href="/cookies" className="text-clay-500 hover:underline">Cookies Policy</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="text-sm font-medium text-beige-300 hover:text-beige-50 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="text-sm font-medium text-beige-50 bg-clay-500 hover:bg-clay-600 px-5 py-2 rounded-full transition-all duration-200 cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
