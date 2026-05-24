import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue, type Variants } from "framer-motion";
import {
  Phone, CalendarCheck,
  Bot, UserCheck,
  Zap, Shield, ArrowRight, CheckCircle2, TrendingUp,
  Layers,
  Headphones, Send, X, ChevronLeft, ChevronRight, Maximize2
} from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";
import LazySection from "@/components/LazySection";
import MobileQuietLayer from "@/components/mobile/MobileQuietLayer";
import StickyMobileCTA from "@/components/mobile/StickyMobileCTA";
import MobileHeroExtras from "@/components/mobile/MobileHeroExtras";
import { HERO_VIDEO_MOBILE_SOURCES, HERO_VIDEO_SOURCES, SITE_IMAGES } from "@/lib/media";

const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const DesktopPainPointsGrid = lazy(() => import("@/components/DesktopPainPointsGrid"));
const GradientMesh = lazy(() => import("@/components/GradientMesh"));
const ProcessGraph = lazy(() => import("@/components/ProcessGraph"));
const LiquidCaseStudyCards = lazy(() => import("@/components/LiquidCaseStudyCards"));
const InboundCallingConsole = lazy(() => import("@/components/calling/InboundCallingConsole"));
const OutboundAnalyticsPanel = lazy(() => import("@/components/calling/OutboundAnalyticsPanel"));
const MobileCaseRolodex = lazy(() => import("@/components/MobileCaseRolodex"));
const MobileDiagnostic = lazy(() => import("@/components/mobile/MobileDiagnostic"));
const MobileProofStrip = lazy(() => import("@/components/mobile/MobileProofStrip"));
const MobileServiceWorkshop = lazy(() => import("@/components/mobile/MobileServiceWorkshop"));

const transitionCards = [
  {
    label: "Calls captured",
    value: "97%",
    valueTone: "chrome",
    description: "AI stays on the line when your team is busy.",
    imageSrc: SITE_IMAGES.callsCaptured,
    detail: "Live conversations stay handled when your team is busy, so the first response never depends on someone being free.",
  },
  {
    label: "Bookings lifted",
    value: "3x",
    valueTone: "blue",
    description: "Qualified leads move straight into scheduled calls.",
    imageSrc: SITE_IMAGES.bookingsLifted,
    detail: "Qualified prospects move directly from conversation to appointment, with the context preserved for your team.",
  },
  {
    label: "Admin reduced",
    value: "60%",
    valueTone: "blue",
    description: "Follow-ups, reminders, and routing happen in the background.",
    imageSrc: SITE_IMAGES.adminReduced,
    detail: "Follow-ups, reminders, and routing keep moving behind the scenes without adding another manual task list.",
  },
];

type TransitionCard = (typeof transitionCards)[number];

const websiteShowcases = [
  {
    title: "Real Estate",
    eyebrow: "Luxury property website",
    imageSrc: SITE_IMAGES.realEstateWebsite,
    phoneImageSrc: SITE_IMAGES.phoneRealEstateWebsite,
  },
  {
    title: "Cafe Orders",
    eyebrow: "Cafe ordering system",
    imageSrc: SITE_IMAGES.cafeWebsite,
    phoneImageSrc: SITE_IMAGES.phoneCafeWebsite,
  },
  {
    title: "Clinics",
    eyebrow: "Clinic booking system",
    imageSrc: SITE_IMAGES.clinicWebsite,
    phoneImageSrc: SITE_IMAGES.phoneClinicWebsite,
  },
];

const heroHeadlineLines = ["Your Business,", "Answered.", "Automated.", "Accelerated."];
const heroHeadlineEase = [0.25, 0.46, 0.45, 0.94] as const;
const operationalChips = ["Answered", "Booked", "Synced", "Active"];

const AnimatedHeroHeadline = () => {
  let characterIndex = 0;

  return (
    <h1
      aria-label="Your Business, Answered. Automated. Accelerated."
      className="hero-floating-copy-edge font-['Cormorant_Garamond'] text-[2.7rem] font-semibold leading-[0.86] tracking-normal text-[#07101f] sm:text-[3.15rem] md:text-[3.35rem] lg:text-[3.65rem] xl:text-[4.85rem]"
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

interface RisingShowcaseCardProps {
  card: TransitionCard;
  index: number;
  progress: MotionValue<number>;
  onSelect: (card: TransitionCard) => void;
}

const RisingShowcaseCard = ({ card, index, progress, onSelect }: RisingShowcaseCardProps) => {
  const start = 0.12 + index * 0.045;
  const lift = start + 0.16;
  const settled = start + 0.26;
  const opacity = useTransform(progress, [start - 0.035, lift], [0, 1]);
  const x = useTransform(progress, [start, settled], [index === 0 ? -72 : index === 1 ? 0 : 72, 0]);
  const y = useTransform(progress, [start, lift, settled, 0.88], [148, -8, 0, -30]);
  const scale = useTransform(progress, [start, lift, settled], [0.78, 1.045, 1]);
  const rotateX = useTransform(progress, [start, lift, settled], [18, -2.5, 0]);
  const rotateY = useTransform(progress, [start, settled], [index === 0 ? 8 : index === 1 ? 0 : -8, 0]);
  const rotateZ = useTransform(progress, [start, lift, settled], [index === 0 ? -2.8 : index === 1 ? 0.6 : 2.8, index === 0 ? 0.35 : index === 1 ? -0.15 : -0.35, 0]);
  const openCard = () => {
    window.requestAnimationFrame(() => onSelect(card));
  };
  const valuePillClass = card.valueTone === "chrome"
    ? "border-[#b6c4d8]/70 bg-[linear-gradient(135deg,#f8fbff,#cbd7e8_46%,#1447d4)] text-[#07101f] shadow-[0_10px_30px_rgba(20,71,212,0.18),inset_0_1px_0_rgba(255,255,255,0.72)]"
    : "border-[#6ca8ff]/48 bg-[#2f74ff] text-[#07101f] shadow-[0_10px_30px_rgba(21,75,196,0.26),inset_0_1px_0_rgba(196,221,255,0.66)]";

  return (
    <motion.article
      className="group relative cursor-pointer overflow-hidden rounded-[1.65rem] border border-white/46 bg-white/34 p-3 text-left shadow-[0_42px_120px_rgba(20,29,38,0.28),0_16px_42px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(28,39,51,0.08)] backdrop-blur-2xl transition-[filter,box-shadow] duration-500 hover:brightness-[1.025] focus-within:ring-2 focus-within:ring-[#1447d4]/45 focus-within:ring-offset-4 focus-within:ring-offset-white"
      style={{
        opacity,
        x,
        y,
        scale,
        rotateX,
        rotateY,
        rotateZ,
        transformPerspective: 1350,
        transformStyle: "preserve-3d",
      }}
    >
      <button
        type="button"
        aria-label={`Open ${card.label} details`}
        className="absolute inset-0 z-50 rounded-[1.65rem] bg-transparent focus:outline-none"
        style={{ touchAction: "pan-x pan-y pinch-zoom" }}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          openCard();
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.65rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.74),rgba(255,255,255,0.18)_32%,rgba(255,255,255,0.08)_58%,rgba(18,28,39,0.1))]"
        style={{ transform: "translateZ(18px)" }}
      />
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[1.55rem] border border-white/38 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),inset_0_20px_44px_rgba(255,255,255,0.22),inset_0_-26px_42px_rgba(35,45,56,0.08)]"
        style={{ transform: "translateZ(24px)" }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-y-12 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/34 to-transparent blur-[1px]"
        animate={{ x: ["0%", "330%"] }}
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.55,
        }}
        style={{ transform: "translateZ(30px)" }}
      />

      <div
        className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-white/48 bg-[#d5dbe0] shadow-[0_18px_50px_rgba(21,31,41,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]"
        style={{ transform: "translateZ(38px)" }}
      >
        {card.imageSrc ? (
          <img
            src={card.imageSrc}
            alt=""
            className="h-full w-full object-cover saturate-[1.04] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.7),transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.28),rgba(79,91,103,0.2)_48%,rgba(31,40,49,0.18))]">
            <div className="absolute inset-0 opacity-[0.18]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }} />
            <div className="absolute bottom-4 left-4 right-4 rounded-full border border-white/45 bg-white/42 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#2e3842]/58 backdrop-blur-md">
              Image slot
            </div>
          </div>
        )}
        <div className={`absolute right-3 top-3 rounded-full px-3.5 py-1 text-sm font-black tracking-[-0.03em] backdrop-blur-xl ${valuePillClass}`}>
          {card.value}
        </div>
      </div>

      <div
        className="relative px-2 pb-2 pt-4"
        style={{ transform: "translateZ(42px)" }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2e3842]/55">
          {card.label}
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-[#2e3842]/72">
          {card.description}
        </p>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.65rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          transform: "translateZ(46px)",
          background: "radial-gradient(circle at 50% 0%, rgba(20,71,212,0.11), transparent 42%), linear-gradient(135deg, transparent, rgba(255,255,255,0.18))",
        }}
      />
    </motion.article>
  );
};

