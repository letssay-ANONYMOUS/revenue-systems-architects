import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  headline: string;
  subtitle: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  compact?: boolean;
}

const CTABlock = ({
  headline,
  subtitle,
  primaryLabel = "Book a Strategy Call",
  primaryHref = "/book-a-call",
  secondaryLabel,
  secondaryHref,
  compact,
}: CTABlockProps) => (
  <section className={compact ? "section-y-sm" : "section-y"}>
    <div className="max-w-6xl mx-auto section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl border border-border p-8 md:p-14 lg:p-20 text-center overflow-hidden"
        style={{ background: "hsl(var(--card))" }}
      >
        {/* Subtle glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[120px] opacity-30"
          style={{ background: "hsl(var(--primary) / 0.15)" }}
        />
        <div className="relative z-10">
          <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl leading-[1.1] mb-4 md:mb-5">
            {headline}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-7 md:mb-9">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={primaryHref}
              className="premium-btn inline-flex items-center justify-center gap-2 group"
              data-analytics="cta-primary"
            >
              {primaryLabel}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                to={secondaryHref}
                className="btn-outline-premium text-center"
                data-analytics="cta-secondary"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTABlock;
