import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Bot, Globe, ArrowRight, CheckCircle2, Send, CalendarCheck, Pause, Play } from "lucide-react";

type Service = {
  key: string;
  label: string;
  title: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const services: Service[] = [
  { key: "call", label: "AI Calls", title: "Answers every call.", href: "/ai-calling-agents", Icon: Phone },
  { key: "chat", label: "Chatbots", title: "Replies instantly.", href: "/chatbots-automation", Icon: Bot },
  { key: "web", label: "Websites", title: "Built to convert.", href: "/websites-apps", Icon: Globe },
];

const Waveform = () => (
  <div className="flex items-end gap-[3px] h-5">
    {Array.from({ length: 14 }).map((_, i) => (
      <motion.span
        key={i}
        className="w-[3px] rounded-full bg-emerald-300/85"
        animate={{ height: ["28%", "92%", "44%", "70%", "28%"] }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          delay: i * 0.06,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const TypedName = () => {
  const full = "Sarah · New lead";
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= full.length) return;
    const id = setTimeout(() => setN(n + 1), 55);
    return () => clearTimeout(id);
  }, [n]);
  return <span>{full.slice(0, n)}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>|</motion.span></span>;
};

const CallScene = () => (
  <div className="flex h-full flex-col gap-2.5 p-4">
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-3 py-2 backdrop-blur"
    >
      <motion.span
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="h-2 w-2 rounded-full bg-emerald-400"
      />
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">Incoming call</p>
      <span className="ml-auto text-[9px] text-white/50">00:42</span>
    </motion.div>
    <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/6 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
        <Phone className="h-4 w-4 text-white/85" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-white truncate">
          <TypedName />
        </p>
        <p className="text-[9px] text-white/50">+1 (415) 555 · 2s ago</p>
      </div>
      <Waveform />
    </div>
    {[
      "AI: How can I help today?",
      "Caller: I'd like to book.",
      "AI: Tuesday 10 AM works?",
    ].map((line, i) => (
      <motion.div
        key={line}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 + i * 0.18 }}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] leading-snug text-white/80"
      >
        {line}
      </motion.div>
    ))}
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.95 }}
      className="mt-auto flex items-center justify-between rounded-2xl bg-emerald-500/15 px-3 py-2"
    >
      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300">
        <CalendarCheck className="h-3 w-3" /> Booked
      </span>
      <span className="text-[9px] text-white/55">Tue · 10:00</span>
    </motion.div>
  </div>
);

const ChatScene = () => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setShowToast(true), 1800);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <Bot className="h-4 w-4 text-white/85" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-white">AgentForge Assistant</p>
          <p className="text-[9px] text-emerald-300">● Online · typing…</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {[
          { from: "bot", text: "Hi. How can I help?" },
          { from: "user", text: "Need a booking." },
          { from: "bot", text: "Tue 10 AM or Thu 2 PM?" },
          { from: "user", text: "Tuesday works." },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.16, type: "spring", stiffness: 260, damping: 20 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] rounded-xl px-3 py-1.5 text-[10px] leading-snug ${
                m.from === "user"
                  ? "rounded-br-sm bg-white/18 text-white"
                  : "rounded-bl-sm bg-white/8 text-white/85"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="self-center mt-1 flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[9.5px] font-bold text-emerald-200"
            >
              <CheckCircle2 className="h-3 w-3" /> Booked Tue 10:00
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5">
        <p className="flex-1 text-[9px] text-white/40">Type a message…</p>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/85">
          <Send className="h-3 w-3 text-black" />
        </div>
      </div>
    </div>
  );
};

const WebScene = () => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setScore((s) => (s >= 100 ? 100 : s + 4)), 30);
    return () => clearInterval(id);
  }, []);
  const dash = 2 * Math.PI * 18;
  const offset = dash - (dash * score) / 100;
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <div className="ml-2 flex-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] text-white/45">
          yourbrand.com
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/12 to-white/4 p-3"
      >
        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/50">Hero</p>
        <p className="mt-1 font-display text-base font-bold leading-tight text-white">
          Premium conversion site.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="relative h-12 w-12">
            <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
              <circle
                cx="22" cy="22" r="18" fill="none"
                stroke="url(#g)" strokeWidth="3.5" strokeLinecap="round"
                strokeDasharray={dash} strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.06s linear" }}
              />
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#6ee7b7" />
                  <stop offset="1" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
              {score}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-semibold text-emerald-300">Lighthouse</p>
            <p className="text-[8.5px] text-white/55">Perf · A11y · SEO</p>
          </div>
        </div>
      </motion.div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["CTA", "Form", "Pay"].map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center text-[9px] text-white/70"
          >
            {l}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.95 }}
        className="mt-auto flex items-center justify-between rounded-xl bg-white/10 px-3 py-2"
      >
        <span className="text-[9px] font-semibold text-white">Conversion +24%</span>
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
      </motion.div>
    </div>
  );
};

