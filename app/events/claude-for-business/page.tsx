import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
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
    title: "Stop Using AI Like Google",
    tool: "Claude Chat",
    desc: "Most people use Claude like a search bar. We show you how to use it as a real thinking partner ~ for emails, client communication, content, decisions, and everything in between. You will leave seeing your whole operation differently.",
  },
  {
    num: "02",
    title: "Automate the Stuff That Eats Your Week",
    tool: "Claude Code",
    desc: "No coding background needed. We show you how Claude Code builds automations, generates reports, and creates custom tools for your specific business. No developer. No tech skills. Just results.",
  },
  {
    num: "03",
    title: "AI That Actually Lives in Your Workflow",
    tool: "Claude Cowork",
    desc: "This is where it gets real. Claude Cowork works with your files, tasks, and day-to-day operations directly ~ not as a tab you open occasionally, but as something that runs alongside how you already work.",
  },
  {
    num: "04",
    title: "Bring Your Actual Problems",
    tool: "Open Q&A",
    desc: "Bring the tasks that frustrate you most. We map them to Claude workflows live, on screen, no filters. You leave with a plan for your business ~ not a generic one.",
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
  "Solopreneurs",
  "Anyone curious about AI",
];

const walkAways = [
  "Finally understand what AI actually is ~ and what it can do for you",
  "Get hands-on with Claude in a small group setting, no experience needed",
  "Walk away with a clear starting point, not more overwhelm",
];

