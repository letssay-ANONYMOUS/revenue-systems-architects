import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
}

const CTASection = ({
  headline = "Ready to Build Your Revenue System?",
  subtext = "Stop losing leads to slow responses and disconnected tools."
}: CTASectionProps) => (
  <section className="relative py-20 md:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-glow opacity-50" />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at 28% 50%, hsl(var(--primary) / 0.045), transparent 38%), radial-gradient(ellipse at 72% 50%, hsl(var(--accent) / 0.04), transparent 38%)",
      }}
    />
    
    <div className="max-w-4xl mx-auto px-5 md:section-padding text-center relative z-10">
      <SectionReveal>
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-5 md:mb-6">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] md:text-xs font-medium text-primary">Let's Talk</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6">
            {headline}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 md:mb-10">
            {subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/book-a-call" className="premium-btn inline-flex items-center justify-center gap-2 py-4 px-8">
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/case-studies" className="btn-outline-premium text-center py-4 px-8">
              See Our Work
            </Link>
          </div>
        </motion.div>
      </SectionReveal>
    </div>
  </section>
);

export default CTASection;
