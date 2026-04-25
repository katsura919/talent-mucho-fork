"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Check, Loader2, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STRIPE_VIP_URL = "https://buy.stripe.com/00w3cpd0W40HbGxgcl73G04";

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

const AI_LEVELS = [
  "Complete beginner ~ never used AI",
  "I've tried it a couple of times",
  "I use it occasionally",
  "I use it regularly",
  "Pretty advanced",
];

const VIP_PERKS = [
  { label: "Guaranteed seat", sub: "No waitlist risk" },
  { label: "Full replay + transcript", sub: "Rewatch anytime" },
  { label: "Claude Vault", sub: "Private dashboard setups + Claude skills" },
  { label: "VIP-only group follow-up", sub: "45 min private session with Abie & Meri (max 12 per call)" },
  { label: "30-day Premium Skool access", sub: "€49 value ~ included free" },
];

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState<"free" | "vip">("free");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [btype, setBtype] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [sourceFromParam, setSourceFromParam] = useState(false);
  const [aiLevel, setAiLevel] = useState("");

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
          aiLevel: aiLevel || undefined,
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
    <div className="flex flex-col gap-5">

      {/* Ticket selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setTicket("free")}
          className={`rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
            ticket === "free"
              ? "border-clay-500 bg-clay-500/5"
              : "border-beige-200 hover:border-beige-300"
          }`}
        >
          <p className="font-semibold text-charcoal-900 text-sm mb-0.5">Free</p>
          <p className="text-xs text-taupe-400 font-light">120+ registered · waitlist risk</p>
        </button>
        <button
          type="button"
          onClick={() => setTicket("vip")}
          className={`rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer relative ${
            ticket === "vip"
              ? "border-clay-500 bg-clay-500/5"
              : "border-beige-200 hover:border-clay-500/50"
          }`}
        >
          <div className="absolute -top-2.5 right-3 bg-clay-500 text-beige-50 text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full">
            Best value
          </div>
          <p className="font-semibold text-charcoal-900 text-sm mb-0.5">VIP ~ €47</p>
          <p className="text-xs text-taupe-400 font-light">Guaranteed seat · limited slots</p>
        </button>
      </div>

      <p className="text-xs text-taupe-400 font-light text-center -mt-2">
        Can&apos;t make May 1?{" "}
        <a
          href="https://www.skool.com/future-proof-with-ai-4339"
          target="_blank"
          rel="noopener noreferrer"
          className="text-clay-500 hover:underline"
        >
          Join our free community
        </a>
        {" "}~ or grab VIP for the replay.
      </p>

      {ticket === "vip" ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {VIP_PERKS.map(({ label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-clay-500 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-charcoal-900">{label}</p>
                  <p className="text-xs text-taupe-400 font-light">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={STRIPE_VIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm py-4 rounded-full transition-colors duration-200"
          >
            Get VIP Access ~ €47
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-center text-xs text-clay-500 font-light italic">VIP attendees get exclusive early access to our 3-day bootcamp ~ before it opens to the public.</p>
        </div>
      ) : (
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
                disabled={loading}
                className="w-full flex items-center justify-between bg-beige-100 border border-beige-300 text-sm px-5 py-3 rounded-full outline-none hover:border-clay-500 focus:border-clay-500 transition-colors cursor-pointer data-[state=open]:border-clay-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className={aiLevel ? "text-charcoal-900" : "text-taupe-400"}>
                  {aiLevel || "Your current level with AI?"}
                </span>
                <ChevronDown className="w-4 h-4 text-taupe-400 shrink-0 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[var(--radix-dropdown-menu-trigger-width)] bg-beige-50 border border-beige-200 rounded-2xl shadow-elegant p-1.5"
            >
              {AI_LEVELS.map((level) => (
                <DropdownMenuItem
                  key={level}
                  onSelect={() => setAiLevel(level)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-espresso-800 rounded-xl cursor-pointer hover:bg-beige-100 focus:bg-beige-100 focus:text-charcoal-900"
                >
                  {level}
                  {aiLevel === level && <Check className="w-3.5 h-3.5 text-clay-500 shrink-0" />}
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
      )}

    </div>
  );
}
