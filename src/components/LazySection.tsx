import { ReactNode, Suspense, useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  fallback?: ReactNode;
}

const LazySection = ({
  children,
  rootMargin = "300px",
  minHeight = "1px",
  fallback,
}: LazySectionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldRender) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={containerRef} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender ? <Suspense fallback={fallback || null}>{children}</Suspense> : fallback || null}
    </div>
  );
};

export default LazySection;
