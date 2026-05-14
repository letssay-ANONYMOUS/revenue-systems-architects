import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, PanInfo } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const cases = [
  {
    tag: "Hospitality",
    metric: "3×",
    label: "More Bookings",
    title: "Premium Café Chain",
    detail: "95% call answer rate, zero missed reservations after launch.",
    blob: "radial-gradient(circle at 30% 20%, hsl(214 90% 70% / 0.55), transparent 60%), radial-gradient(circle at 80% 90%, hsl(225 30% 30% / 0.35), transparent 65%)",
  },
  {
    tag: "Healthcare",
    metric: "30s",
    label: "Response Time",
    title: "Medical Clinic Network",
    detail: "40% fewer missed appointments across five locations.",
    blob: "radial-gradient(circle at 70% 25%, hsl(190 80% 65% / 0.5), transparent 60%), radial-gradient(circle at 20% 85%, hsl(225 25% 25% / 0.35), transparent 65%)",
  },
  {
    tag: "Real Estate",
    metric: "2×",
    label: "Qualified Leads",
    title: "Boutique Real Estate Agency",
    detail: "50% faster follow-up on every inbound enquiry.",
    blob: "radial-gradient(circle at 25% 75%, hsl(225 60% 55% / 0.45), transparent 60%), radial-gradient(circle at 80% 15%, hsl(214 70% 75% / 0.5), transparent 65%)",
  },
];

// position 0 = center, 1 = right-back, 2 = left-back
const LAYOUT = [
  { x: 0, y: 0, z: 0, rotateY: 0, scale: 1, opacity: 1 },
  { x: 56, y: 14, z: -140, rotateY: -18, scale: 0.92, opacity: 0.55 },
  { x: -56, y: 14, z: -140, rotateY: 18, scale: 0.92, opacity: 0.55 },
];

const SPRING = { type: "spring" as const, stiffness: 180, damping: 26, mass: 0.8 };