export default function ClaudeEventPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO — light
      ══════════════════════════════════════ */}
      <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-beige-50">
        <div className="section-container ">
          <div className="max-w-4xl mx-auto text-center">

            {/* Host signature */}
            <div className="flex flex-col items-center gap-4 mb-10">
              <Image
                src="/assets/website-samples/hero_image.png"
                alt="Abie Maxey and Meri"
                width={200}
                height={240}
                className="w-40 object-contain drop-shadow-md"
              />
              <p className="text-espresso-800/50 text-base font-light italic">
                by Abie Maxey and Meri Gee
              </p>
            </div>

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-beige-300 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#2D8CFF] animate-pulse shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-espresso-800">
                Free Live Zoom Event · May 1, 2026
              </span>
            </div>

            <p className="text-espresso-800/60 font-light text-lg mb-3 italic">Hey you,</p>
            <h1
              className="font-light tracking-tight text-charcoal-900 mb-6"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(3.25rem, 8vw, 6.5rem)",
                lineHeight: 1.0,
              }}
            >
              This is where
              <br />
              <em className="italic text-clay-500">you start.</em>
            </h1>

            <p className="text-base font-semibold uppercase tracking-[0.18em] text-taupe-400 mb-4">
              Claude AI for Business Owners
            </p>

            <p className="text-lg md:text-xl text-espresso-800 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              A growing community of business owners, learning AI together for the first time ~ no experience needed, no pressure, just real guidance.
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
              <a
                href="https://www.skool.com/future-proof-with-ai-4339"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-charcoal-900 border border-beige-300 rounded-full hover:border-charcoal-900 hover:bg-charcoal-900/5 transition-all duration-200"
              >
                Join our Community
              </a>
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
          <p className="text-beige-300 font-light text-sm max-w-md mx-auto mb-10">
            If you run a business ~ or you&apos;re building one ~ and AI still feels like something you&apos;re supposed to figure out, this is your session.
          </p>

          {/* Reframe callout */}
          <div className="max-w-2xl mx-auto bg-espresso-800/60 border border-clay-500/20 rounded-2xl px-8 py-7 text-left">
            <p className="text-beige-300/60 text-xs font-bold uppercase tracking-[0.2em] mb-3">Wait ~ not a business owner?</p>
            <p className="text-beige-50 text-lg font-light leading-relaxed mb-3"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}>
              Actually ~ you are.
            </p>
            <p className="text-beige-200/70 text-sm font-light leading-relaxed">
              If you manage a household, freelance on the side, handle your own schedule and income, or support your family financially ~ you&apos;re already running a business. You just haven&apos;t called it that yet. This session is for you too.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STARTING POINT — light
      ══════════════════════════════════════ */}
      <section className="py-16 bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-5">
              This is for you if
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-10 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              You&apos;ve been saying &ldquo;I need to learn AI&rdquo; for months.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
              {[
                {
                  label: "You keep seeing AI everywhere",
                  body: "LinkedIn, podcasts, your group chats ~ everyone's talking about it. You know you should be using it. You just don't know how.",
                },
                {
                  label: "You tried it once, got confused",
                  body: "You opened ChatGPT or Claude, typed something, got a weird response, and closed the tab. That was six months ago.",
                },
                {
                  label: "You're ready but need a guide",
                  body: "Not a YouTube rabbit hole. Not a 40-hour course. Just someone to walk you through it, in a small group, at your pace.",
                },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-beige-200 rounded-2xl p-6">
                  <p className="font-semibold text-charcoal-900 text-sm mb-2">{item.label}</p>
                  <p className="text-taupe-400 text-sm font-light leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="text-espresso-800 text-lg font-light mt-10 leading-relaxed">
              This is your starting point. No experience needed. Just show up.
            </p>
          </div>
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
              No slides full of theory. We show you each tool live, using real business tasks, so you leave knowing exactly what to do next.
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
                What would you do with{" "}
                <em className="italic text-clay-500">10 extra hours</em> every week?
              </h2>
            </div>
            <div>
              <p className="text-beige-200 font-light leading-relaxed text-lg">
                Most business owners are doing tasks that Claude can handle in minutes. Not someday ~ right now. This session shows you exactly where your time is going and how to get it back.
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
              This is not about future-proofing your business. It&apos;s about what Claude can do for your business ~ and your life ~ right now.
            </p>
            <p className="text-sm text-beige-300 font-light mt-2">Come with questions. Leave with a real plan.</p>
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
                <p className="font-semibold text-charcoal-900 text-base">222+ registered and counting</p>
                <p className="text-sm text-taupe-400 font-light">
                  The demand is real ~ grab your spot before it fills up.
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
                  { icon: <MapPin className="w-4 h-4" />, key: "Organizer", val: "Talent Mucho ~ Abie Maxey and Meri" },
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
              <div className="flex gap-5 items-start mb-8">
                <Image
                  src="/assets/website-samples/hero_image.png"
                  alt="Abie Maxey and Meri Gee"
                  width={80}
                  height={96}
                  className="w-20 object-contain shrink-0 drop-shadow-md"
                />
                <div>
                  <p
                    className="text-2xl font-light text-beige-50 mb-0.5"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    Abie Maxey &amp; Meri Gee
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-clay-500 mb-4">
                    Tech · Business · AI
                  </p>
                  <p className="text-beige-200 font-light leading-relaxed text-sm">
                    Between the two of us, we bring tech, business strategy, and hands-on AI experience ~ and we combined all of it into something we wish we had when we were starting out.
                  </p>
                </div>
              </div>

              <div className="bg-espresso-800/60 border border-clay-500/20 rounded-2xl p-6">
                <p className="text-beige-200/60 text-xs font-bold uppercase tracking-[0.18em] mb-3">Our mission</p>
                <p
                  className="text-beige-50 text-lg font-light leading-relaxed mb-3"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  Tech + Business + AI = Superpowers.
                </p>
                <p className="text-beige-200/70 text-sm font-light leading-relaxed">
                  We built this event for people who are just getting started and want to maximise AI in their lives ~ not just at work, but everywhere. No gatekeeping. No overwhelm. Just real tools, real talk, and two people who genuinely want to see you win.
                </p>
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
                Two hours. Real tools. A plan you can use tonight.
              </h2>
              <p className="text-espresso-800 font-light leading-relaxed mb-8">
                Join 222+ already registered ~ free, live, and built for anyone who is ready to finally get into AI.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { label: "Friday, May 1, 2026", sub: "6:00 to 8:00 PM EST" },
                  { label: "Zoom link sent before the event", sub: "We'll email it to you ~ check your inbox closer to the date" },
                  { label: "120+ already registered", sub: "Join the wave ~ free to attend" },
                  { label: "VIP ~ €47", sub: "Guaranteed seat, replay, Claude Vault + Premium Skool access" },
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
              <div className="bg-beige-100 border border-beige-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="text-base mt-0.5">📬</span>
                <p className="text-xs text-taupe-400 font-light leading-relaxed">
                  <span className="font-semibold text-espresso-800">Heads up:</span> Our confirmation email sometimes lands in spam. Once you register, check your spam folder and mark us as safe so you don&apos;t miss the Zoom link.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white border border-beige-200 rounded-2xl p-8 md:p-10 shadow-elegant">
              <p
                className="text-2xl font-light text-charcoal-900 mb-1"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Save your spot
              </p>
              <p className="text-sm text-taupe-400 font-light mb-7">
                Due to high demand, we added a VIP option to keep delivering value after the call.
              </p>
              <Suspense fallback={null}>
                <RegisterForm />
              </Suspense>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
