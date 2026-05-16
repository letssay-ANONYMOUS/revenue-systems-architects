import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Skip Lenis on touch devices (Android/iOS). smoothTouch is off anyway, and
    // Lenis's html.lenis styles + touch listeners can lock native scroll on
    // some Android Chrome builds when combined with body overflow rules.
    const isTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
};

export default SmoothScroll;
