import { useEffect } from "react";

const ZoomStabilizer = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    let settleTimer = 0;
    let pinching = false;

    const activate = () => {
      if (!root.classList.contains("zoom-active")) {
        root.classList.add("zoom-active");
      }
    };

    const deactivate = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (!pinching) {
          root.classList.remove("zoom-active");
        }
      }, 350);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        pinching = true;
        activate();
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        pinching = false;
        deactivate();
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.clearTimeout(settleTimer);
      root.classList.remove("zoom-active");
    };
  }, []);

  return null;
};

export default ZoomStabilizer;
