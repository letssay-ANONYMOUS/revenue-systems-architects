import { Bell, Check } from "lucide-react";

const reminders = [
  { day: "MON", label: "Upcoming", time: "4:00 PM", active: false },
  { day: "TUE", label: "Reminder", time: "sent", active: true },
  { day: "WED", label: "Upcoming", time: "1:00 PM", active: false },
];

const RemindersVisual = () => (
  <div className="relative flex h-full w-full items-center gap-4 px-5">
    {reminders.map((item) => (
      <div
        key={item.day}
        className={`relative flex h-[5.55rem] flex-1 flex-col justify-between rounded-[0.9rem] border px-3 py-3 shadow-[0_14px_32px_rgba(67,85,139,0.1),inset_0_1px_0_rgba(255,255,255,0.92)] ${
          item.active
            ? "border-[#bfc7ff] bg-[#eef0ff]/86 text-[#4553d3]"
            : "border-[#dde6f6] bg-white/72 text-[#142044]"
        }`}
      >
        <p className="text-xs font-semibold">{item.day}</p>
        <div>
          <p className="text-xs font-medium">{item.label}</p>
          <p className="mt-1 text-xs font-semibold">{item.time}</p>
        </div>
        {item.active ? (
          <Check className="absolute bottom-3 right-3 h-4 w-4 text-[#5867e7]" strokeWidth={2.4} />
        ) : (
          <Bell className="absolute bottom-3 right-3 h-4 w-4 text-[#6c77c8]" strokeWidth={1.8} />
        )}
      </div>
    ))}
    <div className="hidden h-[5.55rem] w-[5.2rem] flex-col items-center justify-center rounded-[0.9rem] border border-[#dde6f6] bg-white/58 text-[#66709a] shadow-[0_14px_32px_rgba(67,85,139,0.08),inset_0_1px_0_rgba(255,255,255,0.92)] md:flex">
      <Bell className="mb-2 h-5 w-5" />
      <span className="text-xs font-medium">All set</span>
    </div>
  </div>
);

export default RemindersVisual;
