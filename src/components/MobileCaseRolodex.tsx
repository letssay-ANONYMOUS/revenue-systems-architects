import { useEffect, useRef, useState, type TouchEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const cases = [
  {
    tag: "Hospitality",
    metric: "3×",
    label: "More Bookings",
    title: "Premium Café Chain",
    detail: "More covers, happier café, zero missed opportunities at lunch.",
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
  { x: 0, y: 0, z: 0, rotateY: 0, scale: 1, shellOpacity: 1 },
  { x: 96, y: 12, z: -120, rotateY: -4.5, scale: 0.93, shellOpacity: 0.7 },
  { x: -96, y: 12, z: -120, rotateY: 4.5, scale: 0.93, shellOpacity: 0.7 },
];

const SPRING = { type: "spring" as const, stiffness: 300, damping: 34, mass: 0.52 };

const MobileCaseRolodex = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hintGone, setHintGone] = useState(false);
  const interactedRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null);

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

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, t: performance.now() };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const elapsed = performance.now() - start.t;
    const horizontalIntent = Math.abs(dx) > 26 && Math.abs(dx) > Math.abs(dy) * 1.08;
    const flick = elapsed < 280 && Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(dy) * 0.9;

    if (!horizontalIntent && !flick) return;
    markInteracted();
    if (dx < 0) next();
    else prev();
  };

  return (
    <div className="md:hidden relative w-full select-none">
      {/* Soft radial backdrop so frosted glass has something to refract */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] -z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, hsl(214 70% 94%) 0%, hsl(214 50% 97%) 35%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-2">
        <div className="relative mx-auto h-[430px] w-full max-w-[430px]" style={{ perspective: "1600px" }}>
          <div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
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
                  animate={{
                    x: layer.x,
                    y: layer.y,
                    z: layer.z,
                    rotateY: layer.rotateY,
                    scale: layer.scale,
                  }}
                  initial={false}
                  transition={SPRING}
                  style={{
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    zIndex: isActive ? 30 : 10,
                    opacity: layer.shellOpacity,
                    cursor: isActive ? "grab" : "pointer",
                    willChange: "transform",
                    touchAction: "pan-y",
                  }}
                  whileTap={reduce ? undefined : { scale: layer.scale * 0.992 }}
                  className="absolute inset-y-0 left-[1.5%] right-[1.5%] overflow-visible rounded-[34px] [contain:layout_style_paint]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-y-7 rounded-[34px] bg-black/24 blur-2xl"
                    style={{ opacity: isActive ? 0.72 : 0.22 }}
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[34px] bg-[#101114] p-[4px] shadow-[0_30px_78px_rgba(8,9,11,0.24),0_12px_32px_rgba(8,9,11,0.18),inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-1px_0_rgba(0,0,0,0.42)]"
                  >
                    <div className="absolute inset-[2px] rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.38),transparent_12%,transparent_82%,rgba(255,255,255,0.18))]" />
                    <div className="absolute inset-[4px] rounded-[30px] bg-[linear-gradient(180deg,#fbfbfb_0%,#f7f7f5_50%,#ededeb_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-18px_42px_rgba(0,0,0,0.045),inset_0_0_0_1px_rgba(255,255,255,0.76)]" />
                  </div>

                  <div
                    aria-hidden
                    className="absolute inset-[10px] rounded-[26px]"
                    style={{
                      opacity: isActive ? 0.78 : 0.48,
                      background:
                        "radial-gradient(circle at 28% 4%, rgba(255,255,255,0.92), transparent 22%), radial-gradient(circle at 80% 18%, rgba(255,255,255,0.5), transparent 34%), linear-gradient(115deg, rgba(255,255,255,0.62), transparent 36%, rgba(255,255,255,0.3) 78%, transparent)",
                    }}
                  />

                  <div
                    aria-hidden
                    className="absolute inset-[12px] rounded-[24px] border border-[#1b1d22]/7"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-x-[17px] top-[17px] h-1/2 rounded-t-[22px] bg-gradient-to-b from-white/72 via-white/20 to-transparent"
                  />

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[5px] rounded-[29px] p-px"
                    style={{
                      background:
                        "linear-gradient(150deg, rgba(255,255,255,0.92), rgba(255,255,255,0.24) 22%, rgba(0,0,0,0.24) 48%, rgba(255,255,255,0.5) 100%)",
                      WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Faint grain */}
                  <div
                    aria-hidden
                    className="absolute inset-[5px] rounded-[29px] opacity-[0.035] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                  />

                  {isActive && (
                    <motion.div
                      key={c.title}
                      className="relative z-10 flex h-full flex-col px-7 pb-7 pt-7 text-foreground"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="ml-1 w-fit rounded-full border border-black/5 bg-white/72 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-foreground/60 shadow-[0_12px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-xl">
                        {c.tag}
                      </span>

                      <div className="mt-12 flex items-end gap-4">
                        <span className="font-display text-[4.65rem] font-black leading-[0.72] tracking-[-0.085em] text-foreground sm:text-[5rem]">
                          {c.metric}
                        </span>
                        <span className="mb-1.5 max-w-[7rem] text-[1.18rem] font-medium leading-[1.08] text-foreground/70">
                          {c.label}
                        </span>
                      </div>

                      <div className="my-8 h-px w-full bg-foreground/16" />

                      <div className="mt-auto">
                        <h3 className="font-display text-[1.42rem] font-bold leading-tight tracking-[-0.035em]">
                          {c.title}
                        </h3>
                        <p className="mt-4 max-w-[17rem] text-[0.95rem] leading-[1.55] text-foreground/64">
                          {c.detail}
                        </p>

                        <Link
                          to="/book-a-call"
                          className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-foreground/70 transition-colors hover:text-foreground"
                        >
                          Build this system
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </motion.article>
              );
            })}

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
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
