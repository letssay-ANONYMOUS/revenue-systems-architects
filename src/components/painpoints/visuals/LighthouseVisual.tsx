import CountUp from "@/components/CountUp";

const LighthouseVisual = () => {
  const r = 22;
  const c = 2 * Math.PI * r;
  const target = 0.98;
  return (
    <div className="relative h-full w-full flex items-center justify-between px-3">
      <div className="relative w-14 h-14 md:w-16 md:h-16">
        <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
          <circle cx="30" cy="30" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
          <circle
            cx="30"
            cy="30"
            r={r}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c}
            style={{ animation: "pp-dial 2.4s ease-out forwards", ["--pp-dial-end" as never]: c * (1 - target) }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <CountUp target={98} duration={2.2} className="font-display font-bold text-sm md:text-base text-foreground tabular-nums" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-primary font-semibold">Performance</span>
        <span className="text-[9px] md:text-[10px] text-muted-foreground line-through">was 32</span>
      </div>
    </div>
  );
};

export default LighthouseVisual;
