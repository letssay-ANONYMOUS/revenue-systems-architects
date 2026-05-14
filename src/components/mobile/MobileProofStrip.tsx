import { motion } from "framer-motion";

const items = [
  { v: "97%", l: "Calls captured" },
  { v: "3x", l: "Bookings lifted" },
  { v: "60%", l: "Admin saved" },
  { v: "<3s", l: "Reply time" },
  { v: "100", l: "Lighthouse" },
  { v: "24/7", l: "Always on" },
];

const MobileProofStrip = () => {
  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <section className="md:hidden relative overflow-hidden border-y border-white/10 bg-[#07101f] py-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#07101f] to-transparent"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#07101f] to-transparent"
      />
      <motion.div
        className="flex gap-3 whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {loop.map((it, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 backdrop-blur"
          >
            <span className="font-display text-base font-bold tracking-[-0.02em] text-white">
              {it.v}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
              {it.l}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default MobileProofStrip;
