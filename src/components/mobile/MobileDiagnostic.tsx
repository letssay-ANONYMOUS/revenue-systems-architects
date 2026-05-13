import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const groups: { key: string; label: string; metric: string; items: Item[] }[] = [
  {
    key: "speed",
    label: "Speed",
    metric: "+38% bookings",
    items: [
      { pain: "Missed calls", solution: "AI answers every call", caption: "Every call. Every time. Instantly.", metric: "97% pickup", Visual: MissedCallVisual },
      { pain: "Slow responses", solution: "Instant voice & chat", caption: "Respond in seconds. Book more.", metric: "<3s reply", Visual: InstantReplyVisual },
    ],
  },
  {
    key: "trust",
    label: "Trust",
    metric: "+24% conversions",
    items: [
      { pain: "No-show chaos", solution: "Automated reminders", caption: "Reduce no-shows. Increase show-ups.", metric: "-62% no-shows", Visual: RemindersVisual },
      { pain: "Weak web presence", solution: "Premium conversion site", caption: "Beautiful. Fast. Built to convert.", metric: "100/100 score", Visual: LighthouseVisual },
    ],
  },
  {
    key: "ops",
    label: "Operations",
    metric: "60% admin saved",
    items: [
      { pain: "Manual admin", solution: "Automated workflows", caption: "Save time. Eliminate busywork.", metric: "12h/wk back", Visual: WorkflowNodesVisual },
      { pain: "Fragmented tools", solution: "One connected system", caption: "All your tools. One intelligent hub.", metric: "1 source of truth", Visual: ConnectedToolsVisual },
    ],
  },
];

const MobileDiagnostic = () => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const group = groups[activeGroup];
  const item = group.items[activeItem];
  const Visual = item.Visual;

  const selectGroup = (i: number) => {
    setActiveGroup(i);
    setActiveItem(0);
  };

  return (
    <div className="md:hidden">
      {/* Tabs */}
      <div className="mb-5 grid grid-cols-3 gap-2 rounded-full border border-[#bdd0ee]/70 bg-white/60 p-1.5 shadow-[0_14px_36px_rgba(46,72,125,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
        {groups.map((g, i) => (
          <button
            key={g.key}
            type="button"
            onClick={() => selectGroup(i)}
            className="relative rounded-full py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors"
          >
            {activeGroup === i && (
              <motion.span
                layoutId="diagnostic-tab"
                className="absolute inset-0 rounded-full bg-[#101831] shadow-[0_8px_22px_rgba(16,24,49,0.28)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
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
              {group.metric}
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

        {/* Visual area */}
        <div className="relative h-[10rem] overflow-hidden border-b border-[#e3e8f1]/80 bg-white/45">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${group.key}-${activeItem}`}
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Visual />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Problem -> Solution */}
        <div className="relative px-5 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${group.key}-${activeItem}-text`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ffb5b9]/90 bg-white/70 text-[#ff474d]">
                  <X className="h-4 w-4" strokeWidth={2.6} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#f04d56]">Problem</p>
                  <p className="text-base font-semibold leading-tight tracking-[-0.015em] text-[#101831]">
                    {item.pain}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 rotate-90 text-[#4358ff]/50" />
              </div>

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
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Item dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {group.items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveItem(i)}
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
        </div>
      </motion.div>
    </div>
  );
};

export default MobileDiagnostic;
