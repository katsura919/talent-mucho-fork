"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Gift, Plus, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import CTASection from "@/components/CTASection";

export default function OffersPage() {
  return (
    <main className="bg-beige-100 min-h-screen">
      <OffersHero />
      <OffersPackages />
      <OffersProcess />
      <OffersFAQ />
    </main>
  );
}


function OffersHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-beige-100 overflow-hidden pt-32 pb-20">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-clay-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10 text-center w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 border border-clay-500/30 px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-clay-500 animate-pulse" />
            <span className="text-clay-500 text-xs font-semibold uppercase tracking-[0.18em]">
              Exclusive for WeMeetWednesday Ladies
            </span>
          </div>

          <h1
            className="text-charcoal-900 mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Scale Smarter.<br />
            <em className="text-clay-500 italic">Spend Less.</em>
          </h1>

          <p className="text-espresso-800 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Two powerful ways to delegate, automate, and grow built for founders ready to move fast without breaking the budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#offers"
              className="inline-flex items-center justify-center min-w-[200px] gap-2 px-8 py-4 bg-clay-500 text-beige-50 font-medium rounded-full hover:bg-clay-400 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-clay-500/20"
            >
              See the Offers <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/booking"
              className="inline-flex items-center justify-center min-w-[200px] gap-2 px-8 py-4 bg-transparent border border-clay-500/50 text-clay-600 font-medium rounded-full hover:border-clay-500 hover:bg-clay-500/10 transition-all duration-300"
            >
              Talk to Us First
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OffersPackages() {
  return (
    <section id="offers" className="section-padding bg-beige-100">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Exclusive Packages
          </p>
          <h2
            className="text-charcoal-900 mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Two Offers. <em className="text-clay-500 italic">Unlimited Upside.</em>
          </h2>
          <p className="text-espresso-800 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the offer that fits where you are or stack both for the ultimate growth engine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Offer 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-charcoal-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-charcoal-800/50 shadow-2xl"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-clay-600 via-clay-400 to-clay-600" />
            <div className="absolute -bottom-8 -right-8 text-[12rem] font-bold text-beige-50/5 pointer-events-none" style={{ fontFamily: "var(--font-cormorant)" }}>01</div>

            <div className="relative z-10 text-beige-50">
              <span className="inline-block bg-clay-500 text-beige-50 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
                ⚡  Exclusive for WeMeetWednesday Ladies
              </span>

              <h3 className="text-3xl md:text-4xl mb-2 text-white" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                Website +<br />3 Months Free GHL
              </h3>
              <p className="text-beige-200/50 text-sm tracking-wide mb-8">
                One-Time Investment · Delivered in Days
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-reg" style={{ fontFamily: "var(--font-cormorant)" }}>$789</span>
                <span className="text-beige-200/50 text-sm">one-time</span>
              </div>
              <p className="text-sm text-beige-200/70 mb-10 pb-10 border-b border-beige-200/10">
                Includes <strong className="text-clay-400">$297 value FREE</strong> 3 months GoHighLevel access ($99/mo)
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Custom-designed, conversion-focused website built by our team",
                  "Mobile-first, fast-loading, and optimized for your brand",
                  "Copywriting included we write headlines, body, and CTA that convert",
                  "3 months GoHighLevel (GHL) access fully set up and ready to use",
                  "CRM, automation & funnel tools built into your GHL account",
                  "1 revision round included delivered within 5–7 business days",

                ].map((feature, i) => (
                  <li key={i} className="flex flex-start gap-4 text-beige-200/80 text-sm leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-clay-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/booking"
                className="flex items-center justify-center w-full py-4 bg-clay-500 text-beige-50 font-medium rounded-full hover:bg-clay-400 transition-colors"
              >
                Claim This Offer <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>

          {/* Offer 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-beige-200 shadow-xl"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-taupe-300 via-beige-300 to-taupe-300" />
            <div className="absolute -bottom-8 -right-8 text-[12rem] font-bold text-charcoal-900/5 pointer-events-none" style={{ fontFamily: "var(--font-cormorant)" }}>02</div>

            <div className="relative z-10 text-charcoal-900">
              <span className="inline-block border border-clay-500 text-clay-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
                ★ Most Flexible
              </span>

              <h3 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                Dedicated Virtual Assistant Support<br />5 Hours/Week
              </h3>
              <p className="text-taupe-400 text-sm tracking-wide mb-8">
                Ongoing Retainer · Cancel Anytime
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-reg text-clay-600" style={{ fontFamily: "var(--font-cormorant)" }}>$300</span>
                <span className="text-taupe-400 text-sm">/month</span>
              </div>
              <p className="text-sm text-espresso-800 mb-10 pb-10 border-b border-beige-200">
                That's just <strong className="text-clay-600">$15/hour</strong> for a skilled, vetted Virtual Assistant
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "5 dedicated hours per week with your assigned Virtual Assistant",
                  "Calendar & inbox management zero scheduling chaos",
                  "Research, reporting, admin, and back-office task execution",
                  "CRM data entry, client follow-ups, and pipeline support",
                  "Vetted, trained professional matched to your industry",
                  "No long-term contracts scale up or pause at any time"
                ].map((feature, i) => (
                  <li key={i} className="flex flex-start gap-4 text-espresso-800 text-sm leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-clay-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/booking"
                className="flex items-center justify-center w-full py-4 bg-transparent border border-clay-500 text-clay-600 font-medium rounded-full hover:bg-clay-50 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bonus Banner */}
      <div className="section-container mt-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-clay-500/10 to-clay-300/10 border border-clay-500/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden shadow-xl"
        >
          <div className="w-20 h-20 shrink-0 bg-clay-500 text-beige-50 rounded-2xl flex items-center justify-center shadow-lg relative z-10 hidden sm:flex">
            <Gift className="w-10 h-10" />
          </div>
          <div className="text-center md:text-left flex-grow relative z-10">
            <span className="inline-block border border-clay-500 text-clay-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              ✨ The Ultimate Growth Bundle
            </span>
            <h4 className="text-3xl md:text-4xl text-charcoal-900 mb-2" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>
              Stack Both Offers & Save
            </h4>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mb-4">
              <span className="text-5xl font-reg text-clay-600" style={{ fontFamily: "var(--font-cormorant)" }}>$999</span>
              <span className="text-taupe-400 text-sm line-through decoration-clay-500/50">$1,089</span>
              <span className="text-espresso-800 text-sm font-medium">first month</span>
            </div>
            <p className="text-espresso-800 text-sm md:text-base leading-relaxed max-w-2xl mb-6 md:mb-0">
              Get your website + 3 Months free GHL setup <strong className="text-clay-600 font-semibold">AND</strong> a dedicated Virtual Assistant for just <strong className="text-clay-600 font-semibold">$999</strong>. Everything you need to launch, automate, and delegate in one move.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto relative z-10">
            <a
              href="/booking"
              className="flex items-center justify-center py-4 px-10 bg-clay-500 text-beige-50 font-medium rounded-full hover:bg-clay-400 transition-colors w-full whitespace-nowrap shadow-lg shadow-clay-500/30"
            >
              Claim Bundle <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OffersProcess() {
  const steps = [
    {
      number: "01",
      title: "Book a Free Call",
      description: "Tell us your goals and we'll match you with the right offer, no pressure.",
    },
    {
      number: "02",
      title: "We Build & Set Up",
      description: "Our team designs your page, configures GHL, or onboards your EA fast.",
    },
    {
      number: "03",
      title: "Review & Launch",
      description: "You approve, we make tweaks, and everything goes live within days.",
    },
    {
      number: "04",
      title: "Grow & Delegate",
      description: "Focus on your zone of genius while your systems and team do the rest.",
    },
  ];

  return (
    <section className="section-padding bg-charcoal-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clay-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-taupe-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Process
          </p>
          <h2
            className="text-beige-50 mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            From <em className="text-clay-400 italic">Sign-Up to Live</em> in Days
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-clay-500/30 to-transparent z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-espresso-900/40 backdrop-blur-md border border-beige-200/10 rounded-[2rem] p-8 hover:bg-espresso-800/60 transition-all duration-500 relative z-10 text-center lg:text-left flex flex-col h-full items-center lg:items-start"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-charcoal-900 border border-clay-500/50 flex items-center justify-center mb-6">
                <span className="text-clay-500 text-xl" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {step.number}
                </span>
              </div>
              <h3 className="text-beige-50 text-xl mb-3 font-medium" style={{ fontFamily: "var(--font-cormorant)" }}>
                {step.title}
              </h3>
              <p className="text-beige-200/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OffersTestimonials() {
  const testimonials = [
    {
      name: "Roland Tubonge",
      role: "Financial Advisor",
      quote: "My VA handles all client scheduling and onboarding perfectly. The level of professionalism is incredible. Let yourself be convinced!",
      image: "https://randomuser.me/api/portraits/men/13.jpg"
    },
    {
      name: "Jonathan Yombo",
      role: "Business Coach",
      quote: "Talent Mucho completely transformed how I run my coaching business. Finding a reliable VA who understood my industry was a game-changer.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Khatab Wedaa",
      role: "Solopreneur",
      quote: "If you're a solopreneur trying to do it all, stop right now and book a call with this team. It's elegant, clean, and highly responsive.",
      image: "https://randomuser.me/api/portraits/men/10.jpg"
    }
  ];

  return (
    <section className="section-padding bg-beige-100">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Social Proof
          </p>
          <h2
            className="text-charcoal-900 mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Founders <em className="text-clay-500 italic">Love</em> Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="border border-beige-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl h-full bg-white">
                <CardContent className="pt-8 px-8 pb-8 flex flex-col h-full">
                  <div className="text-clay-400 text-lg tracking-widest mb-4">★★★★★</div>
                  <blockquote className="flex-grow mb-8">
                    <p className="text-espresso-800 text-sm leading-relaxed italic">"{testi.quote}"</p>
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Avatar className="size-10 border border-beige-200">
                      <AvatarImage alt={testi.name} src={testi.image} />
                      <AvatarFallback className="bg-clay-50 text-clay-600">TM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm">{testi.name}</h4>
                      <p className="text-taupe-400 text-xs font-medium tracking-wide">{testi.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OffersFAQ() {
  const faqs = [
    {
      q: "What's included in the 3 months of GoHighLevel access?",
      a: "You get full access to your own GHL sub-account including CRM, email & SMS automation, pipelines, calendar booking, and funnel tools all configured by our team so it's ready to use from day one."
    },
    {
      q: "How quickly will my landing page be delivered?",
      a: "Typically 5–7 business days from the time you complete our onboarding form. Rush delivery may be available just mention it on your call."
    },
    {
      q: "Can I upgrade my EA hours beyond 20/month?",
      a: "Absolutely. Many clients start at 20 hours and scale up as their needs grow. There's no lock-in you can adjust, pause, or upgrade with just one message to your account manager."
    },
    {
      q: "Is this offer available internationally?",
      a: "Yes! Talent Mucho serves founders and businesses globally. Our team operates across multiple time zones so your EA is available when you need them."
    },
    {
      q: "What happens after my 3 free GHL months?",
      a: "After month 3, you can continue at the standard GHL rate or we can migrate your assets to your own account. Either way, you keep everything that was built during your free period."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-charcoal-900 text-beige-50">
      <div className="section-container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Questions
          </p>
          <h2
            className="mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            <span className="text-white">Got</span> <em className="text-clay-500 italic">Questions?</em>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border-b border-beige-200/10"
            >
              <button
                className="w-full py-6 flex items-center justify-between text-left group gap-4"
                onClick={() => toggle(i)}
              >
                <span className="font-medium text-lg group-hover:text-clay-400 transition-colors">
                  {faq.q}
                </span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-clay-500 transition-transform duration-300 shrink-0",
                  openIndex === i ? "rotate-180" : ""
                )} />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === i ? "max-h-96 pb-6" : "max-h-0"
                )}
              >
                <p className="text-beige-200/60 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
