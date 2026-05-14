import { Phone, Zap } from "lucide-react";

const MissedCallVisual = () => (
  <div className="relative flex h-full w-full items-center overflow-hidden px-3 md:px-5">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_50%,rgba(101,114,237,0.16),transparent_35%),radial-gradient(ellipse_at_58%_47%,rgba(101,114,237,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(246,249,255,0.3))]" />

    <div className="relative mr-2 flex h-[4.6rem] w-[4.6rem] shrink-0 items-center justify-center md:mr-5 md:h-[6.55rem] md:w-[6.55rem]">
      <span className="absolute inset-0 rounded-full border border-[#7480f0]/14 bg-white/38 shadow-[0_18px_42px_rgba(91,106,220,0.1),inset_0_1px_0_rgba(255,255,255,0.98)]" />
      <span className="absolute inset-[0.52rem] rounded-full border border-[#7480f0]/18 bg-white/34" />
      <span className="absolute inset-[1.05rem] rounded-full border border-white/82 bg-[#6572ed]/10 shadow-[0_16px_36px_rgba(101,114,237,0.13),inset_0_1px_0_rgba(255,255,255,0.9)]" />
      <span className="absolute inset-1 rounded-full bg-[#6572ed]/10 animate-[pp-ring_3.1s_ease-out_infinite]" />
      <span className="absolute inset-3 rounded-full bg-[#6572ed]/9 animate-[pp-ring_3.1s_ease-out_infinite] [animation-delay:0.55s]" />
      <span className="relative flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full bg-gradient-to-br from-[#8b96ff] via-[#6875ee] to-[#4d59cc] text-white shadow-[0_18px_34px_rgba(74,88,213,0.34),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-10px_18px_rgba(41,53,156,0.22)] md:h-[3.65rem] md:w-[3.65rem]">
        <Phone className="h-4 w-4 md:h-6 md:w-6" strokeWidth={2.2} />
      </span>
    </div>

    <div className="relative h-[4rem] flex-1 min-w-[60px] overflow-hidden rounded-[1.15rem] md:h-[5.85rem]">
      <div className="absolute inset-y-3 left-0 right-0 rounded-full bg-gradient-to-r from-transparent via-[#eef2ff]/95 to-transparent blur-xl" />
      <svg className="relative h-full w-full" viewBox="0 0 320 84" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="missed-call-wave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#aab2ff" stopOpacity="0" />
            <stop offset="22%" stopColor="#8b96ff" stopOpacity="0.55" />
            <stop offset="52%" stopColor="#5665e8" stopOpacity="0.95" />
            <stop offset="82%" stopColor="#8b96ff" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#aab2ff" stopOpacity="0" />
          </linearGradient>
          <filter id="missed-call-wave-glow" x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M0 42 C14 42 16 42 26 42 C34 42 36 24 42 24 C50 24 50 61 58 61 C66 61 66 18 75 18 C84 18 84 66 93 66 C102 66 101 30 109 30 C118 30 118 54 126 54 C134 54 134 20 143 20 C153 20 151 68 160 68 C169 68 170 27 178 27 C187 27 187 57 195 57 C204 57 203 21 212 21 C221 21 221 62 230 62 C239 62 238 31 247 31 C257 31 255 52 264 52 C273 52 273 37 282 37 C293 37 296 42 320 42"
          fill="none"
          stroke="#6572ed"
          strokeLinecap="round"
          strokeWidth="1.4"
          opacity="0.14"
        />
        <path
          className="pp-voice-glow"
          d="M0 42 C14 42 16 42 26 42 C34 42 36 24 42 24 C50 24 50 61 58 61 C66 61 66 18 75 18 C84 18 84 66 93 66 C102 66 101 30 109 30 C118 30 118 54 126 54 C134 54 134 20 143 20 C153 20 151 68 160 68 C169 68 170 27 178 27 C187 27 187 57 195 57 C204 57 203 21 212 21 C221 21 221 62 230 62 C239 62 238 31 247 31 C257 31 255 52 264 52 C273 52 273 37 282 37 C293 37 296 42 320 42"
          fill="none"
          filter="url(#missed-call-wave-glow)"
          stroke="url(#missed-call-wave)"
          strokeDasharray="44 596"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          className="pp-voice-flow"
          d="M0 42 C14 42 16 42 26 42 C34 42 36 24 42 24 C50 24 50 61 58 61 C66 61 66 18 75 18 C84 18 84 66 93 66 C102 66 101 30 109 30 C118 30 118 54 126 54 C134 54 134 20 143 20 C153 20 151 68 160 68 C169 68 170 27 178 27 C187 27 187 57 195 57 C204 57 203 21 212 21 C221 21 221 62 230 62 C239 62 238 31 247 31 C257 31 255 52 264 52 C273 52 273 37 282 37 C293 37 296 42 320 42"
          fill="none"
          stroke="#5665e8"
          strokeDasharray="14 626"
          strokeLinecap="round"
          strokeWidth="2.6"
        />
      </svg>
      <span className="pp-voice-sheen absolute left-0 top-1/2 h-12 w-16 -translate-y-1/2 rounded-full bg-[#6572ed]/10 blur-xl" />
    </div>

    <div className="ml-2 min-w-[4.6rem] rounded-[0.85rem] border border-[#d9e2fa] bg-white/86 px-2.5 py-2 shadow-[0_18px_42px_rgba(67,85,139,0.15),inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-10px_22px_rgba(101,114,237,0.045)] backdrop-blur-xl md:ml-5 md:min-w-[6.15rem] md:rounded-[1rem] md:px-4 md:py-3">
      <p className="mb-0.5 text-[0.52rem] font-bold uppercase tracking-[0.14em] text-[#5665c8] md:mb-1 md:text-[0.62rem] md:tracking-[0.16em]">Answered</p>
      <div className="flex items-center gap-1 md:gap-2">
        <Zap className="h-3 w-3 text-[#6572ed] md:h-4 md:w-4" fill="currentColor" />
        <span className="font-display text-base font-bold tracking-[-0.06em] text-[#111936] md:text-2xl">0.4s</span>
      </div>
      <p className="mt-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-[#65709c] md:mt-1 md:text-[0.62rem] md:tracking-[0.14em]">Avg speed</p>
    </div>
  </div>
);

export default MissedCallVisual;
