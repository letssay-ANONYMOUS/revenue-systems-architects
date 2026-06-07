import { useEffect } from "react";

/**
 * Stabilises the page during pinch-zoom (and desktop zoom).
 *
 * The site uses many GPU-promoted layers — backdrop-filter glass, will-change,
 * contain: paint, translate3d surfaces. When the user pinch-zooms, the browser
 * must re-rasterise every one of those layers at the new scale simultaneously,
 * which shows up as a ~quarter-second flicker / jump / blur-pop that then
 * settles. While the user is actively zooming we add a `zoom-active` class to
 * <html> that neutralises those expensive effects (see the matching CSS in
 * index.css). At normal scale (1.0) the class is absent, so nothing changes for
 * the default experience.
 */
const ZoomStabilizer = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const vv = window.visualViewport;
    let settleTimer = 0;
    let pinching = false;

    const ZOOM_EPSILON = 1.01;

    const isZoomed = () => {
      // visualViewport.scale covers pinch-zoom; devicePixelRatio shifts catch
      // desktop browser zoom where visualViewport may be absent.
      if (vv && vv.scale > ZOOM_EPSILON) return true;
      return false;
    };

    const activate = () => {
      if (!root.classList.contains("zoom-active")) {
        root.classList.add("zoom-active");
      }
    };

    const scheduleSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        // Only release once the gesture is over AND we're back at natural scale.
        if (!pinching && !isZoomed()) {
          root.classList.remove("zoom-active");
        } else {
          scheduleSettle();
        }
      }, 220);
    };

    const onViewportChange = () => {
      if (isZoomed()) {
        activate();
        scheduleSettle();
      }
    };

    // Pre-empt the flicker: the moment a 2-finger gesture begins, stabilise —
    // before the zoom visibly progresses.
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        pinching = true;
        activate();
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        pinching = false;
        scheduleSettle();
      }
    };

    if (vv) {
      vv.addEventListener("resize", onViewportChange);
      vv.addEventListener("scroll", onViewportChange);
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      if (vv) {
        vv.removeEventListener("resize", onViewportChange);
        vv.removeEventListener("scroll", onViewportChange);
      }
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
