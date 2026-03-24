import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnterInteractive = () => setHovering(true);
    const onLeaveInteractive = () => setHovering(false);

    window.addEventListener("mousemove", onMove);

    // Observe DOM for interactive elements
    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button'], .premium-btn, .btn-outline-premium").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
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
          mixBlendMode: "screen",
        }}
      />
      {/* Glow trail */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          background: "radial-gradient(circle, hsl(210 50% 60% / 0.12), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

export default CustomCursor;
