import CountUp from "@/components/CountUp";

const LighthouseVisual = () => {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_42%,rgba(101,114,237,0.13),transparent_34%),radial-gradient(ellipse_at_88%_12%,rgba(255,255,255,0.96),transparent_36%)]" />
      <div className="relative mr-7 h-[6.35rem] w-[7.45rem] shrink-0 md:mr-8">
        <span className="absolute inset-x-1 bottom-0 h-12 rounded-full bg-[#6572ed]/8 blur-xl" />
        <svg viewBox="0 0 132 92" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="web-score-arc" x1="16" x2="116" y1="72" y2="72" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9ba3ff" />
              <stop offset="0.58" stopColor="#6572ed" />
              <stop offset="1" stopColor="#3f4fd0" />
            </linearGradient>
          </defs>
          <path d="M18 72 A48 48 0 0 1 114 72" fill="none" stroke="#dfe5f2" strokeWidth="14" strokeLinecap="round" />
          <path
            className="pp-web-gauge"
            d="M18 72 A48 48 0 0 1 114 72"
            fill="none"
            stroke="url(#web-score-arc)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path d="M106 67 C115 64 119 69 118 76 C117 84 109 88 101 83" fill="none" stroke="#ffffff" strokeWidth="11" strokeLinecap="round" />
          <path d="M106 67 C115 64 119 69 118 76 C117 84 109 88 101 83" fill="none" stroke="#d8e0f3" strokeWidth="1.4" strokeLinecap="round" />
          <circle className="pp-web-gauge-dot" cx="66" cy="24" r="2.4" fill="#ffffff" stroke="#6572ed" strokeWidth="1.15" />
        </svg>
        <div className="absolute inset-x-0 bottom-3 flex flex-col items-center justify-center">
          <CountUp target={98} duration={2.2} className="font-display text-[2.05rem] font-bold leading-none tracking-[-0.06em] text-[#111936] tabular-nums" />
          <span className="-mt-0.5 text-[0.62rem] font-semibold text-[#65709c]">/100</span>
        </div>
      </div>

      <div className="relative h-20 w-px bg-[#d9e1f2]" />

      <div className="relative ml-7 flex-1">
        <p className="mb-3 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-[#40518b]">Conversion score</p>
        <p className="font-display text-[1.65rem] font-bold leading-none tracking-[-0.04em] text-[#6572ed]">+32%</p>
        <p className="mt-1 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[#65709c]">vs. last 30 days</p>
        <svg viewBox="0 0 168 44" className="mt-2 h-8 w-full overflow-visible">
          <defs>
            <linearGradient id="web-trend-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#6572ed" stopOpacity="0.16" />
              <stop offset="1" stopColor="#6572ed" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M4 34 C17 26 24 27 37 23 C50 18 59 27 72 22 C86 17 93 20 105 15 C120 8 127 2 139 8 C151 14 154 6 164 2 L164 44 L4 44 Z" fill="url(#web-trend-fill)" opacity="0.82" />
          <path className="pp-web-line" d="M4 34 C17 26 24 27 37 23 C50 18 59 27 72 22 C86 17 93 20 105 15 C120 8 127 2 139 8 C151 14 154 6 164 2" fill="none" stroke="#6572ed" strokeWidth="3" strokeLinecap="round" />
          <circle className="pp-web-dot" cx="164" cy="2" r="3.2" fill="#6572ed" />
        </svg>
      </div>
    </div>
  );
};

export default LighthouseVisual;
