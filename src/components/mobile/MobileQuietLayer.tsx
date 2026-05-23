import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface QuietCard {
  label: string;
  value: string;
  valueTone: string;
  description: string;
  imageSrc: string;
  detail: string;
}

interface MobileQuietLayerProps {
  cards: QuietCard[];
}

const valuePillClass = (tone: string) =>
  tone === "chrome"
    ? "border-[#b6c4d8]/70 bg-[linear-gradient(135deg,#f8fbff,#cbd7e8_46%,#1447d4)] text-[#07101f] shadow-[0_10px_30px_rgba(20,71,212,0.18),inset_0_1px_0_rgba(255,255,255,0.72)]"
    : "border-[#6ca8ff]/55 bg-[#2f74ff] text-[#07101f] shadow-[0_10px_30px_rgba(21,75,196,0.3),inset_0_1px_0_rgba(196,221,255,0.7)]";

interface PressableCardProps {
  card: QuietCard;
  index: number;
  onOpen: () => void;
}

const PressableCard = ({ card, index, onOpen }: PressableCardProps) => {
  const articleRef = useRef<HTMLElement | null>(null);
  const [pressed, setPressed] = useState(false);
  const openingRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);

  const pressIn = (e: React.PointerEvent<HTMLElement>) => {
    if (openingRef.current) return;
    const el = articleRef.current;
    if (!el) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
    setPressed(true);
  };

  const pressMove = (e: React.PointerEvent<HTMLElement>) => {
    const start = pointerStartRef.current;
    if (!start || hasDraggedRef.current) return;
    const distance = Math.hypot(e.clientX - start.x, e.clientY - start.y);
    if (distance < 10) return;

    hasDraggedRef.current = true;
    setPressed(false);
  };

  const pressOut = (didTap: boolean) => {
    if (openingRef.current) return;
    const shouldOpen = didTap && !hasDraggedRef.current;
    pointerStartRef.current = null;
    setPressed(false);
    if (shouldOpen) openingRef.current = true;
    if (shouldOpen) {
      onOpen();
      window.setTimeout(() => {
        openingRef.current = false;
      }, 260);
    }
  };

  return (
    <motion.article
      ref={articleRef as React.RefObject<HTMLElement>}
      className="mobile-performance-surface android-lite-glass group relative w-[86vw] shrink-0 snap-start cursor-pointer overflow-hidden rounded-[1.55rem] border border-white/55 bg-white/40 p-2.5 text-left shadow-[0_30px_70px_rgba(20,29,38,0.18),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: 0.58,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      animate={{
        scale: pressed ? 0.985 : 1,
        y: pressed ? 1 : 0,
      }}
      style={{
        transformOrigin: "center center",
        willChange: "transform",
        touchAction: "pan-x pan-y pinch-zoom",
      }}
      onPointerDown={pressIn}
      onPointerMove={pressMove}
      onPointerUp={() => pressOut(true)}
      onPointerCancel={() => pressOut(false)}
      onPointerLeave={() => pressed && pressOut(false)}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {/* Inner gloss */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.55rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.16)_38%,rgba(255,255,255,0.06)_60%,rgba(18,28,39,0.08))]"
      />
      <div className="pointer-events-none absolute inset-[1px] rounded-[1.45rem] border border-white/40 shadow-[inset_0_18px_40px_rgba(255,255,255,0.22),inset_0_-22px_38px_rgba(35,45,56,0.06)]" />

      {/* Press glow ring */}
      <motion.div
        className="android-no-filter pointer-events-none absolute -inset-1 rounded-[1.7rem]"
        animate={{ opacity: pressed ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(20,71,212,0.32), transparent 65%)",
          filter: "blur(14px)",
        }}
      />

      {/* Image */}
      <div className="relative aspect-[16/10.5] overflow-hidden rounded-[1.2rem] border border-white/50 bg-[#d5dbe0] shadow-[0_14px_36px_rgba(21,31,41,0.14),inset_0_1px_0_rgba(255,255,255,0.7)]">
        <motion.img
          src={card.imageSrc}
          alt=""
          className="h-full w-full object-cover saturate-[1.04]"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          animate={{ scale: pressed ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        />
        <div
          className={`absolute right-2.5 top-2.5 rounded-full px-3 py-1 text-xs font-black tracking-[-0.03em] backdrop-blur-xl ${valuePillClass(card.valueTone)}`}
        >
          {card.value}
        </div>
      </div>

      <div className="relative px-2 pb-1.5 pt-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2e3842]/55">
          {card.label}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#2e3842]/78">
          {card.description}
        </p>
        <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1447d4]/70">
          Tap to expand
        </p>
      </div>
    </motion.article>
  );
};

