import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Target, Layers, Code2, Workflow, Zap, LineChart } from "lucide-react";

const steps = [
  { step: "01", title: "Strategy", desc: "Define goals, map user journeys, plan architecture", icon: Target },
  { step: "02", title: "Design", desc: "Wireframes, UI systems, interaction patterns", icon: Layers },
  { step: "03", title: "Build", desc: "Development, integrations, AI agent training", icon: Code2 },
  { step: "04", title: "Automate", desc: "Workflows, triggers, handoffs between systems", icon: Workflow },
  { step: "05", title: "Optimize", desc: "Refine performance, scale what works", icon: LineChart },
  { step: "06", title: "Launch", desc: "Deploy, monitor, iterate based on real data", icon: Zap },
];

const ink = "hsl(225 20% 14%)";

/* ---------- 3D SVG Spine ---------- */
const Spine = ({ fill }: { fill: MotionValue<number> }) => {
  const fillPct = useTransform(fill, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);
  return (
    <svg
      aria-hidden
      width="28"
      height="100%"
      viewBox="0 0 28 1000"
      preserveAspectRatio="none"
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-visible"
    >
      <defs>
        {/* Cylinder cross-section: dark edge → bright center → dark edge */}
        <linearGradient id="pg-tube-x" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor="hsl(225 20% 70%)" stopOpacity="0.55" />
          <stop offset="18%"  stopColor="hsl(225 20% 90%)" stopOpacity="0.85" />
          <stop offset="50%"  stopColor="#ffffff"          stopOpacity="0.98" />
          <stop offset="82%"  stopColor="hsl(225 20% 88%)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="hsl(225 25% 60%)" stopOpacity="0.6" />
        </linearGradient>
        {/* Mercury liquid fill cross-section with cool/warm rim */}
        <linearGradient id="pg-merc-x" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"   stopColor="hsl(210 90% 65%)" stopOpacity="0.55" />
          <stop offset="22%"  stopColor="hsl(220 30% 92%)" stopOpacity="0.95" />
          <stop offset="50%"  stopColor="#ffffff"          stopOpacity="1" />
          <stop offset="78%"  stopColor="hsl(220 25% 88%)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(28 95% 65%)"  stopOpacity="0.5" />
        </linearGradient>
        {/* Vertical sheen pan */}
        <linearGradient id="pg-merc-y" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="60%"  stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>
        <filter id="pg-tube-shadow" x="-50%" y="-5%" width="200%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="0" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="pg-tube-clip">
          <rect x="10" y="0" width="8" height="1000" rx="4" />
        </clipPath>
      </defs>

      {/* Contact shadow */}
      <rect x="11" y="0" width="8" height="1000" rx="4" fill="hsl(225 25% 20%)" opacity="0.10" filter="url(#pg-tube-shadow)" />
      {/* Tube body */}
      <rect x="10" y="0" width="8" height="1000" rx="4" fill="url(#pg-tube-x)" />
      {/* Top cap */}
      <ellipse cx="14" cy="2" rx="4" ry="1.6" fill="hsl(225 20% 96%)" opacity="0.9" />
      {/* Bottom cap */}
      <ellipse cx="14" cy="998" rx="4" ry="1.6" fill="hsl(225 25% 70%)" opacity="0.6" />

      {/* Mercury fill — clipped to tube, height bound to scroll */}
      <g clipPath="url(#pg-tube-clip)">
        <motion.rect
          x="10"
          y="0"
          width="8"
          height={fillPct}
          fill="url(#pg-merc-x)"
        />
        {/* Animated sheen overlay */}
        <motion.rect
          x="10"
          y="0"
          width="8"
          height={fillPct}
          fill="url(#pg-merc-y)"
          className="pg-liquid-mercury"
          style={{ mixBlendMode: "screen" }}
        />
        {/* Specular highlight stripe */}
        <motion.rect x="13" y="0" width="1.2" height={fillPct} fill="#ffffff" opacity="0.7" />
      </g>
    </svg>
  );
};

