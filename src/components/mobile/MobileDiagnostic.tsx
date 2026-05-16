import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import MissedCallVisual from "@/components/painpoints/visuals/MissedCallVisual";
import InstantReplyVisual from "@/components/painpoints/visuals/InstantReplyVisual";
import RemindersVisual from "@/components/painpoints/visuals/RemindersVisual";
import LighthouseVisual from "@/components/painpoints/visuals/LighthouseVisual";
import WorkflowNodesVisual from "@/components/painpoints/visuals/WorkflowNodesVisual";
import ConnectedToolsVisual from "@/components/painpoints/visuals/ConnectedToolsVisual";

type Item = {
  pain: string;
  solution: string;
  caption: string;
  metric: string;
  Visual: React.ComponentType;
};

const groups: { key: string; label: string; metricValue: number; metricSuffix: string; metricPrefix: string; items: Item[] }[] = [
  {
    key: "speed",
    label: "Speed",
    metricPrefix: "+",
    metricValue: 38,
    metricSuffix: "% bookings",
    items: [
      { pain: "Missed calls", solution: "AI answers every call", caption: "Every call. Every time. Instantly.", metric: "97% pickup", Visual: MissedCallVisual },
      { pain: "Slow responses", solution: "Instant voice & chat", caption: "Respond in seconds. Book more.", metric: "<3s reply", Visual: InstantReplyVisual },
    ],
  },
  {
    key: "trust",
    label: "Trust",
    metricPrefix: "+",
    metricValue: 24,
    metricSuffix: "% conversions",
    items: [
      { pain: "No-show chaos", solution: "Automated reminders", caption: "Reduce no-shows. Increase show-ups.", metric: "-62% no-shows", Visual: RemindersVisual },
      { pain: "Weak web presence", solution: "Premium conversion site", caption: "Beautiful. Fast. Built to convert.", metric: "100/100 score", Visual: LighthouseVisual },
    ],
  },
  {
    key: "ops",
    label: "Operations",
    metricPrefix: "",
    metricValue: 60,
    metricSuffix: "% admin saved",
    items: [
      { pain: "Manual admin", solution: "Automated workflows", caption: "Save time. Eliminate busywork.", metric: "12h/wk back", Visual: WorkflowNodesVisual },
      { pain: "Fragmented tools", solution: "One connected system", caption: "All your tools. One intelligent hub.", metric: "1 source of truth", Visual: ConnectedToolsVisual },
    ],
  },
];

const CountUp = ({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) => {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);
  useEffect(() => {
    const ctrl = animate(mv, value, { duration: 1.1, ease: [0.16, 1, 0.3, 1] });
    return () => ctrl.stop();
  }, [value, mv]);
  return <motion.span>{display}</motion.span>;
};

const TapToFlipButton = ({ onFlip }: { onFlip: () => void }) => (
  <motion.button
    type="button"
    aria-label="Tap to flip card"
    data-native-press
    onPointerDownCapture={(event) => event.stopPropagation()}
    onClick={(event) => {
      event.stopPropagation();
      onFlip();
    }}
    whileTap={{ scale: 0.94, y: 1 }}
    className="absolute bottom-2.5 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/76 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.18),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-9px_18px_rgba(17,24,39,0.065)] backdrop-blur-2xl"
  >
    <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.18)_46%,rgba(20,71,212,0.08))]" />
    <span className="pointer-events-none absolute inset-[3px] rounded-full border border-white/72 shadow-[inset_0_1px_1px_rgba(255,255,255,0.92),inset_0_-5px_12px_rgba(17,24,39,0.055)]" />
    {[0, 1, 2].map((line) => (
      <motion.span
        key={line}
        className="pointer-events-none absolute h-px w-2 rounded-full bg-[#1447d4]/70"
        style={{
          right: line === 0 ? 10 : line === 1 ? 7 : 10,
          top: line === 0 ? 10 : line === 1 ? 16 : 22,
          rotate: line === 0 ? -34 : line === 1 ? 0 : 34,
          transformOrigin: "left center",
        }}
        animate={{ opacity: [0, 1, 0], scaleX: [0.35, 1, 0.45], x: [0, 2, 4] }}
        transition={{
          duration: 1.45,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.18 + line * 0.08,
          repeatDelay: 0.46,
        }}
      />
    ))}
    <motion.svg
      viewBox="0 0 34 34"
      className="pointer-events-none relative h-7 w-7"
      fill="none"
      aria-hidden="true"
      animate={{ y: [1, -1, 3, 0], scale: [1, 1, 0.94, 1] }}
      transition={{ duration: 1.45, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 0.46 }}
    >
      <motion.path
        d="M13.6 8.4v9.2m0 0-1.9-2.1a2 2 0 0 0-2.9 2.7l4.7 5.8c.8 1 2 1.6 3.3 1.6h4.5c2.5 0 4.5-2 4.5-4.5v-5.4a1.8 1.8 0 0 0-3.6 0v-.9a1.8 1.8 0 0 0-3.6 0v-.8a1.8 1.8 0 0 0-3.6 0V8.4a1.7 1.7 0 0 0-3.4 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0.62, opacity: 0.72 }}
        animate={{ pathLength: [0.72, 1, 1], opacity: [0.72, 1, 0.86] }}
        transition={{ duration: 1.45, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 0.46 }}
      />
    </motion.svg>
  </motion.button>
);

