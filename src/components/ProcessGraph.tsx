import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { Target, Layers, Code2, Workflow, Zap, LineChart } from "lucide-react";

const steps = [
  { step: "01", title: "Strategy", desc: "Define goals, map user journeys, plan architecture", icon: Target },
  { step: "02", title: "Design", desc: "Wireframes, UI systems, interaction patterns", icon: Layers },
  { step: "03", title: "Build", desc: "Development, integrations, AI agent training", icon: Code2 },
  { step: "04", title: "Automate", desc: "Workflows, triggers, handoffs between systems", icon: Workflow },
  { step: "05", title: "Optimize", desc: "Refine performance, scale what works", icon: LineChart },
  { step: "06", title: "Launch", desc: "Deploy, monitor, iterate based on real data", icon: Zap },
];

const timelineBlue = "#1447d4";
const timelineDeepBlue = "#082a96";

const ProcessGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  // Spring-smoothed progress — eliminates jitter on both directions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-14 md:py-32 surface-elevated relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.04), transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
        {/* Header */}
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

        {/* Timeline graph */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical track line (background) */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <div className="w-full h-full bg-border/40" />
            {/* Animated fill — GPU only (transform), no shadow repaint */}
            <motion.div
              className="absolute top-0 left-0 h-full w-full origin-top transform-gpu"
              style={{
                scaleY: lineScaleY,
                background: `linear-gradient(180deg, ${timelineBlue}, ${timelineDeepBlue})`,
                willChange: "transform",
              }}
            />
            {/* Static soft glow behind the line — no per-frame repaint */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-full origin-top transform-gpu blur-[6px] opacity-60"
              style={{
                scaleY: lineScaleY,
                background: `linear-gradient(180deg, ${timelineBlue}, ${timelineDeepBlue})`,
                willChange: "transform",
              }}
              aria-hidden
            />
          </div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-0">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0;
              const stepPoint = steps.length === 1 ? 0 : i / (steps.length - 1);
              const revealStart = Math.max(0, stepPoint - 0.13);
              const revealEnd = Math.min(1, stepPoint + 0.08);

              return (
                <StepNode
                  key={s.step}
                  step={s}
                  isLeft={isLeft}
                  scrollYProgress={smoothProgress}
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
  const nodeY = useTransform(scrollYProgress, [revealStart, revealEnd], [30, 0]);
  const nodeScale = useTransform(scrollYProgress, [revealStart, revealEnd], [0.96, 1]);

  const activePeak = Math.min(0.96, Math.max(0.04, stepPoint));
  const activeStart = Math.max(0, activePeak - 0.08);
  const activeEnd = Math.min(1, activePeak + 0.1);
  const dotScale = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.86, 1.18, 1]);
  const glowOpacity = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0, 1, 0.22]);
  const glowScale = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.7, 1.75, 1.05]);

  return (
    <div className={`relative flex items-start md:items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Dot on the line */}
      <div className="absolute left-5 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <motion.div
          style={{ scale: dotScale, willChange: "transform" }}
          className="relative transform-gpu"
        >
          <motion.div
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background: "radial-gradient(circle, rgba(20, 71, 212, 0.18), rgba(20, 71, 212, 0.08) 34%, transparent 68%)",
              willChange: "transform, opacity",
            }}
            className="absolute -inset-4 rounded-full transform-gpu"
            aria-hidden
          />
          <div
            className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2"
            style={{
              borderColor: timelineBlue,
              background: "hsl(var(--background))",
              boxShadow: "0 0 12px rgba(20, 71, 212, 0.28)",
            }}
          />
          <motion.div
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              borderColor: "rgba(20, 71, 212, 0.48)",
              willChange: "transform, opacity",
            }}
            className="absolute -inset-3 rounded-full border transform-gpu"
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Content card — mobile: always right side; desktop: alternating */}
      <div className="md:w-1/2" />
      <motion.div
        style={{ opacity: nodeOpacity, y: nodeY, scale: nodeScale, willChange: "transform, opacity" }}
        className={`ml-10 md:ml-0 md:w-1/2 transform-gpu ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}`}
      >
        <div
          className="group rounded-xl md:rounded-2xl border border-border p-4 md:p-6 transition-all duration-500 hover:border-primary/20"
          style={{ background: "hsl(var(--card))" }}
        >
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <step.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div>
              <span className="font-display font-bold text-[10px] md:text-xs text-primary">{step.step}</span>
              <h3 className="font-display font-semibold text-sm md:text-lg leading-tight">{step.title}</h3>
            </div>
          </div>
          <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessGraph;