/* ---------- 3D SVG Orb ---------- */
const Orb = ({ size = 36, active = false, rimKey = 0 }: { size?: number; active?: boolean; rimKey?: number }) => {
  const id = useRef(`orb-${Math.random().toString(36).slice(2, 9)}`).current;
  return (
    <svg width={size} height={size + 6} viewBox="0 0 60 66" aria-hidden className="overflow-visible">
      <defs>
        <radialGradient id={`${id}-base`} cx="36%" cy="30%" r="68%">
          <stop offset="0%"  stopColor="#ffffff" />
          <stop offset="35%" stopColor="hsl(220 25% 96%)" />
          <stop offset="72%" stopColor="hsl(225 22% 80%)" />
          <stop offset="100%" stopColor="hsl(225 30% 55%)" />
        </radialGradient>
        <radialGradient id={`${id}-term`} cx="78%" cy="82%" r="55%">
          <stop offset="0%"  stopColor="hsl(225 35% 18%)" stopOpacity="0.55" />
          <stop offset="60%" stopColor="hsl(225 35% 18%)" stopOpacity="0.0" />
        </radialGradient>
        <radialGradient id={`${id}-bounce`} cx="22%" cy="88%" r="40%">
          <stop offset="0%"  stopColor="hsl(28 95% 70%)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="hsl(28 95% 70%)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-spec`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(210 90% 75%)" stopOpacity="0.85" />
          <stop offset="50%"  stopColor="#ffffff"          stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(28 95% 70%)"  stopOpacity="0.85" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Contact shadow */}
      <ellipse cx="30" cy="58" rx="16" ry="3.5" fill="hsl(225 30% 15%)" opacity="0.28" filter={`url(#${id}-shadow)`} />
      {/* Sphere base */}
      <circle cx="30" cy="28" r="22" fill={`url(#${id}-base)`} />
      {/* Terminator shadow */}
      <circle cx="30" cy="28" r="22" fill={`url(#${id}-term)`} />
      {/* Bounce light */}
      <circle cx="30" cy="28" r="22" fill={`url(#${id}-bounce)`} />
      {/* Fresnel rim */}
      <circle
        cx="30" cy="28" r="21.3"
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="1.1"
        className={active ? "pg-rim-active" : ""}
        key={rimKey}
        opacity={active ? 1 : 0.55}
      />
      {/* Specular hot spot */}
      <ellipse cx="22" cy="18" rx="7" ry="4.5" fill={`url(#${id}-spec)`} />
      {/* Tiny core sparkle */}
      <circle cx="20" cy="16" r="1.4" fill="#ffffff" />
    </svg>
  );
};

const ProcessGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const lineFill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 80,
    damping: 22,
    mass: 0.6,
  });

  return (
    <section ref={containerRef} className="py-14 md:py-32 surface-elevated relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(225 30% 88% / 0.35), transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-20"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Our Process</p>
          <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mx-auto">
            Strategy to System <span className="text-primary">in Weeks</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" style={{ perspective: "1400px" }}>
          {/* 3D Glass spine */}
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-[28px] md:-translate-x-1/2 pointer-events-none">
            <Spine fill={lineFill} />
          </div>

          <div className="space-y-10 md:space-y-0">
            {steps.map((s, i) => {
              const stepPoint = steps.length === 1 ? 0 : i / (steps.length - 1);
              const revealStart = Math.max(0, stepPoint - 0.13);
              const revealEnd = Math.min(1, stepPoint + 0.08);
              return (
                <StepNode
                  key={s.step}
                  step={s}
                  index={i}
                  isLeft={i % 2 === 0}
                  scrollYProgress={scrollYProgress}
                  revealStart={revealStart}
                  revealEnd={revealEnd}
                  stepPoint={stepPoint}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepNodeProps {
  step: typeof steps[0];
  index: number;
  isLeft: boolean;
  scrollYProgress: MotionValue<number>;
  revealStart: number;
  revealEnd: number;
  stepPoint: number;
}

const StepNode = ({ step, index, isLeft, scrollYProgress, revealStart, revealEnd, stepPoint }: StepNodeProps) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [revealStart, revealEnd], [36, 0]);
  const rotateX = useTransform(scrollYProgress, [revealStart, revealEnd], [10, 0]);
  const rotateYIn = useTransform(scrollYProgress, [revealStart, revealEnd], [-14, 0]);
  const scale = useTransform(scrollYProgress, [revealStart, revealEnd], [0.96, 1]);

  const activePeak = Math.min(0.96, Math.max(0.04, stepPoint));
  const activeStart = Math.max(0, activePeak - 0.08);
  const activeEnd = Math.min(1, activePeak + 0.1);

  const rawOrbScale = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.95, 1.18, 1.04]);
  const orbScale = useSpring(rawOrbScale, { stiffness: 200, damping: 18, mass: 0.6 });

  const [isActive, setIsActive] = useState(false);
  const [rimKey, setRimKey] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const inside = v >= activeStart && v <= activeEnd;
      setIsActive((prev) => {
        if (inside && !prev) setRimKey((k) => k + 1);
        return inside;
      });
    });
    return () => unsub();
  }, [scrollYProgress, activeStart, activeEnd]);

  // Desktop tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sTiltX = useSpring(tiltX, { stiffness: 220, damping: 18 });
  const sTiltY = useSpring(tiltY, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 8);
    tiltX.set(-py * 6);
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => { tiltX.set(0); tiltY.set(0); };

  // On mobile, swing in from spine; on desktop, lift+tilt
  const mobileStyle = isMobile
    ? { opacity, y, rotateY: rotateYIn, transformPerspective: 1200, transformOrigin: "0% 50%" }
    : { opacity, y, scale, rotateX, transformPerspective: 1200 };

  return (
    <div className={`relative flex items-start md:items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* 3D orb on the spine */}
      <div className="absolute left-7 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <motion.div style={{ scale: orbScale }} className="relative">
          <Orb size={isMobile ? 36 : 44} active={isActive} rimKey={rimKey} />
        </motion.div>
      </div>

      {/* Card slot spacer (desktop alternating) */}
      <div className="md:w-1/2" />
      <motion.div
        style={mobileStyle}
        className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"} ${isActive ? "pg-card-active" : ""}`}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            rotateX: sTiltX,
            rotateY: sTiltY,
            transformStyle: "preserve-3d",
            background: "linear-gradient(150deg, rgba(255,255,255,0.72), rgba(245,247,251,0.55) 60%, rgba(225,230,240,0.45))",
            boxShadow:
              "0 2px 4px hsl(225 30% 15% / 0.10), 0 12px 28px hsl(225 30% 15% / 0.08), 0 40px 80px hsl(225 30% 15% / 0.06), inset 0 1px 0 rgba(255,255,255,0.95), inset 1px 0 0 rgba(255,255,255,0.6), inset -1px -1px 0 hsl(225 25% 60% / 0.18)",
          }}
          className="pg-card-sheen group relative overflow-hidden rounded-xl md:rounded-2xl border border-white/60 p-4 md:p-6 backdrop-blur-2xl transition-shadow duration-500"
        >
          {/* Cursor highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.55), transparent 60%)" }}
          />
          {/* Reflection of orb on the spine-side corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: isLeft
                ? "radial-gradient(80px circle at 100% 50%, hsl(210 90% 80% / 0.18), transparent 70%)"
                : "radial-gradient(80px circle at 0% 50%, hsl(210 90% 80% / 0.18), transparent 70%)",
            }}
          />
          {/* Top rim light */}
          <span aria-hidden className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

          <div className="relative flex items-center gap-3 mb-2 md:mb-3">
            <div
              className="w-9 h-9 md:w-11 md:h-11 rounded-xl border border-white/70 flex items-center justify-center backdrop-blur-xl"
              style={{
                background: "linear-gradient(140deg, rgba(255,255,255,0.85), rgba(225,230,240,0.55))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -4px 10px hsl(225 30% 30% / 0.10), 0 8px 22px -10px hsl(225 30% 20% / 0.35)",
              }}
            >
              <step.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: ink }} />
            </div>
            <div>
              <span className="font-display font-bold text-[10px] md:text-xs" style={{ color: ink }}>{step.step}</span>
              <h3 className="font-display font-semibold text-sm md:text-lg leading-tight">{step.title}</h3>
            </div>
          </div>
          <p className="relative text-[10px] md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProcessGraph;
