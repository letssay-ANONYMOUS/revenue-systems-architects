import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, PanInfo } from "framer-motion";
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
  { x: 0, y: 0, z: 0, rotateY: 0, scale: 1, opacity: 1 },
  { x: 76, y: 10, z: -90, rotateY: -7, scale: 0.965, opacity: 0.52 },
  { x: -76, y: 10, z: -90, rotateY: 7, scale: 0.965, opacity: 0.52 },
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
          className="relative mx-auto h-[520px] w-full max-w-sm"
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
                  className="absolute inset-y-0 left-[7%] right-[7%] overflow-visible rounded-[38px]"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-y-8 rounded-[38px] bg-black/24 blur-2xl"
                    style={{ opacity: isActive ? 0.78 : 0.28 }}
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[38px] bg-[#08090b] p-[5px] shadow-[0_34px_90px_rgba(8,9,11,0.28),0_14px_38px_rgba(8,9,11,0.2),inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-1px_0_rgba(0,0,0,0.42)]"
                  >
                    <div className="absolute inset-[2px] rounded-[36px] bg-[linear-gradient(135deg,rgba(255,255,255,0.38),transparent_12%,transparent_82%,rgba(255,255,255,0.18))]" />
                    <div className="absolute inset-[5px] rounded-[33px] bg-[linear-gradient(180deg,#fbfbfb_0%,#f5f5f4_48%,#ececea_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-18px_42px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.74)]" />
                  </div>

                  <div
                    aria-hidden
                    className="absolute inset-[10px] rounded-[30px] opacity-70"
                    style={{
                      background:
                        "radial-gradient(circle at 28% 4%, rgba(255,255,255,0.92), transparent 22%), radial-gradient(circle at 80% 18%, rgba(255,255,255,0.5), transparent 34%), linear-gradient(115deg, rgba(255,255,255,0.62), transparent 36%, rgba(255,255,255,0.3) 78%, transparent)",
                    }}
                  />

                  <div
                    aria-hidden
                    className="absolute inset-[12px] rounded-[28px] border border-[#1b1d22]/7"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-x-[17px] top-[17px] h-1/2 rounded-t-[25px] bg-gradient-to-b from-white/72 via-white/20 to-transparent"
                  />

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[5px] rounded-[33px] p-px"
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
                    className="absolute inset-[5px] rounded-[33px] opacity-[0.035] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                    }}
                  />

                  {/* Content — only visible on the active card so back cards don't bleed through */}
                  <div
                    className="relative z-10 flex h-full flex-col px-8 pb-8 pt-8 text-foreground transition-opacity duration-200"
                    style={{ opacity: isActive ? 1 : 0 }}
                    aria-hidden={!isActive}
                  >
                    <span className="ml-1 w-fit rounded-full border border-black/5 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground/58 shadow-[0_12px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-xl">
                      {c.tag}
                    </span>

                    <div className="mt-14 flex items-end gap-5">
                      <span className="font-display text-[5.75rem] font-black leading-[0.72] tracking-[-0.085em] text-foreground">
                        {c.metric}
                      </span>
                      <span className="mb-2 max-w-[7rem] text-[1.62rem] font-medium leading-[1.05] text-foreground/68">
                        {c.label}
                      </span>
                    </div>

                    <div className="my-10 h-px w-full bg-foreground/18" />

                    <div className="mt-auto">
                      <h3 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.045em]">
                        {c.title}
                      </h3>
                      <p className="mt-5 text-[1.24rem] leading-[1.55] text-foreground/62">
                        {c.detail}
                      </p>

                      {isActive && (
                        <Link
                          to="/case-studies"
                          className="mt-10 inline-flex items-center gap-2 text-[1.18rem] font-medium text-foreground/70"
                        >
                          View case study
                        </Link>
                      )}
                    </div>
                  </div>
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
