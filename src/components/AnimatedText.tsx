import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
}

const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.025,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const AnimatedText = ({ text, className = "", delay = 0, gradient = false }: AnimatedTextProps) => {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className} style={{ perspective: "600px" }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em]">
          {word.split("").map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={`${wi}-${i}`}
                custom={delay / 0.025 + i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block ${gradient ? "gradient-text" : ""}`}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
