"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";

const GOOGLE_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Claude+AI+for+Business+Owners" +
  "&dates=20260501T230000Z%2F20260502T010000Z" +
  "&details=Join+us+on+Zoom%3A+https%3A%2F%2Fus06web.zoom.us%2Fj%2F7797385586%3Fpwd%3DcUZ2SE1xOXdXNW1kay9IcDJVS3FyZz09%0A%0AHosted+by+Abie+Maxey+and+Meri+Gee." +
  "&location=https%3A%2F%2Fus06web.zoom.us%2Fj%2F7797385586";

const ICS_URL = "/events/claude-for-business.ics";

export default function AddToCalendar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const base =
    variant === "dark"
      ? "border-white/10 bg-espresso-800 text-beige-50 hover:border-clay-500/50"
      : "border-beige-300 bg-white text-charcoal-900 hover:border-clay-500";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 border rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${base}`}
      >
        <CalendarPlus className="w-4 h-4 text-clay-500" />
        Add to Calendar
        <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-52 bg-beige-50 border border-beige-200 rounded-2xl shadow-elegant p-1.5 z-50">
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-espresso-800 rounded-xl hover:bg-beige-100 transition-colors"
          >
            Google Calendar
          </a>
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-espresso-800 rounded-xl hover:bg-beige-100 transition-colors"
          >
            Gmail
          </a>
          <a
            href={ICS_URL}
            download="claude-for-business.ics"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-espresso-800 rounded-xl hover:bg-beige-100 transition-colors"
          >
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}
