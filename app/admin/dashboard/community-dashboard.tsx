"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3,
  TrendingUp,
  Target,
  Globe,
  ArrowUpRight,
  Filter,
  Download,
  Sparkles,
} from "lucide-react";

type Member = {
  firstName: string;
  lastName: string;
  email: string;
  platform: string;
  source: string;
  aiLevelGHL: string;
  aiLevelSkool: string;
  aiLevel: string;
  painPoint: string;
  painCategory: string;
  joinedGHL: string;
  joinedSkool: string;
  invitedBy: string;
  lastActivity: string;
};

type Stats = {
  total: number;
  ghlOnly: number;
  skoolOnly: number;
  both: number;
  byAILevel: Record<string, number>;
  bySource: Record<string, number>;
  byPainCategory: Record<string, number>;
  byDay: Record<string, number>;
};

type CommunityData = { stats: Stats; members: Member[] };

// ── Theme system ~ matches EventOS TM/AM pattern ────────────────────────────
type ThemeKey = "tm" | "am";

interface Palette {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  primary: string;
  primaryHover: string;
  text: string;
  textSecondary: string;
  muted: string;
  subtle: string;
  header: string;
  headerText: string;
  headerMuted: string;
  barFrom: string;
  barTo: string;
  donutA: string;
  donutB: string;
  donutC: string;
  badgeA: string;
  badgeBg: string;
  mentorBg: string;
  mentorCard: string;
  mentorBorder: string;
  mentorBadge: string;
  gridLine: string;
}

function gridBg(color: string) {
  return `repeating-linear-gradient(0deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 60px)`;
}

function gridBgDark(color: string) {
  return `repeating-linear-gradient(0deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 48px)`;
}

interface ThemeFonts {
  sans: string;
  serif: string;
}

const FONTS: Record<ThemeKey, ThemeFonts> = {
  tm: {
    sans: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    serif: "var(--dash-serif)",
  },
  am: {
    sans: "var(--font-host-grotesk), ui-sans-serif, system-ui, sans-serif",
    serif: "var(--font-instrument-serif), Georgia, serif",
  },
};

const THEMES: Record<ThemeKey, { label: string; sub: string; palette: Palette }> = {
  tm: {
    label: "TM",
    sub: "Talent Mucho",
    palette: {
      bg: "#F5F0E8",
      surface: "#FAF8F5",
      surface2: "#EBE4D8",
      border: "rgba(42,37,32,0.12)",
      primary: "#7D6B5A",
      primaryHover: "#665847",
      text: "#2A2520",
      textSecondary: "#524639",
      muted: "#9C8B7A",
      subtle: "#DED4C4",
      header: "#2A2520",
      headerText: "#FAF8F5",
      headerMuted: "#9C8B7A",
      barFrom: "#524639",
      barTo: "#9C8B7A",
      donutA: "#7D6B5A",
      donutB: "#2A2520",
      donutC: "#DED4C4",
      badgeA: "#524639",
      badgeBg: "#F5F0E8",
      mentorBg: "#2A2520",
      mentorCard: "#3D352E",
      mentorBorder: "#524639",
      mentorBadge: "#7D6B5A",
      gridLine: "rgba(42,37,32,0.04)",
    },
  },
  am: {
    label: "AM",
    sub: "Abie Maxey",
    palette: {
      bg: "#f9f5f2",
      surface: "#ffffff",
      surface2: "#e7ddd3",
      border: "rgba(58,58,58,0.12)",
      primary: "#e3a99c",
      primaryHover: "#d49283",
      text: "#3a3a3a",
      textSecondary: "#5a5a5a",
      muted: "#6b6b6b",
      subtle: "#c4b8ad",
      header: "#3a3a3a",
      headerText: "#f9f5f2",
      headerMuted: "#c4b8ad",
      barFrom: "#d49283",
      barTo: "#e3a99c",
      donutA: "#e3a99c",
      donutB: "#3a3a3a",
      donutC: "#bbcccd",
      badgeA: "#d49283",
      badgeBg: "#f2d6c9",
      mentorBg: "#3a3a3a",
      mentorCard: "#4a4a4a",
      mentorBorder: "#5a5a5a",
      mentorBadge: "#e3a99c",
      gridLine: "rgba(58,58,58,0.04)",
    },
  },
};

