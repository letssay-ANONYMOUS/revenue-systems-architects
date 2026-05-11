import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  Phone, CalendarCheck, Globe, Smartphone,
  Bot, UserCheck, Clock, BarChart3,
  Zap, Target, Shield, ArrowRight, CheckCircle2, XCircle, TrendingUp,
  Layers, Database,
  Headphones, Send
} from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";
import GradientMesh from "@/components/GradientMesh";
import TiltCard from "@/components/TiltCard";
import LazySection from "@/components/LazySection";
import ProcessGraph from "@/components/ProcessGraph";
import BandReveal from "@/components/BandReveal";
import InboundCallingConsole from "@/components/calling/InboundCallingConsole";
import OutboundAnalyticsPanel from "@/components/calling/OutboundAnalyticsPanel";
import PainPointCard from "@/components/painpoints/PainPointCard";
import MissedCallVisual from "@/components/painpoints/visuals/MissedCallVisual";
import InstantReplyVisual from "@/components/painpoints/visuals/InstantReplyVisual";
import RemindersVisual from "@/components/painpoints/visuals/RemindersVisual";
import LighthouseVisual from "@/components/painpoints/visuals/LighthouseVisual";
import WorkflowNodesVisual from "@/components/painpoints/visuals/WorkflowNodesVisual";
import ConnectedToolsVisual from "@/components/painpoints/visuals/ConnectedToolsVisual";

const painPoints = [
  { icon: XCircle, pain: "Missed calls", solution: "AI answers every call", Visual: MissedCallVisual },
  { icon: Clock, pain: "Slow responses", solution: "Instant voice & chat", Visual: InstantReplyVisual },
  { icon: XCircle, pain: "No-show chaos", solution: "Automated reminders", Visual: RemindersVisual },
  { icon: XCircle, pain: "Weak web presence", solution: "Premium conversion site", Visual: LighthouseVisual },
  { icon: XCircle, pain: "Manual admin", solution: "Automated workflows", Visual: WorkflowNodesVisual },
  { icon: XCircle, pain: "Fragmented tools", solution: "One connected system", Visual: ConnectedToolsVisual },
];

const caseStudies = [
  {
    title: "Premium Café Chain",
    tag: "Hospitality",
    metric: "3x",
    metricLabel: "More Bookings",
    result: "95% call answer rate",
  },
  {
    title: "Medical Clinic Network",
    tag: "Healthcare",
    metric: "30s",
    metricLabel: "Response Time",
    result: "40% fewer missed appointments",
  },
  {
    title: "Real Estate Agency",
    tag: "Real Estate",
    metric: "2x",
    metricLabel: "Qualified Leads",
    result: "50% faster follow-up",
  },
];

const transitionCards = [
  {
    label: "Calls captured",
    value: "97%",
    description: "AI stays on the line when your team is busy.",
    imageSrc: "/calls-captured-card.jpg",
  },
  {
    label: "Bookings lifted",
    value: "3x",
    description: "Qualified leads move straight into scheduled calls.",
    imageSrc: "/bookings-lifted-card.jpg",
  },
  {
    label: "Admin reduced",
    value: "60%",
    description: "Follow-ups, reminders, and routing happen in the background.",
    imageSrc: "",
  },
];

const serviceStackStages = [
  {
    title: "AI Calling",
    description: "Calls answered, qualified, and booked automatically — so every lead gets handled while your team stays focused.",
  },
  {
    title: "Automation",
    description: "Workflows, reminders, routing, and follow-ups move in the background without manual handoffs.",
  },
  {
    title: "Web & Apps",
    description: "Conversion-focused websites and connected systems turn attention into booked calls and measurable revenue.",
  },
];

interface SlidingServicePanelProps {
  stage: typeof serviceStackStages[number];
  index: number;
  progress: MotionValue<number>;
}

