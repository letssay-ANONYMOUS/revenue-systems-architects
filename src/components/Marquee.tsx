import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

const Marquee = ({ children, speed = 30, reverse = false, className = "" }: MarqueeProps) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      className="flex gap-12 whitespace-nowrap"
      animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {children}
      {children}
    </motion.div>
  </div>
);

export default Marquee;
