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

// Blue palette
const BLUE = "hsl(214 95% 52%)";
const BLUE_SOFT = "hsl(214 95% 62%)";
const BLUE_DEEP = "hsl(220 80% 32%)";

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
        style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(214 95% 60% / 0.08), transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-20"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 md:mb-4" style={{ color: BLUE }}>
            Our Process
          </p>
          <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mx-auto">
            Strategy to System <span style={{ color: BLUE }}>in Weeks</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line — base track */}
          <div
            aria-hidden
            className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: "hsl(214 30% 80% / 0.5)" }}
          />
          {/* Vertical line — animated blue fill */}
          <motion.div
            aria-hidden
            className="absolute left-7 md:left-1/2 top-0 w-[2px] origin-top md:-translate-x-1/2"
            style={{
              scaleY: lineFill,
              height: "100%",
              background: `linear-gradient(180deg, ${BLUE_SOFT}, ${BLUE} 50%, ${BLUE_DEEP})`,
              boxShadow: `0 0 12px ${BLUE} 80, 0 0 24px hsl(214 95% 55% / 0.35)`,
            }}
          />

          <div className="space-y-5 md:space-y-3">
            {steps.map((s, i) => {
              const stepPoint = steps.length === 1 ? 0 : i / (steps.length - 1);
              const revealStart = Math.max(0, stepPoint - 0.13);
              const revealEnd = Math.min(1, stepPoint + 0.08);
              const dotStart = Math.max(0, stepPoint - 0.05);
              const dotEnd = Math.min(1, stepPoint + 0.02);
              return (
                <StepNode
                  key={s.step}
                  step={s}
                  isLeft={i % 2 === 0}
                  scrollYProgress={scrollYProgress}
                  revealStart={revealStart}
                  revealEnd={revealEnd}
                  dotStart={dotStart}
                  dotEnd={dotEnd}
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
  dotStart: number;
  dotEnd: number;
}

const StepNode = ({ step, isLeft, scrollYProgress, revealStart, revealEnd, dotStart, dotEnd }: StepNodeProps) => {
  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [revealStart, revealEnd], [24, 0]);
  const x = useTransform(scrollYProgress, [revealStart, revealEnd], [isLeft ? -16 : 16, 0]);

  // Dot fill activation
  const dotFill = useTransform(scrollYProgress, [dotStart, dotEnd], [0, 1]);
  const dotScale = useSpring(useTransform(dotFill, [0, 1], [0.85, 1.1]), {
    stiffness: 220, damping: 18,
  });

  return (
    <div className={`relative flex items-center gap-5 md:gap-0 min-h-[88px] md:min-h-[120px] ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Dot on the line */}
      <div className="absolute left-7 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          style={{ scale: dotScale }}
          className="relative flex items-center justify-center w-4 h-4 md:w-[18px] md:h-[18px] rounded-full"
        >
          {/* outer halo */}
          <motion.span
            aria-hidden
            style={{ opacity: dotFill }}
            className="absolute inset-[-8px] rounded-full"
          >
            <span
              className="block w-full h-full rounded-full"
              style={{ background: `radial-gradient(circle, ${BLUE}55 0%, transparent 70%)` }}
            />
          </motion.span>
          {/* base ring */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background: "hsl(0 0% 100%)",
              border: "1.5px solid hsl(214 30% 75%)",
              boxShadow: "0 1px 3px hsl(220 30% 20% / 0.12)",
            }}
          />
          {/* filled core (blue) */}
          <motion.span
            aria-hidden
            style={{ opacity: dotFill, scale: dotFill }}
            className="absolute inset-[3px] rounded-full"
          >
            <span
              className="block w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${BLUE_SOFT}, ${BLUE} 60%, ${BLUE_DEEP})`,
                boxShadow: `0 0 10px ${BLUE}, inset 0 1px 0 rgba(255,255,255,0.5)`,
              }}
            />
          </motion.span>
        </motion.div>
      </div>

      {/* Desktop spacer */}
      <div className="hidden md:block md:w-1/2" />

      <motion.div
        style={{ opacity, y, x }}
        className={`ml-12 md:ml-0 flex-1 md:flex-none md:w-1/2 ${isLeft ? "md:pr-10 lg:pr-14" : "md:pl-10 lg:pl-14"}`}
      >
        <div
          className="group relative rounded-2xl border p-4 md:p-6 transition-all duration-500 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(150deg, rgba(255,255,255,0.95), rgba(248,250,255,0.85))",
            borderColor: "hsl(214 40% 88%)",
            boxShadow:
              "0 1px 2px hsl(220 30% 20% / 0.04), 0 8px 24px hsl(214 60% 40% / 0.08), 0 24px 48px hsl(214 60% 40% / 0.06)",
          }}
        >
          {/* subtle blue hairline accent on spine-facing edge */}
          <span
            aria-hidden
            className={`absolute top-3 bottom-3 w-px ${isLeft ? "right-0" : "left-0"}`}
            style={{ background: `linear-gradient(180deg, transparent, ${BLUE} 50%, transparent)` }}
          />

          <div className="relative flex items-start gap-3 mb-2 md:mb-3">
            <div
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(140deg, hsl(214 95% 96%), hsl(214 95% 90%))",
                border: "1px solid hsl(214 80% 85%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 10px hsl(214 80% 50% / 0.15)",
              }}
            >
              <step.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: BLUE_DEEP }} />
            </div>
            <div className="min-w-0">
              <span
                className="font-display font-bold text-[10px] md:text-xs tracking-wider"
                style={{ color: BLUE }}
              >
                {step.step}
              </span>
              <h3 className="font-display font-semibold text-sm md:text-lg leading-tight text-foreground">
                {step.title}
              </h3>
            </div>
          </div>
          <p className="relative text-[11px] md:text-sm text-muted-foreground leading-relaxed">
            {step.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessGraph;
