import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Phone, CheckCircle2, User } from "lucide-react";

const transcriptScript = [
  { from: "user", text: "Hi, I'd like to book a table for Tuesday." },
  { from: "ai", text: "Of course — for how many guests?" },
  { from: "user", text: "Four people, around 7 PM if possible." },
  { from: "ai", text: "I have 7:00 or 7:30 available. Which works?" },
  { from: "user", text: "7:30 sounds great." },
  { from: "ai", text: "Booked. You'll get a confirmation by SMS." },
];

const statusSteps = ["Listening", "Qualifying", "Booking", "Confirmed"];

const features = [
  "24/7 Answers",
  "Qualifies",
  "Books Live",
  "Routes Urgent",
  "Captures Leads",
  "Custom Scripts",
];

const InboundCallingConsole = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px", once: false });
  const [seconds, setSeconds] = useState(42);
  const [transcript, setTranscript] = useState<typeof transcriptScript>(
    transcriptScript.slice(0, 2)
  );
  const [scriptIdx, setScriptIdx] = useState(2);
  const [statusIdx, setStatusIdx] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Call timer
  useEffect(() => {
    if (!inView || reduced.current) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [inView]);

  // Streaming transcript
  useEffect(() => {
    if (!inView || reduced.current) return;
    const id = setInterval(() => {
      setTranscript((prev) => {
        const next = transcriptScript[scriptIdx % transcriptScript.length];
        const updated = [...prev, next];
        return updated.length > 4 ? updated.slice(updated.length - 4) : updated;
      });
      setScriptIdx((i) => i + 1);
    }, 1800);
    return () => clearInterval(id);
  }, [inView, scriptIdx]);

  // Status chips cycle
  useEffect(() => {
    if (!inView || reduced.current) return;
    const id = setInterval(() => {
      setStatusIdx((i) => (i + 1) % statusSteps.length);
    }, 1600);
    return () => clearInterval(id);
  }, [inView]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timer = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-sm md:text-xl">Inbound Agent</h3>
          <p className="text-[10px] md:text-xs text-muted-foreground">Answers & Qualifies</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-background/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-green-500/50 animate-ping" />
            <span className="relative rounded-full bg-green-500 h-1.5 w-1.5" />
          </span>
          <span className="text-[9px] md:text-[10px] font-semibold tracking-wider text-foreground/70 uppercase">Live</span>
        </div>
      </div>

      {/* Caller strip */}
      <div
        className="rounded-lg md:rounded-xl border border-border px-3 py-2.5 md:px-4 md:py-3 mb-3 flex items-center gap-3"
        style={{ background: "hsl(var(--background) / 0.6)" }}
      >
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] md:text-sm font-medium text-foreground truncate">Incoming · +1 (415) 555 ···</p>
          <p className="text-[9px] md:text-[10px] text-muted-foreground">San Francisco, CA</p>
        </div>
        <div className="font-mono text-xs md:text-sm tabular-nums text-foreground/80">{timer}</div>
      </div>

      {/* Waveform */}
      <div
        className="rounded-lg md:rounded-xl border border-border px-3 py-3 md:px-4 md:py-4 mb-3 flex items-center justify-center gap-[3px] md:gap-1 h-[56px] md:h-[72px]"
        style={{ background: "hsl(var(--background) / 0.6)" }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="inline-block w-[3px] md:w-[4px] rounded-full bg-primary/70 origin-center"
            style={{
              height: "60%",
              animation: reduced.current ? "none" : `wave 1.2s ease-in-out ${i * 0.06}s infinite`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      {/* Transcript */}
      <div
        className="rounded-lg md:rounded-xl border border-border px-3 py-3 md:px-4 md:py-3 mb-3 min-h-[120px] md:min-h-[140px]"
        style={{ background: "hsl(var(--background) / 0.6)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] md:text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Live Transcript</span>
          <span className="text-[9px] md:text-[10px] text-primary">streaming</span>
        </div>
        <div className="space-y-1.5">
          <AnimatePresence initial={false} mode="popLayout">
            {transcript.map((line, i) => (
              <motion.div
                key={`${scriptIdx}-${i}-${line.text}`}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`flex ${line.from === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[82%] rounded-md px-2 py-1 text-[10px] md:text-xs leading-snug ${
                    line.from === "user"
                      ? "bg-secondary text-foreground/80"
                      : "bg-primary/10 text-foreground"
                  }`}
                >
                  {line.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Status chips */}
      <div className="flex items-center gap-1.5 mb-4 md:mb-5 overflow-x-auto">
        {statusSteps.map((label, i) => {
          const active = i === statusIdx;
          const passed = i < statusIdx;
          return (
            <div
              key={label}
              className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[9px] md:text-[10px] font-medium uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                active
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : passed
                  ? "border-border bg-background/60 text-foreground/60"
                  : "border-border bg-background/30 text-muted-foreground/60"
              }`}
            >
              {passed && <CheckCircle2 className="w-2.5 h-2.5" />}
              {label}
            </div>
          );
        })}
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-1.5 md:gap-2">
        {features.map((item) => (
          <div key={item} className="flex items-center gap-1.5 text-[10px] md:text-sm text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboundCallingConsole;
