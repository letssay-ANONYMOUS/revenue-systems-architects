import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  index: number;
}

const TestimonialCard = ({ quote, name, role, index }: TestimonialCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="card-premium p-6 md:p-8 flex flex-col"
  >
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
    <blockquote className="text-sm md:text-base text-foreground leading-relaxed flex-1 mb-5">
      "{quote}"
    </blockquote>
    <div>
      <p className="text-sm font-semibold font-display">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </motion.div>
);

export default TestimonialCard;
