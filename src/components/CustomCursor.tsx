import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 34, stiffness: 740, mass: 0.32 });
  const springY = useSpring(cursorY, { damping: 34, stiffness: 740, mass: 0.32 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-custom-cursor", "");
    styleEl.textContent = `* { cursor: none !important; }`;
    document.head.appendChild(styleEl);

    let frameId = 0;

    const onMove = (event: MouseEvent) => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
        frameId = 0;
      });
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest("a, button, [role='button'], .premium-btn, .btn-outline-premium"));
    };

    const onPointerOver = (event: PointerEvent) => {
      if (isInteractive(event.target)) setHovering(true);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!isInteractive(event.relatedTarget)) setHovering(false);
    };

    const onPointerLeave = () => {
      setVisible(false);
      setHovering(false);
      setPressed(false);
    };

    const onPointerEnter = (event: PointerEvent) => {
      setVisible(true);
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerenter", onPointerEnter, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.removeEventListener("pointerenter", onPointerEnter);
      styleEl.remove();
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-12 w-12"
      style={{
        x: springX,
        y: springY,
        willChange: "transform",
      }}
      animate={{
        scale: pressed ? 0.94 : hovering ? 1.06 : 1,
      }}
      transition={{ type: "spring", stiffness: 560, damping: 34, mass: 0.34 }}
      aria-hidden="true"
    >
      {/* Hotspot is at (0,0) of this SVG — the very tip of the arrow */}
      <svg
        width="28"
        height="32"
        viewBox="0 0 28 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block overflow-visible"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="cursor-face" x1="2" y1="2" x2="22" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3a3b3c" />
            <stop offset="0.45" stopColor="#1b1c1d" />
            <stop offset="1" stopColor="#050606" />
          </linearGradient>
          <linearGradient id="cursor-edge" x1="0" y1="0" x2="24" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#a8aaab" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#2a2b2c" />
            <stop offset="1" stopColor="#0a0b0b" />
          </linearGradient>
          <linearGradient id="cursor-sheen" x1="3" y1="3" x2="14" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <filter id="cursor-shadow" x="-6" y="-4" width="40" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0.5" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.35" />
            <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        <g filter="url(#cursor-shadow)">
          {/* Classic arrow pointer, tip exactly at (0,0). Subtle ~12° tilt. */}
          <path
            d="M0.6 0.6 L0.6 22.4 L6.4 17.6 L9.9 25.8 L13.0 24.5 L9.6 16.4 L17.0 16.4 Z"
            fill="url(#cursor-face)"
            stroke="url(#cursor-edge)"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M2.0 3.0 L2.0 19.5 L6.2 15.9 L9.4 23.4 L11.2 22.7 L8.0 15.2 L14.4 15.2 Z"
            fill="url(#cursor-sheen)"
            opacity="0.85"
          />
        </g>
      </svg>
    </motion.div>
  );
};

export default CustomCursor;
