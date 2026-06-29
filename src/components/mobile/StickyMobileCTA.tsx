import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Phone } from "lucide-react";

const STORAGE_KEY = "sterk-mobile-cta-dismissed";

const StickyMobileCTA = () => {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });

  const dismiss = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="phone-only-cta mobile-performance-surface pointer-events-none fixed inset-x-0 bottom-0 z-[1350] justify-center px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))]"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.62 }}
        >
          <div className="static-pill-glass pointer-events-auto relative flex w-full max-w-[28rem] items-center gap-2 overflow-hidden rounded-full border border-white/65 bg-white/55 p-1.5 pl-3 shadow-[0_24px_60px_rgba(11,31,79,0.28),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-2px_8px_rgba(17,24,39,0.06)]">
            {/* Animated breathing hairline on top edge */}
            <motion.div
              className="pointer-events-none absolute inset-x-6 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(20,71,212,0.65), transparent)" }}
              animate={{ opacity: [0.3, 0.85, 0.3] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Reflective top sheen */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), transparent 70%)" }}
            />
            {/* Slow shimmer */}
            <motion.div
              className="android-no-filter pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-12 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
              animate={{ x: ["0%", "420%"] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 1.6 }}
            />

            {/* Pulsing phone icon */}
            <motion.div
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f1730]/8"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }}
            >
              <Phone className="h-3.5 w-3.5 text-[#0f1730]" strokeWidth={2.4} />
              <motion.span
                className="absolute inset-0 rounded-full border border-[#1447d4]/40"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.8, ease: "easeOut" }}
              />
            </motion.div>

            <div className="relative flex flex-1 items-center gap-2 py-1.5">
              <p className="text-[12px] font-semibold tracking-tight text-[#0f1730]">
                Capture every lead.
              </p>
            </div>

            <motion.div
              whileTap={{ scale: 0.94, y: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className="relative"
            >
              <Link
                to="/book-a-call"
                className="relative flex items-center gap-2 rounded-full bg-[#0f1730] px-4 py-2.5 text-[12px] font-semibold text-white shadow-[0_8px_22px_rgba(15,23,48,0.4),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-2px_6px_rgba(0,0,0,0.3)] transition-shadow active:shadow-[0_3px_10px_rgba(15,23,48,0.4),inset_0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                Book a Call
                <ArrowRight className="h-3.5 w-3.5" />
                {/* Reflective sheen on button */}
                <span
                  className="pointer-events-none absolute inset-x-2 top-0.5 h-1/3 rounded-full"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.25), transparent)" }}
                />
              </Link>
            </motion.div>

            <button
              type="button"
              aria-label="Dismiss"
              onClick={dismiss}
              className="relative ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#0f1730]/50 active:scale-90"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;
