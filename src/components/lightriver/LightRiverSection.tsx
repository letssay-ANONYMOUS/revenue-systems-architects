import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";

// ─── PLACEHOLDER ASSETS ──────────────────────────────────────────────────────
// Upload a light-streams loop (and poster) to the Supabase buckets, then
// replace these filenames. Same bucket pattern as lib/media.ts.
const LIGHT_RIVER_FALLBACK_VIDEO_SRC =
  "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20videos%20bucket/light-river-loop-mobile-PLACEHOLDER.mp4";
const LIGHT_RIVER_FALLBACK_POSTER_SRC =
  "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20images%20bucket/light-river-poster-PLACEHOLDER.jpg";
// ─────────────────────────────────────────────────────────────────────────────

const LightRiverScene = lazy(() => import("./LightRiverScene"));

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const shouldUseFallback = () => {
  if (typeof window === "undefined") return true;
  if ((window as typeof window & { __STERK_PRERENDER__?: boolean }).__STERK_PRERENDER__) return true;
  if (window.matchMedia("(max-width: 767px)").matches) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof deviceMemory === "number" && deviceMemory < 4) return true;
  return !supportsWebGL();
};

export const LightRiverCopy = () => (
  <div className="relative z-10 max-w-md text-left">
    <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/76 bg-white/56 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#263445]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
      <span className="h-1.5 w-1.5 rounded-full bg-[#1447d4] shadow-[0_0_12px_rgba(20,71,212,0.8)]" />
      One System
    </p>
    <h2 className="font-['Cormorant_Garamond'] text-[2.6rem] font-semibold leading-[0.95] text-[#07101f] sm:text-[3.2rem] md:text-[3.8rem]">
      Everything flows
      <span className="block">into one system.</span>
    </h2>
    <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-[#243044]/75 md:text-base">
      Calls, messages, bookings, follow-ups — every thread captured, routed, and
      handled. Nothing slips through.
    </p>
  </div>
);

const RiverBackdrop = ({ children }: { children?: React.ReactNode }) => (
  <div className="relative grid h-full w-full place-items-center bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fc_55%,#e8effa_100%)]">
    {children}
  </div>
);

const SceneLoadingFallback = () => (
  <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
    <RiverBackdrop>
      <div className="relative flex flex-col items-center gap-5">
        <div className="h-14 w-44 animate-pulse rounded-[1.4rem] border border-[#1447d4]/14 bg-white/65 backdrop-blur-xl" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#263445]/55">
          Opening the river
        </p>
      </div>
    </RiverBackdrop>
  </div>
);

const LightRiverFallback = () => (
  <section
    aria-label="Everything flows into one system."
    className="relative flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fc_48%,#e8effa_100%)] py-20"
  >
    <video
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      src={LIGHT_RIVER_FALLBACK_VIDEO_SRC}
      poster={LIGHT_RIVER_FALLBACK_POSTER_SRC}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
    />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_40%,rgba(248,251,255,0.6)_100%)]" />
    <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
      <div className="w-[min(92vw,30rem)] rounded-[2rem] border border-white/80 bg-white/45 p-8 shadow-[0_42px_120px_rgba(20,32,50,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl md:p-10">
        <LightRiverCopy />
      </div>
    </div>
  </section>
);

const LightRiverSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "fallback" | "scene">("pending");
  const [nearViewport, setNearViewport] = useState(false);

  // Decide before first paint so the section height stays stable.
  useLayoutEffect(() => {
    setMode(shouldUseFallback() ? "fallback" : "scene");
  }, []);

  // Pull the 3D chunk only when the section approaches the viewport.
  useEffect(() => {
    if (mode !== "scene" || nearViewport) return;
    const node = trackRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode, nearViewport]);

  if (mode === "fallback") return <LightRiverFallback />;

  if (mode === "pending") {
    return (
      <section className="h-[100svh]">
        <RiverBackdrop />
      </section>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[220vh]">
      {nearViewport ? (
        <Suspense fallback={<SceneLoadingFallback />}>
          <LightRiverScene trackRef={trackRef} />
        </Suspense>
      ) : (
        <div className="sticky top-0 h-[100svh] w-full">
          <RiverBackdrop />
        </div>
      )}
    </div>
  );
};

export default LightRiverSection;
