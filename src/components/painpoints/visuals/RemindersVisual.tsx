import { Check } from "lucide-react";

const RemindersVisual = () => (
  <div className="relative h-full w-full flex items-center justify-center gap-2 px-3">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="relative flex-1 h-12 md:h-14 rounded-md border border-border bg-background/60 flex flex-col items-center justify-center gap-0.5 animate-[pp-slot-confirm_3s_ease-in-out_infinite]"
        style={{ animationDelay: `${i * 0.4}s` }}
      >
        <span className="text-[8px] md:text-[9px] text-muted-foreground font-medium">{["MON", "TUE", "WED"][i]}</span>
        <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />
      </div>
    ))}
  </div>
);

export default RemindersVisual;
