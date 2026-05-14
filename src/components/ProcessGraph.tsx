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

/* -------- 3D Glass Cylinder Spine (CSS) -------- */
const Spine = ({ fill }: { fill: MotionValue<number> }) => {
  const fillScaleY = useTransform(fill, (v) => Math.max(0, Math.min(1, v)));
  return (
    <div className="relative w-full h-full">
      {/* Soft contact shadow on the page behind the rod */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[14px] rounded-full"
        style={{
          background: "hsl(225 30% 15% / 0.18)",
          filter: "blur(6px)",
          transform: "translate(-30%, 0)",
        }}
      />
      {/* The glass cylinder body — horizontal gradient gives the cylinder shading */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[10px] rounded-full overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, hsl(225 25% 55% / 0.55) 0%, hsl(225 20% 80%) 18%, #ffffff 50%, hsl(225 22% 82%) 78%, hsl(225 30% 50% / 0.6) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 hsl(225 30% 30% / 0.25), 0 0 1px hsl(225 30% 30% / 0.4)",
        }}
      >
        {/* The mercury fill — vertical scale tied to scroll */}
        <motion.div
          className="absolute inset-x-0 top-0 origin-top"
          style={{ scaleY: fillScaleY, height: "100%" }}
        >
          <div
            className="absolute inset-0 pg-liquid-mercury"
            style={{
              background:
                "linear-gradient(90deg, hsl(210 90% 55% / 0.65) 0%, hsl(220 30% 90%) 22%, #ffffff 50%, hsl(220 25% 88%) 78%, hsl(28 95% 60% / 0.6) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), inset 0 -2px 4px hsl(225 30% 30% / 0.25)",
            }}
          />
          {/* Inner bright streak */}
          <div
            className="absolute top-0 bottom-0 left-[42%] w-[1.5px]"
            style={{ background: "rgba(255,255,255,0.95)", filter: "blur(0.4px)" }}
          />
        </motion.div>
      </div>
      {/* Top end-cap (ellipse) */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[10px] h-[4px] rounded-[50%]"
        style={{ background: "linear-gradient(180deg, #ffffff, hsl(220 20% 88%))", boxShadow: "0 1px 1px hsl(225 30% 30% / 0.2)" }}
      />
      {/* Bottom end-cap */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[10px] h-[4px] rounded-[50%]"
        style={{ background: "linear-gradient(180deg, hsl(225 25% 70%), hsl(225 30% 50%))" }}
      />
    </div>
  );
};

/* -------- True 3D Sphere Orb (SVG) -------- */
const Orb = ({ size = 44, active = false, rimKey = 0 }: { size?: number; active?: boolean; rimKey?: number }) => {
  const id = useRef(`orb-${Math.random().toString(36).slice(2, 9)}`).current;
  const s = size;
  return (
    <svg width={s} height={s + 8} viewBox="0 0 60 68" aria-hidden style={{ overflow: "visible", display: "block" }}>
      <defs>
        {/* The big sphere body — light from upper-left, deep shadow lower-right */}
        <radialGradient id={`${id}-body`} cx="32%" cy="26%" r="78%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="22%"  stopColor="hsl(220 20% 96%)" />
          <stop offset="55%"  stopColor="hsl(225 18% 82%)" />
          <stop offset="82%"  stopColor="hsl(225 28% 55%)" />
          <stop offset="100%" stopColor="hsl(225 35% 32%)" />
        </radialGradient>
        {/* Dark terminator crescent that sells volume */}
        <radialGradient id={`${id}-term`} cx="80%" cy="85%" r="62%">
          <stop offset="0%"   stopColor="hsl(225 40% 8%)" stopOpacity="0.7" />
          <stop offset="55%"  stopColor="hsl(225 40% 8%)" stopOpacity="0.0" />
        </radialGradient>
        {/* Warm bounce light from below-left (page bouncing back) */}
        <radialGradient id={`${id}-bounce`} cx="18%" cy="92%" r="42%">
          <stop offset="0%"   stopColor="hsl(28 95% 70%)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="hsl(28 95% 70%)" stopOpacity="0" />
        </radialGradient>
        {/* Cool sky reflection along the top */}
        <radialGradient id={`${id}-sky`} cx="50%" cy="2%" r="60%">
          <stop offset="0%"   stopColor="hsl(210 95% 75%)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="hsl(210 95% 75%)" stopOpacity="0" />
        </radialGradient>
        {/* Specular hot spot — the shiny dot near top-left */}
        <radialGradient id={`${id}-spec`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="55%"  stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        {/* Fresnel chromatic rim */}
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(210 95% 75%)" stopOpacity="0.95" />
          <stop offset="50%"  stopColor="#ffffff"          stopOpacity="0.45" />
          <stop offset="100%" stopColor="hsl(28 95% 65%)"  stopOpacity="0.95" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Drop / contact shadow under sphere */}
      <ellipse cx="30" cy="60" rx="17" ry="3.6" fill="hsl(225 40% 12%)" opacity="0.32" filter={`url(#${id}-shadow)`} />
      {/* Sphere base */}
      <circle cx="30" cy="28" r="22" fill={`url(#${id}-body)`} />
      {/* Sky reflection */}
      <circle cx="30" cy="28" r="22" fill={`url(#${id}-sky)`} />
      {/* Terminator shadow (volume) */}
      <circle cx="30" cy="28" r="22" fill={`url(#${id}-term)`} />
      {/* Bounce light */}
      <circle cx="30" cy="28" r="22" fill={`url(#${id}-bounce)`} />
      {/* Fresnel rim */}
      <circle
        cx="30" cy="28" r="21.4"
        fill="none"
        stroke={`url(#${id}-rim)`}
        strokeWidth="1.2"
        className={active ? "pg-rim-active" : ""}
        key={rimKey}
        opacity={active ? 1 : 0.6}
      />
      {/* Specular highlight */}
      <ellipse cx="22" cy="17" rx="7" ry="4.5" fill={`url(#${id}-spec)`} />
      {/* Tiny mirror sparkle */}
      <circle cx="20" cy="15" r="1.5" fill="#ffffff" />
      <circle cx="20" cy="15" r="0.7" fill="#ffffff" opacity="0.9" />
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
        style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(225 30% 88% / 0.4), transparent 60%)" }}
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
          {/* 3D Glass spine (anchored over orb column) */}
          <div className="absolute left-7 md:left-1/2 top-2 bottom-2 w-[14px] md:-translate-x-1/2 pointer-events-none">
            <Spine fill={lineFill} />
          </div>

          <div className="space-y-7 md:space-y-0">
            {steps.map((s, i) => {
              const stepPoint = steps.length === 1 ? 0 : i / (steps.length - 1);
              const revealStart = Math.max(0, stepPoint - 0.13);
              const revealEnd = Math.min(1, stepPoint + 0.08);
              return (
                <StepNode
                  key={s.step}
                  step={s}
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
  isLeft: boolean;
  scrollYProgress: MotionValue<number>;
  revealStart: number;
  revealEnd: number;
  stepPoint: number;
}

const StepNode = ({ step, isLeft, scrollYProgress, revealStart, revealEnd, stepPoint }: StepNodeProps) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [revealStart, revealEnd], [36, 0]);
  const rotateX = useTransform(scrollYProgress, [revealStart, revealEnd], [10, 0]);
  const rotateYIn = useTransform(scrollYProgress, [revealStart, revealEnd], [-12, 0]);
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

  const wrapperStyle = isMobile
    ? { opacity, y, rotateY: rotateYIn, transformPerspective: 1200, transformOrigin: "0% 50%" as const }
    : { opacity, y, scale, rotateX, transformPerspective: 1200 };

  return (
    <div className={`relative flex items-center gap-6 md:gap-0 min-h-[88px] md:min-h-[140px] ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* 3D orb on the spine */}
      <div className="absolute left-7 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div style={{ scale: orbScale }} className="relative will-change-transform">
          <Orb size={isMobile ? 40 : 52} active={isActive} rimKey={rimKey} />
        </motion.div>
      </div>

      {/* Desktop spacer */}
      <div className="hidden md:block md:w-1/2" />
      <motion.div
        style={wrapperStyle}
        className={`ml-14 md:ml-0 flex-1 md:flex-none md:w-1/2 ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"} ${isActive ? "pg-card-active" : ""}`}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            rotateX: sTiltX,
            rotateY: sTiltY,
            transformStyle: "preserve-3d",
            background: "linear-gradient(150deg, rgba(255,255,255,0.78), rgba(245,247,251,0.6) 60%, rgba(225,230,240,0.5))",
            boxShadow:
              "0 2px 4px hsl(225 30% 15% / 0.10), 0 12px 28px hsl(225 30% 15% / 0.10), 0 40px 80px hsl(225 30% 15% / 0.07), inset 0 1px 0 rgba(255,255,255,0.95), inset 1px 0 0 rgba(255,255,255,0.6), inset -1px -1px 0 hsl(225 25% 60% / 0.2)",
          }}
          className="pg-card-sheen group relative overflow-hidden rounded-2xl border border-white/60 p-4 md:p-6 backdrop-blur-2xl transition-shadow duration-500"
        >
          {/* Cursor highlight (desktop) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.55), transparent 60%)" }}
          />
          {/* Orb reflection on the spine-side edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: isLeft
                ? "radial-gradient(90px circle at 100% 50%, hsl(210 90% 80% / 0.22), transparent 70%)"
                : "radial-gradient(90px circle at 0% 50%, hsl(210 90% 80% / 0.22), transparent 70%)",
            }}
          />
          {/* Top rim light */}
          <span aria-hidden className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent" />

          <div className="relative flex items-center gap-3 mb-2 md:mb-3">
            <div
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-white/70 flex items-center justify-center backdrop-blur-xl shrink-0"
              style={{
                background: "linear-gradient(140deg, rgba(255,255,255,0.88), rgba(225,230,240,0.55))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -4px 10px hsl(225 30% 30% / 0.12), 0 8px 22px -10px hsl(225 30% 20% / 0.4)",
              }}
            >
              <step.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: ink }} />
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-[10px] md:text-xs" style={{ color: ink }}>{step.step}</span>
              <h3 className="font-display font-semibold text-sm md:text-lg leading-tight">{step.title}</h3>
            </div>
          </div>
          <p className="relative text-[11px] md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProcessGraph;
