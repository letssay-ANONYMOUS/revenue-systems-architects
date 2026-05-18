import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const SectionReveal = ({ children, className = "", delay = 0 }: SectionRevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.12, margin: "0px 0px -8% 0px" }}
    transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`transform-gpu ${className}`}
  >
    {children}
  </motion.div>
);

export default SectionReveal;