const isTestMediaEnvironment = () => window.navigator.userAgent.toLowerCase().includes("jsdom");
const shouldUseMobileVideo = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

const ReliableHeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stallTimerRef = useRef<number | null>(null);
  const readyFallbackTimerRef = useRef<number | null>(null);
  const announcedReadyRef = useRef(false);
  const [sources, setSources] = useState(() =>
    shouldUseMobileVideo() ? HERO_VIDEO_MOBILE_SOURCES : HERO_VIDEO_SOURCES
  );
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const source = sources[sourceIndex] ?? sources[0];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateSources = () => {
      setSources(mediaQuery.matches ? HERO_VIDEO_MOBILE_SOURCES : HERO_VIDEO_SOURCES);
      setSourceIndex(0);
      announcedReadyRef.current = false;
    };
    updateSources();
    mediaQuery.addEventListener("change", updateSources);
    return () => mediaQuery.removeEventListener("change", updateSources);
  }, []);

  const clearStallTimer = useCallback(() => {
    if (stallTimerRef.current === null) return;
    window.clearTimeout(stallTimerRef.current);
    stallTimerRef.current = null;
  }, []);

  const clearReadyFallbackTimer = useCallback(() => {
    if (readyFallbackTimerRef.current === null) return;
    window.clearTimeout(readyFallbackTimerRef.current);
    readyFallbackTimerRef.current = null;
  }, []);

  const playVideo = useCallback(() => {
    if (isTestMediaEnvironment()) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    const playback = video.play();
    if (playback && typeof playback.catch === "function") {
      void playback.catch(() => undefined);
    }
  }, []);

  const announceHeroReady = useCallback(() => {
    if (announcedReadyRef.current) return;
    announcedReadyRef.current = true;
    (window as typeof window & { __STERK_HERO_VIDEO_READY__?: boolean }).__STERK_HERO_VIDEO_READY__ = true;
    window.dispatchEvent(new CustomEvent("sterk:hero-video-ready"));
  }, []);

  const resetAndRecoverVideo = useCallback(() => {
    if (isTestMediaEnvironment()) return;
    const video = videoRef.current;
    if (!video) return;

    if (video.error && sourceIndex < sources.length - 1) {
      setSourceIndex((index) => Math.min(index + 1, sources.length - 1));
      return;
    }

    if (video.readyState < 2 && video.networkState !== HTMLMediaElement.NETWORK_LOADING) {
      video.load();
    }

    playVideo();
  }, [playVideo, sourceIndex, sources.length]);

  useEffect(() => {
    if (isTestMediaEnvironment()) {
      setIsReady(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    setIsReady(false);
    clearReadyFallbackTimer();
    video.load();
    playVideo();

    readyFallbackTimerRef.current = window.setTimeout(() => {
      setIsReady(true);
      playVideo();
    }, 2200);

    const markReady = () => {
      clearStallTimer();
      clearReadyFallbackTimer();
      setIsReady(true);
      announceHeroReady();
      playVideo();
    };
    const handleError = () => {
      clearStallTimer();
      if (sourceIndex < sources.length - 1) {
        setSourceIndex((index) => Math.min(index + 1, sources.length - 1));
      }
    };
    const handleStall = () => {
      clearStallTimer();
      stallTimerRef.current = window.setTimeout(resetAndRecoverVideo, 900);
    };
    const handleVisibility = () => {
      if (!document.hidden) resetAndRecoverVideo();
    };
    const handlePageShow = () => resetAndRecoverVideo();
    const handleUserWake = () => playVideo();
    const heartbeat = window.setInterval(() => {
      if (document.hidden) return;
      if (video.paused || video.ended || video.readyState < 2) resetAndRecoverVideo();
    }, 2400);

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStall);
    video.addEventListener("waiting", handleStall);
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("pointerdown", handleUserWake, { passive: true });
    document.addEventListener("touchstart", handleUserWake, { passive: true });
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("focus", handlePageShow);

    return () => {
      clearStallTimer();
      clearReadyFallbackTimer();
      window.clearInterval(heartbeat);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStall);
      video.removeEventListener("waiting", handleStall);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("pointerdown", handleUserWake);
      document.removeEventListener("touchstart", handleUserWake);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("focus", handlePageShow);
    };
  }, [announceHeroReady, clearReadyFallbackTimer, clearStallTimer, playVideo, resetAndRecoverVideo, source, sourceIndex, sources.length]);

  return (
    <div aria-hidden="true" className="pointer-events-none sticky top-0 h-[100svh] min-h-screen w-full overflow-hidden bg-[#f7f9fc]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,rgba(20,71,212,0.12),transparent_36%),linear-gradient(90deg,#f7f9fc_0%,#eef4fb_46%,#ffffff_100%)]" />
      <video
        key={source}
        ref={videoRef}
        src={source}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_center] transition-opacity duration-500 md:object-[48%_center] ${isReady ? "opacity-100" : "opacity-0"}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        fetchPriority="high"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
      />
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="absolute inset-0 grid place-items-center bg-[linear-gradient(90deg,#f7f9fc_0%,#eef4fb_46%,#ffffff_100%)]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative flex flex-col items-center gap-5">
              <motion.div
                className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(20,71,212,0.14),transparent_64%)] blur-2xl"
                animate={{ opacity: [0.42, 0.84, 0.42], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="relative h-16 w-16 rounded-full border border-white/82 bg-white/58 shadow-[0_26px_80px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-12px_26px_rgba(17,24,39,0.06)] backdrop-blur-2xl"
                animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 1.22, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1447d4] shadow-[0_0_22px_rgba(20,71,212,0.78)]" />
                <motion.span
                  className="absolute inset-3 rounded-full border border-[#1447d4]/18"
                  animate={{ scale: [0.82, 1.2], opacity: [0.7, 0] }}
                  transition={{ duration: 1.22, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
              <p className="relative text-[10px] font-semibold uppercase tracking-[0.34em] text-[#111827]/58">Loading intelligence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface RisingCardDetailProps {
  card: TransitionCard;
  onClose: () => void;
}

const RisingCardDetail = ({ card, onClose }: RisingCardDetailProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeDetail = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousOverscroll = body.style.overscrollBehavior;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "contain";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDetail();
    };
    const handleDocumentPress = (event: PointerEvent | MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("[data-card-detail-close]")) return;
      event.preventDefault();
      event.stopPropagation();
      closeDetail();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleDocumentPress, { capture: true });
    document.addEventListener("mousedown", handleDocumentPress, { capture: true });
    document.addEventListener("touchstart", handleDocumentPress, { capture: true });

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousOverscroll;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleDocumentPress, { capture: true });
      document.removeEventListener("mousedown", handleDocumentPress, { capture: true });
      document.removeEventListener("touchstart", handleDocumentPress, { capture: true });
    };
  }, [closeDetail]);

  useEffect(() => {
    const closeButton = closeButtonRef.current;
    if (!closeButton) return;
    const handleClosePress = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      closeDetail();
    };
    closeButton.addEventListener("pointerdown", handleClosePress, { capture: true });
    closeButton.addEventListener("mousedown", handleClosePress, { capture: true });
    closeButton.addEventListener("touchstart", handleClosePress, { capture: true });
    closeButton.addEventListener("click", handleClosePress, { capture: true });
    return () => {
      closeButton.removeEventListener("pointerdown", handleClosePress, { capture: true });
      closeButton.removeEventListener("mousedown", handleClosePress, { capture: true });
      closeButton.removeEventListener("touchstart", handleClosePress, { capture: true });
      closeButton.removeEventListener("click", handleClosePress, { capture: true });
    };
  }, [closeDetail]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] hidden items-end justify-center px-5 pb-[7vh] pt-20 md:flex"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.label} details`}
      initial={{ pointerEvents: "auto" }}
      animate={{ pointerEvents: "auto" }}
      exit={{ pointerEvents: "none" }}
    >
      <motion.div
        aria-hidden="true"
        className="modal-focus-overlay absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.button
        type="button"
        data-card-detail-close
        aria-label="Close card details"
        className="absolute inset-0 cursor-default"
        onPointerDown={(event) => {
          event.preventDefault();
          closeDetail();
        }}
        onClick={closeDetail}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="static-sheet-glass relative w-[min(1320px,95vw)] overflow-hidden rounded-[2.2rem] border border-white/60 bg-white/56 p-4 text-[#111827] shadow-[0_50px_140px_rgba(10,18,30,0.36),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(17,24,39,0.1)]"
        initial={{ y: "104%", scale: 0.96, opacity: 0.96 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: "104%", scale: 0.985, opacity: 0, pointerEvents: "none" }}
        transition={{ type: "spring", stiffness: 132, damping: 25, mass: 0.82 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.24)_42%,rgba(20,71,212,0.08))]" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[1.9rem] border border-white/44 shadow-[inset_0_26px_80px_rgba(255,255,255,0.24)]" />

        <button
          ref={closeButtonRef}
          type="button"
          data-card-detail-close
          aria-label="Close card details"
          className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/68 bg-white/64 text-[#111827]/80 shadow-[0_16px_38px_rgba(14,23,36,0.18),inset_0_1px_0_rgba(255,255,255,0.84),inset_0_-8px_18px_rgba(17,24,39,0.055)] backdrop-blur-xl transition-[background-color,box-shadow,color] duration-300 hover:bg-white/84 hover:text-[#111827]"
          onPointerDownCapture={(event) => {
            event.preventDefault();
            event.stopPropagation();
            closeDetail();
          }}
          onMouseDownCapture={(event) => {
            event.preventDefault();
            event.stopPropagation();
            closeDetail();
          }}
          onTouchStartCapture={(event) => {
            event.preventDefault();
            event.stopPropagation();
            closeDetail();
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10 grid gap-5 lg:grid-cols-[1.65fr_0.8fr]">
          <div className="overflow-hidden rounded-[1.65rem] border border-white/64 bg-[#eef3f7]/68 p-2 shadow-[0_28px_80px_rgba(26,39,55,0.18),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.28rem] bg-white">
              <motion.img
                src={card.imageSrc}
                alt={`${card.label} detail`}
                className="h-full w-full object-contain"
                decoding="async"
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/50 bg-white/34 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/64 bg-white/62 px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
                <span className="h-2 w-2 rounded-full bg-[#1447d4]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#263445]/64">
                  Revenue detail
                </span>
              </div>
              <p className="text-[4.2rem] font-semibold leading-none tracking-[-0.06em] text-[#111827]">
                {card.value}
              </p>
              <h3 className="mt-5 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#111827]">
                {card.label}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-[#2e3842]/72">
                {card.detail}
              </p>
            </div>

            <div className="mt-8 border-t border-[#111827]/10 pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2e3842]/48">
                Click outside or press Escape to close
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const WebsiteShowcaseCarousel = () => {
  const [[activeIndex, direction], setActiveSlide] = useState<[number, number]>([0, 0]);
  const [selectedWebsiteIndex, setSelectedWebsiteIndex] = useState<number | null>(null);
  const [selectedWebsiteDevice, setSelectedWebsiteDevice] = useState<"desktop" | "phone">("desktop");
  const [deviceView, setDeviceView] = useState<"desktop" | "phone">("desktop");
  const active = websiteShowcases[activeIndex];
  const selectedWebsite = selectedWebsiteIndex === null ? null : websiteShowcases[selectedWebsiteIndex];
  const selectedWebsiteImageSrc = selectedWebsiteDevice === "phone" ? selectedWebsite?.phoneImageSrc : selectedWebsite?.imageSrc;
  const activePhoneImageSrc = active.phoneImageSrc ?? active.imageSrc;
  const isAndroidMotion =
    typeof document !== "undefined" && document.documentElement.classList.contains("is-android");
  const androidSafeFilter = (filter: string) => (isAndroidMotion ? "none" : filter);
  const showPrevious = () => setActiveSlide(([current]) => [(current - 1 + websiteShowcases.length) % websiteShowcases.length, -1]);
  const showNext = () => setActiveSlide(([current]) => [(current + 1) % websiteShowcases.length, 1]);
  const showSlide = (index: number) => {
    if (index === activeIndex) return;
    setActiveSlide([index, index > activeIndex ? 1 : -1]);
  };
  const closePreview = useCallback(() => setSelectedWebsiteIndex(null), []);
  const openActivePreview = useCallback((device: "desktop" | "phone" = deviceView) => {
    const previewSrc = device === "phone" ? activePhoneImageSrc : active.imageSrc;
    if (!previewSrc) return;
    setSelectedWebsiteDevice(device);
    setSelectedWebsiteIndex(activeIndex);
  }, [active.imageSrc, activeIndex, activePhoneImageSrc, deviceView]);

  useEffect(() => {
    if (selectedWebsiteIndex === null) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousOverscroll = body.style.overscrollBehavior;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "contain";
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousOverscroll;
    };
  }, [selectedWebsiteIndex]);

  useEffect(() => {
    const preloadLinks: HTMLLinkElement[] = [];
    const adjacentIndex = (activeIndex + 1) % websiteShowcases.length;
    [websiteShowcases[activeIndex], websiteShowcases[adjacentIndex]]
      .flatMap(({ imageSrc, phoneImageSrc }) => [imageSrc, phoneImageSrc])
      .forEach((imageSrc) => {
      if (!imageSrc) return;
      const img = new Image();
      img.decoding = "async";
      img.src = imageSrc;

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = imageSrc;
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    return () => {
      preloadLinks.forEach((link) => link.remove());
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!selectedWebsite) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePreview, selectedWebsite]);

  const panelVariants: Variants = {
    enter: (travelDirection: number) => ({
      x: travelDirection >= 0 ? "132%" : "-132%",
      opacity: 0,
      scale: 0.68,
      rotateY: travelDirection >= 0 ? -18 : 18,
      rotateZ: travelDirection >= 0 ? 1.8 : -1.8,
      filter: androidSafeFilter("blur(18px)"),
      transformOrigin: travelDirection >= 0 ? "100% 50%" : "0% 50%",
    }),
    center: (travelDirection: number) => ({
      x: "0%",
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      filter: androidSafeFilter("blur(0px)"),
      transformOrigin: "50% 50%",
      transition: {
        delay: travelDirection === 0 ? 0 : 0.22,
        duration: isAndroidMotion ? 0.64 : 0.98,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: (travelDirection: number) => ({
      x: travelDirection >= 0 ? "-86%" : "86%",
      opacity: 0,
      scale: 0.62,
      rotateY: travelDirection >= 0 ? 16 : -16,
      rotateZ: travelDirection >= 0 ? -2.2 : 2.2,
      filter: androidSafeFilter("blur(16px)"),
      transformOrigin: travelDirection >= 0 ? "0% 50%" : "100% 50%",
      transition: {
        duration: isAndroidMotion ? 0.44 : 0.68,
        ease: [0.55, 0, 0.1, 1],
      },
    }),
  };

  const phoneScreenVariants: Variants = {
    enter: (travelDirection: number) => ({
      x: travelDirection >= 0 ? "46%" : "-46%",
      opacity: 0,
      scale: 0.975,
      filter: androidSafeFilter("blur(12px)"),
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      filter: androidSafeFilter("blur(0px)"),
      transition: {
        duration: isAndroidMotion ? 0.48 : 0.72,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (travelDirection: number) => ({
      x: travelDirection >= 0 ? "-38%" : "38%",
      opacity: 0,
      scale: 0.985,
      filter: androidSafeFilter("blur(9px)"),
      transition: {
        duration: isAndroidMotion ? 0.32 : 0.48,
        ease: [0.55, 0, 0.1, 1],
      },
    }),
  };

  const phoneLabelVariants: Variants = {
    enter: (travelDirection: number) => ({
      y: travelDirection >= 0 ? 8 : -8,
      opacity: 0,
      filter: androidSafeFilter("blur(6px)"),
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: androidSafeFilter("blur(0px)"),
      transition: {
        duration: 0.34,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (travelDirection: number) => ({
      y: travelDirection >= 0 ? -8 : 8,
      opacity: 0,
      filter: androidSafeFilter("blur(6px)"),
      transition: {
        duration: 0.22,
        ease: [0.55, 0, 0.1, 1],
      },
    }),
  };

  return (
    <>
      <div className="zoom-safe mb-10 flex justify-center overflow-visible py-2 md:mb-18">
        <div className="relative w-full max-w-[1240px]">
          <div className="android-no-filter pointer-events-none absolute -inset-10 rounded-[3.5rem] bg-[radial-gradient(ellipse_at_50%_12%,rgba(255,255,255,0.96),transparent_44%),radial-gradient(ellipse_at_78%_46%,rgba(20,71,212,0.08),transparent_42%),radial-gradient(ellipse_at_18%_70%,rgba(213,170,90,0.08),transparent_38%)] blur-2xl" />

          <div className="relative z-20 mb-6 flex justify-center">
            <div className="android-lite-glass relative inline-flex rounded-full border border-white/78 bg-white/48 p-1 shadow-[0_18px_48px_rgba(20,32,50,0.13),inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-10px_24px_rgba(17,24,39,0.05)] backdrop-blur-2xl backdrop-saturate-150">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.18)_45%,rgba(20,71,212,0.07))]" />
              {(["desktop", "phone"] as const).map((view) => (
                <button
                  key={view}
                  type="button"
                  aria-pressed={deviceView === view}
                  onClick={() => setDeviceView(view)}
                  className={`relative z-10 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                    deviceView === view ? "text-[#111827]" : "text-[#263445]/56 hover:text-[#111827]/82"
                  }`}
                >
                  {deviceView === view && (
                    <motion.span
                      layoutId="website-device-view-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/82 bg-white/72 shadow-[0_12px_30px_rgba(20,32,50,0.13),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-8px_18px_rgba(17,24,39,0.06)]"
                      transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
                    />
                  )}
                  <span className="relative">{view === "desktop" ? "Desktop" : "Phone"}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {deviceView === "desktop" ? (
            <motion.div
              key="desktop-website-preview"
              className="relative"
              initial={{ opacity: 0, y: 18, scale: 0.985, filter: androidSafeFilter("blur(10px)") }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: androidSafeFilter("blur(0px)") }}
              exit={{ opacity: 0, y: -16, scale: 0.985, filter: androidSafeFilter("blur(10px)") }}
              transition={{ duration: isAndroidMotion ? 0.34 : 0.46, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="relative [perspective:1600px]"
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="zoom-safe relative mx-auto aspect-[10/10.15] max-w-[23rem] md:aspect-[16/10.85] md:max-w-none">
                  <AnimatePresence initial={false} custom={direction} mode="sync">
                    <motion.div
                      key={active.title}
                      custom={direction}
                      variants={panelVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      style={{
                        willChange: "transform, opacity, filter",
                        backfaceVisibility: "hidden",
                      }}
                      className="android-lite-glass pointer-events-none absolute inset-0 overflow-hidden rounded-[1.65rem] border border-white/76 bg-white/58 p-2.5 text-left shadow-[0_38px_105px_rgba(24,38,60,0.15),inset_0_1px_0_rgba(255,255,255,0.94),inset_0_-1px_0_rgba(17,24,39,0.05)] backdrop-blur-2xl [transform-style:preserve-3d] md:rounded-[2rem] md:p-3"
                    >
                      <div className="flex h-8 items-center justify-between border-b border-[#111827]/8 px-3 md:h-10 md:px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#efb0a8] shadow-[0_0_10px_rgba(239,176,168,0.45)]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#d8bf82] shadow-[0_0_10px_rgba(216,191,130,0.35)]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#9dd0a8] shadow-[0_0_10px_rgba(157,208,168,0.35)]" />
                        </div>
                        <div className="rounded-full border border-white/76 bg-white/62 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#1d2a3c]/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] md:text-[9px]">
                          {active.eyebrow}
                        </div>
                      </div>

                      <div className="relative h-[calc(100%-2rem)] overflow-hidden rounded-b-[1.25rem] bg-[#07101f] md:h-[calc(100%-2.5rem)] md:rounded-b-[1.6rem]">
                        {active.imageSrc ? (
                          <motion.img
                            src={active.imageSrc}
                            alt={`${active.title} website example`}
                            className="absolute inset-0 h-full w-full object-cover object-top"
                            style={{ objectPosition: active.title === "Real Estate" ? "center 22%" : "center top" }}
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                            initial={false}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_12%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(135deg,#0a1322,#111827_46%,#07101f)]">
                            <div
                              className="absolute inset-0 opacity-[0.22]"
                              style={{
                                backgroundImage: "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                                backgroundSize: "44px 44px",
                              }}
                            />
                            <div className="absolute left-6 top-7 max-w-[23rem] md:left-9 md:top-9">
                              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/48 md:text-[10px]">{active.eyebrow}</p>
                              <p className="font-display text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-white md:text-6xl">
                                {active.title}
                              </p>
                            </div>
                            <div className="absolute bottom-7 left-7 right-7 h-24 rounded-[1.35rem] border border-white/14 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl" />
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,transparent_0%,rgba(7,16,31,0.10)_100%)]" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <button
                    type="button"
                    aria-label={`Expand ${active.title} website preview`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      openActivePreview("desktop");
                    }}
                    className="absolute bottom-5 right-5 z-50 hidden h-12 w-12 items-center justify-center rounded-full border border-white/76 bg-white/70 text-[#111827] opacity-100 shadow-[0_16px_38px_rgba(20,32,50,0.18),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-8px_18px_rgba(17,24,39,0.06)] backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0.5 active:scale-[0.94] active:shadow-[0_7px_18px_rgba(20,32,50,0.15),inset_0_4px_12px_rgba(17,24,39,0.1)] md:bottom-6 md:right-6 md:flex"
                  >
                    <Maximize2 className="h-[1.1rem] w-[1.1rem]" />
                  </button>
                </div>
              </motion.div>

              <div className="absolute left-1 top-1/2 z-30 hidden -translate-y-1/2 p-3 md:-left-2 md:block xl:-left-[4.85rem]">
                <motion.button
                  type="button"
                  data-native-press
                  aria-label="Previous website example"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrevious();
                  }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/78 bg-white/80 text-[#111827] shadow-[0_24px_60px_rgba(20,32,50,0.21),inset_0_1px_0_rgba(255,255,255,0.97),inset_0_-10px_22px_rgba(17,24,39,0.075)] backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-300 hover:-translate-x-0.5 hover:bg-white/94 active:translate-y-0.5 active:scale-[0.965] active:shadow-[0_10px_24px_rgba(20,32,50,0.18),inset_0_4px_12px_rgba(17,24,39,0.1),inset_0_1px_0_rgba(255,255,255,0.84)]"
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={2.35} />
                </motion.button>
              </div>

              <div className="absolute right-1 top-1/2 z-30 hidden -translate-y-1/2 p-3 md:-right-2 md:block xl:-right-[6.05rem]">
                <motion.button
                  type="button"
                  data-native-press
                  aria-label="Next website example"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/78 bg-white/80 text-[#111827] shadow-[0_24px_60px_rgba(20,32,50,0.21),inset_0_1px_0_rgba(255,255,255,0.97),inset_0_-10px_22px_rgba(17,24,39,0.075)] backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-300 hover:translate-x-0.5 hover:bg-white/94 active:translate-y-0.5 active:scale-[0.965] active:shadow-[0_10px_24px_rgba(20,32,50,0.18),inset_0_4px_12px_rgba(17,24,39,0.1),inset_0_1px_0_rgba(255,255,255,0.84)]"
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={2.35} />
                </motion.button>
              </div>

              <div className="mt-5 hidden justify-center gap-2 md:flex">
                {websiteShowcases.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Show ${item.title} website example`}
                    onClick={() => showSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-8 bg-[#111827]" : "w-1.5 bg-[#111827]/18 hover:bg-[#111827]/34"}`}
                  />
                ))}
              </div>
            </motion.div>
            ) : (
            <motion.div
              key="phone-website-preview"
              className="relative mx-auto flex w-full max-w-[390px] flex-col items-center justify-center px-3 pb-2 pt-1 sm:max-w-[430px] md:max-w-[470px] md:px-8"
              initial={{ opacity: 0, y: 22, scale: 0.96, rotateY: -8, filter: androidSafeFilter("blur(12px)") }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0, filter: androidSafeFilter("blur(0px)") }}
              exit={{ opacity: 0, y: -18, scale: 0.965, rotateY: 7, filter: androidSafeFilter("blur(12px)") }}
              transition={{ duration: isAndroidMotion ? 0.38 : 0.54, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                role="button"
                tabIndex={0}
                aria-label={`Open ${active.title} phone website preview`}
                onClick={() => openActivePreview("phone")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") openActivePreview("phone");
                }}
                className="android-lite-glass group relative block w-full max-w-[332px] rounded-[2.6rem] border border-white/80 bg-white/62 p-3 text-left shadow-[0_46px_110px_rgba(24,38,60,0.2),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-12px_28px_rgba(17,24,39,0.06)] backdrop-blur-2xl transition-transform duration-300 active:translate-y-0.5 active:scale-[0.985] sm:max-w-[365px] md:max-w-[335px]"
                style={{ touchAction: "pan-x pan-y pinch-zoom" }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.16)_42%,rgba(20,71,212,0.08))]" />
                <div className="relative rounded-[2.25rem] border border-[#111827]/12 bg-[#0a1020] p-[0.46rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-10px_24px_rgba(255,255,255,0.05),0_16px_38px_rgba(20,32,50,0.14)]">
                  <div className="absolute left-1/2 top-[0.78rem] z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-[#050914] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_10px_rgba(0,0,0,0.28)]" />
                  <div className="relative aspect-[10/19.5] overflow-hidden rounded-[1.82rem] bg-[#07101f]">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                      {activePhoneImageSrc && (
                        <motion.img
                          key={activePhoneImageSrc}
                          custom={direction}
                          variants={phoneScreenVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          src={activePhoneImageSrc}
                          alt={`${active.title} mobile website preview`}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                          style={{ backfaceVisibility: "hidden", willChange: "transform, opacity, filter" }}
                          loading="eager"
                          decoding="async"
                          fetchpriority="high"
                        />
                      )}
                    </AnimatePresence>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(255,255,255,0.22),transparent_22%,transparent_72%,rgba(255,255,255,0.07)),linear-gradient(180deg,rgba(255,255,255,0.12),transparent_20%,transparent_72%,rgba(7,16,31,0.16))]" />
                  </div>
                </div>
                <div className="relative mt-3 flex items-center justify-between px-1">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={active.title}
                      custom={direction}
                      variants={phoneLabelVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#263445]/48">Phone view</p>
                      <p className="mt-1 text-[11px] font-semibold text-[#111827]">{active.title}</p>
                    </motion.div>
                  </AnimatePresence>
                  <Maximize2 className="h-4 w-4 text-[#111827]/72 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </motion.div>

              <div className="relative z-30 mt-4 flex items-center justify-center gap-4 md:mt-5">
                <motion.button
                  type="button"
                  data-native-press
                  aria-label="Previous phone website example"
                  onClick={showPrevious}
                  whileTap={{ y: 1, scale: 0.94 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/78 bg-white/78 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.97),inset_0_-9px_18px_rgba(17,24,39,0.065)] backdrop-blur-2xl md:h-14 md:w-14"
                >
                  <ChevronLeft className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]" strokeWidth={2.35} />
                </motion.button>
                <motion.button
                  type="button"
                  data-native-press
                  aria-label={`Expand ${active.title} phone preview`}
                  onClick={() => openActivePreview("phone")}
                  whileTap={{ y: 1, scale: 0.94 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/78 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-9px_18px_rgba(17,24,39,0.065)] backdrop-blur-2xl md:h-14 md:w-14"
                >
                  <Maximize2 className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]" strokeWidth={2.2} />
                </motion.button>
                <motion.button
                  type="button"
                  data-native-press
                  aria-label="Next phone website example"
                  onClick={showNext}
                  whileTap={{ y: 1, scale: 0.94 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/78 bg-white/78 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.97),inset_0_-9px_18px_rgba(17,24,39,0.065)] backdrop-blur-2xl md:h-14 md:w-14"
                >
                  <ChevronRight className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]" strokeWidth={2.35} />
                </motion.button>
              </div>

              <div className="mt-3 flex justify-center gap-2">
                {websiteShowcases.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Show ${item.title} phone website example`}
                    onClick={() => showSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-8 bg-[#111827]" : "w-1.5 bg-[#111827]/18 hover:bg-[#111827]/34"}`}
                  />
                ))}
              </div>
            </motion.div>
            )}
          </AnimatePresence>

          <div className={`relative z-30 flex flex-col items-center gap-3 md:hidden ${deviceView === "phone" ? "hidden" : "mt-3"}`}>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                type="button"
                data-native-press
                aria-label="Previous website example"
                onClick={showPrevious}
                whileTap={{ y: 1, scale: 0.94 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/78 bg-white/78 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.97),inset_0_-9px_18px_rgba(17,24,39,0.065)] backdrop-blur-2xl"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.35} />
              </motion.button>
              <motion.button
                type="button"
                data-native-press
                aria-label={`Expand ${active.title} ${deviceView} preview`}
                onClick={() => openActivePreview(deviceView)}
                whileTap={{ y: 1, scale: 0.94 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/78 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-9px_18px_rgba(17,24,39,0.065)] backdrop-blur-2xl"
              >
                <Maximize2 className="h-5 w-5" strokeWidth={2.2} />
              </motion.button>
              <motion.button
                type="button"
                data-native-press
                aria-label="Next website example"
                onClick={showNext}
                whileTap={{ y: 1, scale: 0.94 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/78 bg-white/78 text-[#111827] shadow-[0_18px_46px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.97),inset_0_-9px_18px_rgba(17,24,39,0.065)] backdrop-blur-2xl"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.35} />
              </motion.button>
            </div>
            <div className="flex justify-center gap-2">
              {websiteShowcases.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show ${item.title} website example`}
                  onClick={() => showSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex ? "w-8 bg-[#111827]" : "w-1.5 bg-[#111827]/18"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence mode="wait">
          {selectedWebsite && selectedWebsiteImageSrc && (
            <motion.div
              data-lenis-prevent
              key="website-preview"
              className="zoom-safe fixed inset-0 z-[1400] flex items-end justify-center overflow-y-auto px-2 pb-3 pt-8 md:items-center md:px-5 md:py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
              onClick={closePreview}
            >
              <motion.div
                aria-hidden="true"
                className="modal-focus-overlay absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isAndroidMotion ? 0.46 : 0.84, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedWebsite.title} full website preview`}
                className={`zoom-safe static-sheet-glass relative z-10 flex max-h-[calc(100svh-1rem)] w-full flex-col overflow-hidden rounded-[1.95rem] border border-white/76 bg-white/64 p-2.5 shadow-[0_44px_130px_rgba(24,38,60,0.24),inset_0_1px_0_rgba(255,255,255,0.94),inset_0_-1px_0_rgba(17,24,39,0.06)] md:rounded-[2.35rem] md:p-3 ${
                  selectedWebsiteDevice === "phone" ? "max-w-[min(97vw,560px)]" : "max-w-[min(98vw,1720px)]"
                }`}
                initial={{ y: "104%", opacity: 0, scale: 0.94, filter: androidSafeFilter("blur(16px)") }}
                animate={{ y: 0, opacity: 1, scale: 1, filter: androidSafeFilter("blur(0px)") }}
                exit={{ y: "112%", opacity: 0.98, scale: 0.98, filter: androidSafeFilter("blur(8px)") }}
                transition={{ duration: isAndroidMotion ? 0.48 : 0.84, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex h-9 shrink-0 items-center justify-between border-b border-[#111827]/8 px-3 md:h-11 md:px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#efb0a8]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#d8bf82]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#9dd0a8]" />
                  </div>
                  <div className="rounded-full border border-white/76 bg-white/64 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#1d2a3c]/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] md:text-[9px]">
                    {selectedWebsite.eyebrow}
                  </div>
                  <button
                    type="button"
                    aria-label="Close full website preview"
                    onClick={closePreview}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/76 bg-white/66 text-[#111827] shadow-[0_12px_30px_rgba(20,32,50,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-300 hover:bg-white/90 active:translate-y-0.5 active:scale-[0.94] active:shadow-[0_7px_18px_rgba(20,32,50,0.12),inset_0_4px_12px_rgba(17,24,39,0.1)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div
                  className="zoom-safe max-h-[calc(100svh-4.25rem)] overflow-auto overscroll-contain rounded-b-[1.45rem] bg-[#07101f] md:rounded-b-[1.85rem]"
                  style={{ touchAction: "pan-x pan-y pinch-zoom" }}
                >
                  <img
                    src={selectedWebsiteImageSrc}
                    alt={`${selectedWebsite.title} full website design`}
                    className="zoom-safe h-auto w-full max-w-none origin-top"
                    style={{ touchAction: "pan-x pan-y pinch-zoom" }}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

const HeroScrollTransition = () => {
  const transitionRef = useRef<HTMLElement>(null);
  const [selectedCard, setSelectedCard] = useState<TransitionCard | null>(null);
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start 106%", "end 34%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 24,
    mass: 0.72,
    restDelta: 0.001,
  });
  const surfaceOpacity = useTransform(smoothProgress, [0, 0.08, 1], [1, 1, 1]);
  const surfaceY = useTransform(smoothProgress, [0, 0.18, 1], [0, 0, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.08, 0.72], [1, 1, 1]);
  const headerY = useTransform(smoothProgress, [0, 0.2, 0.82], [0, -4, -6]);
  const cardsY = useTransform(smoothProgress, [0, 0.28, 0.9], ["20vh", "4vh", "-7vh"]);
  const sparkOpacity = useTransform(smoothProgress, [0.12, 0.3, 0.52], [0, 0.82, 0]);
  const sparkScale = useTransform(smoothProgress, [0.12, 0.3, 0.52], [0.82, 1, 1.12]);

  return (
    <section
      ref={transitionRef}
      className="relative hidden h-[100svh] min-h-screen overflow-hidden bg-white md:block"
      aria-label="Scroll transition"
    >
      <motion.div
        className="sticky top-0 flex h-[100svh] min-h-screen items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: surfaceOpacity,
            y: surfaceY,
            backgroundImage: "radial-gradient(ellipse at 50% 4%, rgba(255,255,255,0.98), transparent 36%), radial-gradient(ellipse at 21% 36%, rgba(20,71,212,0.08), transparent 32%), radial-gradient(ellipse at 78% 74%, rgba(24,37,54,0.06), transparent 36%), linear-gradient(180deg, #ffffff 0%, #f8fafc 46%, #eef3f7 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.42]"
            style={{
              backgroundImage: "linear-gradient(rgba(16,24,39,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,24,39,0.045) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "linear-gradient(180deg, transparent, black 16%, black 78%, transparent)",
              WebkitMaskImage: "linear-gradient(180deg, transparent, black 16%, black 78%, transparent)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/88 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#eef3f7] via-[#eef3f7]/72 to-transparent" />
          {[
            ["18%", "24%", "0.44rem"],
            ["73%", "29%", "0.36rem"],
            ["61%", "68%", "0.28rem"],
          ].map(([left, top, size]) => (
            <motion.span
              key={`${left}-${top}`}
              className="absolute rounded-full bg-[#1447d4]/38"
              style={{
                left,
                top,
                width: size,
                height: size,
                opacity: sparkOpacity,
                scale: sparkScale,
                boxShadow: "0 0 22px rgba(20,71,212,0.18)",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[8vh] z-30 mx-auto max-w-5xl px-6 text-center"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#141a24]/48">
            STERK.systems
          </p>
          <div className="mx-auto mb-6 h-px w-40 bg-gradient-to-r from-transparent via-[#141a24]/18 to-transparent" />
          <p className="font-display text-3xl font-semibold leading-tight text-[#141a24] md:text-[3.55rem] lg:text-[4.25rem] xl:text-6xl">
            The quiet layer that catches what your team misses.
          </p>
        </motion.div>

        <div className="quiet-layer-card-stage pointer-events-none absolute inset-x-0 top-[50%] z-20 flex justify-center px-6">
          <div className="absolute -top-14 left-[8vw] hidden items-center gap-2 md:flex">
            {["Call captured", "Route synced"].map((label) => (
              <span key={label} className="sterk-status-chip">
                {label}
              </span>
            ))}
          </div>
          <div className="absolute -bottom-14 right-[8vw] hidden items-center gap-2 md:flex">
            {["Follow-up sent", "Booking ready"].map((label) => (
              <span key={label} className="sterk-status-chip">
                {label}
              </span>
            ))}
          </div>
          <motion.div
            className="pointer-events-auto grid w-[min(96rem,96vw)] grid-cols-3 gap-5 lg:gap-7"
            style={{ y: cardsY }}
          >
            {transitionCards.map((card, index) => (
              <RisingShowcaseCard
                key={card.label}
                card={card}
                index={index}
                progress={smoothProgress}
                onSelect={setSelectedCard}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCard && (
          <RisingCardDetail
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="aurora-bg" />
      <div className="sterk-system-thread hidden xl:block" aria-hidden="true" />
      <Navbar />

      {/* HERO — immediate, no lazy loading */}
      <section ref={heroRef} className="mobile-stable-hero relative touch-pan-y overflow-hidden bg-[#f7f9fc]">
        <ReliableHeroVideo />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] min-h-screen pt-20 md:pt-0">
          <div className="hero-copy-shell mx-auto flex h-full max-w-[1480px] items-end justify-center px-4 pb-10 sm:px-6 md:items-end md:justify-end md:px-8 md:pb-[9vh] lg:px-10 lg:pb-[8vh] xl:translate-x-8 xl:px-8 xl:pb-[8vh] 2xl:translate-x-12">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hero-copy-panel pointer-events-auto w-full max-w-[370px] sm:max-w-[430px] md:max-w-[440px] lg:max-w-[470px] xl:max-w-[600px]"
            >
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/55 bg-white/55 px-3 py-2 shadow-[0_16px_50px_rgba(11,31,79,0.13),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-2xl md:mb-5 md:px-3.5 xl:mb-8 xl:gap-3 xl:px-4">
                <span className="hero-signal-dot relative flex h-3 w-3 items-center justify-center">
                  <span className="hero-signal-ring hero-signal-ring-1" />
                  <span className="hero-signal-core" />
                </span>
                <span className="h-px w-9 bg-gradient-to-r from-[#1447d4]/45 to-transparent" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-foreground/70 sm:text-[10px] md:tracking-[0.3em] xl:tracking-[0.36em]">
                  AI Automation Studio
                </p>
              </div>

              <AnimatedHeroHeadline />

              <p className="hero-floating-body-edge mt-4 hidden max-w-[34rem] text-xs leading-relaxed text-muted-foreground sm:text-sm md:mt-5 md:block md:text-[0.95rem] xl:mt-6 xl:text-base">
                AI agents, chatbots, websites and automation that capture leads, book appointments, and run your operations.
              </p>

              <div className="mt-4 hidden flex-wrap gap-2 xl:flex">
                {operationalChips.map((chip) => (
                  <span key={chip} className="sterk-status-chip">
                    {chip}
                  </span>
                ))}
              </div>

              <MobileHeroExtras />

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-6 md:gap-4 xl:mt-8">
                <Link to="/book-a-call" className="premium-btn inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-[11px] md:px-7 md:py-4 md:text-xs">
                  Book a Call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="hero-floating-body-edge android-lite-glass mt-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/55 bg-white/55 px-3 py-2 shadow-[0_16px_50px_rgba(11,31,79,0.11),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-2xl md:mt-6 md:px-3.5 xl:mt-8 xl:gap-3 xl:px-4">
                <span className="hero-signal-dot relative flex h-3 w-3 shrink-0 items-center justify-center">
                  <span className="hero-signal-ring hero-signal-ring-1" />
                  <span className="hero-signal-core" />
                </span>
                <span className="h-px w-7 shrink-0 bg-gradient-to-r from-[#1447d4]/38 to-transparent xl:w-9" />
                <span className="text-[8px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-foreground/58 sm:text-[9px] md:text-[9px] md:tracking-[0.22em] xl:text-[10px] xl:tracking-[0.28em]">
                  Built for businesses that want speed, clarity, and execution.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[#687079] text-white">
        <HeroScrollTransition />
        <MobileQuietLayer cards={transitionCards} />

        {/* BUSINESS PAIN */}
        <section className="relative overflow-hidden bg-[#f7faff] py-14 text-[#0f1730] md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_5%,rgba(210,226,255,0.7),transparent_42%),radial-gradient(ellipse_at_12%_86%,rgba(255,255,255,0.95),transparent_48%),linear-gradient(135deg,#ffffff_0%,#f8fbff_44%,#eef5ff_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage: "linear-gradient(rgba(93,119,174,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(93,119,174,0.045) 1px, transparent 1px)",
              backgroundSize: "68px 68px",
              maskImage: "linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          />
            <div className="mx-auto max-w-[1700px] px-5 md:px-10 lg:px-16 relative z-10">
              <SectionReveal>
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d9e4f6]/80 bg-white/68 px-5 py-2.5 shadow-[0_14px_36px_rgba(46,72,125,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
                  <Zap className="h-3.5 w-3.5 text-[#4358ff]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#4358ff]">Why It Matters</span>
                </div>
                <h2 className="font-display text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#101831] md:text-[3.25rem] lg:text-[4.15rem] xl:text-[5.1rem]">
                  Every Missed Call Is a Missed Sale
                </h2>
                <p className="mb-9 mt-5 max-w-[64rem] text-base leading-relaxed text-[#41517d] md:mb-10 md:text-[1.35rem] xl:text-2xl">
                  AI automation turns missed opportunities into booked appointments and loyal customers.
                </p>
              </SectionReveal>
              {/* Desktop: 6-card grid */}
              <LazySection rootMargin="500px" minHeight="28rem">
                <Suspense fallback={null}>
                  <DesktopPainPointsGrid />
                </Suspense>
              </LazySection>

              {/* Mobile: single tabbed diagnostic */}
              <LazySection rootMargin="500px" minHeight="31rem">
                <Suspense fallback={null}>
                  <MobileDiagnostic />
                </Suspense>
              </LazySection>
            </div>
          </section>

        {/* MOBILE: Proof strip between sections */}
        <LazySection rootMargin="500px" minHeight="4rem">
          <Suspense fallback={null}>
            <MobileProofStrip />
          </Suspense>
        </LazySection>

        {/* MOBILE: Service Workshop replaces 3 service sections */}
        <LazySection rootMargin="500px" minHeight="42rem">
          <Suspense fallback={null}>
            <MobileServiceWorkshop />
          </Suspense>
        </LazySection>

        {/* AI CALLING AGENT SHOWCASE — desktop/tablet only */}
        <LazySection rootMargin="300px" minHeight="500px">
          <section className="hidden md:block py-14 md:py-32 relative">
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
                    <Suspense fallback={null}>
                      <InboundCallingConsole />
                    </Suspense>
                  </div>
                </TiltCard>
              </SectionReveal>

              {/* Outbound */}
              <SectionReveal delay={0.15}>
                <TiltCard>
                  <div className="h-full rounded-xl border border-white/35 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] md:rounded-2xl md:p-8">
                    <Suspense fallback={null}>
                      <OutboundAnalyticsPanel />
                    </Suspense>
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
              <Link to="/book-a-call" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-white/80 hover:underline group">
                Build an AI calling system <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </LazySection>
      </div>

      {/* CHATBOTS & AUTOMATION — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="400px">
        <section className="hidden md:block py-14 md:py-32 surface-elevated">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
              <div className="relative z-10">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Chatbots & Automation</p>
                <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                  Instant Replies. <span className="sterk-chrome-text">Zero Wait Times.</span>
                </h2>
                <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-8 leading-relaxed">
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
                <Link to="/book-a-call" className="inline-flex items-center gap-2 mt-3 md:mt-8 text-xs md:text-sm font-medium text-primary hover:underline group">
                  Build this system <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <SectionReveal delay={0.2}>
                <div className="rounded-xl md:rounded-2xl border border-border overflow-hidden transform-gpu" style={{ background: "hsl(var(--card))", boxShadow: "0 20px 60px hsl(var(--primary) / 0.08)" }}>
                  <div className="px-3 py-2.5 md:px-4 md:py-3 border-b border-border flex items-center gap-2 md:gap-3">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-semibold">Sterk Assistant</p>
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

      {/* WEBSITES & APPS */}
      <section className="relative overflow-hidden bg-[#f7faff] py-14 text-[#101831] md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_10%,rgba(210,226,255,0.66),transparent_44%),radial-gradient(ellipse_at_12%_88%,rgba(255,255,255,0.95),transparent_46%),linear-gradient(135deg,#ffffff_0%,#f8fbff_46%,#eef5ff_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "linear-gradient(rgba(93,119,174,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(93,119,174,0.045) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage: "linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-10 lg:px-16">
          <SectionReveal>
            <div className="mb-8 md:mb-12">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#4358ff] md:text-xs">
                Websites & Apps
              </p>
              <h2 className="font-display text-[2.55rem] font-extrabold leading-[0.96] tracking-[-0.055em] text-[#101831] md:text-[4.5rem]">
                Built to <span className="sterk-chrome-text">Convert</span>
              </h2>
            </div>
          </SectionReveal>
          <WebsiteShowcaseCarousel />
        </div>
      </section>

      {/* PROCESS — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <Suspense fallback={null}>
          <ProcessGraph />
        </Suspense>
      </LazySection>

      {/* CASE STUDIES — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <section className="py-14 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Results</p>
              <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-8 md:mb-16">
                Real Systems. <span className="sterk-chrome-text">Measurable Impact.</span>
              </h2>
            </SectionReveal>
            <Suspense fallback={null}>
              <MobileCaseRolodex />
            </Suspense>
            <div className="hidden md:block">
              <Suspense fallback={null}>
                <LiquidCaseStudyCards />
              </Suspense>
            </div>
          </div>
        </section>
      </LazySection>

      {/* WHY US — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <section className="py-14 md:py-32 surface-elevated relative overflow-hidden">
          <Suspense fallback={null}>
            <GradientMesh />
          </Suspense>
          <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
              <SectionReveal>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Why Us</p>
                <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                  Business Thinking. <span className="sterk-chrome-text">Engineering Execution.</span>
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
        <Suspense fallback={null}>
          <CTASection />
          <Footer />
        </Suspense>
      </LazySection>

      <StickyMobileCTA />
    </div>
  );
};

export default Index;
