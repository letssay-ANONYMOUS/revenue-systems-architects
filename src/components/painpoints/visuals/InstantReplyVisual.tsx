const InstantReplyVisual = () => (
  <div className="relative h-full w-full flex flex-col justify-center gap-1.5 px-3">
    <div className="self-start max-w-[70%] rounded-xl rounded-bl-sm bg-muted px-2.5 py-1.5">
      <div className="flex gap-1">
        <span className="w-1 h-1 rounded-full bg-muted-foreground/60 animate-[pp-blink_1.2s_ease-in-out_infinite]" />
        <span className="w-1 h-1 rounded-full bg-muted-foreground/60 animate-[pp-blink_1.2s_ease-in-out_infinite] [animation-delay:0.2s]" />
        <span className="w-1 h-1 rounded-full bg-muted-foreground/60 animate-[pp-blink_1.2s_ease-in-out_infinite] [animation-delay:0.4s]" />
      </div>
    </div>
    <div className="self-end max-w-[75%] rounded-xl rounded-br-sm bg-primary px-2.5 py-1 flex items-center gap-1.5 animate-[pp-fade-up_2s_ease-out_infinite]">
      <span className="text-[9px] md:text-[10px] text-primary-foreground font-medium">Booked · &lt;1s</span>
    </div>
  </div>
);

export default InstantReplyVisual;
