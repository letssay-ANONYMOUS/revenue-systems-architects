import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

const lines = [
  "AI agents that book while you sleep.",
  "Capture every lead. Reply in seconds.",
  "Revenue systems, not generic tools.",
];

const MobileHeroExtras = () => {
  const [i, setI] = useState(0);
  const [calls, setCalls] = useState(7);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % lines.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCalls((c) => c + 1), 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="md:hidden">
      {/* Live status pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/55 px-3 py-1.5 shadow-[0_10px_30px_rgba(11,31,79,0.12),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-xl"
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/55" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        <Phone className="h-3 w-3 text-foreground/65" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
          Live · {calls} calls handled today
        </span>
      </motion.div>

      {/* Kinetic sub-line */}
      <div className="relative mt-3 h-[2.6rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13px] font-medium leading-snug text-muted-foreground"
          >
            {lines[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileHeroExtras;
