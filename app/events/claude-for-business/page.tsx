import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar, Clock, Video, Star, Mail, FileText, Share2,
  RefreshCw, BarChart2, Search, ArrowRight, MapPin, Users,
} from "lucide-react";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Claude AI for Business Owners | Talent Mucho",
  description:
    "A hands-on Zoom session covering Claude Chat, Code, and Cowork. Three tools that can transform how you run your business. Free live event on May 1, 2026.",
};

const agendaItems = [
  {
    num: "01",
    title: "See Your Business Through an AI Lens",
    tool: "Claude Chat",
    desc: "Most business owners use AI like a search engine. We will show you how to use Claude Chat as a real thinking partner for emails, decisions, client communication, and content. You will leave seeing your entire operation differently.",
  },
  {
    num: "02",
    title: "Find Exactly Where Your Time Is Trapped",
    tool: "Claude Code",
    desc: "No coding background needed. We will show you how Claude Code builds automations, generates reports, and creates custom tools for your specific business. No developer required. Not a single line of code.",
  },
  {
    num: "03",
    title: "Put AI to Work Inside Your Business",
    tool: "Claude Cowork",
    desc: "This is where it clicks. Claude Cowork handles files, tasks, and workflows directly on your desktop. You will see what it looks like when AI actually lives inside your day-to-day operations. Not just as a tab you open occasionally.",
  },
  {
    num: "04",
    title: "Real Pain Points, Live Solutions",
    tool: "Open Q&A",
    desc: "Everything comes together in real time. Bring your most frustrating business tasks and we will show you exactly how Claude handles them. Live, on screen, no filters.",
  },
];

const painPoints = [
  {
    icon: <Mail className="w-4 h-4" />,
    title: "Writing and follow-up emails",
    desc: "Clients love hearing from you. You hate writing to them. Claude handles the whole thread.",
  },
  {
    icon: <FileText className="w-4 h-4" />,
    title: "Proposals and contracts",
    desc: "High value, high effort. Claude drafts them in minutes so you can close faster.",
  },
  {
    icon: <Share2 className="w-4 h-4" />,
    title: "Social media content",
    desc: "You need to stay visible. Claude keeps your feed alive without stealing your weekends.",
  },
  {
    icon: <RefreshCw className="w-4 h-4" />,
    title: "Repetitive customer questions",
    desc: "Same 10 questions, 50 times a month. Claude answers them your way, every time.",
  },
  {
    icon: <BarChart2 className="w-4 h-4" />,
    title: "Reports and summaries",
    desc: "The data exists. Turning it into something readable is the painful part. Not anymore.",
  },
  {
    icon: <Search className="w-4 h-4" />,
    title: "Research and competitive analysis",
    desc: "Hours of reading condensed into a clear brief. Claude does the digging so you can decide.",
  },
];

const audiencePills = [
  "Founders & CEOs",
  "Coaches & Consultants",
  "Agencies",
  "E-commerce Brands",
  "Service Businesses",
  "Startups",
];

const walkAways = [
  "Know exactly which Claude tool solves your biggest time drain",
  "See live demos built around real business problems, not hypotheticals",
  "Leave with a same-night action plan you can actually implement",
];

