import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

const caseStudies = [
  {
    tag: "Hospitality",
    metric: "3x",
    label: "More Bookings",
    title: "Premium Café Chain",
    detail: "95% call answer rate",
  },
  {
    tag: "Healthcare",
    metric: "30s",
    label: "Response Time",
    title: "Medical Clinic Network",
    detail: "40% fewer missed appointments",
  },
  {
    tag: "Real Estate",
    metric: "2x",
    label: "Qualified Leads",
    title: "Real Estate Agency",
    detail: "50% faster follow-up",
  },
];

interface LiquidCaseStudyCardProps {
  caseStudy: (typeof caseStudies)[number];
  index: number;
  progress: MotionValue<number>;
}

const LiquidCaseStudyCard = ({ caseStudy, index, progress }: LiquidCaseStudyCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const ribbonId = `liquid-ribbon-${caseStudy.tag.toLowerCase().replace(/\s+/g, "-")}`;
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 130, damping: 28, mass: 0.58 });
  const springY = useSpring(pointerY, { stiffness: 130, damping: 28, mass: 0.58 });

  const scrollStart = 0.04 + index * 0.075;
  const scrollPeak = 0.24 + index * 0.09;
  const scrollEnd = 0.82;
  const entryY = useTransform(progress, [0, scrollStart, scrollPeak], [58, 18, 0]);
  const entryOpacity = useTransform(progress, [scrollStart, scrollPeak], [0, 1]);
  const scrollScaleX = useTransform(progress, [scrollStart, scrollPeak, scrollEnd], [0.972, 1.006, 0.998]);
  const scrollScaleY = useTransform(progress, [scrollStart, scrollPeak, scrollEnd], [1.028, 0.996, 1.006]);
  const scrollRotate = useTransform(progress, [scrollStart, scrollPeak, scrollEnd], [index === 0 ? -1.3 : index === 2 ? 1.3 : 0.35, 0, index === 1 ? -0.28 : 0.28]);
  const scrollHighlightX = useTransform(progress, [0, 1], ["10%", "92%"]);

  const rotateY = useSpring(useTransform(springX, [0, 1], [-4.2, 4.2]), { stiffness: 150, damping: 28 });
  const rotateX = useSpring(useTransform(springY, [0, 1], [3.4, -3.4]), { stiffness: 150, damping: 28 });

  useEffect(() => {
    const unsubscribeX = springX.on("change", (value) => {
      cardRef.current?.style.setProperty("--cursor-x", `${value * 100}%`);
    });
    const unsubscribeY = springY.on("change", (value) => {
      cardRef.current?.style.setProperty("--cursor-y", `${value * 100}%`);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.article
      ref={cardRef}
      className="liquid-case-card group relative min-h-[360px] overflow-visible p-6 text-left text-[#1b2028] sm:min-h-[395px] md:min-h-[455px] md:p-8 xl:min-h-[482px] xl:p-10"
      style={{
        y: reduceMotion ? 0 : entryY,
        opacity: reduceMotion ? 1 : entryOpacity,
        scaleX: reduceMotion ? 1 : scrollScaleX,
        scaleY: reduceMotion ? 1 : scrollScaleY,
        rotateZ: reduceMotion ? 0 : scrollRotate,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        "--case-highlight-x": scrollHighlightX,
      } as CSSProperties & { "--case-highlight-x": MotionValue<string> }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.01,
              transition: { type: "spring", stiffness: 190, damping: 28, mass: 0.74 },
            }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="liquid-case-card__backplate liquid-case-card__backplate--one" aria-hidden="true" />
      <div className="liquid-case-card__backplate liquid-case-card__backplate--two" aria-hidden="true" />
      <div className="liquid-case-card__clip" aria-hidden="true" />
      <div className="liquid-case-card__thickness liquid-case-card__thickness--left" aria-hidden="true" />
      <div className="liquid-case-card__thickness liquid-case-card__thickness--right" aria-hidden="true" />
      <div className="liquid-case-card__thickness liquid-case-card__thickness--bottom" aria-hidden="true" />
      <div className="liquid-case-card__sheen" aria-hidden="true" />
      <div className="liquid-case-card__blob" aria-hidden="true" />
      <div className="liquid-case-card__lens" aria-hidden="true" />
      <div className="liquid-case-card__edge" aria-hidden="true" />
      <div className="liquid-case-card__inner-rim" aria-hidden="true" />
      <svg
        className="liquid-case-card__ribbon"
        viewBox="0 0 520 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={ribbonId} x1="120" y1="32" x2="430" y2="498" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.86" />
            <stop offset="0.22" stopColor="#ffdbe9" stopOpacity="0.74" />
            <stop offset="0.48" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="0.74" stopColor="#f5a9c4" stopOpacity="0.52" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.78" />
          </linearGradient>
          <filter id={`${ribbonId}-blur`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>
        <path
          className="liquid-case-card__ribbon-glow"
          d="M412 38C333 68 315 130 364 181C415 233 359 290 290 326C220 362 235 431 405 468"
          stroke={`url(#${ribbonId})`}
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
          filter={`url(#${ribbonId}-blur)`}
        />
        <path
          d="M414 42C337 72 320 130 367 179C414 229 362 286 295 321C230 355 241 419 398 458"
          stroke={`url(#${ribbonId})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(62px)" }}>
        <span className="liquid-case-pill mb-9 w-fit rounded-full border border-white/75 bg-white/30 px-4 py-2 text-sm font-semibold text-[#6a7280] shadow-[0_14px_32px_rgba(68,72,82,0.1),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(87,68,78,0.12)] backdrop-blur-2xl md:mb-10 md:text-base xl:px-5 xl:py-2.5">
          {caseStudy.tag}
        </span>

        <div className="flex items-end gap-4 md:gap-5 xl:gap-6">
          <span className="liquid-case-metric font-display text-[5.15rem] font-black leading-[0.78] tracking-[-0.085em] md:text-[6.75rem] xl:text-[7.65rem]">
            {caseStudy.metric}
          </span>
          <span className="mb-2 max-w-[9rem] text-lg font-medium leading-tight text-[#5f6875] md:mb-4 md:text-2xl xl:max-w-[11rem]">
            {caseStudy.label}
          </span>
        </div>

        <div className="liquid-case-divider my-7 h-px md:my-9" />

        <div className="mt-auto">
          <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.04em] text-[#1d2027] md:text-[2rem] xl:text-[2.25rem]">
            {caseStudy.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[#68717e] md:text-lg xl:text-xl">
            {caseStudy.detail}
          </p>

          <div className="liquid-case-divider my-8 h-px" />

          <Link
            to="/case-studies"
            className="inline-flex items-center gap-4 text-base font-semibold text-[#4d5562] transition-colors duration-300 group-hover:text-[#8f6678] md:text-lg xl:text-xl"
          >
            View case study
            <ArrowRight className="h-5 w-5 text-[#d06b90] transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const LiquidCaseStudyCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 82%", "end 24%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  return (
    <div
      ref={sectionRef}
      className="relative left-1/2 w-screen -translate-x-1/2 px-5 sm:px-7 lg:px-9"
      style={{ perspective: "1600px" }}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[30rem] bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,237,246,0.34),transparent_70%)]" />
      <div className="mx-auto grid max-w-[1530px] grid-cols-1 gap-7 md:gap-8 lg:grid-cols-3 xl:gap-10">
        {caseStudies.map((caseStudy, index) => (
          <LiquidCaseStudyCard
            key={caseStudy.title}
            caseStudy={caseStudy}
            index={index}
            progress={smoothProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default LiquidCaseStudyCards;
