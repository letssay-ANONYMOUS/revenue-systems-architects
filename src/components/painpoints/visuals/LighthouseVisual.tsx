import CountUp from "@/components/CountUp";

const LighthouseVisual = () => {
  const radius = 33;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex h-full w-full items-center px-6">
      <div className="relative mr-8 h-[6.1rem] w-[6.1rem] shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#dbe2f2" strokeWidth="11" strokeLinecap="round" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#6572ed"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ animation: "pp-dial 2.4s ease-out forwards", ["--pp-dial-end" as never]: circumference * 0.1 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CountUp target={98} duration={2.2} className="font-display text-3xl font-bold leading-none tracking-[-0.06em] text-[#111936] tabular-nums" />
          <span className="text-[0.62rem] font-medium text-[#65709c]">/100</span>
        </div>
      </div>

      <div className="h-20 w-px bg-[#d9e1f2]" />

      <div className="ml-7 flex-1">
        <p className="mb-3 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-[#40518b]">Conversion score</p>
        <p className="font-display text-2xl font-bold tracking-[-0.04em] text-[#6572ed]">+32%</p>
        <p className="mt-1 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[#65709c]">vs. last 30 days</p>
        <svg viewBox="0 0 150 40" className="mt-2 h-8 w-full">
          <path d="M3 30 C20 21 28 30 42 25 C56 19 65 25 78 22 C96 18 103 4 119 8 C132 11 138 2 147 6" fill="none" stroke="#6572ed" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default LighthouseVisual;