export default function ClaudeEventPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO — light
      ══════════════════════════════════════ */}
      <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-beige-50">
        <div className="section-container mt-20">
          <div className="max-w-4xl mx-auto text-center">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-beige-300 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#2D8CFF] animate-pulse shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-espresso-800">
                Free Live Zoom Event · May 1, 2026
              </span>
            </div>

            <h1
              className="font-light tracking-tight text-charcoal-900 mb-6"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(3.25rem, 8vw, 6.5rem)",
                lineHeight: 1.0,
              }}
            >
              Claude AI for
              <br />
              <em className="italic text-clay-500">Business Owners</em>
            </h1>

            <p className="text-lg md:text-xl text-espresso-800 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Two hours. Three tools. One live session that shows exactly how Claude can take the tasks
              you hate off your plate. Permanently.
            </p>

            {/* Walk-away bullets */}
            <ul className="flex flex-col items-center gap-3 mb-12">
              {walkAways.map((item) => (
                <li key={item} className="flex items-start gap-3 max-w-md text-left">
                  <span className="w-5 h-5 rounded-full bg-clay-500 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-espresso-800 font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* Meta row */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { icon: <Calendar className="w-3.5 h-3.5" />, label: "Friday, May 1, 2026" },
                { icon: <Clock className="w-3.5 h-3.5" />, label: "6:00 to 8:00 PM EST" },
                { icon: <Video className="w-3.5 h-3.5" />, label: "Live on Zoom" },
                { icon: <Star className="w-3.5 h-3.5" />, label: "Free to attend" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 bg-white border border-beige-200 rounded-full px-4 py-2 text-sm text-espresso-800 font-light"
                >
                  <span className="text-taupe-400">{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#register"
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Reserve My Free Spot
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#learn"
                className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-clay-500 border border-beige-300 rounded-full hover:border-clay-500 hover:bg-clay-500/5 transition-all duration-200"
              >
                See the agenda
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AUDIENCE — dark
      ══════════════════════════════════════ */}
      <section className="py-16 bg-charcoal-900">
        <div className="section-container text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-6">
            Who this is built for
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {audiencePills.map((pill) => (
              <span
                key={pill}
                className="border border-beige-100/15 rounded-full px-5 py-2.5 text-sm text-beige-200 font-light hover:border-clay-500 hover:text-beige-50 transition-colors duration-200 cursor-default"
              >
                {pill}
              </span>
            ))}
          </div>
          <p className="text-beige-300 font-light text-sm max-w-md mx-auto">
            If you run a business and feel like you&apos;re still doing too much manually, this session is for you.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AGENDA — light
      ══════════════════════════════════════ */}
      <section id="learn" className="section-padding bg-beige-50 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">Agenda</p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              What we will cover
            </h2>
            <p className="text-espresso-800 font-light leading-relaxed">
              Four sessions. Three tools. One clear picture of what AI can actually do for your business,
              shown live, in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {agendaItems.map((item) => (
              <div
                key={item.num}
                className="bg-beige-100 border border-beige-200 rounded-2xl p-7 flex flex-col gap-4 hover:border-beige-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="text-5xl font-light leading-none text-beige-300"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    {item.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-clay-500 bg-clay-500/10 px-3 py-1.5 rounded-full shrink-0">
                    {item.tool}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900 text-base mb-2">{item.title}</p>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PAIN POINTS — dark
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
                The Real Question
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 leading-snug"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                What are the tasks that bring you money, but you{" "}
                <em className="italic text-clay-500">absolutely hate</em> doing?
              </h2>
            </div>
            <div>
              <p className="text-beige-200 font-light leading-relaxed text-lg">
                You know exactly what they are. The stuff that keeps revenue flowing but drains the life
                out of you every single time. Claude can take most of it off your plate. Permanently.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="bg-espresso-800 border border-white/5 rounded-xl p-5 flex gap-4 items-start hover:bg-espresso-700/60 hover:border-clay-500/30 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-clay-500/20 flex items-center justify-center shrink-0 mt-0.5 text-clay-500">
                  {p.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-beige-50 mb-1">{p.title}</p>
                  <p className="text-xs text-beige-300 font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-7 border-l-4 border-clay-500 bg-espresso-800/60 rounded-r-2xl">
            <p
              className="text-xl text-beige-50 font-light leading-relaxed"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              At this event, we will map your specific &ldquo;hate list&rdquo; to Claude workflows you
              can set up the same night.
            </p>
            <p className="text-sm text-beige-300 font-light mt-2">Bring your list. Leave with a plan.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          URGENCY STRIP — light
      ══════════════════════════════════════ */}
      <div className="bg-beige-100 border-y border-beige-200 py-12">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-clay-500 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-beige-50" />
              </div>
              <div>
                <p className="font-semibold text-charcoal-900 text-base">Seats are limited</p>
                <p className="text-sm text-taupe-400 font-light">
                  This is a small-group live session, not a recorded course.
                </p>
              </div>
            </div>
            <Link
              href="#register"
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg shrink-0"
            >
              Claim Your Spot Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          EVENT DETAILS + HOST — dark
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Details */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Event Details
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 mb-10"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                All the details
              </h2>
              <div className="flex flex-col gap-6">
                {[
                  { icon: <Calendar className="w-4 h-4" />, key: "Date", val: "Friday, May 1, 2026" },
                  { icon: <Clock className="w-4 h-4" />, key: "Time", val: "6:00 PM to 8:00 PM EST", sub: "Session starts promptly. Join a few minutes early." },
                  { icon: <Video className="w-4 h-4" />, key: "Format", val: "Live online via Zoom", sub: "Link sent to your email after registration" },
                  { icon: <MapPin className="w-4 h-4" />, key: "Organizer", val: "Talent Mucho" },
                ].map(({ icon, key, val, sub }) => (
                  <div key={key} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-clay-500/20 flex items-center justify-center shrink-0 mt-0.5 text-clay-500">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-beige-300/60 mb-0.5">{key}</p>
                      <p className="font-medium text-beige-50 text-sm">{val}</p>
                      {sub && <p className="text-xs text-beige-300 font-light mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Host */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Your Host
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 mb-10"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Meet the host
              </h2>
              <div className="flex gap-5 items-start">
                <div className="w-16 h-16 rounded-full bg-clay-500 flex items-center justify-center shrink-0">
                  <span
                    className="text-lg font-bold text-beige-50 tracking-wide"
                    style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                  >
                    TM
                  </span>
                </div>
                <div>
                  <p
                    className="text-2xl font-light text-beige-50 mb-0.5"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    Talent Mucho
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-clay-500 mb-4">
                    AI Educator & Business Strategist
                  </p>
                  <p className="text-beige-200 font-light leading-relaxed text-sm">
                    Talent Mucho has helped hundreds of business owners cut through the AI noise and find
                    tools that genuinely move the needle. Known for translating complex technology into
                    plain-language action plans, this event distills everything into two focused hours you
                    will actually use.
                  </p>
                </div>
              </div>

              {/* Zoom card */}
              <div className="mt-8 bg-espresso-800 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2D8CFF] rounded-xl flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-beige-50 text-sm">Zoom Webinar</p>
                    <p className="text-xs text-beige-300 font-light">Live, interactive, and recorded for attendees</p>
                  </div>
                </div>
                <p className="text-xs text-beige-300 font-light leading-relaxed">
                  Join from anywhere. Ask live questions, watch real-time demos, and get your specific
                  business problems addressed during open Q&amp;A.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REGISTER — light
      ══════════════════════════════════════ */}
      <section id="register" className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: value summary */}
            <div className="lg:pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
                Reserve Your Spot
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 mb-6 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Two hours that can change how you run your business
              </h2>
              <p className="text-espresso-800 font-light leading-relaxed mb-8">
                Free. Live. Practical. No theory. Just real tools, live demos, and a clear plan you can
                use the same night.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { label: "Friday, May 1, 2026", sub: "6:00 to 8:00 PM EST" },
                  { label: "Live on Zoom", sub: "Replay available for all registered attendees" },
                  { label: "100% Free", sub: "No upsell, no catch" },
                ].map(({ label, sub }) => (
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
              <p className="text-xs text-taupe-400 font-light border-t border-beige-200 pt-5">
                Seats are limited. Zoom link sent immediately after you register.
              </p>
            </div>

            {/* Right: form */}
            <div className="bg-white border border-beige-200 rounded-2xl p-8 md:p-10 shadow-elegant">
              <p
                className="text-2xl font-light text-charcoal-900 mb-1"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Register for free
              </p>
              <p className="text-sm text-taupe-400 font-light mb-7">
                Your Zoom link arrives right away.
              </p>
              <RegisterForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
