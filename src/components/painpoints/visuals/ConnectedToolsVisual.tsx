import { CalendarCheck, Mail, Phone, Sparkles, TrendingUp, User } from "lucide-react";

const nodes = [
  { x: 18, y: 25, Icon: Phone },
  { x: 84, y: 22, Icon: CalendarCheck },
  { x: 14, y: 70, Icon: User },
  { x: 84, y: 68, Icon: Mail },
  { x: 70, y: 84, Icon: TrendingUp },
];

const ConnectedToolsVisual = () => (
  <div className="relative h-full w-full">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      {nodes.map((node, index) => (
        <line
          key={`${node.x}-${node.y}`}
          x1="50"
          y1="50"
          x2={node.x}
          y2={node.y}
          stroke="#6572ed"
          strokeOpacity="0.5"
          strokeWidth="0.7"
          strokeDasharray="3 3"
          strokeDashoffset="18"
          style={{ animation: `pp-draw 2.4s ease-out ${index * 0.12}s forwards` }}
        />
      ))}
    </svg>

    <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#dfe7f8] bg-white/72 shadow-[0_18px_42px_rgba(67,85,139,0.18),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#8790ff] to-[#5360dc] text-white shadow-[0_12px_24px_rgba(76,91,218,0.28),inset_0_1px_0_rgba(255,255,255,0.38)]">
        <Sparkles className="h-6 w-6" fill="currentColor" strokeWidth={1.8} />
      </div>
    </div>

    {nodes.map(({ x, y, Icon }) => (
      <div
        key={`${x}-${y}`}
        className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#dfe7f8] bg-white/78 text-[#6372e7] shadow-[0_12px_28px_rgba(67,85,139,0.11),inset_0_1px_0_rgba(255,255,255,0.94)]"
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </div>
    ))}
  </div>
);

export default ConnectedToolsVisual;
