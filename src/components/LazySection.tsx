import { useRef, useState, useEffect, ReactNode, Suspense } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Distance before viewport to start rendering (default 300px) */
  rootMargin?: string;
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string;
  /** Optional skeleton/placeholder while loading */
  fallback?: ReactNode;
}

const LazySection = ({
  children,
  rootMargin = "300px",
  minHeight = "200px",
  fallback,
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${rootMargin} 0px ${rootMargin} 0px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? (
        <Suspense fallback={fallback || null}>{children}</Suspense>
      ) : (
        fallback || null
      )}
    </div>
  );
};

export default LazySection;