const MobileCaseRolodex = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hintGone, setHintGone] = useState(false);
  const interactedRef = useRef(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % cases.length), 6000);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const markInteracted = () => {
    if (!interactedRef.current) {
      interactedRef.current = true;
      setHintGone(true);
    }
    setPaused(true);
  };

  const goTo = (i: number) => {
    markInteracted();
    setActive(i);
  };

  const next = () => setActive((i) => (i + 1) % cases.length);
  const prev = () => setActive((i) => (i - 1 + cases.length) % cases.length);
  const goNext = () => {
    markInteracted();
    next();
  };
  const goPrev = () => {
    markInteracted();
    prev();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) > 60 || Math.abs(velocity.x) > 400;
    if (!swipe) return;
    markInteracted();
    if (offset.x < 0) next();
    else prev();
  };

  return (
    <div className="md:hidden relative w-full select-none">
      {/* Soft radial backdrop so frosted glass has something to refract */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] -z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, hsl(214 70% 94%) 0%, hsl(214 50% 97%) 35%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-4">
        <div
          className="relative mx-auto h-[420px] w-full max-w-sm"
          style={{ perspective: "1400px" }}
        >
          <div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cases.map((c, i) => {
              const offset = (i - active + cases.length) % cases.length;
              const layer = LAYOUT[offset];
              const isActive = offset === 0;
              return (
                <motion.article
                  key={c.title}
                  role={isActive ? undefined : "button"}
                  tabIndex={isActive ? -1 : 0}
                  aria-label={isActive ? undefined : `Show ${c.title}`}
                  onClick={() => !isActive && goTo(i)}
                  onKeyDown={(e) => {
                    if (!isActive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      goTo(i);
                    }
                  }}
                  drag={isActive && !reduce ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={isActive ? onDragEnd : undefined}
                  animate={{
                    x: layer.x,
                    y: layer.y,
                    z: layer.z,
                    rotateY: layer.rotateY,
                    scale: layer.scale,
                    opacity: layer.opacity,
                  }}
                  initial={false}
                  transition={SPRING}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    zIndex: isActive ? 30 : 10,
                    cursor: isActive ? (reduce ? "default" : "grab") : "pointer",
                  }}
                  whileTap={isActive && !reduce ? { cursor: "grabbing" } : undefined}
                  className="absolute inset-0 overflow-hidden rounded-[28px]"
                >
                  {/* Drop shadow layer (outside the clipping surface) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[28px]"
                    style={{
                      boxShadow:
                        "0 40px 80px -30px hsl(var(--foreground) / 0.45), 0 12px 30px -18px hsl(var(--foreground) / 0.25), 0 6px 24px -12px hsl(214 80% 40% / 0.18)",
                    }}
                  />

                  {/* Glass surface — truly translucent so the page shows through */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[28px] bg-white/15 backdrop-blur-2xl backdrop-saturate-150"
                  />

                  {/* Faint per-card color tint (kept very low so it stays clear) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[28px] opacity-25"
                    style={{ background: c.blob }}
                  />

                  {/* Top specular highlight */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-gradient-to-b from-white/40 via-white/5 to-transparent"
                  />

                  {/* Refractive gradient border */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[28px] p-px"
                    style={{
                      background:
                        "linear-gradient(150deg, hsl(0 0% 100% / 0.9), hsl(var(--foreground) / 0.18) 40%, hsl(var(--foreground) / 0.04) 70%, hsl(0 0% 100% / 0.6))",
                      WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Faint grain */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[28px] opacity-[0.04] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                  />

                  {/* Content — only visible on the active card so back cards don't bleed through */}
                  <div
                    className="relative z-10 flex h-full flex-col p-7 text-foreground transition-opacity duration-200"
                    style={{ opacity: isActive ? 1 : 0 }}
                    aria-hidden={!isActive}
                  >
                    <span className="w-fit rounded-full border border-white/60 bg-white/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/75 backdrop-blur-md">
                      {c.tag}
                    </span>

                    <div className="mt-8 flex items-end gap-3">
                      <span className="font-display text-[6rem] font-black leading-[0.78] tracking-[-0.08em] text-foreground">
                        {c.metric}
                      </span>
                      <span className="mb-2 max-w-[7rem] text-base font-medium leading-tight text-foreground/65">
                        {c.label}
                      </span>
                    </div>

                    <div className="my-6 h-px w-full bg-foreground/10" />

                    <div className="mt-auto">
                      <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.03em]">
                        {c.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground/65">
                        {c.detail}
                      </p>

                      {isActive && (
                        <Link
                          to="/case-studies"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                        >
                          View case study
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}

            <motion.button
              type="button"
              aria-label="Previous case"
              data-native-press
              onClick={goPrev}
              whileTap={{
                y: 1,
                scale: 0.94,
                boxShadow:
                  "0 8px 22px rgba(20,32,50,0.14), inset 0 5px 14px rgba(17,24,39,0.1), inset 0 1px 0 rgba(255,255,255,0.78)",
              }}
              transition={{ type: "spring", stiffness: 560, damping: 26, mass: 0.42 }}
              className="absolute -left-2 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/75 bg-white/58 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.94),inset_0_-9px_18px_rgba(17,24,39,0.06)] backdrop-blur-2xl backdrop-saturate-150"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.35} />
            </motion.button>

            <motion.button
              type="button"
              aria-label="Next case"
              data-native-press
              onClick={goNext}
              whileTap={{
                y: 1,
                scale: 0.94,
                boxShadow:
                  "0 8px 22px rgba(20,32,50,0.14), inset 0 5px 14px rgba(17,24,39,0.1), inset 0 1px 0 rgba(255,255,255,0.78)",
              }}
              transition={{ type: "spring", stiffness: 560, damping: 26, mass: 0.42 }}
              className="absolute -right-2 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/75 bg-white/58 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.94),inset_0_-9px_18px_rgba(17,24,39,0.06)] backdrop-blur-2xl backdrop-saturate-150"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.35} />
            </motion.button>
          </div>
        </div>

        {/* Progress rail */}
        <div className="mt-7 flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            {cases.map((_, i) => (
              <button
                key={i}
                aria-label={`Show case ${i + 1}`}
                onClick={() => goTo(i)}
                className="h-[3px] w-10 overflow-hidden rounded-full bg-foreground/10"
              >
                <motion.span
                  className="block h-full rounded-full bg-foreground"
                  initial={false}
                  animate={{ width: i === active ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </button>
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/55">
            {cases[active].tag} · {active + 1} / {cases.length}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: hintGone ? 0 : 0.5 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.2em] text-foreground/40"
          >
            Swipe or tap
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default MobileCaseRolodex;
