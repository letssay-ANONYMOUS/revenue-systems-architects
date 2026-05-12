import { CalendarCheck, Check, ClipboardCheck, Mail } from "lucide-react";

const nodes = [
  { label: "New Lead", Icon: CalendarCheck },
  { label: "Follow Up", Icon: Mail },
  { label: "Qualification", Icon: ClipboardCheck },
  { label: "Booked", Icon: CalendarCheck },
  { label: "Done", Icon: Check },
];

const WorkflowNodesVisual = () => (
  <div className="relative flex h-full w-full items-center justify-between px-4">
    {nodes.map(({ label, Icon }, index) => (
      <div key={label} className="relative flex flex-1 items-center">
        <div className="flex min-w-[3.8rem] flex-col items-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#dbe4f6] bg-white/78 text-[#6372e7] shadow-[0_12px_28px_rgba(67,85,139,0.1),inset_0_1px_0_rgba(255,255,255,0.96)] animate-[pp-node-pulse_3.4s_ease-in-out_infinite]"
            style={{ animationDelay: `${index * 0.22}s` }}
          >
            <Icon className="h-5 w-5" strokeWidth={index === nodes.length - 1 ? 2.6 : 1.9} />
          </div>
          <span className="mt-2 whitespace-nowrap text-[0.62rem] font-semibold text-[#243052]">{label}</span>
        </div>
        {index < nodes.length - 1 && (
          <div className="mx-1 hidden h-px flex-1 border-t border-dashed border-[#6372e7]/45 md:block" />
        )}
      </div>
    ))}
  </div>
);

export default WorkflowNodesVisual;
