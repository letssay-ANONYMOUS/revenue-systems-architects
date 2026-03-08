import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

interface MetricStripProps {
  metrics: Metric[];
}

const MetricStrip = ({ metrics }: MetricStripProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border">
    {metrics.map((m, i) => (
      <motion.div
        key={m.label}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="text-center md:px-6"
      >
        <p className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
          <CountUp target={m.value} suffix={m.suffix} />
        </p>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">{m.label}</p>
      </motion.div>
    ))}
  </div>
);

export default MetricStrip;
