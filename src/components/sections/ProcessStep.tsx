import { motion } from "framer-motion";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStep = ({ number, title, description, index }: ProcessStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="relative"
  >
    <div className="flex items-start gap-4 md:gap-5">
      <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border flex items-center justify-center bg-card">
        <span className="font-display font-bold text-sm md:text-base gradient-text">{number}</span>
      </div>
      <div className="pt-1">
        <h3 className="font-display font-semibold text-base md:text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default ProcessStep;
