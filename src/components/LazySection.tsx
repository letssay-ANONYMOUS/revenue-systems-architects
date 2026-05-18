import { ReactNode, Suspense } from "react";

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  fallback?: ReactNode;
}

const LazySection = ({
  children,
  rootMargin,
  minHeight,
  fallback,
}: LazySectionProps) => {
  void rootMargin;
  void minHeight;

  return (
    <div>
      <Suspense fallback={fallback || null}>{children}</Suspense>
    </div>
  );
};

export default LazySection;
