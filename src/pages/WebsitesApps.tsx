import { Link } from "react-router-dom";
import { Globe, Smartphone, BarChart3, CalendarCheck, CreditCard, Target, Database, Code2, CheckCircle2, Layers, Gauge, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const capabilities = [
  { icon: Globe, title: "Company Websites", desc: "Premium, conversion-focused websites that establish authority and generate leads from day one." },
  { icon: Target, title: "Landing Pages", desc: "High-converting campaign pages with clear CTAs, lead capture, and A/B testing readiness." },
  { icon: CalendarCheck, title: "Booking Platforms", desc: "Integrated scheduling with payments, reminders, and calendar sync built in." },
  { icon: BarChart3, title: "Analytics Dashboards", desc: "Internal tools and reporting interfaces that give you real-time operational visibility." },
  { icon: Smartphone, title: "Customer Apps", desc: "Mobile-responsive applications for customer self-service, ordering, booking, and engagement." },
  { icon: Database, title: "Backend Infrastructure", desc: "APIs, databases, authentication, and server logic that power your business systems." },
];

const techPrinciples = [
  { icon: Gauge, title: "Performance First", desc: "Fast load times, optimized assets, and smooth interactions across every device." },
  { icon: Lock, title: "Security Built In", desc: "Authentication, data encryption, and secure payment handling from the ground up." },
  { icon: Layers, title: "Scalable Architecture", desc: "Systems designed to grow with your business — from launch to millions of users." },
  { icon: Code2, title: "Clean Code", desc: "Maintainable, well-documented codebases that your team or future developers can extend." },
];

const deliverables = [
  "Premium UI/UX design",
  "Responsive across all devices",
  "SEO-optimized structure",
  "Lead capture forms and CTAs",
  "Booking & scheduling integration",
  "Payment processing capability",
  "Analytics and tracking setup",
  "CMS for content management",
  "Custom backend logic",
  "API integrations",
  "Performance optimization",
  "Post-launch support",
];

const WebsitesApps = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Websites & Apps</p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl">
              Not Just Beautiful.{" "}
              <span className="gradient-text">Built to Perform.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              We design and build premium websites and applications that convert visitors, automate operations, and scale with your business — not just look good on a portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-a-call" className="premium-btn text-center">Book a Strategy Call</Link>
              <Link to="/case-studies" className="btn-outline-premium text-center">See Our Work</Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* What we build */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-16 max-w-3xl">
              Websites and Apps as Business Infrastructure
            </h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <SectionReveal key={c.title} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <c.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display font-semibold text-base mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech principles */}
      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-16 max-w-3xl">
              Engineering Principles That Matter
            </h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {techPrinciples.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 0.08}>
                <div className="card-premium h-full flex gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                What's Included in Every Build
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether it's a company website, a customer app, or an internal dashboard — every project includes the fundamentals that make it work for your business.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                {deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <CTASection headline="Let's Build Something That Works" subtext="Premium websites and apps designed for conversion, built for scale, and made to last." />
      <Footer />
    </div>
  );
};

export default WebsitesApps;
