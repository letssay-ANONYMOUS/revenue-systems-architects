import { Bell, Check } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const reminders = [
  { day: "MON", label: "Upcoming", time: "4:00 PM", active: false },
  { day: "TUE", label: "Reminder", time: "sent", active: true },
  { day: "WED", label: "Upcoming", time: "1:00 PM", active: false },
  { day: "", label: "All set", time: "", active: false, complete: true },
];

type Reminder = (typeof reminders)[number];

const ReminderTile = ({ item }: { item: Reminder }) => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 190, damping: 22, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 190, damping: 22, mass: 0.45 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ["12%", "88%"]);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ["10%", "86%"]);

  return (
    <motion.div
      key={item.day || item.label}
      className={`relative flex h-[5.7rem] flex-1 flex-col justify-between overflow-hidden rounded-[1rem] border px-3 py-3 backdrop-blur-2xl ${
        item.active
          ? "border-[#c7c4ff]/90 bg-[#f4f2ff]/72 text-[#4452d0] shadow-[0_20px_44px_rgba(94,85,209,0.2),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-20px_34px_rgba(109,88,220,0.12),inset_18px_0_40px_rgba(255,255,255,0.2)]"
          : "border-white/82 bg-white/62 text-[#142044] shadow-[0_18px_38px_rgba(67,85,139,0.13),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-16px_30px_rgba(109,88,220,0.055),inset_16px_0_38px_rgba(255,255,255,0.18)]"
      }`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 760,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(255,255,255,0.12)_42%,rgba(132,123,235,0.1)),radial-gradient(ellipse_at_18%_0%,rgba(255,255,255,0.98),transparent_39%),radial-gradient(ellipse_at_88%_98%,rgba(132,123,235,0.18),transparent_48%)]" />
      <motion.span
        className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/38 blur-xl"
        style={{ left: sheenX, top: sheenY, transform: "translateZ(26px)" }}
      />
      <span className="pointer-events-none absolute inset-[1px] rounded-[0.9rem] border border-white/76 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),inset_0_18px_34px_rgba(255,255,255,0.18)]" />
      {item.complete ? (
        <div className="relative flex h-full flex-col items-center justify-center text-center text-[#66709a]" style={{ transform: "translateZ(28px)" }}>
          <Bell className="mb-2 h-5 w-5" strokeWidth={1.8} />
          <span className="text-xs font-medium">All set</span>
        </div>
      ) : (
        <>
          <p className="relative text-xs font-semibold" style={{ transform: "translateZ(30px)" }}>{item.day}</p>
          <div className="relative" style={{ transform: "translateZ(26px)" }}>
            <p className="text-xs font-medium">{item.label}</p>
            <p className="mt-1 text-xs font-semibold">{item.time}</p>
          </div>
          {item.active ? (
            <Check className="absolute bottom-3 right-3 h-4 w-4 text-[#5867e7]" strokeWidth={2.4} style={{ transform: "translateZ(32px)" }} />
          ) : (
            <Bell className="absolute bottom-3 right-3 h-4 w-4 text-[#6c77c8]" strokeWidth={1.8} style={{ transform: "translateZ(32px)" }} />
          )}
        </>
      )}
    </motion.div>
  );
};

const RemindersVisual = () => (
  <div className="relative flex h-full w-full items-center gap-3 px-4 [perspective:900px] md:gap-4 md:px-5">
    {reminders.map((item) => (
      <ReminderTile key={item.day || item.label} item={item} />
    ))}
  </div>
);

export default RemindersVisual;
