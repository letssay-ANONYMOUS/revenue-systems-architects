import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Layers, Code2, Workflow, Zap, LineChart } from "lucide-react";

const steps = [
  { step: "01", title: "Strategy", desc: "Define goals, map user journeys, plan architecture", icon: Target },
  { step: "02", title: "Design", desc: "Wireframes, UI systems, interaction patterns", icon: Layers },
  { step: "03", title: "Build", desc: "Development, integrations, AI agent training", icon: Code2 },
  { step: "04", title: "Automate", desc: "Workflows, triggers, handoffs between systems", icon: Workflow },
  { step: "05", title: "Optimize", desc: "Refine performance, scale what works", icon: LineChart },
  { step: "06", title: "Launch", desc: "Deploy, monitor, iterate based on real data", icon: Zap },
];

const ProcessGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  // Progress line grows from 0 to 100%
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
            Strategy to System <span className="gradient-text">in Weeks</span>
          </h2>
        </motion.div>

        {/* Timeline graph */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical track line (background) */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <div className="w-full h-full bg-border/40" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: lineHeight,
                background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--accent)))",
                boxShadow: "0 0 12px hsl(var(--primary) / 0.4)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-0">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0;
              // Each step activates at its portion of scroll
              const stepStart = i / steps.length;
              const stepEnd = (i + 0.6) / steps.length;

              return (
                <StepNode
                  key={s.step}
                  step={s}
                  index={i}
                  isLeft={isLeft}
                  scrollYProgress={scrollYProgress}
                  stepStart={stepStart}
                  stepEnd={stepEnd}
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
  scrollYProgress: any;
  stepStart: number;
  stepEnd: number;
}

const StepNode = ({ step, index, isLeft, scrollYProgress, stepStart, stepEnd }: StepNodeProps) => {
  const nodeOpacity = useTransform(scrollYProgress, [stepStart, stepEnd], [0, 1]);
  const nodeY = useTransform(scrollYProgress, [stepStart, stepEnd], [30, 0]);
  const nodeScale = useTransform(scrollYProgress, [stepStart, stepEnd], [0.5, 1]);
  const dotGlow = useTransform(scrollYProgress, [stepStart, stepEnd], [0, 1]);

  return (
    <div className={`relative flex items-start md:items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Dot on the line */}
      <div className="absolute left-5 md:left-1/2 top-1 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <motion.div
          style={{ scale: nodeScale }}
          className="relative"
        >
          <motion.div
            style={{ opacity: dotGlow }}
            className="absolute -inset-3 rounded-full"
            aria-hidden
          >
            <div
              className="w-full h-full rounded-full"
              style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }}
            />
          </motion.div>
          <div
            className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2"
            style={{
              borderColor: "hsl(var(--primary))",
              background: "hsl(var(--background))",
            }}
          />
        </motion.div>
      </div>

      {/* Content card — mobile: always right side; desktop: alternating */}
      <div className="md:w-1/2" />
      <motion.div
        style={{ opacity: nodeOpacity, y: nodeY }}
        className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}`}
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
              <span className="font-display font-bold text-[10px] md:text-xs gradient-text">{step.step}</span>
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