const MobileDiagnostic = () => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15% 0px" });
  const group = groups[activeGroup];
  const item = group.items[activeItem];
  const Visual = item.Visual;

  const selectGroup = (i: number) => {
    setActiveGroup(i);
    setActiveItem(0);
    setShowSolution(false);
  };

  const nextItem = () => {
    setActiveItem((v) => (v + 1) % group.items.length);
    setShowSolution(false);
  };

  return (
    <div ref={containerRef} className="md:hidden">
      {/* Tabs with glow trail */}
      <div className="relative mb-5 grid grid-cols-3 gap-2 rounded-full border border-[#bdd0ee]/70 bg-white/60 p-1.5 shadow-[0_14px_36px_rgba(46,72,125,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
        {groups.map((g, i) => (
          <button
            key={g.key}
            type="button"
            onClick={() => selectGroup(i)}
            className="relative rounded-full py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-transform active:scale-[0.96]"
          >
            {activeGroup === i && (
              <>
                <motion.span
                  layoutId="diagnostic-tab-glow"
                  className="absolute -inset-1 rounded-full bg-[#4358ff]/25 blur-md"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
                <motion.span
                  layoutId="diagnostic-tab"
                  className="absolute inset-0 rounded-full bg-[#101831] shadow-[0_8px_22px_rgba(16,24,49,0.32)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              </>
            )}
            <span className={`relative ${activeGroup === i ? "text-white" : "text-[#41517d]"}`}>
              {g.label}
            </span>
          </button>
        ))}
      </div>

      {/* Card */}
      <motion.div
        layout
        className="relative overflow-hidden rounded-[1.55rem] border border-[#bdd0ee]/80 bg-white/68 shadow-[0_26px_70px_rgba(48,75,130,0.14),inset_0_1px_0_rgba(255,255,255,0.94)] backdrop-blur-2xl"
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,rgba(255,255,255,0.94),transparent_36%),radial-gradient(ellipse_at_8%_92%,rgba(211,225,255,0.32),transparent_50%)]" />

        {/* Header metric */}
        <div className="relative flex items-center justify-between border-b border-[#d7dbe7]/85 px-5 py-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#4358ff]">
              {group.label} layer
            </p>
            <p className="mt-1 text-[1.4rem] font-bold tracking-[-0.02em] text-[#101831]">
              {inView ? (
                <CountUp
                  key={group.key}
                  value={group.metricValue}
                  prefix={group.metricPrefix}
                  suffix={group.metricSuffix}
                />
              ) : (
                <span>{group.metricPrefix}0{group.metricSuffix}</span>
              )}
            </p>
          </div>
          <motion.div
            key={`${group.key}-badge`}
            initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#6472ed] to-[#4358ff] text-white shadow-[0_12px_28px_rgba(67,88,255,0.36)]"
          >
            <Check className="h-6 w-6" strokeWidth={2.8} />
          </motion.div>
        </div>

        {/* Visual area with swipe-to-flip */}
        <motion.div
          className="relative h-[10rem] cursor-grab touch-pan-y overflow-hidden border-b border-[#e3e8f1]/80 bg-white/45 active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 50) setShowSolution((v) => !v);
          }}
          onTap={() => setShowSolution((v) => !v)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${group.key}-${activeItem}-${showSolution ? "sol" : "pain"}`}
              initial={{ opacity: 0, x: 60, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -60, scale: 0.96, filter: "blur(6px)" }}
              transition={{
                opacity: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
                x: { type: "spring", stiffness: 320, damping: 34, mass: 0.85 },
                scale: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                filter: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
              }}
              className="absolute inset-0"
            >
              <Visual />
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                  showSolution ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,71,77,0.12), rgba(255,71,77,0.02) 60%, transparent)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* State badge */}
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/80 px-2.5 py-1 backdrop-blur">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                showSolution ? "bg-emerald-500" : "bg-[#ff474d]"
              }`}
            />
            <span className="text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#101831]">
              {showSolution ? "After" : "Before"}
            </span>
          </div>

          <TapToFlipButton onFlip={() => setShowSolution((v) => !v)} />
        </motion.div>

        {/* Problem -> Solution */}
        <div className="relative px-5 py-5">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${group.key}-${activeItem}-text-${showSolution}`}
              initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
              transition={{
                opacity: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
                x: { type: "spring", stiffness: 340, damping: 36, mass: 0.8 },
                filter: { duration: 0.24 },
              }}
            >
              {!showSolution ? (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ffb5b9]/90 bg-white/70 text-[#ff474d]">
                    <X className="h-4 w-4" strokeWidth={2.6} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#f04d56]">Problem</p>
                    <p className="text-base font-semibold leading-tight tracking-[-0.015em] text-[#101831]">
                      {item.pain}
                    </p>
                    <p className="mt-1 text-xs text-[#41517d]/80">Tap the visual to see the fix →</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6472ed] text-white shadow-[0_8px_18px_rgba(76,91,218,0.3)]">
                    <Check className="h-4 w-4" strokeWidth={2.7} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#4057d7]">Solution</p>
                    <p className="text-base font-semibold leading-tight tracking-[-0.015em] text-[#111936]">
                      {item.solution}
                    </p>
                    <p className="mt-1 text-xs text-[#41517d]">{item.caption}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      {item.metric}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Item dots + Next */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {group.items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveItem(i);
                    setShowSolution(false);
                  }}
                  aria-label={`Show item ${i + 1}`}
                  className="group/dot p-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      activeItem === i ? "w-6 bg-[#101831]" : "w-1.5 bg-[#101831]/25 group-hover/dot:bg-[#101831]/45"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={nextItem}
              className="flex items-center gap-1 rounded-full border border-[#101831]/15 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#101831] backdrop-blur transition-transform active:scale-95"
            >
              Next
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileDiagnostic;
