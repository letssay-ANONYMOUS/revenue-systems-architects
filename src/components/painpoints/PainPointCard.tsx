import { ReactNode } from "react";
import {
  Bell,
  Blocks,
  CalendarDays,
  Check,
  Files,
  MessageCircle,
  Monitor,
  Phone,
  X,
} from "lucide-react";

interface Props {
  pain: string;
  solution: string;
  caption: string;
  visual: ReactNode;
}

const problemIcons = {
  "Missed calls": Phone,
  "Slow responses": MessageCircle,
  "No-show chaos": CalendarDays,
  "Weak web presence": Monitor,
  "Manual admin": Files,
  "Fragmented tools": Blocks,
};

const ProblemGlyph = ({ pain }: { pain: string }) => {
  const Icon = problemIcons[pain as keyof typeof problemIcons] ?? Bell;

  return (
    <div className="pointer-events-none absolute right-6 top-5 hidden md:block">
      <div className="relative flex h-[4.6rem] w-[5.7rem] items-center justify-center rounded-[1.15rem] border border-white/70 bg-white/58 shadow-[0_18px_38px_rgba(178,66,74,0.13),inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-10px_26px_rgba(180,61,70,0.06)] backdrop-blur-xl">
        <Icon className="h-9 w-9 text-[#a7a2aa]" strokeWidth={1.75} />
        {pain === "Slow responses" && (
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6372b8]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#6372b8]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#6372b8]" />
          </div>
        )}
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/80 bg-[#e36b6f] text-white shadow-[0_10px_22px_rgba(191,42,49,0.24)]">
          <X className="h-3.5 w-3.5" strokeWidth={2.7} />
        </span>
      </div>
    </div>
  );
};

const PainPointCard = ({ pain, solution, caption, visual }: Props) => (
  <div className="group relative h-full min-h-[18.8rem] overflow-hidden rounded-[1.55rem] border border-[#bdd0ee]/80 bg-white/62 text-[#101831] shadow-[0_26px_70px_rgba(48,75,130,0.12),inset_0_1px_0_rgba(255,255,255,0.94)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-[#9cb7e4]/90 hover:shadow-[0_34px_86px_rgba(48,75,130,0.16),inset_0_1px_0_rgba(255,255,255,0.98)] xl:min-h-[20.6rem]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,rgba(255,255,255,0.94),transparent_34%),radial-gradient(ellipse_at_8%_86%,rgba(211,225,255,0.35),transparent_48%)]" />
    <div className="pointer-events-none absolute inset-[1px] rounded-[1.45rem] border border-white/68 shadow-[inset_0_28px_70px_rgba(255,255,255,0.36),inset_0_-24px_52px_rgba(148,175,220,0.08)]" />

    <div className="relative min-h-[6.35rem] border-b border-[#d7dbe7]/85 bg-[linear-gradient(180deg,rgba(255,241,242,0.66),rgba(255,247,248,0.24))] px-5 pb-4 pt-5 xl:min-h-[6.9rem] xl:px-7 xl:pb-5 xl:pt-6">
      <ProblemGlyph pain={pain} />
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ffb5b9]/90 bg-white/62 text-[#ff474d] shadow-[0_10px_24px_rgba(220,54,61,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]">
          <X className="h-5 w-5" strokeWidth={2.6} />
        </div>
        <div>
          <p className="mb-1 text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#f04d56]">
            Problem
          </p>
          <h3 className="text-lg font-semibold leading-tight tracking-[-0.015em] md:text-xl">
            {pain}
          </h3>
        </div>
      </div>
    </div>

    <div className="relative px-5 pb-5 pt-4 xl:px-7 xl:pb-6 xl:pt-5">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6472ed] text-white shadow-[0_12px_26px_rgba(76,91,218,0.26),inset_0_1px_0_rgba(255,255,255,0.38)]">
          <Check className="h-5 w-5" strokeWidth={2.7} />
        </div>
        <div>
          <p className="mb-1 text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[#4057d7]">
            Solution
          </p>
          <p className="text-lg font-semibold leading-tight tracking-[-0.015em] text-[#111936] md:text-xl">
            {solution}
          </p>
        </div>
      </div>

      <div className="relative mb-4 h-[6.75rem] overflow-hidden rounded-[1.15rem] border border-white/76 bg-white/58 shadow-[0_18px_42px_rgba(61,84,133,0.1),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-xl xl:mb-5 xl:h-[7.75rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(255,255,255,0.9),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.46),rgba(232,239,252,0.2))]" />
        <div className="relative h-full">{visual}</div>
      </div>

      <p className="text-sm font-medium leading-relaxed text-[#40518b] md:text-base">
        {caption}
      </p>
    </div>
  </div>
);

export default PainPointCard;
