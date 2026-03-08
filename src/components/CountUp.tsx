import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const CountUp = ({ target, suffix = "", prefix = "", duration = 2, className = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration, ease: [0.25, 0.46, 0.45, 0.94] });
    }
  }, [inView, target, duration, count]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
};

export default CountUp;