const scenes: Record<string, React.FC> = {
  call: CallScene,
  chat: ChatScene,
  web: WebScene,
};

const MobileServiceWorkshop = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % services.length);
    }, 5400);
    return () => clearInterval(id);
  }, [paused]);

  const service = services[active];
  const Scene = scenes[service.key];

  const handleSwipe = (offsetX: number) => {
    if (Math.abs(offsetX) < 60) return;
    setPaused(true);
    if (offsetX < 0) setActive((a) => (a + 1) % services.length);
    else setActive((a) => (a - 1 + services.length) % services.length);
  };

  return (
    <section className="md:hidden relative overflow-hidden bg-[#07101f] px-5 py-14 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(67,88,255,0.22), transparent 55%), radial-gradient(ellipse at 10% 100%, rgba(255,255,255,0.06), transparent 50%)",
        }}
      />

      <div className="relative">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-white/55">
          What we build
        </p>
        <h2 className="mb-6 font-display text-[1.85rem] font-bold leading-[0.95] tracking-[-0.025em] text-white">
          One system.
          <br />
          <span className="text-white/65">Three living layers.</span>
        </h2>

        {/* Phone frame — realistic */}
        <motion.div
          className="relative mx-auto mb-5 w-full max-w-[300px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => handleSwipe(info.offset.x)}
        >
          {/* Outer bezel */}
          <div className="relative aspect-[9/17] rounded-[2.6rem] bg-gradient-to-br from-[#1a2238] via-[#0a1020] to-[#040810] p-[3px] shadow-[0_50px_120px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.5)]">
            {/* Inner screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] border border-white/8 bg-gradient-to-br from-[#0e1830] to-[#060912] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* Reflective sweep */}
              <motion.div
                className="pointer-events-none absolute -inset-y-8 -left-1/3 z-20 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"
                animate={{ x: ["0%", "420%"] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1], repeatDelay: 1.4 }}
              />
              {/* Dynamic island */}
              <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                <div className="absolute right-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-400/70" />
              </div>
              {/* Status bar */}
              <div className="relative z-[1] flex items-center justify-between px-6 pt-2.5 text-[9px] font-semibold text-white/70">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span>●●●</span>
                  <span className="text-[8px]">100%</span>
                </span>
              </div>

              {/* Scene */}
              <div className="relative h-[calc(100%-2rem)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={service.key}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Scene />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Floating service badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${service.key}`}
              initial={{ opacity: 0, y: -8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="absolute -right-2 top-6 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 backdrop-blur-xl"
            >
              <service.Icon className="h-3 w-3 text-white" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                {service.label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Pause/play */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play" : "Pause"}
            className="absolute -left-2 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white/80 backdrop-blur active:scale-90"
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
        </motion.div>

        {/* Title under phone with scene counter */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${service.key}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/45">
              Scene {active + 1} of {services.length} · Swipe to switch
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.015em] text-white">
              {service.title}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Tabs */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          {services.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className="relative flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur active:scale-95"
            >
              {active === i && (
                <motion.span
                  layoutId="workshop-tab"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative ${active === i ? "text-black" : "text-white/70"}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            key={`prog-${active}-${paused}`}
            initial={{ width: "0%" }}
            animate={{ width: paused ? "100%" : "100%" }}
            transition={{ duration: paused ? 0 : 5.4, ease: "linear" }}
            className="h-full bg-white/70"
          />
        </div>

        {/* Single CTA */}
        <Link
          to={service.href}
          className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition-colors active:bg-white/20"
        >
          Explore {service.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default MobileServiceWorkshop;
