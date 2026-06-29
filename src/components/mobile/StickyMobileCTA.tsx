import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Phone } from "lucide-react";

const STORAGE_KEY = "sterk-mobile-cta-dismissed";

const StickyMobileCTA = () => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // If storage is blocked, still dismiss for this session.
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
          <div className="pointer-events-auto relative flex w-full max-w-[28rem] items-center gap-2 overflow-hidden rounded-full border border-[#d7e1ef] bg-white p-1.5 pl-3 shadow-none">
            <motion.div
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f1730]/8"
              whileTap={{ scale: 0.94 }}
            >
              <Phone className="h-3.5 w-3.5 text-[#0f1730]" strokeWidth={2.4} />
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
                className="relative flex items-center gap-2 rounded-full bg-[#0f1730] px-4 py-2.5 text-[12px] font-semibold text-white shadow-none transition-colors active:bg-[#18213b]"
              >
                Book a Call
                <ArrowRight className="h-3.5 w-3.5" />
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
