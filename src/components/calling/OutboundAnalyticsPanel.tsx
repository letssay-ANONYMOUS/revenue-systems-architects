import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneOutgoing, CheckCircle2, TrendingUp, PhoneCall, CalendarCheck } from "lucide-react";
import CountUp from "@/components/CountUp";

const dataPoints = [40, 65, 45, 80, 58, 92, 74];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const features = [
  "Follow-ups",
  "Reminders",
  "Reactivation",
  "Callbacks",
  "Scale Outreach",
  "Triggers",
];

// Build SVG path for line + area
const buildPath = (values: number[], width: number, height: number, padding = 6) => {
  const max = 100;
  const stepX = (width - padding * 2) / (values.length - 1);
  const points = values.map((v, i) => {
    const x = padding + i * stepX;
    const y = padding + (1 - v / max) * (height - padding * 2);
    return [x, y] as const;
  });
  const line = points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
  const area = `${line} L ${points[points.length - 1][0]} ${height - padding} L ${points[0][0]} ${height - padding} Z`;
  return { line, area, points };
};

const OutboundAnalyticsPanel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px", once: true });

  const W = 320;
  const H = 160;
  const { line, area, points } = buildPath(dataPoints, W, H);

  // Donut
  const donutR = 16;
  const donutC = 2 * Math.PI * donutR;
  const connectPct = 89;

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <PhoneOutgoing className="w-4 h-4 md:w-5 md:h-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-sm md:text-xl">Outbound Agent</h3>
          <p className="text-[10px] md:text-xs text-muted-foreground">Follows Up & Converts</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-background/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
            <span className="relative rounded-full bg-accent h-1.5 w-1.5" />
          </span>
          <span className="text-[9px] md:text-[10px] font-semibold tracking-wider text-foreground/70 uppercase">Running</span>
        </div>
      </div>

      {/* Chart panel */}
      <div
        className="rounded-lg md:rounded-xl border border-border px-3 py-3 md:px-4 md:py-4 mb-3"
        style={{ background: "hsl(var(--background) / 0.6)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] md:text-xs font-semibold text-foreground">Q4 Reactivation</p>
            <p className="text-[9px] md:text-[10px] text-muted-foreground">Calls per day</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-border text-[9px] md:text-[10px] text-muted-foreground">
            This Week
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[120px] md:h-[160px] overflow-visible">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1="6"
              x2={W - 6}
              y1={6 + t * (H - 12)}
              y2={6 + t * (H - 12)}
              stroke="hsl(var(--border))"
              strokeDasharray="2 4"
              strokeWidth="0.6"
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={area}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* Line */}
          <motion.path
            d={line}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Points */}
          {points.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2.5"
              fill="hsl(var(--background))"
              stroke="hsl(var(--accent))"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.05 }}
            />
          ))}
        </svg>

        <div className="flex justify-between mt-1 px-1">
          {days.map((d) => (
            <span key={d} className="text-[8px] md:text-[9px] text-muted-foreground/60">{d}</span>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-2 mb-4 md:mb-5">
        <div
          className="rounded-lg border border-border px-2.5 py-2 md:px-3 md:py-2.5"
          style={{ background: "hsl(var(--background) / 0.6)" }}
        >
          <div className="flex items-center gap-1 mb-1">
            <PhoneCall className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-muted-foreground">Calls</span>
          </div>
          <CountUp target={342} className="block font-display font-bold text-base md:text-xl text-foreground" />
          <span className="text-[8px] md:text-[9px] text-emerald-600 font-medium">+12% wk</span>
        </div>

        <div
          className="rounded-lg border border-border px-2.5 py-2 md:px-3 md:py-2.5 flex items-center gap-2"
          style={{ background: "hsl(var(--background) / 0.6)" }}
        >
          <svg width="34" height="34" viewBox="0 0 40 40" className="hidden md:block shrink-0">
            <circle cx="20" cy="20" r={donutR} fill="none" stroke="hsl(var(--border))" strokeWidth="3.5" />
            <motion.circle
              cx="20"
              cy="20"
              r={donutR}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={donutC}
              initial={{ strokeDashoffset: donutC }}
              animate={inView ? { strokeDashoffset: donutC * (1 - connectPct / 100) } : { strokeDashoffset: donutC }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              transform="rotate(-90 20 20)"
            />
          </svg>
          <div className="min-w-0">
            <span className="block text-[8px] md:text-[10px] uppercase tracking-wider text-muted-foreground">Connect</span>
            <CountUp target={89} suffix="%" className="block font-display font-bold text-base md:text-xl text-foreground" />
          </div>
        </div>

        <div
          className="rounded-lg border border-border px-2.5 py-2 md:px-3 md:py-2.5"
          style={{ background: "hsl(var(--background) / 0.6)" }}
        >
          <div className="flex items-center gap-1 mb-1">
            <CalendarCheck className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-muted-foreground">Booked</span>
          </div>
          <CountUp target={47} className="block font-display font-bold text-base md:text-xl text-foreground" />
          <span className="flex items-center gap-0.5 text-[8px] md:text-[9px] text-emerald-600 font-medium">
            <TrendingUp className="w-2 h-2 md:w-2.5 md:h-2.5" /> +8%
          </span>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-1.5 md:gap-2">
        {features.map((item) => (
          <div key={item} className="flex items-center gap-1.5 text-[10px] md:text-sm text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutboundAnalyticsPanel;
