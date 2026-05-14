import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
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
  tone === "gold"
    ? "border-[#c8a568]/55 bg-[#c69a4f] text-[#080b12] shadow-[0_10px_30px_rgba(111,75,24,0.28),inset_0_1px_0_rgba(255,238,194,0.7)]"
    : "border-[#6ca8ff]/55 bg-[#2f74ff] text-[#07101f] shadow-[0_10px_30px_rgba(21,75,196,0.3),inset_0_1px_0_rgba(196,221,255,0.7)]";

interface PressableCardProps {
  card: QuietCard;
  index: number;
  onOpen: () => void;
}

const PressableCard = ({ card, index, onOpen }: PressableCardProps) => {
  const controls = useAnimationControls();
  const articleRef = useRef<HTMLElement | null>(null);
  const [pressed, setPressed] = useState(false);
  const openingRef = useRef(false);

  const pressIn = (e: React.PointerEvent<HTMLElement>) => {
    if (openingRef.current) return;
    const el = articleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalized offset from center: -1..1
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    // Tilt away from finger: left tap -> right edge lifts (rotateY positive)
    const rotY = -nx * 6;
    const rotX = ny * 5;
    setPressed(true);
    controls.start({
      scale: 0.95,
      y: 3,
      rotateX: rotX,
      rotateY: rotY,
      transition: { type: "spring", stiffness: 460, damping: 24 },
    });
  };

  const pressOut = async (didTap: boolean) => {
    if (openingRef.current) return;
    setPressed(false);
    if (didTap) openingRef.current = true;
    await controls.start({
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    });
    if (didTap) {
      requestAnimationFrame(() => {
        onOpen();
        openingRef.current = false;
      });
    }
  };

  return (
    <motion.article
      ref={articleRef as React.RefObject<HTMLElement>}
      className="group relative w-[86vw] shrink-0 touch-manipulation snap-start cursor-pointer overflow-hidden rounded-[1.55rem] border border-white/55 bg-white/40 p-2.5 text-left shadow-[0_30px_70px_rgba(20,29,38,0.18),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-2xl"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      animate={controls}
      style={{
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        willChange: "transform",
      }}
      onPointerDown={pressIn}
      onPointerUp={() => pressOut(true)}
      onPointerCancel={() => pressOut(false)}
      onPointerLeave={() => pressed && pressOut(false)}
      onContextMenu={(event) => event.preventDefault()}
    >
      {/* Inner gloss */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.55rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.16)_38%,rgba(255,255,255,0.06)_60%,rgba(18,28,39,0.08))]"
      />
      <div className="pointer-events-none absolute inset-[1px] rounded-[1.45rem] border border-white/40 shadow-[inset_0_18px_40px_rgba(255,255,255,0.22),inset_0_-22px_38px_rgba(35,45,56,0.06)]" />

      {/* Press glow ring */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-[1.7rem]"
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
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<QuietCard | null>(null);

  // Track active card via scroll position
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cardWidth = el.clientWidth * 0.86 + 16;
        const idx = Math.round(el.scrollLeft / cardWidth);
        setActiveIndex(Math.max(0, Math.min(cards.length - 1, idx)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [cards.length]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.86 + 16;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

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
          Revenue Systems
        </p>
        <div className="mx-auto mb-5 h-px w-24 bg-gradient-to-r from-transparent via-[#141a24]/22 to-transparent" />
        <h2 className="font-display text-[1.85rem] font-semibold leading-[0.98] tracking-[-0.02em] text-[#141a24]">
          The quiet layer that catches what your team misses.
        </h2>
      </motion.div>

      {/* Horizontal scroller */}
      <motion.div
        ref={trackRef}
        className="relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible px-[7vw] pb-8 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.5 }}
        style={{ scrollPaddingLeft: "7vw" }}
      >
        {cards.map((card, index) => (
          <PressableCard
            key={card.label}
            card={card}
            index={index}
            onOpen={() => {
              scrollTo(index);
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

      <AnimatePresence>
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
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-center md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`${card.label} details`}
      initial={{ pointerEvents: "auto" }}
      exit={{ pointerEvents: "none" }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[#07101f]/40"
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={close}
      />

      <motion.div
        className="relative w-full max-h-[92dvh] overflow-y-auto rounded-t-[1.8rem] border-t border-white/70 bg-white/85 p-5 pb-[calc(2rem+env(safe-area-inset-bottom))] text-[#111827] shadow-[0_-30px_80px_rgba(10,18,30,0.32),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) close();
        }}
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
            onClick={close}
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

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/60 bg-[#eef3f7]/70 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
          <div className="aspect-[16/9] overflow-hidden rounded-xl bg-white">
            <motion.img
              src={card.imageSrc}
              alt={`${card.label} detail`}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
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
