import { ReactNode } from "react";
import { CheckCircle2, LucideIcon } from "lucide-react";
import TiltCard from "@/components/TiltCard";

interface Props {
  icon: LucideIcon;
  pain: string;
  solution: string;
  visual: ReactNode;
}

const PainPointCard = ({ icon: Icon, pain, solution, visual }: Props) => (
  <TiltCard className="h-full">
    <div
      className="group relative h-full overflow-hidden rounded-xl border border-white/35 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.38)] transition-all duration-500 hover:border-white/60 md:rounded-2xl flex flex-col"
    >
      {/* Pain row */}
      <div className="relative flex items-center gap-2 p-3.5 md:p-5 pb-2 md:pb-3 transition-opacity duration-500 group-hover:opacity-50">
        <div className="absolute inset-0 bg-destructive/[0.03] pointer-events-none" />
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 relative">
          <Icon className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
        </div>
        <p className="relative text-[10px] md:text-sm text-muted-foreground line-through decoration-destructive/30">
          {pain}
        </p>
      </div>

      {/* Diagonal divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(115deg, hsl(var(--destructive) / 0.25), hsl(var(--primary) / 0.35) 60%, hsl(var(--primary) / 0.15))",
        }}
      />

      {/* Fix row */}
      <div className="flex items-center gap-2 px-3.5 md:px-5 pt-2 md:pt-3 pb-1.5 md:pb-2">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
        </div>
        <p className="text-[10px] md:text-sm font-medium text-foreground">{solution}</p>
      </div>

      {/* Animated visual */}
      <div className="mt-auto px-3.5 md:px-5 pb-3.5 md:pb-5 pt-2">
        <div className="relative h-14 md:h-20 rounded-lg border border-white/45 bg-white/35 overflow-hidden">
          {visual}
        </div>
      </div>
    </div>
  </TiltCard>
);

export default PainPointCard;
