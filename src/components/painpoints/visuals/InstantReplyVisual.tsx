const InstantReplyVisual = () => (
  <div className="relative flex h-full w-full items-center px-5">
    <div className="relative w-full">
      <div className="relative flex min-h-[4.25rem] items-center gap-4 rounded-[1rem] border border-[#dbe4f6] bg-white/86 px-4 shadow-[0_14px_34px_rgba(67,85,139,0.1),inset_0_1px_0_rgba(255,255,255,0.96)]">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#d6d9ff] to-[#b7bef8] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-[#152044]">Hi. I'd like to schedule</p>
          <p className="text-sm leading-snug text-[#152044]">an appointment.</p>
        </div>
        <span className="self-end pb-3 text-[0.58rem] font-semibold text-[#7b86aa]">10:24 AM</span>
      </div>

      <div className="absolute -bottom-10 left-[18%] right-[-6%] flex h-[3.1rem] items-center justify-between rounded-[0.95rem] border border-[#dbe4f6] bg-white/94 px-5 shadow-[0_24px_52px_rgba(67,85,139,0.18),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-12px_24px_rgba(101,114,237,0.035)] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-[#6572ed]/62 bg-[#6572ed]/8" />
          <span className="h-2.5 w-[1.125rem] rounded-full border border-[#6572ed]/62 bg-[#6572ed]/8" />
          <span className="text-[0.82rem] font-bold text-[#4f5fc4]">AI Assistant is typing...</span>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#6572ed] shadow-[0_0_10px_rgba(101,114,237,0.24)] animate-[pp-typing-dot_1.08s_ease-in-out_infinite]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6572ed] shadow-[0_0_10px_rgba(101,114,237,0.24)] animate-[pp-typing-dot_1.08s_ease-in-out_infinite] [animation-delay:0.16s]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6572ed] shadow-[0_0_10px_rgba(101,114,237,0.24)] animate-[pp-typing-dot_1.08s_ease-in-out_infinite] [animation-delay:0.32s]" />
        </div>
      </div>

      <svg
        className="absolute -bottom-[4.35rem] -right-7 h-[4.45rem] w-[4.45rem] rotate-[-4deg] drop-shadow-[0_13px_15px_rgba(51,66,119,0.22)]"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M13 6.5C11.8 5.8 10.5 7.1 11.2 8.3L34.9 52.8C36.4 55.6 40.7 55.1 41.4 52L43.1 44.8C43.5 43.1 44.8 41.8 46.5 41.4L53.3 39.8C56.4 39.1 57 34.9 54.2 33.3L13 6.5Z"
          fill="white"
          stroke="#dfe5ef"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 11.8L50.2 34.2C51.4 35 51.1 36.8 49.7 37.1L43.7 38.5C40.2 39.3 37.5 42 36.7 45.5L35.3 51.6"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.82"
        />
      </svg>
    </div>
  </div>
);

export default InstantReplyVisual;
