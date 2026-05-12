import { MousePointer2 } from "lucide-react";

const InstantReplyVisual = () => (
  <div className="relative flex h-full w-full items-center px-5">
    <div className="relative w-full">
      <div className="relative flex min-h-[4.2rem] items-center gap-4 rounded-[1rem] border border-[#dbe4f6] bg-white/82 px-4 shadow-[0_14px_34px_rgba(67,85,139,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#d6d9ff] to-[#b7bef8] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-[#152044]">Hi. I'd like to schedule</p>
          <p className="text-sm leading-snug text-[#152044]">an appointment.</p>
        </div>
        <span className="self-end pb-3 text-[0.58rem] font-semibold text-[#7b86aa]">10:24 AM</span>
      </div>

      <div className="absolute -bottom-6 left-[22%] right-[-7%] flex h-[3.25rem] items-center justify-between rounded-[0.9rem] border border-[#dfe7f7] bg-white/88 px-5 shadow-[0_18px_42px_rgba(67,85,139,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border border-[#6572ed]/50" />
          <span className="h-2 w-4 rounded-full border border-[#6572ed]/50" />
          <span className="text-xs font-semibold text-[#6670c9]">AI Assistant is typing...</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6572ed] animate-[pp-blink_1.2s_ease-in-out_infinite]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#6572ed] animate-[pp-blink_1.2s_ease-in-out_infinite] [animation-delay:0.18s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#6572ed] animate-[pp-blink_1.2s_ease-in-out_infinite] [animation-delay:0.36s]" />
        </div>
      </div>

      <MousePointer2 className="absolute -bottom-8 -right-5 h-12 w-12 fill-white text-white drop-shadow-[0_8px_14px_rgba(51,66,119,0.22)]" strokeWidth={1.2} />
    </div>
  </div>
);

export default InstantReplyVisual;
