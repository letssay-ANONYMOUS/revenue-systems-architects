import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  id?: string;
}

const SectionWrapper = ({ children, className, elevated, id }: SectionWrapperProps) => (
  <section
    id={id}
    className={cn(
      "section-y relative",
      elevated && "surface-elevated",
      className
    )}
  >
    <div className="max-w-6xl mx-auto section-padding relative z-10">
      {children}
    </div>
  </section>
);

export default SectionWrapper;
