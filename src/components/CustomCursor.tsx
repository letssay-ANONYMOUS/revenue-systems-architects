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
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-16 w-16"
      style={{
        x: springX,
        y: springY,
        translateX: -58,
        translateY: -30,
        willChange: "transform",
      }}
      animate={{
        scale: pressed ? 0.96 : hovering ? 1.035 : 1,
      }}
      transition={{ type: "spring", stiffness: 560, damping: 34, mass: 0.34 }}
      aria-hidden="true"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block overflow-visible"
      >
        <defs>
          <linearGradient id="cursor-matte-face" x1="16" y1="8" x2="48" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#555656" />
            <stop offset="0.22" stopColor="#343535" />
            <stop offset="0.56" stopColor="#181919" />
            <stop offset="0.84" stopColor="#090a0a" />
            <stop offset="1" stopColor="#020303" />
          </linearGradient>
          <linearGradient id="cursor-matte-edge" x1="12" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8a8b8b" />
            <stop offset="0.25" stopColor="#414343" />
            <stop offset="0.55" stopColor="#111212" />
            <stop offset="0.78" stopColor="#030404" />
            <stop offset="1" stopColor="#303131" />
          </linearGradient>
          <linearGradient id="cursor-matte-rim" x1="15" y1="9" x2="42" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9a9b9b" stopOpacity="0.36" />
            <stop offset="0.42" stopColor="#ffffff" stopOpacity="0.07" />
            <stop offset="0.78" stopColor="#000000" stopOpacity="0.22" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.66" />
          </linearGradient>
          <radialGradient id="cursor-matte-highlight" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29 18) rotate(48) scale(28 15)">
            <stop stopColor="#858686" stopOpacity="0.32" />
            <stop offset="0.54" stopColor="#3a3b3b" stopOpacity="0.08" />
            <stop offset="1" stopColor="#121313" stopOpacity="0" />
          </radialGradient>
          <filter id="cursor-matte-depth" x="-14" y="-12" width="96" height="96" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="8" stdDeviation="4.6" floodColor="#020303" floodOpacity="0.28" />
            <feDropShadow dx="0" dy="2" stdDeviation="1.1" floodColor="#000000" floodOpacity="0.42" />
          </filter>
        </defs>

        <g filter="url(#cursor-matte-depth)">
          <path
            d="M14.82 7.6C11.34 5.9 7.64 9.28 9.08 12.88L24.88 52.42C27.08 57.92 34.42 58.88 37.98 54.12L58.08 27.24C61.5 22.66 58.46 16.08 52.77 15.76L14.82 7.6Z"
            fill="url(#cursor-matte-face)"
            stroke="url(#cursor-matte-edge)"
            strokeWidth="2.45"
            strokeLinejoin="round"
          />
          <path
            d="M16.14 11.34C14.64 10.62 13.05 12.06 13.67 13.61L28.45 50.58C29.37 52.88 32.43 53.29 33.92 51.3L55.05 23.05C56.48 21.13 55.21 18.38 52.84 18.22L16.14 11.34Z"
            fill="url(#cursor-matte-highlight)"
            opacity="0.82"
          />
          <path
            d="M15.9 11.66C14.64 11.04 13.29 12.26 13.82 13.56L28.08 49.32C28.86 51.27 31.47 51.62 32.72 49.95L53.86 21.7"
            stroke="url(#cursor-matte-rim)"
            strokeWidth="1.18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.12 12.98L50.22 19.78C53.02 20.39 53.98 23.86 52.14 26.05"
            stroke="#9d9f9f"
            strokeOpacity="0.2"
            strokeWidth="1.05"
            strokeLinecap="round"
          />
          <path
            d="M28.52 51.04C29.24 52.88 31.74 53.18 32.92 51.57L51.98 25.8"
            stroke="#000000"
            strokeOpacity="0.5"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </motion.div>
  );
};

export default CustomCursor;
