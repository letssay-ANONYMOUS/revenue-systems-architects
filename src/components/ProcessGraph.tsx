import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Target, Layers, Code2, Workflow, Zap, LineChart } from "lucide-react";

const steps = [
  { step: "01", title: "Strategy", desc: "Define goals, map user journeys, plan architecture", icon: Target },
  { step: "02", title: "Design", desc: "Wireframes, UI systems, interaction patterns", icon: Layers },
  { step: "03", title: "Build", desc: "Development, integrations, AI agent training", icon: Code2 },
  { step: "04", title: "Automate", desc: "Workflows, triggers, handoffs between systems", icon: Workflow },
  { step: "05", title: "Optimize", desc: "Refine performance, scale what works", icon: LineChart },
  { step: "06", title: "Launch", desc: "Deploy, monitor, iterate based on real data", icon: Zap },
];

const timelineCore = "#fff9fc";
const timelineGlass = "#f7e3ef";
const timelineEdge = "#eac0d7";
const timelineAura = "rgba(255, 224, 240, 0.74)";
const timelineInk = "#3d3140";

const ProcessGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 h-full w-full origin-top"
              style={{
                scaleY: lineScaleY,
                background: `linear-gradient(180deg, rgba(255,249,252,0.98), ${timelineGlass} 46%, ${timelineEdge})`,
                boxShadow: `0 0 18px ${timelineAura}, 0 0 42px rgba(255,245,250,0.42)`,
              }}
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
  const nodeY = useTransform(scrollYProgress, [revealStart, revealEnd], [30, 0]);
  const nodeScale = useTransform(scrollYProgress, [revealStart, revealEnd], [0.96, 1]);

  const activePeak = Math.min(0.96, Math.max(0.04, stepPoint));
  const activeStart = Math.max(0, activePeak - 0.08);
  const activeEnd = Math.min(1, activePeak + 0.1);
  const rawDotScale = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.9, 1.44, 1]);
  const dotScale = useSpring(rawDotScale, {
    stiffness: 170,
    damping: 18,
    mass: 0.72,
    restDelta: 0.001,
  });
  const glowOpacity = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.18, 1, 0.32]);
  const glowScale = useTransform(scrollYProgress, [activeStart, activePeak, activeEnd], [0.8, 2.05, 1.18]);
  const dotShadow = useTransform(glowOpacity, (value) => `0 10px ${18 + value * 22}px rgba(177, 129, 158, ${0.12 + value * 0.18}), inset 0 1px 0 rgba(255,255,255,0.94), inset 0 -7px 14px rgba(117,76,101,${0.07 + value * 0.05})`);

  return (
    <div className={`relative flex items-start md:items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Dot on the line */}
      <div className="absolute left-5 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <motion.div
          style={{ scale: dotScale }}
          className="relative flex h-8 w-8 items-center justify-center rounded-full md:h-9 md:w-9"
        >
          <motion.div
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background: "radial-gradient(circle, rgba(255,255,255,0.76), rgba(255,224,240,0.3) 34%, rgba(234,192,215,0.1) 56%, transparent 74%)",
            }}
            className="absolute -inset-5 rounded-full blur-[0.5px]"
            aria-hidden
          />
          <motion.div
            className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white/70 bg-white/28 backdrop-blur-xl md:h-7 md:w-7"
            style={{
              boxShadow: dotShadow,
            }}
          >
            <span className="absolute inset-[2px] rounded-full border border-white/52 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(247,227,239,0.5)_46%,rgba(255,255,255,0.24))] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-5px_10px_rgba(117,76,101,0.075)]" />
            <span
              className="relative h-2.5 w-2.5 rounded-full md:h-3 md:w-3"
              style={{
                background: `radial-gradient(circle at 34% 28%, #ffffff 0%, ${timelineCore} 32%, ${timelineGlass} 72%, ${timelineEdge} 100%)`,
                boxShadow: "0 0 16px rgba(255,249,252,0.92), 0 0 28px rgba(247,227,239,0.54), inset 0 1px 2px rgba(255,255,255,0.96)",
              }}
            />
          </motion.div>
          <motion.div
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              borderColor: "rgba(255, 225, 242, 0.58)",
              boxShadow: "0 0 18px rgba(255,224,240,0.46), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
            className="absolute -inset-2 rounded-full border"
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Content card — mobile: always right side; desktop: alternating */}
      <div className="md:w-1/2" />
      <motion.div
        style={{ opacity: nodeOpacity, y: nodeY, scale: nodeScale }}
        className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}`}
      >
        <div
          className="group rounded-xl md:rounded-2xl border border-border p-4 md:p-6 transition-all duration-500 hover:border-primary/20"
          style={{ background: "hsl(var(--card))" }}
        >
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl border border-white/60 bg-white/38 flex items-center justify-center shadow-[0_12px_34px_rgba(49,64,82,0.08),inset_0_1px_0_rgba(255,255,255,0.78),inset_0_-1px_0_rgba(49,64,82,0.06)] backdrop-blur-xl transition-colors group-hover:bg-white/52">
              <step.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: timelineInk }} />
            </div>
            <div>
              <span className="font-display font-bold text-[10px] md:text-xs" style={{ color: timelineInk }}>{step.step}</span>
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
