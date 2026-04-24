"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Check, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const REFERRAL_SOURCES = [
  { label: "Skool", value: "Skool" },
  { label: "Threads", value: "Threads" },
  { label: "Instagram", value: "Instagram" },
  { label: "Facebook", value: "Facebook" },
  { label: "TikTok", value: "TikTok" },
  { label: "Private Groups", value: "Private Groups" },
  { label: "Influencer / Friend", value: "Influencer" },
];

const SOURCE_PARAM_MAP: Record<string, string> = {
  skool: "Skool",
  threads: "Threads",
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  "private-groups": "Private Groups",
  influencer: "Influencer",
};

const BUSINESS_TYPES = [
  "I run my own business",
  "Freelancer / Solopreneur",
  "Coach or Consultant",
  "Creative / Content Creator",
  "I work in a company",
  "Building something on the side",
  "I manage a household",
  "Just exploring AI",
  "Other",
];

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [btype, setBtype] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [sourceFromParam, setSourceFromParam] = useState(false);

  useEffect(() => {
    const param = searchParams.get("source")?.toLowerCase();
    if (param && SOURCE_PARAM_MAP[param]) {
      setReferralSource(SOURCE_PARAM_MAP[param]);
      setSourceFromParam(true);
    }
  }, [searchParams]);

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
          businessType: btype || undefined,
          referralSource: referralSource || undefined,
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
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-clay-500 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-serif text-3xl text-charcoal-900 mb-2">You&apos;re in!</p>
        <p className="text-espresso-800 text-base font-light mb-1 leading-relaxed">
          So excited to meet you! 🥹
        </p>
        <p className="text-taupe-400 text-sm font-light mb-6 leading-relaxed">
          Check your email for confirmation ~ and if you don&apos;t see it, check your spam and mark us as safe so you don&apos;t miss the Zoom link.
        </p>

        <div className="bg-beige-100 border border-beige-200 rounded-2xl p-6 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay-500 mb-2">While you wait</p>
          <p className="text-charcoal-900 font-medium text-base mb-1">Join our free community for updates</p>
          <p className="text-taupe-400 text-sm font-light leading-relaxed mb-5">
            This is where we&apos;ll share updates, your workbook, and a few surprises before the session. Come say hi ~ we&apos;d love to meet you early.
          </p>
          <a
            href="https://www.skool.com/future-proof-with-ai-4339"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-charcoal-900 hover:bg-clay-600 text-beige-50 font-medium text-sm py-3.5 rounded-full transition-colors duration-200"
          >
            Join the Community ~ It&apos;s Free
          </a>
          <p className="text-center text-xs text-taupe-400 font-light mt-3">Your workbook lives here too.</p>
        </div>
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
          className="flex-1 min-w-40 bg-beige-100 border border-beige-300 text-charcoal-900 placeholder:text-taupe-400 text-sm px-5 py-3 rounded-full outline-none focus:border-clay-500 transition-colors disabled:opacity-60"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          disabled={loading}
          className="flex-1 min-w-40 bg-beige-100 border border-beige-300 text-charcoal-900 placeholder:text-taupe-400 text-sm px-5 py-3 rounded-full outline-none focus:border-clay-500 transition-colors disabled:opacity-60"
        />
      </div>

      <input
        type="email"
        placeholder="Your best email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="w-full bg-beige-100 border border-beige-300 text-charcoal-900 placeholder:text-taupe-400 text-sm px-5 py-3 rounded-full outline-none focus:border-clay-500 transition-colors disabled:opacity-60"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-between bg-beige-100 border border-beige-300 text-sm px-5 py-3 rounded-full outline-none hover:border-clay-500 focus:border-clay-500 transition-colors cursor-pointer data-[state=open]:border-clay-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className={btype ? "text-charcoal-900" : "text-taupe-400"}>
              {btype || "What best describes you?"}
            </span>
            <ChevronDown className="w-4 h-4 text-taupe-400 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)] bg-beige-50 border border-beige-200 rounded-2xl shadow-elegant p-1.5"
        >
          {BUSINESS_TYPES.map((type) => (
            <DropdownMenuItem
              key={type}
              onSelect={() => setBtype(type)}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-espresso-800 rounded-xl cursor-pointer hover:bg-beige-100 focus:bg-beige-100 focus:text-charcoal-900"
            >
              {type}
              {btype === type && <Check className="w-3.5 h-3.5 text-clay-500 shrink-0" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={loading || sourceFromParam}
            className="w-full flex items-center justify-between bg-beige-100 border border-beige-300 text-sm px-5 py-3 rounded-full outline-none hover:border-clay-500 focus:border-clay-500 transition-colors cursor-pointer data-[state=open]:border-clay-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className={referralSource ? "text-charcoal-900" : "text-taupe-400"}>
              {referralSource || "Where did you find us?"}
            </span>
            {sourceFromParam ? (
              <Check className="w-4 h-4 text-clay-500 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-taupe-400 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)] bg-beige-50 border border-beige-200 rounded-2xl shadow-elegant p-1.5"
        >
          {REFERRAL_SOURCES.map(({ label, value }) => (
            <DropdownMenuItem
              key={value}
              onSelect={() => setReferralSource(value)}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-espresso-800 rounded-xl cursor-pointer hover:bg-beige-100 focus:bg-beige-100 focus:text-charcoal-900"
            >
              {label}
              {referralSource === value && <Check className="w-3.5 h-3.5 text-clay-500 shrink-0" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <p className="text-xs text-red-500 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm py-4 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving your spot...
          </>
        ) : (
          "Save My Spot"
        )}
      </button>

      <p className="text-center text-xs text-taupe-400 font-light">Zoom link will be sent to you via email ~ check spam if it&apos;s not in your inbox.</p>
    </form>
  );
}
