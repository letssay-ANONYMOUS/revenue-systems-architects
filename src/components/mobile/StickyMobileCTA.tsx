import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const StickyMobileCTA = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/book-a-call") return;
    const onScroll = () => {
      // Show after 70% of viewport scrolled
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  if (location.pathname === "/book-a-call") return null;

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.7 }}
        >
          <div
            className="relative flex w-full max-w-[28rem] items-center gap-2 overflow-hidden rounded-full border border-white/65 bg-white/55 p-1.5 pl-5 shadow-[0_24px_60px_rgba(11,31,79,0.28),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-2px_8px_rgba(17,24,39,0.06)] backdrop-blur-2xl"
            style={{ backdropFilter: "blur(28px) saturate(170%)", WebkitBackdropFilter: "blur(28px) saturate(170%)" }}
          >
            {/* Reflective top sheen */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), transparent 70%)" }}
            />
            {/* Slow shimmer */}
            <motion.div
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-12 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
              animate={{ x: ["0%", "420%"] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 1.6 }}
            />

            <div className="relative flex flex-1 items-center gap-2 py-1.5">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#1447d4]/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#1447d4]" />
              </span>
              <p className="text-[12px] font-semibold tracking-tight text-[#0f1730]">
                Ready to capture every lead?
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
              onClick={() => setDismissed(true)}
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
