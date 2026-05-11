import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

const bands = [
  {
    number: "01",
    eyebrow: "Answers",
    title: "AI inbound that picks up every call",
    range: [0.0, 0.36] as [number, number],
  },
  {
    number: "02",
    eyebrow: "Automates",
    title: "Workflows that run while you sleep",
    range: [0.18, 0.56] as [number, number],
  },
  {
    number: "03",
    eyebrow: "Accelerates",
    title: "Web & apps engineered to convert",
    range: [0.36, 0.76] as [number, number],
  },
];

interface BandProps {
  band: (typeof bands)[number];
  progress: MotionValue<number>;
  top: string;
}

const Band = ({ band, progress, top }: BandProps) => {
  const y = useTransform(progress, band.range, ["100%", "0%"]);
  const opacity = useTransform(progress, band.range, [0.4, 1]);

  return (
    <motion.div
      className="absolute inset-x-0 h-[33.34dvh] transform-gpu will-change-transform"
      style={{ top, y, opacity }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,24,28,0.78), rgba(10,12,16,0.82))",
          backdropFilter: "blur(28px) saturate(140%)",
          WebkitBackdropFilter: "blur(28px) saturate(140%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Top sheen */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10), transparent 70%)",
          }}
        />
        {/* Soft side vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.35))",
          }}
        />
        {/* Hairline grid texture for glass depth */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1480px] items-center justify-between gap-10 px-8 lg:px-12">
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-white/45">
              {band.number}
            </span>
            <span className="h-px w-12 bg-white/25" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-white/58">
              {band.eyebrow}
            </p>
          </div>
          <h3 className="font-display max-w-[42rem] text-right text-2xl font-medium leading-tight text-white md:text-4xl lg:text-[2.6rem]">
            {band.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const BandReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.5,
    restDelta: 0.001,
  });

  return (
    <section
      ref={ref}
      className="relative hidden h-[220vh] md:block"
      aria-label="Capabilities reveal"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Stage backdrop — subtle so previous section bleeds through until bands cover it */}
        <div className="absolute inset-0 bg-transparent" />

        <Band band={bands[0]} progress={smooth} top="0%" />
        <Band band={bands[1]} progress={smooth} top="33.33%" />
        <Band band={bands[2]} progress={smooth} top="66.66%" />
      </div>
    </section>
  );
};

export default BandReveal;
