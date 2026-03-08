import { Link } from "react-router-dom";
import SectionReveal from "./SectionReveal";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
}

const CTASection = ({
  headline = "Ready to Build Your Revenue System?",
  subtext = "Stop losing leads to slow responses and disconnected tools. Let's design an AI-powered system built around your business."
}: CTASectionProps) => (
  <section className="relative py-32 overflow-hidden">
    <div className="absolute inset-0 bg-glow opacity-50" />
    <div className="max-w-4xl mx-auto section-padding text-center relative z-10">
      <SectionReveal>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          {headline}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/book-a-call" className="premium-btn">
            Book a Strategy Call
          </Link>
          <Link to="/case-studies" className="btn-outline-premium">
            See Our Work
          </Link>
        </div>
      </SectionReveal>
    </div>
  </section>
);

export default CTASection;