function getAIColors(C: Palette): Record<string, string> {
  return {
    "Never Used AI": C.subtle,
    Beginner: C.muted,
    "Tried It": C.primaryHover,
    Occasional: C.primary,
    Intermediate: C.textSecondary,
    Regular: C.barFrom,
    Advanced: C.text,
    Expert: C.text,
    Unknown: C.subtle,
  };
}

function getSourceColors(C: Palette): Record<string, string> {
  return {
    instagram: C.primary,
    threads: C.text,
    tiktok: C.muted,
    facebook: C.textSecondary,
    influencer: C.barFrom,
    "private-groups": C.primaryHover,
    skool: C.subtle,
  };
}

// ── Components ───────────────────────────────────────────────────────────────

function ThemeToggle({ theme, onChange }: { theme: ThemeKey; onChange: (t: ThemeKey) => void }) {
  const C = THEMES[theme].palette;
  return (
    <div
      className="flex gap-0 overflow-hidden"
      style={{ border: `1px solid ${C.border}`, borderRadius: 100 }}
    >
      {(["tm", "am"] as ThemeKey[]).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          title={THEMES[t].sub}
          className="transition-all duration-200"
          style={{
            padding: "5px 14px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            border: "none",
            background: t === theme ? C.primary : "transparent",
            color: t === theme ? C.surface : C.muted,
          }}
        >
          {THEMES[t].label}
        </button>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  sub,
  C,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: string;
  sub?: string;
  C: Palette;
}) {
  return (
    <div
      className="group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 2px 0 rgba(61,53,46,0.05)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: accent }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[11px] font-semibold uppercase"
            style={{ color: C.muted, letterSpacing: "0.15em" }}
          >
            {label}
          </p>
          <p
            className="mt-3 text-5xl font-light tracking-tight"
            style={{
              color: C.text,
              fontFamily: "var(--dash-serif)",
            }}
          >
            {value}
          </p>
          {sub && (
            <p className="mt-2 text-xs leading-relaxed" style={{ color: C.muted }}>
              {sub}
            </p>
          )}
        </div>
        <div
          className="rounded-xl p-3 transition-colors duration-300"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
      </div>
    </div>
  );
}

function BarChartHorizontal({
  data,
  colors,
  total,
  C,
}: {
  data: Record<string, number>;
  colors?: Record<string, string>;
  total: number;
  C: Palette;
}) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return (
    <div className="space-y-4">
      {sorted.map(([key, count]) => {
        const pct = total > 0 ? (count / total) * 100 : 0;
        const color = colors?.[key] || C.primary;
        return (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium capitalize" style={{ color: C.textSecondary }}>
                {key.replace(/-/g, " ")}
              </span>
              <span className="tabular-nums" style={{ color: C.muted }}>
                {count}
                <span className="ml-1" style={{ color: C.subtle }}>
                  ({pct.toFixed(0)}%)
                </span>
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: C.surface2 }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DailyChart({ data, C }: { data: Record<string, number>; C: Palette }) {
  const days = Object.entries(data).sort((a, b) => a[0].localeCompare(b[0]));
  const max = Math.max(...days.map(([, v]) => v));
  return (
    <div className="flex items-end gap-3 h-44">
      {days.map(([day, count]) => {
        const pct = max > 0 ? (count / max) * 100 : 0;
        const label = day.slice(5);
        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
            <span
              className="text-xs font-semibold tabular-nums"
              style={{ color: C.textSecondary }}
            >
              {count}
            </span>
            <div
              className="w-full relative rounded-lg overflow-hidden"
              style={{ height: "130px", backgroundColor: C.surface2 }}
            >
              <div
                className="absolute bottom-0 w-full rounded-lg transition-all duration-700 ease-out"
                style={{
                  height: `${pct}%`,
                  background: `linear-gradient(to top, ${C.barFrom}, ${C.barTo})`,
                }}
              />
            </div>
            <span
              className="text-[10px] font-medium uppercase"
              style={{ color: C.muted, letterSpacing: "0.1em" }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PlatformDonut({ stats, C }: { stats: Stats; C: Palette }) {
  const segments = [
    { label: "GHL Only", value: stats.ghlOnly, color: C.donutA },
    { label: "Both Platforms", value: stats.both, color: C.donutB },
    { label: "Skool Only", value: stats.skoolOnly, color: C.donutC },
  ];
  const total = stats.total;
  let cumulative = 0;
  const size = 180;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center gap-8">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={C.surface2} strokeWidth={strokeWidth}
        />
        {segments.map((seg) => {
          const pct = total > 0 ? seg.value / total : 0;
          const offset = circumference * (1 - pct);
          const rotation = cumulative * 360;
          cumulative += pct;
          return (
            <circle
              key={seg.label}
              cx={size / 2} cy={size / 2} r={radius}
              fill="none" stroke={seg.color} strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "50% 50%" }}
              className="transition-all duration-700"
            />
          );
        })}
        <text
          x={size / 2} y={size / 2 - 6}
          textAnchor="middle" dominantBaseline="central"
          className="text-3xl"
          style={{
            fill: C.text,
            transform: "rotate(90deg)", transformOrigin: "50% 50%",
            fontFamily: "var(--dash-serif)", fontWeight: 300,
          }}
        >
          {total}
        </text>
        <text
          x={size / 2} y={size / 2 + 16}
          textAnchor="middle" dominantBaseline="central"
          className="text-[9px] uppercase"
          style={{
            fill: C.muted,
            transform: "rotate(90deg)", transformOrigin: "50% 50%",
            letterSpacing: "0.2em",
          }}
        >
          members
        </text>
      </svg>
      <div className="space-y-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
            <div>
              <span className="text-xs" style={{ color: C.muted }}>{seg.label}</span>
              <p
                className="text-lg font-light"
                style={{ color: C.text, fontFamily: "var(--dash-serif)" }}
              >
                {seg.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel({
  children,
  className = "",
  C,
}: {
  children: React.ReactNode;
  className?: string;
  C: Palette;
}) {
  return (
    <div
      className={`rounded-2xl p-7 ${className}`}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 2px 0 rgba(61,53,46,0.05)",
      }}
    >
      {children}
    </div>
  );
}

function PanelTitle({
  icon: Icon,
  children,
  right,
  C,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  right?: React.ReactNode;
  C: Palette;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <Icon className="h-4 w-4" style={{ color: C.muted }} />
      <h2
        className="text-xl font-light tracking-tight"
        style={{ color: C.text, fontFamily: "var(--dash-serif)" }}
      >
        {children}
      </h2>
      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}

// ── Animated Visualizations ──────────────────────────────────────────────────

function AnimatedFlowChart({ stats, C }: { stats: Stats; C: Palette }) {
  const total = stats.total;
  const ghlPct = (stats.ghlOnly + stats.both) / total;
  const skoolPct = (stats.skoolOnly + stats.both) / total;
  const overlapPct = stats.both / total;

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl" style={{ background: C.header }}>
      <div className="absolute inset-0" style={{ backgroundImage: gridBgDark("rgba(255,255,255,0.03)") }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`flow-grad-${C.primary}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.donutA} stopOpacity="0.8" />
            <stop offset="50%" stopColor={C.primary} stopOpacity="1" />
            <stop offset="100%" stopColor={C.donutC} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* GHL circle */}
        <circle cx="280" cy="100" r="70" fill="none" stroke={C.donutA} strokeWidth="2" opacity="0.4">
          <animate attributeName="r" values="68;72;68" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="100" r="55" fill={`${C.donutA}15`}>
          <animate attributeName="r" values="53;57;53" dur="4s" repeatCount="indefinite" />
        </circle>
        <text x="280" y="92" textAnchor="middle" fill={C.headerText} fontSize="24" fontWeight="300" fontFamily="var(--dash-serif)">
          {stats.ghlOnly + stats.both}
        </text>
        <text x="280" y="115" textAnchor="middle" fill={C.headerMuted} fontSize="9" letterSpacing="2">
          GHL
        </text>

        {/* Overlap / flow lines */}
        <path d="M 350 100 Q 400 60 450 100" fill="none" stroke={C.primary} strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
        </path>
        <path d="M 350 100 Q 400 140 450 100" fill="none" stroke={C.primary} strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Overlap count */}
        <circle cx="400" cy="100" r="22" fill={C.primary} opacity="0.2">
          <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="400" y="96" textAnchor="middle" fill={C.headerText} fontSize="16" fontWeight="300" fontFamily="var(--dash-serif)">
          {stats.both}
        </text>
        <text x="400" y="112" textAnchor="middle" fill={C.headerMuted} fontSize="7" letterSpacing="1.5">
          BOTH
        </text>

        {/* Skool circle */}
        <circle cx="520" cy="100" r="70" fill="none" stroke={C.donutC} strokeWidth="2" opacity="0.4">
          <animate attributeName="r" values="68;72;68" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="520" cy="100" r="45" fill={`${C.donutC}15`}>
          <animate attributeName="r" values="43;47;43" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <text x="520" y="92" textAnchor="middle" fill={C.headerText} fontSize="24" fontWeight="300" fontFamily="var(--dash-serif)">
          {stats.skoolOnly + stats.both}
        </text>
        <text x="520" y="115" textAnchor="middle" fill={C.headerMuted} fontSize="9" letterSpacing="2">
          SKOOL
        </text>

        {/* Floating particles showing data flow */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} r="2" fill={C.primary} opacity="0.6">
            <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
              <mpath href="#flowPath" />
            </animateMotion>
          </circle>
        ))}
        <path id="flowPath" d="M 280 100 Q 400 50 520 100" fill="none" stroke="none" />

        {/* Conversion rate indicator */}
        <text x="680" y="60" textAnchor="middle" fill={C.headerMuted} fontSize="9" letterSpacing="2">
          CONVERSION
        </text>
        <text x="680" y="90" textAnchor="middle" fill={C.primary} fontSize="28" fontWeight="300" fontFamily="var(--dash-serif)">
          {((stats.both / (stats.ghlOnly + stats.both)) * 100).toFixed(0)}%
        </text>
        <text x="680" y="115" textAnchor="middle" fill={C.headerMuted} fontSize="8" letterSpacing="1.5">
          GHL → SKOOL
        </text>
        <rect x="650" y="130" width="60" height="3" rx="1.5" fill={`${C.headerMuted}40`} />
        <rect x="650" y="130" width={60 * overlapPct * 3} height="3" rx="1.5" fill={C.primary}>
          <animate attributeName="width" values={`0;${60 * overlapPct * 3}`} dur="1.5s" fill="freeze" />
        </rect>

        {/* Pulse rings on key numbers */}
        <circle cx="400" cy="100" r="30" fill="none" stroke={C.primary} strokeWidth="0.5" opacity="0">
          <animate attributeName="r" values="22;40" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Labels */}
      <div className="absolute bottom-3 left-4 right-4 flex justify-between">
        <span className="text-[9px] uppercase tracking-widest" style={{ color: C.headerMuted, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
          Platform Flow Visualization
        </span>
        <span className="text-[9px] uppercase tracking-widest" style={{ color: `${C.headerMuted}60`, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
          live ~ {total} members
        </span>
      </div>
    </div>
  );
}

function ActivityPulse({ stats, C }: { stats: Stats; C: Palette }) {
  const days = Object.entries(stats.byDay).sort((a, b) => a[0].localeCompare(b[0]));
  const total = days.reduce((sum, [, v]) => sum + v, 0);
  const max = Math.max(...days.map(([, v]) => v));
  const avg = total / days.length;

  return (
    <div className="relative h-32 w-full overflow-hidden rounded-xl" style={{ background: `${C.surface2}60` }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
        {/* Area chart with animation */}
        <defs>
          <linearGradient id={`pulse-fill-${C.primary}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
          </linearGradient>
        </defs>
        {(() => {
          const points = days.map(([, v], i) => {
            const x = (i / (days.length - 1)) * 400;
            const y = 110 - (v / max) * 90;
            return `${x},${y}`;
          });
          const linePath = `M ${points.join(" L ")}`;
          const areaPath = `${linePath} L 400,120 L 0,120 Z`;
          return (
            <>
              <path d={areaPath} fill={`url(#pulse-fill-${C.primary})`}>
                <animate attributeName="opacity" values="0;1" dur="1s" fill="freeze" />
              </path>
              <path d={linePath} fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2s" fill="freeze" />
                <set attributeName="stroke-dasharray" to="1000" />
              </path>
              {days.map(([, v], i) => {
                const x = (i / (days.length - 1)) * 400;
                const y = 110 - (v / max) * 90;
                return (
                  <circle key={i} cx={x} cy={y} r="4" fill={C.surface} stroke={C.primary} strokeWidth="2">
                    <animate attributeName="r" values="0;4" dur="0.3s" begin={`${0.3 * i}s`} fill="freeze" />
                  </circle>
                );
              })}
            </>
          );
        })()}
        {/* Average line */}
        <line x1="0" y1={110 - (avg / max) * 90} x2="400" y2={110 - (avg / max) * 90} stroke={C.muted} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      </svg>
      <div className="absolute top-3 right-3 text-right">
        <p className="text-[9px] uppercase tracking-widest" style={{ color: C.muted, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>avg/day</p>
        <p className="text-lg font-light" style={{ color: C.text, fontFamily: "var(--dash-serif)" }}>{avg.toFixed(0)}</p>
      </div>
    </div>
  );
}

// ── Main dashboard ───────────────────────────────────────────────────────────

export default function CommunityDashboard({ data }: { data: CommunityData }) {
  const { stats, members } = data;

  const [theme, setTheme] = useState<ThemeKey>("tm");
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [aiFilter, setAIFilter] = useState("All");
  const [painFilter, setPainFilter] = useState("All");
  const [sortField, setSortField] = useState<"name" | "platform" | "aiLevel" | "joinedGHL">("joinedGHL");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const perPage = 25;

  useEffect(() => {
    const saved = localStorage.getItem("dash-theme") as ThemeKey | null;
    if (saved && THEMES[saved]) setTheme(saved);
  }, []);

  function changeTheme(t: ThemeKey) {
    setTheme(t);
    localStorage.setItem("dash-theme", t);
  }

  const C = THEMES[theme].palette;
  const F = FONTS[theme];
  const aiColors = getAIColors(C);
  const sourceColors = getSourceColors(C);

  const rootVars: React.CSSProperties & Record<string, string> = {
    "--dash-serif": F.serif,
    "--dash-sans": F.sans,
  } as React.CSSProperties & Record<string, string>;

  const platformBadge = (platform: string) => {
    const map: Record<string, { bg: string; text: string; border: string }> = {
      Both: { bg: `${C.donutB}12`, text: C.donutB, border: `${C.donutB}25` },
      "GHL Only": { bg: `${C.donutA}12`, text: C.donutA, border: `${C.donutA}25` },
      "Skool Only": { bg: `${C.donutC}30`, text: C.textSecondary, border: `${C.donutC}50` },
    };
    return map[platform] || { bg: C.surface2, text: C.muted, border: C.border };
  };

  const filtered = useMemo(() => {
    let result = members;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.firstName.toLowerCase().includes(q) ||
          m.lastName.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.painPoint.toLowerCase().includes(q)
      );
    }
    if (platformFilter !== "All") result = result.filter((m) => m.platform === platformFilter);
    if (aiFilter !== "All") result = result.filter((m) => m.aiLevel === aiFilter);
    if (painFilter !== "All") result = result.filter((m) => m.painCategory === painFilter);

    result = [...result].sort((a, b) => {
      let va = "", vb = "";
      if (sortField === "name") { va = `${a.firstName} ${a.lastName}`; vb = `${b.firstName} ${b.lastName}`; }
      else if (sortField === "platform") { va = a.platform; vb = b.platform; }
      else if (sortField === "aiLevel") { va = a.aiLevel; vb = b.aiLevel; }
      else { va = a.joinedGHL || a.joinedSkool; vb = b.joinedGHL || b.joinedSkool; }
      const cmp = va.localeCompare(vb);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [members, search, platformFilter, aiFilter, painFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleSort(field: typeof sortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) =>
    sortField === field ? (
      sortDir === "asc" ? <ChevronUp className="inline h-3 w-3" /> : <ChevronDown className="inline h-3 w-3" />
    ) : null;

  const aiLevels = [...new Set(members.map((m) => m.aiLevel))].sort();
  const painCategories = [...new Set(members.map((m) => m.painCategory))].sort();

  const painWithAnswers = { ...stats.byPainCategory };
  delete painWithAnswers["No Answer"];
  delete painWithAnswers["Unspecified"];

  function exportCSV() {
    const headers = ["First Name","Last Name","Email","Platform","Source","AI Level","Pain Point","Pain Category","Joined GHL","Joined Skool","Invited By"];
    const rows = filtered.map((m) => [
      m.firstName, m.lastName, m.email, m.platform, m.source, m.aiLevel,
      `"${(m.painPoint || "").replace(/"/g, '""')}"`,
      m.painCategory, m.joinedGHL, m.joinedSkool, m.invitedBy,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `community-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  const selectStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: `1px solid ${C.border}`,
    background: C.surface,
    borderRadius: 8,
    fontSize: 13,
    color: C.textSecondary,
    outline: "none",
  };

  return (
    <div className="min-h-screen transition-colors duration-500 relative" style={{ background: C.bg, fontFamily: "var(--dash-sans)", ...rootVars }}>
      {/* Grid overlay on entire page */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: gridBg(C.gridLine) }}
      />

      {/* Header */}
      <div className="relative transition-colors duration-500" style={{ background: C.header }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: gridBgDark(`rgba(255,255,255,0.04)`) }}
        />
        <div className="relative max-w-[1440px] mx-auto px-8 py-10">
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[10px] font-bold uppercase mb-3"
                style={{ color: C.headerMuted, letterSpacing: "0.25em", fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
              >
                {THEMES[theme].sub} ~ Admin
              </p>
              <h1
                className="text-5xl font-light tracking-tighter"
                style={{
                  color: C.headerText,
                  fontFamily: "var(--dash-serif)",
                }}
              >
                Community Dashboard
              </h1>
              <p className="text-sm mt-2 font-light" style={{ color: C.headerMuted }}>
                Claude for Business ~ Master View
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle theme={theme} onChange={changeTheme} />
              <span
                className="text-[10px] tracking-widest uppercase"
                style={{ color: `${C.headerMuted}80`, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}
              >
                synced apr 29
              </span>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: C.primary,
                  color: C.headerText,
                  borderRadius: 100,
                }}
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-px relative z-10"
        style={{
          background: `linear-gradient(to right, transparent, ${C.primary}40, ${C.subtle}, ${C.primary}40, transparent)`,
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 py-10 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Total Members" value={stats.total} icon={Users} accent={C.text} sub="across all platforms" C={C} />
          <StatCard label="GHL Only" value={stats.ghlOnly} icon={Globe} accent={C.primary} sub="funnel leads ~ not in Skool" C={C} />
          <StatCard label="Skool Only" value={stats.skoolOnly} icon={UserPlus} accent={C.muted} sub="joined community directly" C={C} />
          <StatCard label="Both Platforms" value={stats.both} icon={UserCheck} accent={C.textSecondary} sub="fully converted" C={C} />
        </div>

        {/* Animated Flow Visualization */}
        <AnimatedFlowChart stats={stats} C={C} />

        {/* Activity Pulse + Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Panel C={C}>
            <PanelTitle icon={Target} C={C}>Platform Split</PanelTitle>
            <PlatformDonut stats={stats} C={C} />
            <div
              className="mt-6 p-4 rounded-xl"
              style={{ background: C.surface2, border: `1px solid ${C.border}` }}
            >
              <p className="text-xs leading-relaxed" style={{ color: C.textSecondary }}>
                <span className="font-semibold" style={{ color: C.text }}>{stats.ghlOnly}</span> leads
                in your GHL funnel haven&apos;t joined Skool yet ~ conversion opportunity.
              </p>
            </div>
          </Panel>

          <Panel C={C}>
            <PanelTitle icon={Zap} C={C}>AI Experience</PanelTitle>
            <BarChartHorizontal
              data={Object.fromEntries(Object.entries(stats.byAILevel).filter(([k]) => k !== "Unknown"))}
              colors={aiColors}
              total={stats.total - (stats.byAILevel["Unknown"] || 0)}
              C={C}
            />
          </Panel>

          <Panel C={C}>
            <PanelTitle icon={ArrowUpRight} C={C}>Traffic Source</PanelTitle>
            <BarChartHorizontal
              data={stats.bySource}
              colors={sourceColors}
              total={Object.values(stats.bySource).reduce((a, b) => a + b, 0)}
              C={C}
            />
          </Panel>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Panel C={C}>
            <PanelTitle
              icon={TrendingUp}
              C={C}
              right={
                <span className="text-[10px] tracking-widest tabular-nums uppercase" style={{ color: C.muted, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
                  {Object.values(stats.byDay).reduce((a, b) => a + b, 0)} total
                </span>
              }
            >
              Daily Signups
            </PanelTitle>
            <ActivityPulse stats={stats} C={C} />
            <div className="mt-6" />
            <DailyChart data={stats.byDay} C={C} />
          </Panel>

          <Panel C={C}>
            <PanelTitle
              icon={BarChart3}
              C={C}
              right={<span className="text-[11px] tracking-wide" style={{ color: C.muted }}>from Skool onboarding</span>}
            >
              Top Pain Points
            </PanelTitle>
            <BarChartHorizontal data={painWithAnswers} total={Object.values(painWithAnswers).reduce((a, b) => a + b, 0)} C={C} />
          </Panel>
        </div>

        {/* Mentor Track Recommendation */}
        <div
          className="rounded-2xl p-8 transition-colors duration-500 relative overflow-hidden"
          style={{
            background: C.mentorBg,
            boxShadow: "0 20px 40px -10px rgba(42,37,32,0.3)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: gridBgDark("rgba(255,255,255,0.03)") }} />
          <div className="relative flex items-center gap-2.5 mb-6">
            <Sparkles className="h-4 w-4" style={{ color: C.subtle }} />
            <h2
              className="text-2xl font-light tracking-tighter"
              style={{
                color: C.headerText,
                fontFamily: "var(--dash-serif)",
              }}
            >
              Recommended Mentor Tracks
            </h2>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { track: "The Curious Beginner", letter: "A", pct: "~30%", desc: "No biz yet, never used AI. Teach them 'What is Claude?' with zero jargon." },
              { track: "The Hustler", letter: "B", pct: "~38%", desc: "Has a side biz, beginner AI. Give email templates, content batching, DM scripts." },
              { track: "The Operator", letter: "C", pct: "~18%", desc: "Uses Claude regularly. SOPs, report gen, data analysis, Notion integrations." },
              { track: "The Builder", letter: "D", pct: "~9%", desc: "Technical users. Claude API, agents, MCP, automation workflows." },
            ].map((t) => (
              <div
                key={t.letter}
                className="rounded-xl p-5 transition-colors duration-300"
                style={{
                  background: C.mentorCard,
                  border: `1px solid ${C.mentorBorder}`,
                }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center"
                      style={{ background: C.mentorBadge, color: C.headerText }}
                    >
                      {t.letter}
                    </span>
                    <span
                      className="text-base font-light"
                      style={{
                        color: C.headerText,
                        fontFamily: "var(--dash-serif)",
                      }}
                    >
                      {t.track}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase"
                    style={{ color: C.headerMuted, letterSpacing: "0.1em" }}
                  >
                    {t.pct}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: C.headerMuted }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Member Table */}
        <div
          className="rounded-2xl overflow-hidden transition-colors duration-500"
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            boxShadow: "0 1px 2px 0 rgba(61,53,46,0.05)",
          }}
        >
          <div className="p-7" style={{ borderBottom: `1px solid ${C.border}` }}>
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Filter className="h-4 w-4" style={{ color: C.muted }} />
                <h2
                  className="text-xl font-light tracking-tight"
                  style={{ color: C.text, fontFamily: "var(--dash-serif)" }}
                >
                  All Members
                </h2>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ color: C.muted, background: C.surface2 }}
                >
                  {filtered.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: C.muted }}
                  />
                  <input
                    type="text"
                    placeholder="Search name, email, pain point..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="pl-9 pr-4 w-64 transition-all"
                    style={{
                      ...selectStyle,
                      paddingLeft: 36,
                      color: C.textSecondary,
                    }}
                  />
                </div>
                <select value={platformFilter} onChange={(e) => { setPlatformFilter(e.target.value); setPage(1); }} style={selectStyle}>
                  <option value="All">All Platforms</option>
                  <option value="Both">Both</option>
                  <option value="GHL Only">GHL Only</option>
                  <option value="Skool Only">Skool Only</option>
                </select>
                <select value={aiFilter} onChange={(e) => { setAIFilter(e.target.value); setPage(1); }} style={selectStyle}>
                  <option value="All">All AI Levels</option>
                  {aiLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={painFilter} onChange={(e) => { setPainFilter(e.target.value); setPage(1); }} style={selectStyle}>
                  <option value="All">All Pain Points</option>
                  {painCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: C.surface2 }}>
                  {[
                    { label: "Name", field: "name" as const },
                    { label: "Email", field: null },
                    { label: "Platform", field: "platform" as const },
                    { label: "Source", field: null },
                    { label: "AI Level", field: "aiLevel" as const },
                    { label: "Pain Point", field: null },
                    { label: "Joined", field: "joinedGHL" as const },
                  ].map((col) => (
                    <th
                      key={col.label}
                      className={`px-6 py-3.5 text-left text-[11px] font-semibold uppercase ${col.field ? "cursor-pointer" : ""}`}
                      style={{ color: C.muted, letterSpacing: "0.1em" }}
                      onClick={col.field ? () => toggleSort(col.field!) : undefined}
                    >
                      {col.label} {col.field && <SortIcon field={col.field} />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((m, i) => {
                  const badge = platformBadge(m.platform);
                  return (
                    <tr
                      key={`${m.email}-${i}`}
                      className="transition-colors duration-200"
                      style={{ borderBottom: `1px solid ${C.surface2}` }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${C.surface2}60`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap" style={{ color: C.text }}>
                        {m.firstName} {m.lastName}
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate text-xs" style={{ color: C.muted }}>
                        {m.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase"
                          style={{
                            background: badge.bg,
                            color: badge.text,
                            border: `1px solid ${badge.border}`,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {m.platform === "Both" ? "Both" : m.platform === "GHL Only" ? "GHL" : "Skool"}
                        </span>
                      </td>
                      <td className="px-6 py-4 capitalize text-xs" style={{ color: C.muted }}>
                        {m.source ? m.source.replace(/-/g, " ") : "~"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: aiColors[m.aiLevel] || C.subtle }}
                          />
                          <span className="text-xs" style={{ color: C.textSecondary }}>
                            {m.aiLevel}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-[280px] text-xs" style={{ color: C.muted }}>
                        <span className="line-clamp-2">{m.painPoint || "~"}</span>
                      </td>
                      <td className="px-6 py-4 text-xs whitespace-nowrap tabular-nums" style={{ color: C.muted }}>
                        {(m.joinedGHL || m.joinedSkool || "").slice(0, 10)}
                      </td>
                    </tr>
                  );
                })}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center" style={{ color: C.muted }}>
                      No members match your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div
              className="flex items-center justify-between px-7 py-4"
              style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}
            >
              <p className="text-xs" style={{ color: C.muted }}>
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs rounded-lg disabled:opacity-30 transition-colors"
                  style={{ border: `1px solid ${C.border}`, color: C.textSecondary }}
                >
                  Prev
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (page <= 3) pageNum = i + 1;
                  else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = page - 2 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className="px-3 py-1.5 text-xs rounded-lg transition-colors"
                      style={
                        page === pageNum
                          ? { background: C.text, color: C.surface }
                          : { border: `1px solid ${C.border}`, color: C.textSecondary }
                      }
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs rounded-lg disabled:opacity-30 transition-colors"
                  style={{ border: `1px solid ${C.border}`, color: C.textSecondary }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10" style={{ borderTop: `1px solid ${C.border}`, background: C.surface }}>
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-widest" style={{ color: C.muted, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
            {THEMES[theme].sub} ~ Community Intelligence
          </p>
          <p className="text-[9px] uppercase tracking-widest" style={{ color: C.subtle, fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
            abiemaxey.com
          </p>
        </div>
      </div>
    </div>
  );
}
