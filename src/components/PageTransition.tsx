import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 26, scale: 0.985, filter: "blur(12px)" }}
    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -18, scale: 0.992, filter: "blur(10px)" }}
    transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
    style={{ willChange: "transform, opacity, filter" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
