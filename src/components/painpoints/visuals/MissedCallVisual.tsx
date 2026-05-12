import { Phone, Zap } from "lucide-react";

const MissedCallVisual = () => (
  <div className="relative flex h-full w-full items-center overflow-hidden px-5">
    <div className="relative mr-5 flex h-[5.6rem] w-[5.6rem] shrink-0 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-[#7480f0]/12 bg-[#6572ed]/5" />
      <span className="absolute inset-2 rounded-full border border-[#7480f0]/18 bg-[#6572ed]/7" />
      <span className="absolute inset-4 rounded-full bg-[#6572ed]/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
      <span className="absolute inset-0 rounded-full bg-[#6572ed]/10 animate-[pp-ring_2.8s_ease-out_infinite]" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#8490ff] to-[#5361d7] text-white shadow-[0_18px_34px_rgba(74,88,213,0.28),inset_0_1px_0_rgba(255,255,255,0.38)]">
        <Phone className="h-6 w-6" strokeWidth={2.2} />
      </span>
    </div>

    <div className="relative h-[5.2rem] flex-1 overflow-hidden rounded-[1.1rem]">
      <div className="absolute inset-y-4 left-0 right-0 rounded-full bg-gradient-to-r from-transparent via-[#eef2ff]/80 to-transparent blur-xl" />
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
          strokeDasharray="72 248"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          className="pp-voice-flow"
          d="M0 42 C14 42 16 42 26 42 C34 42 36 24 42 24 C50 24 50 61 58 61 C66 61 66 18 75 18 C84 18 84 66 93 66 C102 66 101 30 109 30 C118 30 118 54 126 54 C134 54 134 20 143 20 C153 20 151 68 160 68 C169 68 170 27 178 27 C187 27 187 57 195 57 C204 57 203 21 212 21 C221 21 221 62 230 62 C239 62 238 31 247 31 C257 31 255 52 264 52 C273 52 273 37 282 37 C293 37 296 42 320 42"
          fill="none"
          stroke="url(#missed-call-wave)"
          strokeDasharray="36 284"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      </svg>
      <span className="pp-voice-sheen absolute left-0 top-1/2 h-10 w-20 -translate-y-1/2 rounded-full bg-[#6572ed]/10 blur-xl" />
    </div>

    <div className="ml-5 min-w-[6.2rem] rounded-[1rem] border border-[#d9e2fa] bg-white/76 px-4 py-3 shadow-[0_14px_34px_rgba(67,85,139,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-xl">
      <p className="mb-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#5665c8]">Answered</p>
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-[#6572ed]" fill="currentColor" />
        <span className="font-display text-2xl font-bold tracking-[-0.06em] text-[#111936]">0.4s</span>
      </div>
      <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#65709c]">Avg speed</p>
    </div>
  </div>
);

export default MissedCallVisual;