const SlidingServicePanel = ({ stage, index, progress }: SlidingServicePanelProps) => {
  const start = 0.1 + index * 0.23;
  const settle = start + 0.13;
  const hold = start + 0.29;
  const exit = start + 0.45;

  const y = useTransform(progress, [start, settle, hold, exit], ["104vh", "31vh", "24vh", "-34vh"]);
  const scale = useTransform(progress, [start, settle, exit], [0.985, 1, 1]);
  const opacity = useTransform(progress, [start - 0.04, start, exit - 0.08, exit], [0, 1, 1, 0.96]);

  return (
    <motion.article
      className="absolute inset-x-0 top-0 flex h-[46vh] will-change-transform items-center justify-center overflow-hidden bg-[#02040a] px-6 text-center text-[#6f9bff] shadow-[0_-22px_80px_rgba(0,0,0,0.32)]"
      style={{
        y,
        scale,
        opacity,
        zIndex: 20 + index,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "linear-gradient(rgba(111,155,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(111,155,255,0.28) 1px, transparent 1px)",
          backgroundSize: "74px 74px",
          maskImage: "radial-gradient(circle at 50% 48%, black, transparent 74%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 48%, black, transparent 74%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2f73ff]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2f73ff]/35 to-transparent" />
      <div className="relative z-10 max-w-4xl">
        <h3 className="service-cut-text text-[clamp(2.7rem,5.4vw,5.8rem)] leading-[0.82] [--cut-color:#1c63ff]">
          {stage.title}
        </h3>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-base leading-snug text-[#9db8ff]">
          {stage.description}
        </p>
      </div>
    </motion.article>
  );
};

const heroHeadlineLines = ["Your Business,", "Answered.", "Automated.", "Accelerated."];
const heroHeadlineEase = [0.25, 0.46, 0.45, 0.94] as const;

const AnimatedHeroHeadline = () => {
  let characterIndex = 0;

  return (
    <h1
      aria-label="Your Business, Answered. Automated. Accelerated."
      className="font-['Cormorant_Garamond'] text-[2.7rem] font-semibold leading-[0.86] tracking-normal text-[#07101f] sm:text-[3.15rem] md:text-[4.35rem] lg:text-[4.85rem]"
      style={{ perspective: "600px" }}
    >
      {heroHeadlineLines.map((line) => (
        <span key={line} className="block">
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={`${line}-${word}`}
              className={`inline-block whitespace-nowrap ${wordIndex === line.split(" ").length - 1 ? "" : "mr-[0.22em]"}`}
            >
              {Array.from(word).map((character, index) => {
                const delay = characterIndex * 0.025;
                characterIndex += 1;

                return (
                  <motion.span
                    key={`${line}-${word}-${character}-${index}`}
                    aria-hidden="true"
                    className="inline-block origin-bottom transform-gpu"
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.5, delay, ease: heroHeadlineEase }}
                  >
                    {character}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

interface RisingCardProps {
  card: (typeof transitionCards)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  anchor: { side: "left" | "right"; vAlign: "top" | "bottom"; offsetX: string; offsetY: string };
}

const RisingCard = ({ card, index, total, progress, anchor }: RisingCardProps) => {
  // Each card rises from below the viewport (y: 110vh) up to its anchored slot.
  // Stagger so each card lands before the next begins to rise.
  const headRoom = 0.06;
  const tail = 0.08;
  const usable = 1 - headRoom - tail;
  const slot = usable / total;
  const enterStart = headRoom + slot * index;
  const enterEnd = enterStart + slot * 0.85;

  const y = useTransform(progress, [enterStart, enterEnd], ["110vh", "0vh"]);
  const scale = useTransform(progress, [enterStart, enterEnd], [0.82, 1]);
  const opacity = useTransform(progress, [enterStart, enterStart + slot * 0.25], [0, 1]);

  const positional: React.CSSProperties = {
    [anchor.side]: anchor.offsetX,
    [anchor.vAlign]: anchor.offsetY,
  } as React.CSSProperties;

  return (
    <motion.article
      className="absolute w-[min(38rem,46vw)] transform-gpu overflow-hidden rounded-[1.35rem] border border-white/45 bg-white/70 p-3 text-left shadow-[0_40px_120px_rgba(20,28,38,0.28),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl will-change-transform"
      style={{ ...positional, y, scale, opacity, zIndex: 10 + index }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/45 bg-[#d5dbe0] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
        {card.imageSrc ? (
          <img
            src={card.imageSrc}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.7),transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.28),rgba(79,91,103,0.2)_48%,rgba(31,40,49,0.18))]">
            <div className="absolute inset-0 opacity-[0.18]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }} />
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full border border-white/45 bg-white/70 px-3 py-1 text-sm font-semibold text-[#101827] shadow-[0_10px_30px_rgba(24,31,39,0.12)] backdrop-blur-xl">
          {card.value}
        </div>
      </div>

      <div className="px-2 pb-2 pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2e3842]/55">
          {card.label}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#2e3842]/72">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
};

// Alternating anchors: bottom-left, top-right, bottom-right — large, overlapping the centered headline.
const CARD_ANCHORS: RisingCardProps["anchor"][] = [
  { side: "left",  vAlign: "bottom", offsetX: "4vw", offsetY: "6vh" },
  { side: "right", vAlign: "top",    offsetX: "4vw", offsetY: "10vh" },
  { side: "right", vAlign: "bottom", offsetX: "8vw", offsetY: "4vh" },
];

const HeroScrollTransition = () => {
  const transitionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.5,
    restDelta: 0.001,
  });
  const headOpacity = useTransform(smooth, [0, 0.05, 0.9, 1], [0, 1, 1, 0.85]);
  const headY = useTransform(smooth, [0, 0.18], [18, 0]);

  return (
    <section
      ref={transitionRef}
      className="relative hidden h-[320vh] md:block"
      aria-label="Rising cards showcase"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[hsl(var(--background))]">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-[5] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-6 text-center transform-gpu"
          style={{ opacity: headOpacity, y: headY }}
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-foreground/55">
            Revenue Systems
          </p>
          <div className="mx-auto mb-4 h-px w-32 bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
          <p className="font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            The quiet layer that catches what your team misses.
          </p>
        </motion.div>

        {transitionCards.map((card, index) => (
          <RisingCard
            key={card.label}
            card={card}
            index={index}
            total={transitionCards.length}
            progress={smooth}
            anchor={CARD_ANCHORS[index % CARD_ANCHORS.length]}
          />
        ))}
      </div>
    </section>
  );
};

const DarkStageShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 35%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.5,
    restDelta: 0.001,
  });

  const headlineY = useTransform(smoothProgress, [0, 1], ["24px", "-24px"]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.85]);
  const ruleScaleX = useTransform(smoothProgress, [0.05, 0.55], [0, 1]);
  const copyOpacity = useTransform(smoothProgress, [0.15, 0.45], [0, 1]);
  const copyY = useTransform(smoothProgress, [0.15, 0.45], [16, 0]);
  const eyebrowOpacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);

  const stages = serviceStackStages;

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
    >
      {/* Soft luxury wash — keeps it on-brand with the off-white system */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,71,212,0.05),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-36 lg:py-44">
        <motion.p
          style={{ opacity: eyebrowOpacity }}
          className="text-[10px] font-semibold uppercase tracking-[0.32em] text-foreground/55 md:text-xs"
        >
          What We Do
        </motion.p>

        <motion.h2
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="mt-6 font-display text-[clamp(2.4rem,7vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-foreground transform-gpu"
        >
          Revenue systems that <span className="italic text-foreground/70 font-serif font-normal">answer, automate,</span> and <span className="italic text-foreground/70 font-serif font-normal">accelerate</span> your business.
        </motion.h2>

        <motion.div
          style={{ scaleX: ruleScaleX }}
          className="mt-10 h-px w-full origin-left bg-foreground/15 transform-gpu"
        />

        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-3 md:gap-8 transform-gpu"
        >
          {stages.map((stage, i) => (
            <div key={stage.title} className="relative">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-foreground/45">
                0{i + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-[1.65rem]">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-xs font-serif text-[15px] leading-relaxed text-foreground/65">
                {stage.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const GrayStageBackdrop = () => (
  <>
    <div className="absolute inset-0 bg-[#687079]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),transparent_16%,transparent_84%,rgba(255,255,255,0.14))]" />
    <div
      className="absolute inset-0 opacity-[0.11]"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(255,255,255,0.24),transparent_32%),radial-gradient(ellipse_at_50%_62%,rgba(38,49,60,0.13),transparent_46%)]" />
  </>
);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="aurora-bg" />
      <Navbar />

      {/* HERO — immediate, no lazy loading */}
      <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden bg-black md:min-h-[132dvh]">
        <video
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-[64%_center]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero-background-framed-pingpong.mp4" type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 pt-20 md:pt-0">
          <div className="mx-auto flex min-h-[100dvh] max-w-[1480px] items-end justify-center px-4 pb-10 sm:px-6 md:min-h-[132dvh] md:items-center md:justify-end md:px-6 md:pb-[20vh] lg:px-8 xl:translate-x-8 2xl:translate-x-12">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-[370px] sm:max-w-[430px] md:max-w-[520px] lg:max-w-[600px]"
            >
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/55 bg-white/55 px-3.5 py-2 shadow-[0_16px_50px_rgba(11,31,79,0.13),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-2xl md:mb-8 md:px-4">
                <span className="hero-signal-dot relative flex h-3 w-3 items-center justify-center">
                  <span className="hero-signal-ring hero-signal-ring-1" />
                  <span className="hero-signal-core" />
                </span>
                <span className="h-px w-9 bg-gradient-to-r from-[#1447d4]/45 to-transparent" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-foreground/70 sm:text-[10px] md:tracking-[0.36em]">
                  AI Automation Studio
                </p>
              </div>

              <AnimatedHeroHeadline />

              <p className="mt-4 max-w-[34rem] text-xs leading-relaxed text-muted-foreground sm:text-sm md:mt-6 md:text-base">
                AI agents, chatbots, websites and automation that capture leads, book appointments, and run your operations.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-8 md:gap-4">
                <Link to="/book-a-call" className="premium-btn inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-[11px] md:px-7 md:py-4 md:text-xs">
                  Book a Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/48 md:text-xs md:tracking-[0.28em]">
                <span className="h-px w-9 bg-foreground/16" />
                <span>Built for businesses that want speed, clarity, and execution.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[#687079] text-white">
        <GrayStageBackdrop />

        <HeroScrollTransition />

        <BandReveal />

        <DarkStageShowcase />

        {/* BUSINESS PAIN */}
        <section className="relative overflow-hidden py-14 md:py-32">
            <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
              <SectionReveal>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/58 mb-2 md:mb-4">Why It Matters</p>
                <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-8 md:mb-16 text-white">
                  Every Missed Call Is a <span className="text-white/72">Missed Sale</span>
                </h2>
              </SectionReveal>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {painPoints.map((pp, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <PainPointCard
                      icon={pp.icon}
                      pain={pp.pain}
                      solution={pp.solution}
                      visual={<pp.Visual />}
                    />
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

        {/* AI CALLING AGENT SHOWCASE — lazy loaded */}
        <LazySection rootMargin="300px" minHeight="500px">
          <section className="py-14 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
              <SectionReveal>
                <div className="text-center mb-8 md:mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/18 bg-white/10 mb-4 md:mb-6">
                    <Headphones className="w-3 h-3 text-white/70" />
                    <span className="text-[10px] md:text-xs font-medium text-white/70">Featured Product</span>
                  </div>
                  <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mx-auto mb-3 md:mb-6 text-white">
                    AI Calling Agents That <span className="text-white/72">Work While You Sleep</span>
                  </h2>
                </div>
              </SectionReveal>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Inbound */}
              <SectionReveal>
                <TiltCard>
                  <div className="h-full rounded-xl border border-white/35 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] md:rounded-2xl md:p-8">
                    <InboundCallingConsole />
                  </div>
                </TiltCard>
              </SectionReveal>

              {/* Outbound */}
              <SectionReveal delay={0.15}>
                <TiltCard>
                  <div className="h-full rounded-xl border border-white/35 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] md:rounded-2xl md:p-8">
                    <OutboundAnalyticsPanel />
                  </div>
                </TiltCard>
              </SectionReveal>
            </div>

            {/* Call flow pipeline */}
            <SectionReveal delay={0.2}>
              <div className="mt-6 overflow-hidden rounded-xl border border-white/35 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] md:mt-16 md:rounded-2xl md:p-10">
                <h4 className="font-display font-semibold text-xs md:text-lg mb-4 md:mb-8 text-center">How a Call Flows</h4>
                <div className="flex items-center justify-between gap-1 md:gap-0">
                  {[
                    { label: "Call", icon: Phone, color: "primary" },
                    { label: "AI Answers", icon: Bot, color: "primary" },
                    { label: "Qualifies", icon: UserCheck, color: "accent" },
                    { label: "Books", icon: CalendarCheck, color: "primary" },
                    { label: "Confirms", icon: Send, color: "accent" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1 md:gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                          className={`w-9 h-9 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center cursor-default ${
                            step.color === "primary" ? "bg-primary/10 border-primary/20" : "bg-accent/10 border-accent/20"
                          }`}
                        >
                          <step.icon className={`w-3.5 h-3.5 md:w-5 md:h-5 ${step.color === "primary" ? "text-primary" : "text-accent"}`} />
                        </motion.div>
                        <p className="text-[8px] md:text-xs font-medium text-center">{step.label}</p>
                      </div>
                      {i < 4 && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                          className="origin-left"
                        >
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/30 shrink-0" />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <div className="mt-4 md:mt-8 text-center">
              <Link to="/ai-calling-agents" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-white/80 hover:underline group">
                Explore AI Calling Agents <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </LazySection>
      </div>

      {/* CHATBOTS & AUTOMATION — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="400px">
        <section className="py-14 md:py-32 surface-elevated">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
              <SectionReveal>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Chatbots & Automation</p>
                <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                  Instant Replies. <span className="gradient-text">Zero Wait Times.</span>
                </h2>
                <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-8 leading-relaxed hidden md:block">
                  Your chatbot handles FAQs, captures leads, qualifies prospects, and books appointments — while your team closes deals.
                </p>
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-0">
                  {["24/7 replies", "Lead qualification", "Booking flow", "FAQ handling", "CRM sync", "Multi-channel"].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[10px] md:text-sm">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/chatbots-automation" className="inline-flex items-center gap-2 mt-3 md:mt-8 text-xs md:text-sm font-medium text-primary hover:underline group">
                  Learn more <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="rounded-xl md:rounded-2xl border border-border overflow-hidden transform-gpu" style={{ background: "hsl(var(--card))", boxShadow: "0 20px 60px hsl(var(--primary) / 0.08)" }}>
                  <div className="px-3 py-2.5 md:px-4 md:py-3 border-b border-border flex items-center gap-2 md:gap-3">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-semibold">AgentForge Assistant</p>
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-green-500"
                        />
                        <p className="text-[9px] md:text-[10px] text-muted-foreground">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 space-y-2.5 md:space-y-3">
                    {[
                      { from: "bot", text: "Hi. How can I help?" },
                      { from: "user", text: "I'd like to book an appointment." },
                      { from: "bot", text: "What service are you looking for?" },
                      { from: "user", text: "Digital presence for my restaurant." },
                      { from: "bot", text: "Tuesday 10 AM or Thursday 2 PM?" },
                    ].map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.12 }}
                        className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] rounded-xl px-3 py-2 ${
                          msg.from === "user" ? "bg-primary/10 rounded-br-sm" : "bg-secondary rounded-bl-sm"
                        }`}>
                          <p className="text-[10px] md:text-xs leading-relaxed">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="px-3 py-2.5 md:px-4 md:py-3 border-t border-border flex items-center gap-2">
                    <div className="flex-1 rounded-full border border-border px-3 py-1.5 md:py-2">
                      <p className="text-[9px] md:text-[10px] text-muted-foreground">Type a message...</p>
                    </div>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center">
                      <Send className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </LazySection>

      {/* WEBSITES & APPS — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="400px">
        <section className="py-14 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Websites & Apps</p>
              <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-3 md:mb-6">
                Built to <span className="gradient-text">Convert</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="mb-8 md:mb-16 flex justify-center items-end gap-3 md:gap-8">
                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="w-[90px] md:w-[180px] rounded-xl md:rounded-2xl border-2 border-border overflow-hidden"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="h-2.5 md:h-4 border-b border-border flex items-center justify-center">
                    <div className="w-6 md:w-8 h-0.5 md:h-1 rounded-full bg-border" />
                  </div>
                  <div className="p-1.5 md:p-2 space-y-1.5 md:space-y-2">
                    <div className="h-8 md:h-14 rounded-md md:rounded-lg bg-accent/20" />
                    <div className="space-y-0.5 md:space-y-1">
                      <div className="h-1 md:h-1.5 rounded bg-foreground/10 w-3/4" />
                      <div className="h-1 md:h-1.5 rounded bg-foreground/10 w-1/2" />
                    </div>
                    <div className="h-4 md:h-8 rounded bg-primary/25" />
                  </div>
                </motion.div>

                {/* Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 max-w-[400px] md:max-w-[500px] rounded-lg md:rounded-xl border-2 border-border overflow-hidden"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="h-3 md:h-6 border-b border-border flex items-center gap-1 px-2 md:px-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-destructive/40" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/40" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/40" />
                  </div>
                  <div className="p-2 md:p-4 space-y-2 md:space-y-3">
                    <div className="flex gap-2 md:gap-3">
                      <div className="flex-1 space-y-1 md:space-y-2">
                        <div className="h-1 md:h-2 rounded bg-foreground/10 w-2/3" />
                        <div className="h-1 md:h-2 rounded bg-foreground/10 w-full" />
                        <div className="h-4 md:h-8 rounded bg-accent/25 w-16 md:w-28 mt-1 md:mt-2" />
                      </div>
                      <div className="w-16 md:w-40 h-14 md:h-28 rounded-md md:rounded-lg bg-primary/15" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 md:gap-2">
                      <div className="h-8 md:h-16 rounded bg-accent/15" />
                      <div className="h-8 md:h-16 rounded bg-primary/15" />
                      <div className="h-8 md:h-16 rounded bg-accent/15" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6">
              {[
                { icon: Globe, title: "Websites", desc: "Premium sites that convert", color: "primary" },
                { icon: Target, title: "Landing Pages", desc: "Campaign-ready pages", color: "accent" },
                { icon: CalendarCheck, title: "Booking", desc: "Scheduling with payments", color: "primary" },
                { icon: BarChart3, title: "Dashboards", desc: "Real-time operations", color: "accent" },
                { icon: Smartphone, title: "Apps", desc: "Customer-facing apps", color: "primary" },
                { icon: Database, title: "Backend", desc: "APIs & automation", color: "accent" },
              ].map((item, i) => (
                <SectionReveal key={item.title} delay={i * 0.05}>
                  <TiltCard>
                    <div
                      className={`group rounded-xl md:rounded-2xl border border-border p-3.5 md:p-6 h-full transition-colors duration-500 ${item.color === "accent" ? "hover:border-accent/30" : "hover:border-primary/30"}`}
                      style={{ background: "hsl(var(--card))" }}
                    >
                      <div className={`w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2.5 md:mb-5 ${item.color === "accent" ? "bg-accent/15 group-hover:bg-accent/25" : "bg-primary/10 group-hover:bg-primary/20"} transition-colors`}>
                        <item.icon className={`w-4 h-4 md:w-6 md:h-6 ${item.color === "accent" ? "text-accent" : "text-primary"}`} />
                      </div>
                      <h3 className="font-display font-semibold text-xs md:text-base mb-0.5 md:mb-2">{item.title}</h3>
                      <p className="text-[9px] md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </TiltCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* PROCESS — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <ProcessGraph />
      </LazySection>

      {/* CASE STUDIES — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <section className="py-14 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Results</p>
              <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-8 md:mb-16">
                Real Systems. <span className="gradient-text">Measurable Impact.</span>
              </h2>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-8">
              {caseStudies.map((cs, i) => (
                <SectionReveal key={cs.title} delay={i * 0.1}>
                  <TiltCard>
                    <div
                      className="group rounded-xl md:rounded-2xl border border-border h-full flex flex-col overflow-hidden hover:border-primary/20 transition-colors duration-500"
                      style={{ background: "hsl(var(--card))" }}
                    >
                      <div className="p-4 md:p-6 border-b border-border relative overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 100%, hsl(var(--primary) / 0.05), transparent)" }} />
                        <span className="text-[9px] md:text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{cs.tag}</span>
                        <div className="mt-3 flex items-baseline gap-1.5">
                          <span className="font-display font-bold text-3xl md:text-5xl gradient-text">{cs.metric}</span>
                          <span className="text-[10px] md:text-xs text-muted-foreground">{cs.metricLabel}</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6 flex flex-col flex-1">
                        <h3 className="font-display font-semibold text-sm md:text-xl mb-1.5 md:mb-3">{cs.title}</h3>
                        <p className="text-[10px] md:text-sm text-muted-foreground flex-1">{cs.result}</p>
                        <Link to="/case-studies" className="inline-flex items-center gap-1.5 mt-3 pt-3 border-t border-border text-[10px] md:text-sm font-medium text-primary hover:underline group/link">
                          View case study <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* WHY US — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <section className="py-14 md:py-32 surface-elevated relative overflow-hidden">
          <GradientMesh />
          <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
              <SectionReveal>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Why Us</p>
                <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                  Business Thinking. <span className="gradient-text">Engineering Execution.</span>
                </h2>
                <p className="text-xs md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-6 hidden md:block">
                  We design revenue systems — where every piece connects, every workflow triggers the next, and your business runs tighter with every passing week.
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:underline group">
                  About us <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <div className="grid grid-cols-2 gap-2.5 md:gap-4">
                  {[
                    { icon: Shield, label: "Strategic", desc: "Business-first" },
                    { icon: Layers, label: "Full-Stack", desc: "Every layer" },
                    { icon: TrendingUp, label: "Growth", desc: "Measurable results" },
                    { icon: Zap, label: "Fast", desc: "Weeks, not months" },
                  ].map((item) => (
                    <TiltCard key={item.label}>
                      <div
                        className="group rounded-xl md:rounded-2xl border border-border flex flex-col items-center text-center p-4 md:p-6 hover:border-primary/20 transition-colors duration-500"
                        style={{ background: "hsl(var(--card))" }}
                      >
                        <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-primary/15 transition-colors">
                          <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <p className="text-xs md:text-sm font-semibold">{item.label}</p>
                        <p className="text-[9px] md:text-[10px] text-muted-foreground">{item.desc}</p>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </LazySection>

      {/* CTA & Footer — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="200px">
        <CTASection />
        <Footer />
      </LazySection>
    </div>
  );
};

export default Index;
