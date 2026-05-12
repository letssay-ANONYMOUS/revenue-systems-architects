import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
}

const CTASection = ({
  headline = "Ready to Build Your Revenue System?",
  subtext = "Stop losing leads to slow responses and disconnected tools."
}: CTASectionProps) => (
  <section className="relative flex min-h-[132dvh] items-center overflow-hidden bg-[#f6f8fb] py-24 text-[#07101f] md:min-h-[145dvh] md:py-40">
    <video
      className="absolute inset-0 h-full w-full object-cover opacity-100"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/cta-croc-generated-video.mp4" type="video/mp4" />
    </video>
    
    <div className="relative z-10 mx-auto w-full max-w-[1340px] px-5 md:section-padding">
      <SectionReveal>
        <motion.div
          initial={{ opacity: 0, y: 54, scale: 0.92, rotateX: 7 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          whileHover={{ y: -6, rotateX: 1.4, rotateY: -0.7 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.82 }}
          className="relative isolate mx-auto min-h-[520px] overflow-hidden rounded-[3rem] border border-white/78 bg-white/[0.08] px-7 py-12 text-center shadow-[0_52px_170px_rgba(39,53,72,0.22),0_18px_70px_rgba(255,255,255,0.28),inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-1px_0_rgba(7,16,31,0.06),inset_26px_0_72px_rgba(255,255,255,0.1),inset_-26px_0_72px_rgba(235,190,217,0.08)] backdrop-blur-[38px] backdrop-saturate-150 md:min-h-[620px] md:px-16 md:py-20 lg:px-20"
          style={{
            transformPerspective: 1400,
            transformStyle: "preserve-3d",
            WebkitBackdropFilter: "blur(38px) saturate(1.85) brightness(1.06)",
            backdropFilter: "blur(38px) saturate(1.85) brightness(1.06)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.09) 31%, rgba(248,226,240,0.13) 54%, rgba(255,255,255,0.06) 100%)",
          }}
        >
          <motion.div
            className="pointer-events-none absolute -inset-y-24 -left-1/3 z-10 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/24 to-transparent"
            animate={{ x: ["0%", "430%"] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: "translateZ(46px)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-[3rem]"
            style={{
              transform: "translateZ(18px)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.58), inset 0 34px 92px rgba(255,255,255,0.18), inset 0 -44px 82px rgba(76,56,72,0.045), inset 0 0 46px rgba(255,238,248,0.16)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-[1px] rounded-[2.95rem] border border-white/34"
            style={{
              transform: "translateZ(28px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.34), transparent 20%, rgba(255,236,248,0.16) 48%, transparent 74%), radial-gradient(circle at 78% 20%, rgba(255,255,255,0.24), transparent 22%)",
            }}
          />
          <div
            className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full border border-white/22 opacity-70"
            style={{
              transform: "translateZ(22px)",
              background: "radial-gradient(circle at 38% 34%, rgba(255,255,255,0.22), rgba(255,237,248,0.08) 42%, transparent 70%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.64), inset -22px -26px 52px rgba(231,191,217,0.08)",
            }}
          />
          <div
            className="pointer-events-none absolute left-8 right-8 top-5 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent"
            style={{ transform: "translateZ(38px)" }}
          />
          <div
            className="pointer-events-none absolute bottom-5 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#07101f]/12 to-transparent"
            style={{ transform: "translateZ(30px)" }}
          />
          <div
            className="pointer-events-none absolute right-8 top-8 hidden h-52 w-52 rounded-full border border-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.54),inset_0_-18px_42px_rgba(7,16,31,0.035)] md:block"
            style={{ transform: "translateZ(34px)" }}
          />
          <motion.span
            className="pointer-events-none absolute right-[12%] top-[22%] hidden h-2 w-2 rounded-full bg-[#d8aeca] md:block"
            animate={{ scale: [1, 1.9, 1], opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(60px)", boxShadow: "0 0 18px rgba(216,174,202,0.72), 0 0 36px rgba(255,245,251,0.48)" }}
          />

          <div className="relative z-20 flex min-h-[420px] flex-col items-center justify-center md:min-h-[480px]" style={{ transform: "translateZ(64px)" }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/56 bg-white/28 px-4 py-2 shadow-[0_12px_38px_rgba(14,23,36,0.08),inset_0_1px_0_rgba(255,255,255,0.76),inset_0_-1px_0_rgba(7,16,31,0.05)] backdrop-blur-xl md:mb-8">
              <Sparkles className="h-3.5 w-3.5 text-[#1447d4]" />
              <span className="text-[10px] font-semibold text-[#07101f]/72 md:text-xs">Let's Talk</span>
            </div>
            <h2 className="mb-5 max-w-5xl font-display text-[2.8rem] font-bold leading-[0.92] tracking-[-0.02em] text-[#07101f] md:mb-7 md:text-[5.4rem] lg:text-[6.35rem]">
              {headline}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[#314052]/76 md:mb-12 md:text-xl">
              {subtext}
            </p>
            <div className="flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row">
              <Link to="/book-a-call" className="premium-btn inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:flex-1 md:px-9 md:py-5">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/case-studies" className="inline-flex items-center justify-center rounded-xl border border-white/56 bg-white/24 px-8 py-4 text-center text-sm font-semibold text-[#07101f] shadow-[0_12px_38px_rgba(14,23,36,0.08),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(7,16,31,0.05)] backdrop-blur-xl transition-all duration-300 hover:bg-white/42 sm:flex-1 md:py-5">
                See Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </SectionReveal>
    </div>
  </section>
);

export default CTASection;
