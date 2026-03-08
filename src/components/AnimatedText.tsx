import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
}

const AnimatedText = ({ text, className = "", delay = 0, gradient = false }: AnimatedTextProps) => {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`inline-block mr-[0.3em] ${gradient ? "gradient-text" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedText;
