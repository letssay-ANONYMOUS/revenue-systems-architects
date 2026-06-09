import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";

// ─── PLACEHOLDER ASSETS ──────────────────────────────────────────────────────
// Upload a calm grass-field loop (and poster frame) to the Supabase buckets,
// then replace these filenames. Same bucket pattern as lib/media.ts.
const NATURE_FALLBACK_VIDEO_SRC =
  "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20videos%20bucket/nature-grass-loop-mobile-PLACEHOLDER.mp4";
const NATURE_FALLBACK_POSTER_SRC =
  "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20images%20bucket/nature-grass-poster-PLACEHOLDER.jpg";
// ─────────────────────────────────────────────────────────────────────────────

const NatureScene = lazy(() => import("./NatureScene"));

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

const NatureCopy = () => (
  <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center">
    <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/12 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85 backdrop-blur-xl">
      <span className="h-1.5 w-1.5 rounded-full bg-[#7fd28a] shadow-[0_0_12px_rgba(127,210,138,0.9)]" />
      Touch Grass
    </p>
    <h2 className="font-['Cormorant_Garamond'] text-[2.9rem] font-semibold leading-[0.92] text-white sm:text-[3.6rem] md:text-[4rem]">
      You go to nature.
      <span className="block">Our systems run your work.</span>
    </h2>
    <p className="mt-6 font-body text-sm leading-relaxed text-white/72 md:text-base">
      Calls answered, bookings made, follow-ups sent — while you're off the clock.
    </p>
  </div>
);

const DuskBackdrop = ({ children }: { children?: React.ReactNode }) => (
  <div className="relative grid h-full w-full place-items-center bg-[linear-gradient(180deg,#3d4470_0%,#6f6386_55%,#142619_100%)]">
    {children}
  </div>
);

const SceneLoadingFallback = () => (
  <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
    <DuskBackdrop>
      <div className="relative flex flex-col items-center gap-5">
        <div className="h-14 w-44 animate-pulse rounded-[1.4rem] border border-white/30 bg-white/12 backdrop-blur-xl" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/65">
          Growing the field
        </p>
      </div>
    </DuskBackdrop>
  </div>
);

const NatureFallback = () => (
  <section
    aria-label="You go to nature. Our systems run your work."
    className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#3d4470_0%,#6f6386_48%,#142619_100%)] py-20"
  >
    <video
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      src={NATURE_FALLBACK_VIDEO_SRC}
      poster={NATURE_FALLBACK_POSTER_SRC}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
    />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,rgba(7,16,31,0.45)_100%)]" />
    <div className="relative w-[min(92vw,40rem)] rounded-[2rem] border border-white/24 bg-white/10 px-4 py-12 shadow-[0_42px_120px_rgba(7,16,31,0.4),inset_0_1px_0_rgba(255,255,255,0.32)] backdrop-blur-2xl md:py-16">
      <NatureCopy />
    </div>
  </section>
);

const NatureSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "fallback" | "scene">("pending");
  const [nearViewport, setNearViewport] = useState(false);

  // Decide the rendering mode before first paint so section height stays
  // stable (the 3D scroll track is taller than the fallback section).
  useLayoutEffect(() => {
    setMode(shouldUseFallback() ? "fallback" : "scene");
  }, []);

  // Only pull the 3D chunk once the section approaches the viewport.
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

  if (mode === "fallback") return <NatureFallback />;

  if (mode === "pending") {
    return (
      <section className="h-[100svh]">
        <DuskBackdrop />
      </section>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[260vh]">
      {nearViewport ? (
        <Suspense fallback={<SceneLoadingFallback />}>
          <NatureScene trackRef={trackRef} copy={<NatureCopy />} />
        </Suspense>
      ) : (
        <div className="sticky top-0 h-[100svh] w-full">
          <DuskBackdrop />
        </div>
      )}
    </div>
  );
};

export default NatureSection;
