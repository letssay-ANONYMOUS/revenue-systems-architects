import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
}

const CTASection = ({
  headline = "Ready to Build Your Revenue System?",
  subtext = "Stop losing leads to slow responses and disconnected tools."
}: CTASectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "center 50%"],
  });
  const flow = useSpring(scrollYProgress, { stiffness: 84, damping: 24, mass: 0.52 });
  const cardY = useTransform(flow, [0, 1], [72, 0]);
  const cardScale = useTransform(flow, [0, 1], [0.94, 1]);
  const cardOpacity = useTransform(flow, [0, 0.35, 1], [0, 0.92, 1]);
  const subtextY = useTransform(flow, [0.38, 0.82], [34, 0]);
  const subtextOpacity = useTransform(flow, [0.35, 0.78], [0, 1]);
  const actionsY = useTransform(flow, [0.56, 1], [36, 0]);
  const actionsOpacity = useTransform(flow, [0.54, 0.92], [0, 1]);
  const headlineLines = headline === "Ready to Build Your Revenue System?"
    ? ["Ready to Build Your", "Revenue System?"]
    : [headline];

  return (
    <section ref={sectionRef} className="relative flex min-h-[132dvh] items-center overflow-hidden bg-[#f6f8fb] py-24 text-[#07101f] md:min-h-[145dvh] md:py-40">
      <SeamlessCTAVideo />

      <div className="relative z-10 mx-auto w-full max-w-[1340px] px-5 md:section-padding">
        <SectionReveal>
          <motion.div
            className="relative isolate mx-auto flex min-h-[520px] flex-col items-center justify-center overflow-visible px-7 py-12 text-center md:min-h-[620px] md:px-16 md:py-20 lg:px-20"
            style={{
              y: cardY,
              scale: cardScale,
              opacity: cardOpacity,
              transformPerspective: 1400,
              transformStyle: "preserve-3d",
            }}
          >
          <div className="relative z-20 flex min-h-[420px] flex-col items-center justify-center md:min-h-[480px]">
            <h2
              className="mb-6 max-w-5xl font-['Cormorant_Garamond'] text-[3.35rem] font-bold leading-[0.84] tracking-normal text-[#07101f] sm:text-[4.2rem] md:mb-8 md:text-[6.15rem] lg:text-[7.05rem]"
              aria-label={headline}
            >
              {headlineLines.map((line, index) => (
                <CTAHeadlineLine key={line} line={line} index={index} progress={flow} />
              ))}
            </h2>
            <motion.p
              className="mx-auto mb-10 max-w-[44rem] font-body text-base font-medium leading-relaxed text-[#243044]/78 md:mb-12 md:text-[1.35rem]"
              style={{ y: subtextY, opacity: subtextOpacity }}
            >
              {subtext}
            </motion.p>
            <motion.div className="flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row" style={{ y: actionsY, opacity: actionsOpacity }}>
              <Link to="/book-a-call" className="premium-btn inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:flex-1 md:px-9 md:py-5">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/case-studies" className="inline-flex items-center justify-center rounded-xl border border-white/56 bg-white/24 px-8 py-4 text-center text-sm font-semibold text-[#07101f] shadow-[0_12px_38px_rgba(14,23,36,0.08),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(7,16,31,0.05)] backdrop-blur-xl transition-all duration-300 hover:bg-white/42 sm:flex-1 md:py-5">
                See Our Work
              </Link>
            </motion.div>
          </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
};

const CTA_VIDEO_SRC = "/cta-croc-generated-video.mp4";
const CTA_VIDEO_FADE_SECONDS = 1.35;
const CTA_VIDEO_FALLBACK_SECONDS = 10;

const SeamlessCTAVideo = () => {
  const primaryRef = useRef<HTMLVideoElement>(null);
  const secondaryRef = useRef<HTMLVideoElement>(null);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);

  useEffect(() => {
    if (window.navigator.userAgent.toLowerCase().includes("jsdom")) return;

    const current = activeLayer === 0 ? primaryRef.current : secondaryRef.current;
    const previous = activeLayer === 0 ? secondaryRef.current : primaryRef.current;
    if (!current) return;

    let switchTimer = 0;
    let stopPreviousTimer = 0;
    let metadataHandler: (() => void) | null = null;

    const fadeMs = CTA_VIDEO_FADE_SECONDS * 1000;
    const play = (video: HTMLVideoElement) => {
      video.muted = true;
      video.playsInline = true;
      const playback = video.play();
      if (playback && typeof playback.catch === "function") {
        void playback.catch(() => undefined);
      }
    };
    const recover = () => {
      if (document.hidden) return;
      if (current.paused || current.ended || current.readyState < 2) {
        if (current.readyState < 2 && current.networkState !== HTMLMediaElement.NETWORK_LOADING) {
          current.load();
        }
        play(current);
      }
    };
    const scheduleNextLayer = () => {
      const duration = Number.isFinite(current.duration) && current.duration > CTA_VIDEO_FADE_SECONDS
        ? current.duration
        : CTA_VIDEO_FALLBACK_SECONDS;
      const switchDelay = Math.max(1200, (duration - CTA_VIDEO_FADE_SECONDS) * 1000);

      switchTimer = window.setTimeout(() => {
        const next = activeLayer === 0 ? secondaryRef.current : primaryRef.current;
        if (next) {
          next.currentTime = 0;
          play(next);
        }
        setActiveLayer(activeLayer === 0 ? 1 : 0);
      }, switchDelay);
    };
    const switchImmediately = () => {
      window.clearTimeout(switchTimer);
      const next = activeLayer === 0 ? secondaryRef.current : primaryRef.current;
      if (next) {
        next.currentTime = 0;
        play(next);
      }
      setActiveLayer(activeLayer === 0 ? 1 : 0);
    };

    play(current);

    if (previous) {
      stopPreviousTimer = window.setTimeout(() => {
        previous.pause();
        previous.currentTime = 0;
      }, fadeMs);
    }

    if (current.readyState >= 1) {
      scheduleNextLayer();
    } else {
      metadataHandler = scheduleNextLayer;
      current.addEventListener("loadedmetadata", metadataHandler, { once: true });
    }

    const heartbeat = window.setInterval(recover, 2400);
    const handleVisibility = () => recover();
    const handleWake = () => recover();
    current.addEventListener("ended", switchImmediately);
    current.addEventListener("stalled", recover);
    current.addEventListener("waiting", recover);
    current.addEventListener("error", recover);
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("pointerdown", handleWake, { passive: true });
    document.addEventListener("touchstart", handleWake, { passive: true });
    window.addEventListener("pageshow", handleWake);
    window.addEventListener("focus", handleWake);

    return () => {
      window.clearTimeout(switchTimer);
      window.clearTimeout(stopPreviousTimer);
      window.clearInterval(heartbeat);
      if (metadataHandler) current.removeEventListener("loadedmetadata", metadataHandler);
      current.removeEventListener("ended", switchImmediately);
      current.removeEventListener("stalled", recover);
      current.removeEventListener("waiting", recover);
      current.removeEventListener("error", recover);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("pointerdown", handleWake);
      document.removeEventListener("touchstart", handleWake);
      window.removeEventListener("pageshow", handleWake);
      window.removeEventListener("focus", handleWake);
    };
  }, [activeLayer]);

  const videoClass = "absolute inset-0 h-full w-full object-cover transition-opacity";
  const videoStyle = {
    transitionDuration: `${CTA_VIDEO_FADE_SECONDS * 1000}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <video
        ref={primaryRef}
        className={`${videoClass} ${activeLayer === 0 ? "opacity-100" : "opacity-0"}`}
        style={videoStyle}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
      >
        <source src={CTA_VIDEO_SRC} type="video/mp4" />
      </video>
      <video
        ref={secondaryRef}
        className={`${videoClass} ${activeLayer === 1 ? "opacity-100" : "opacity-0"}`}
        style={videoStyle}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
      >
        <source src={CTA_VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
};

const CTAHeadlineLine = ({ line, index, progress }: { line: string; index: number; progress: MotionValue<number> }) => {
  const start = 0.12 + index * 0.14;
  const y = useTransform(progress, [start, start + 0.38, 1], [70, 0, -4]);
  const opacity = useTransform(progress, [start, start + 0.26], [0, 1]);
  const rotateX = useTransform(progress, [start, start + 0.38], [-34, 0]);
  const filter = useTransform(progress, [start, start + 0.32], ["blur(10px)", "blur(0px)"]);

  return (
    <motion.span
      aria-hidden="true"
      className="block origin-bottom transform-gpu"
      style={{ y, opacity, rotateX, filter }}
    >
      {line}
    </motion.span>
  );
};

export default CTASection;
