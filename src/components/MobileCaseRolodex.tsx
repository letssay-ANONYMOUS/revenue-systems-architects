import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const cases = [
  {
    tag: "Hospitality",
    metric: "3×",
    label: "More Bookings",
    title: "Premium Café Chain",
    detail: "95% call answer rate, zero missed reservations after launch.",
  },
  {
    tag: "Healthcare",
    metric: "30s",
    label: "Response Time",
    title: "Medical Clinic Network",
    detail: "40% fewer missed appointments across five locations.",
  },
  {
    tag: "Real Estate",
    metric: "2×",
    label: "Qualified Leads",
    title: "Boutique Real Estate Agency",
    detail: "50% faster follow-up on every inbound enquiry.",
  },
];

const STACK = [
  { y: 0, z: 0, scale: 1, opacity: 1 },
  { y: 18, z: -90, scale: 0.94, opacity: 0.55 },
  { y: 32, z: -180, scale: 0.88, opacity: 0.28 },
];

const MobileCaseRolodex = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % cases.length), 6000);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const next = () => setActive((i) => (i + 1) % cases.length);
  const prev = () => setActive((i) => (i - 1 + cases.length) % cases.length);

  return (
    <div
      className="md:hidden relative w-full select-none"
      onPointerDown={() => setPaused(true)}
      style={{ perspective: "1400px" }}
    >
      <div className="relative h-[440px] w-full" style={{ transformStyle: "preserve-3d" }}>
        {cases.map((c, i) => {
          const offset = (i - active + cases.length) % cases.length;
          const layer = STACK[offset] ?? STACK[STACK.length - 1];
          const isActive = offset === 0;
          return (
            <motion.article
              key={c.title}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -400) next();
                else if (info.offset.x > 80 || info.velocity.x > 400) prev();
              }}
              animate={{
                y: layer.y,
                z: layer.z,
                scale: layer.scale,
                opacity: layer.opacity,
                rotateY: 0,
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.7 }}
              style={{
                transformStyle: "preserve-3d",
                zIndex: cases.length - offset,
              }}
              className="absolute inset-0 mx-auto flex flex-col rounded-3xl border border-foreground/10 bg-background p-7 text-foreground shadow-[0_30px_60px_-30px_hsl(var(--foreground)/0.35),0_8px_20px_-12px_hsl(var(--foreground)/0.18)]"
            >
              {/* hairline ribbon */}
              <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />

              <span className="w-fit rounded-full border border-foreground/15 bg-foreground/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/70">
                {c.tag}
              </span>

              <div className="mt-10 flex items-end gap-3">
                <span className="font-display text-[6.5rem] font-black leading-[0.78] tracking-[-0.08em] text-foreground">
                  {c.metric}
                </span>
                <span className="mb-3 max-w-[7rem] text-base font-medium leading-tight text-foreground/60">
                  {c.label}
                </span>
              </div>

              <div className="my-7 h-px w-full bg-foreground/10" />

              <div className="mt-auto">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.03em]">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{c.detail}</p>

                <Link
                  to="/case-studies"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                >
                  View case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {cases.map((_, i) => (
          <button
            key={i}
            aria-label={`Show case ${i + 1}`}
            onClick={() => {
              setPaused(true);
              setActive(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-8 bg-foreground" : "w-1.5 bg-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCaseRolodex;