const MobileQuietLayer = ({ cards }: MobileQuietLayerProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimerRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<QuietCard | null>(null);

  const getCardStride = useCallback((el: HTMLDivElement) => el.clientWidth * 0.86 + 16, []);

  const scrollTo = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const cardStride = getCardStride(el);
      const target = Math.max(0, Math.min(cards.length - 1, index));
      setActiveIndex(target);
      el.scrollTo({ left: target * cardStride, behavior: "smooth" });
    },
    [cards.length, getCardStride],
  );

  useEffect(() => {
    const preloadLinks: HTMLLinkElement[] = [];
    cards.slice(0, 2).forEach(({ imageSrc }) => {
      if (!imageSrc) return;

      const image = new Image();
      image.decoding = "async";
      image.src = imageSrc;

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
  }, [cards]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimerRef.current);
      raf = requestAnimationFrame(() => {
        const cardWidth = getCardStride(el);
        const idx = Math.round(el.scrollLeft / cardWidth);
        setActiveIndex(Math.max(0, Math.min(cards.length - 1, idx)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimerRef.current);
    };
  }, [cards.length, getCardStride]);

  return (
    <section
      className="relative block overflow-hidden bg-gradient-to-b from-white via-[#f5f8fc] to-[#eaf0f7] py-16 md:hidden"
      aria-label="The quiet layer"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,24,39,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,24,39,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(180deg, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 18%, black 82%, transparent)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto mb-8 max-w-[28rem] px-6 text-center"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#141a24]/55">
          STERK.systems
        </p>
        <div className="mx-auto mb-5 h-px w-24 bg-gradient-to-r from-transparent via-[#141a24]/22 to-transparent" />
        <h2 className="font-display text-[1.85rem] font-semibold leading-[0.98] tracking-[-0.02em] text-[#141a24]">
          The quiet layer that catches what your team misses.
        </h2>
      </motion.div>

      {/* Horizontal scroller */}
      <motion.div
        ref={trackRef}
        className="mobile-performance-surface android-snap-proximity relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[7vw] pb-8 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.5 }}
        style={{
          scrollPaddingLeft: "7vw",
          touchAction: "pan-x pan-y pinch-zoom",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          scrollSnapType: "x mandatory",
        }}
      >
        {cards.map((card, index) => (
          <PressableCard
            key={card.label}
            card={card}
            index={index}
            onOpen={() => {
              setActiveIndex(index);
              setSelected(card);
            }}
          />
        ))}
      </motion.div>

      {/* Pagination dots */}
      <div className="relative z-10 mt-1 flex justify-center gap-2">
        {cards.map((c, i) => (
          <button
            key={c.label}
            type="button"
            aria-label={`Show card ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === activeIndex ? "w-7 bg-[#111827]" : "w-1.5 bg-[#111827]/22"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <MobileCardSheet card={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

interface SheetProps {
  card: QuietCard;
  onClose: () => void;
}

const MobileCardSheet = ({ card, onClose }: SheetProps) => {
  const openedAtRef = useRef(performance.now());
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousOverscroll = body.style.overscrollBehavior;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "contain";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousOverscroll;
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  const closeFromBackdrop = useCallback(() => {
    if (performance.now() - openedAtRef.current < 450) return;
    close();
  }, [close]);

  return createPortal(
    <motion.div
      className="zoom-safe fixed inset-0 z-[1600] flex items-end justify-center overflow-hidden overscroll-contain md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.label} details`}
      initial={{ pointerEvents: "auto" }}
      exit={{ pointerEvents: "none" }}
    >
      <motion.div
        aria-hidden="true"
        className="modal-focus-overlay absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        onClick={closeFromBackdrop}
      />

      <motion.div
        className="zoom-safe static-sheet-glass relative max-h-[92svh] w-full overflow-y-auto rounded-t-[1.8rem] border-t border-white/70 bg-white/85 p-5 pb-[calc(2rem+env(safe-area-inset-bottom))] text-[#111827] shadow-[0_-30px_80px_rgba(10,18,30,0.32),inset_0_1px_0_rgba(255,255,255,0.95)]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 620, damping: 48, mass: 0.52 }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#111827]/15" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#2e3842]/55">
              {card.label}
            </span>
            <p className="mt-2 text-[3.4rem] font-semibold leading-none tracking-[-0.05em] text-[#111827]">
              {card.value}
            </p>
          </div>
          <motion.button
            type="button"
            aria-label="Close"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              close();
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#111827]/80 shadow-[0_10px_24px_rgba(14,23,36,0.16),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{
              scale: 0.88,
              y: 2,
              boxShadow:
                "0 6px 14px rgba(14,23,36,0.14), inset 0 4px 12px rgba(17,24,39,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
            transition={{ type: "spring", stiffness: 520, damping: 24, mass: 0.42 }}
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="zoom-safe mt-5 overflow-hidden rounded-2xl border border-white/60 bg-[#eef3f7]/70 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
          <div className="aspect-[16/9] overflow-hidden rounded-xl bg-white">
            <motion.img
              src={card.imageSrc}
              alt={`${card.label} detail`}
              className="zoom-safe h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-[#2e3842]/78">
          {card.detail}
        </p>

        <div className="mt-6 border-t border-[#111827]/10 pt-4 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#2e3842]/45">
            Swipe down to close
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default MobileQuietLayer;
