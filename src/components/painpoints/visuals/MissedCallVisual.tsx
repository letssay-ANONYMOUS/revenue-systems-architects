import { Phone } from "lucide-react";

const MissedCallVisual = () => (
  <div className="relative h-full w-full flex items-center justify-between px-3">
    <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
      <span className="absolute inset-0 rounded-full bg-primary/15 animate-[pp-ring_2.4s_ease-out_infinite]" />
      <span className="absolute inset-0 rounded-full bg-primary/10 animate-[pp-ring_2.4s_ease-out_infinite] [animation-delay:0.8s]" />
      <span className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground">
        <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </span>
    </div>
    <div className="flex flex-col items-end gap-0.5">
      <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-primary font-semibold">Answered</span>
      <span className="font-display text-base md:text-xl font-bold text-foreground tabular-nums">0.4s</span>
    </div>
  </div>
);

export default MissedCallVisual;
