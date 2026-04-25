"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import AddToCalendar from "@/components/AddToCalendar";

export default function VipRegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fname.trim() || !email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/events/claude-for-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fname.trim(),
          lastName: lname.trim(),
          email: email.trim(),
          isVip: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "duplicate") {
          setSubmitted(true);
          return;
        }
        setError("Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 rounded-full bg-clay-500 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-semibold text-charcoal-900 text-base mb-1">You&apos;re all set!</p>
        <p className="text-taupe-400 text-sm font-light mb-5">We&apos;ve got your details ~ we&apos;ll upgrade your Skool account within 24 hours.</p>
        <AddToCalendar variant="light" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="First name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
          disabled={loading}
          className="flex-1 min-w-36 bg-beige-100 border border-beige-300 text-charcoal-900 placeholder:text-taupe-400 text-sm px-5 py-3 rounded-full outline-none focus:border-clay-500 transition-colors disabled:opacity-60"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          disabled={loading}
          className="flex-1 min-w-36 bg-beige-100 border border-beige-300 text-charcoal-900 placeholder:text-taupe-400 text-sm px-5 py-3 rounded-full outline-none focus:border-clay-500 transition-colors disabled:opacity-60"
        />
      </div>

      <input
        type="email"
        placeholder="Email you used to pay"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="w-full bg-beige-100 border border-beige-300 text-charcoal-900 placeholder:text-taupe-400 text-sm px-5 py-3 rounded-full outline-none focus:border-clay-500 transition-colors disabled:opacity-60"
      />

      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm py-4 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Confirm My VIP Spot"
        )}
      </button>
    </form>
  );
}
