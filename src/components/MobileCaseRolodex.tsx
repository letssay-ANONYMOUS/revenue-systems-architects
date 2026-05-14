import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

// position 0 = center, 1 = right-back, 2 = left-back
const LAYOUT = [
  { x: 0, y: 0, z: 0, rotateY: 0, scale: 1, opacity: 1 },
  { x: 70, y: 18, z: -160, rotateY: -22, scale: 0.9, opacity: 0.7 },
  { x: -70, y: 18, z: -160, rotateY: 22, scale: 0.9, opacity: 0.7 },
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

  const goTo = (i: number) => {
    setPaused(true);
    setActive(i);
  };

  return (
    <div
      className="md:hidden relative w-full select-none px-4"
      style={{ perspective: "1400px" }}
    >
      <div
        className="relative mx-auto h-[460px] w-full max-w-sm"
        style={{ transformStyle: "preserve-3d" }}
      >
        {cases.map((c, i) => {
          const offset = (i - active + cases.length) % cases.length;
          const layer = LAYOUT[offset];
          const isActive = offset === 0;
          return (
            <motion.article
              key={c.title}
              role={isActive ? undefined : "button"}
              tabIndex={isActive ? -1 : 0}
              aria-label={isActive ? undefined : `Show ${c.title}`}
              onClick={() => !isActive && goTo(i)}
              onKeyDown={(e) => {
                if (!isActive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  goTo(i);
                }
              }}
              animate={{
                x: layer.x,
                y: layer.y,
                z: layer.z,
                rotateY: layer.rotateY,
                scale: layer.scale,
                opacity: layer.opacity,
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.8 }}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                zIndex: isActive ? 30 : 10,
                pointerEvents: isActive ? "auto" : "auto",
                cursor: isActive ? "default" : "pointer",
              }}
              className="absolute inset-0 flex flex-col rounded-3xl border border-foreground/10 bg-background p-7 text-foreground shadow-[0_30px_60px_-30px_hsl(var(--foreground)/0.35),0_8px_20px_-12px_hsl(var(--foreground)/0.18)]"
            >
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

                {isActive && (
                  <Link
                    to="/case-studies"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                  >
                    View case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {cases.map((_, i) => (
          <button
            key={i}
            aria-label={`Show case ${i + 1}`}
            onClick={() => goTo(i)}
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
