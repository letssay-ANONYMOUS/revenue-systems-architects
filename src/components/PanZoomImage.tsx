import { useRef, useState, useCallback, useEffect } from "react";

interface PanZoomImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const PanZoomImage = ({ src, alt, className }: PanZoomImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const gestureRef = useRef({
    startDist: 0,
    startScale: 1,
    startX: 0,
    startY: 0,
    startTx: 0,
    startTy: 0,
    isPinching: false,
    isPanning: false,
    lastTapTime: 0,
    lastTapX: 0,
    lastTapY: 0,
  });

  const isZoomed = scale > 1.05;

  const constrainTranslate = useCallback(
    (tx: number, ty: number, s: number) => {
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img) return { x: tx, y: ty };

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const iw = img.naturalWidth || img.clientWidth;
      const ih = img.naturalHeight || img.clientHeight;

      const displayW = cw;
      const displayH = (ih / iw) * cw;

      const scaledW = displayW * s;
      const scaledH = displayH * s;

      const maxTx = Math.max(0, (scaledW - cw) / 2);
      const maxTy = Math.max(0, (scaledH - ch) / 2);

      return {
        x: clamp(tx, -maxTx, maxTx),
        y: clamp(ty, -maxTy, maxTy),
      };
    },
    [],
  );

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [src, resetZoom]);

  const getTouchDist = (t1: Touch, t2: Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const g = gestureRef.current;

      if (e.touches.length === 2) {
        e.preventDefault();
        g.isPinching = true;
        g.isPanning = false;
        g.startDist = getTouchDist(e.touches[0], e.touches[1]);
        g.startScale = scale;
        g.startTx = translate.x;
        g.startTy = translate.y;
        g.startX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        g.startY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        return;
      }

      if (e.touches.length === 1) {
        const now = Date.now();
        const tap = e.touches[0];
        if (
          now - g.lastTapTime < DOUBLE_TAP_MS &&
          Math.abs(tap.clientX - g.lastTapX) < 30 &&
          Math.abs(tap.clientY - g.lastTapY) < 30
        ) {
          e.preventDefault();
          g.lastTapTime = 0;
          if (scale > 1.05) {
            resetZoom();
          } else {
            const container = containerRef.current;
            if (container) {
              const rect = container.getBoundingClientRect();
              const originX = tap.clientX - rect.left - rect.width / 2;
              const originY = tap.clientY - rect.top - rect.height / 2;
              const newTx = -originX * (DOUBLE_TAP_SCALE - 1);
              const newTy = -originY * (DOUBLE_TAP_SCALE - 1);
              const constrained = constrainTranslate(newTx, newTy, DOUBLE_TAP_SCALE);
              setScale(DOUBLE_TAP_SCALE);
              setTranslate(constrained);
            }
          }
          return;
        }
        g.lastTapTime = now;
        g.lastTapX = tap.clientX;
        g.lastTapY = tap.clientY;

        if (scale > 1.05) {
          g.isPanning = true;
          g.startX = tap.clientX;
          g.startY = tap.clientY;
          g.startTx = translate.x;
          g.startTy = translate.y;
        }
      }
    },
    [scale, translate, constrainTranslate, resetZoom],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const g = gestureRef.current;

      if (g.isPinching && e.touches.length === 2) {
        e.preventDefault();
        const dist = getTouchDist(e.touches[0], e.touches[1]);
        const newScale = clamp(g.startScale * (dist / g.startDist), MIN_SCALE, MAX_SCALE);

        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const panX = midX - g.startX;
        const panY = midY - g.startY;

        const constrained = constrainTranslate(
          g.startTx + panX,
          g.startTy + panY,
          newScale,
        );
        setScale(newScale);
        setTranslate(constrained);
        return;
      }

      if (g.isPanning && e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - g.startX;
        const dy = touch.clientY - g.startY;
        const constrained = constrainTranslate(g.startTx + dx, g.startTy + dy, scale);
        setTranslate(constrained);
      }
    },
    [scale, constrainTranslate],
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const g = gestureRef.current;

      if (e.touches.length < 2) {
        g.isPinching = false;
      }
      if (e.touches.length === 0) {
        g.isPanning = false;
        if (scale < 1.05) {
          resetZoom();
        }
      }
    },
    [scale, resetZoom],
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        overflowX: isZoomed ? "hidden" : "hidden",
        overflowY: isZoomed ? "hidden" : "auto",
        overscrollBehavior: "contain",
        touchAction: isZoomed ? "none" : "pan-y",
        cursor: isZoomed ? "grab" : "default",
        maxHeight: "calc(100svh - 4.25rem)",
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={{
          transform: isZoomed
            ? `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`
            : undefined,
          transformOrigin: "center top",
          transition: isZoomed ? "none" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: isZoomed ? "transform" : "auto",
        }}
        loading="eager"
        decoding="async"
        draggable={false}
      />
      {isZoomed && (
        <button
          type="button"
          aria-label="Reset zoom"
          onClick={resetZoom}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="8" y1="11" x2="14" y2="11" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PanZoomImage;
