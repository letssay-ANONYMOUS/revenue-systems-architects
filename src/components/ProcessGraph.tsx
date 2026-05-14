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

const timelineInk = "#3d3140";

const ProcessGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const lineScaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 80,
    damping: 22,
    mass: 0.6,
  });

  return (
    <section ref={containerRef} className="py-14 md:py-32 surface-elevated relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.05), transparent 60%)" }}
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
          {/* Glass tube spine */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[10px] md:-translate-x-1/2 pointer-events-none">
            {/* Aura */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[22px] rounded-full blur-[10px] opacity-70"
              style={{ background: "linear-gradient(180deg, rgba(255,224,240,0.0), rgba(247,227,239,0.55), rgba(217,193,234,0.45), rgba(255,224,240,0.0))" }}
            />
            {/* Tube body (track) */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[6px] rounded-full border border-white/70 bg-white/40 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(120,90,120,0.18),0_0_12px_rgba(234,192,215,0.25)]" />
            {/* Inner highlight */}
            <div className="pg-glass-tube absolute inset-y-0 left-1/2 -translate-x-1/2 w-[6px] rounded-full" />
            {/* Liquid fill */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] origin-top rounded-full overflow-hidden"
              style={{ scaleY: lineScaleY, height: "100%" }}
            >
              <div className="pg-liquid-fill absolute inset-0 rounded-full shadow-[0_0_18px_rgba(217,193,234,0.55),0_0_42px_rgba(255,224,240,0.35)]" />
              {/* Specular highlight inside the liquid */}
              <div className="absolute inset-y-0 left-[1px] w-[2px] rounded-full bg-white/85 blur-[0.6px]" />
            </motion.div>
          </div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-0">
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
  const nodeOpacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const nodeY = useTransform(scrollYProgress, [revealStart, revealEnd], [42, 0]);
  const nodeRotateX = useTransform(scrollYProgress, [revealStart, revealEnd], [10, 0]);
  const nodeScale = useTransform(scrollYProgress, [revealStart, revealEnd], [0.95, 1]);

  const activePeak = Math.min(0.96, Math.max(0.04, stepPoint));
  const activeStart = Math.max(0, activePeak - 0.08);
  const activeEnd = Math.min(1, activePeak + 0.1);

  const rawOrbScale = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.92, 1.42, 1.04]);
  const orbScale = useSpring(rawOrbScale, { stiffness: 180, damping: 18, mass: 0.7 });
  const haloOpacity = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.18, 1, 0.36]);
  const haloScale = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.7, 2.2, 1.25]);
  const specRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Active state for ripple + sheen
  const [isActive, setIsActive] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const inside = v >= activeStart && v <= activeEnd;
      setIsActive((prev) => {
        if (inside && !prev) setRippleKey((k) => k + 1);
        return inside;
      });
    });
    return () => unsub();
  }, [scrollYProgress, activeStart, activeEnd]);

  // Mouse tilt (desktop only, no reduced motion)
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sTiltX = useSpring(tiltX, { stiffness: 220, damping: 18 });
  const sTiltY = useSpring(tiltY, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
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
  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className={`relative flex items-start md:items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Glass orb on the spine */}
      <div className="absolute left-5 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <motion.div
          style={{ scale: orbScale }}
          className="relative flex h-9 w-9 items-center justify-center rounded-full md:h-11 md:w-11"
        >
          {/* Outer halo */}
          <motion.div
            style={{
              opacity: haloOpacity,
              scale: haloScale,
              background: "radial-gradient(circle, rgba(255,255,255,0.85), rgba(255,224,240,0.36) 32%, rgba(217,193,234,0.16) 56%, transparent 76%)",
            }}
            className="absolute -inset-6 rounded-full blur-[1px]"
            aria-hidden
          />
          {/* Refraction ring */}
          <motion.div
            style={{ opacity: haloOpacity, scale: haloScale }}
            className="absolute -inset-2 rounded-full border border-white/70 shadow-[0_0_22px_rgba(255,224,240,0.55),inset_0_1px_0_rgba(255,255,255,0.85)]"
            aria-hidden
          />
          {/* Caustic ripple (one-shot on enter) */}
          {isActive && <span key={rippleKey} className="pg-ripple" aria-hidden />}

          {/* Glass sphere */}
          <div
            className="relative h-7 w-7 md:h-8 md:w-8 rounded-full border border-white/80 backdrop-blur-xl"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.98) 0%, rgba(255,249,252,0.88) 28%, rgba(247,227,239,0.7) 60%, rgba(217,193,234,0.55) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -6px 12px rgba(120,80,110,0.18), 0 8px 22px rgba(177,129,158,0.18), 0 0 18px rgba(255,224,240,0.5)",
            }}
          >
            {/* Top specular highlight (rotates with scroll for liquid feel) */}
            <motion.span
              style={{ rotate: specRotate }}
              className="absolute inset-0 rounded-full"
              aria-hidden
            >
              <span className="absolute top-[12%] left-[22%] h-[34%] w-[44%] rounded-full bg-white/85 blur-[2px]" />
            </motion.span>
            {/* Bottom caustic glow */}
            <span
              className="absolute inset-[2px] rounded-full"
              style={{
                background: "radial-gradient(circle at 60% 92%, rgba(217,193,234,0.55), transparent 55%)",
              }}
              aria-hidden
            />
            {/* Core dot */}
            <span
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-2.5 md:w-2.5"
              style={{
                background: "radial-gradient(circle at 35% 30%, #ffffff, #fff9fc 40%, #eac0d7 100%)",
                boxShadow: "0 0 10px rgba(255,249,252,0.95), 0 0 18px rgba(247,227,239,0.6)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Card slot spacer */}
      <div className="md:w-1/2" />
      <motion.div
        style={{ opacity: nodeOpacity, y: nodeY, scale: nodeScale, rotateX: nodeRotateX, transformPerspective: 1200 }}
        className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"} ${isActive ? "pg-card-active" : ""}`}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            rotateX: sTiltX,
            rotateY: sTiltY,
            transformStyle: "preserve-3d",
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.78), rgba(255,249,252,0.62) 60%, rgba(247,227,239,0.5))",
          }}
          className="pg-card-sheen group relative overflow-hidden rounded-xl md:rounded-2xl border border-white/70 p-4 md:p-6 backdrop-blur-2xl shadow-[0_18px_48px_-18px_rgba(120,90,120,0.28),inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(120,90,120,0.08)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-22px_rgba(120,90,120,0.35),inset_0_1px_0_rgba(255,255,255,0.95)]"
        >
          {/* Cursor-tracked highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.55), transparent 60%)",
            }}
          />
          {/* Top rim light */}
          <span aria-hidden className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

          <div className="relative flex items-center gap-3 mb-2 md:mb-3">
            <div
              className="w-9 h-9 md:w-11 md:h-11 rounded-xl border border-white/75 flex items-center justify-center backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-4px_10px_rgba(120,80,110,0.1),0_8px_22px_-10px_rgba(120,90,120,0.35)]"
              style={{ background: "linear-gradient(140deg, rgba(255,255,255,0.85), rgba(247,227,239,0.55))" }}
            >
              <step.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: timelineInk }} />
            </div>
            <div>
              <span className="font-display font-bold text-[10px] md:text-xs" style={{ color: timelineInk }}>{step.step}</span>
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
