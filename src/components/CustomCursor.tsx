import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 32, stiffness: 520, mass: 0.55 });
  const springY = useSpring(cursorY, { damping: 32, stiffness: 520, mass: 0.55 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    // Inject cursor:none style imperatively to avoid React reconciliation
    // issues with rendering <style> inside the component tree.
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-custom-cursor", "");
    styleEl.textContent = `* { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    let frameId = 0;

    const onMove = (e: MouseEvent) => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        frameId = 0;
      });
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest("a, button, [role='button'], .premium-btn, .btn-outline-premium"));
    };

    const onPointerOver = (e: PointerEvent) => {
      if (isInteractive(e.target)) setHovering(true);
    };

    const onPointerOut = (e: PointerEvent) => {
      if (!isInteractive(e.relatedTarget)) setHovering(false);
    };

    const onPointerLeave = () => {
      setVisible(false);
      setHovering(false);
    };

    const onPointerEnter = (e: PointerEvent) => {
      setVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerenter", onPointerEnter, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.removeEventListener("pointerenter", onPointerEnter);
      styleEl.remove();
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full"
        style={{
          x: springX,
          y: springY,
          width: hovering ? 48 : 10,
          height: hovering ? 48 : 10,
          marginLeft: hovering ? -24 : -5,
          marginTop: hovering ? -24 : -5,
          backgroundColor: hovering ? "hsl(210 40% 65% / 0.15)" : "hsl(210 40% 65% / 0.8)",
          border: hovering ? "1px solid hsl(210 40% 65% / 0.4)" : "none",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), margin 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease",
          willChange: "transform",
        }}
      >
        <motion.span
          className="rounded-full"
          style={{
            width: hovering ? 18 : 6,
            height: 1,
            backgroundColor: "hsl(222 28% 10% / 0.82)",
            boxShadow: "0 0 1px hsl(0 0% 100% / 0.45)",
            transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
            opacity: hovering ? 0.78 : 0.72,
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
