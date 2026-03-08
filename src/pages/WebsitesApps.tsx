import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Smartphone, BarChart3, CalendarCheck, CreditCard, Target, Database, Code2, CheckCircle2, Layers, Gauge, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const capabilities = [
  { icon: Globe, title: "Websites", desc: "Premium, conversion-focused sites." },
  { icon: Target, title: "Landing Pages", desc: "High-converting campaign pages." },
  { icon: CalendarCheck, title: "Booking Platforms", desc: "Scheduling with payments built in." },
  { icon: BarChart3, title: "Dashboards", desc: "Real-time operational visibility." },
  { icon: Smartphone, title: "Customer Apps", desc: "Mobile-responsive applications." },
  { icon: Database, title: "Backend", desc: "APIs, databases, and server logic." },
];

const techPrinciples = [
  { icon: Gauge, title: "Performance First", desc: "Fast loads, smooth interactions." },
  { icon: Lock, title: "Security Built In", desc: "Auth, encryption, secure payments." },
  { icon: Layers, title: "Scalable", desc: "Grows with your business." },
  { icon: Code2, title: "Clean Code", desc: "Maintainable, well-documented." },
];

const deliverables = [
  "Premium UI/UX",
  "Fully responsive",
  "SEO-optimized",
  "Lead capture",
  "Booking integration",
  "Payment processing",
  "Analytics setup",
  "Custom backend",
];

const WebsitesApps = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="absolute top-1/4 left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3">Websites & Apps</p>
            <h1 className="font-display font-bold text-2xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 md:mb-6 max-w-4xl">
              Not Just Beautiful.{" "}
              <span className="gradient-text">Built to Perform.</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mb-6 md:mb-10 leading-relaxed">
              Premium websites and apps that convert visitors, automate operations, and scale with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/book-a-call" className="premium-btn text-center text-sm py-3.5">Book a Strategy Call</Link>
              <Link to="/case-studies" className="btn-outline-premium text-center text-sm py-3.5">See Our Work</Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Device mockup visual */}
      <section className="py-10 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <div className="flex justify-center items-end gap-3 md:gap-8">
              {/* Phone */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="w-[80px] md:w-[180px] rounded-xl border-2 border-border overflow-hidden" style={{ background: "hsl(var(--card))" }}>
                <div className="h-2.5 md:h-4 border-b border-border flex items-center justify-center"><div className="w-5 md:w-8 h-0.5 rounded-full bg-border" /></div>
                <div className="p-1.5 md:p-2 space-y-1.5">
                  <div className="h-7 md:h-14 rounded bg-primary/10" />
                  <div className="h-1 md:h-1.5 rounded bg-foreground/10 w-3/4" />
                  <div className="h-1 md:h-1.5 rounded bg-foreground/10 w-1/2" />
                  <div className="h-3 md:h-8 rounded bg-primary/20" />
                </div>
              </motion.div>

              {/* Desktop */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="flex-1 max-w-[350px] md:max-w-[500px] rounded-lg md:rounded-xl border-2 border-border overflow-hidden" style={{ background: "hsl(var(--card))" }}>
                <div className="h-3 md:h-6 border-b border-border flex items-center gap-1 px-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-destructive/40" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/40" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/40" />
                </div>
                <div className="p-2 md:p-4 space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <div className="h-1 md:h-2 rounded bg-foreground/10 w-2/3" />
                      <div className="h-1 md:h-2 rounded bg-foreground/10 w-full" />
                      <div className="h-3 md:h-8 rounded bg-primary/20 w-14 md:w-28 mt-1" />
                    </div>
                    <div className="w-14 md:w-40 h-12 md:h-28 rounded bg-primary/10" />
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="h-6 md:h-16 rounded bg-accent/10" />
                    <div className="h-6 md:h-16 rounded bg-primary/10" />
                    <div className="h-6 md:h-16 rounded bg-accent/10" />
                  </div>
                </div>
              </motion.div>

              {/* Tablet - hidden on small mobile */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="hidden sm:block w-[100px] md:w-[140px] rounded-lg md:rounded-xl border-2 border-border overflow-hidden" style={{ background: "hsl(var(--card))" }}>
                <div className="h-2.5 md:h-4 border-b border-border" />
                <div className="p-1.5 md:p-2 space-y-1.5">
                  <div className="h-8 md:h-12 rounded bg-primary/10" />
                  <div className="grid grid-cols-2 gap-1"><div className="h-5 md:h-8 rounded bg-accent/10" /><div className="h-5 md:h-8 rounded bg-primary/10" /></div>
                  <div className="h-1 rounded bg-foreground/10" />
                </div>
              </motion.div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-xl md:text-5xl leading-tight mb-8 md:mb-16 max-w-3xl">
              Business Infrastructure, Not Decoration
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {capabilities.map((c, i) => (
              <SectionReveal key={c.title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -3 }} className="card-premium p-4 md:p-6 h-full">
                  <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2.5 md:mb-4">
                    <c.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xs md:text-base mb-1">{c.title}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground">{c.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech principles */}
      <section className="py-14 md:py-32 surface-elevated">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-xl md:text-5xl leading-tight mb-8 md:mb-16 max-w-3xl">
              Engineering That Matters
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {techPrinciples.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -3 }} className="card-premium p-4 md:p-6 h-full flex gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon className="w-4 h-4 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xs md:text-lg mb-0.5 md:mb-2">{p.title}</h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
            <SectionReveal>
              <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                Included in Every Build
              </h2>
              <p className="text-xs md:text-base text-muted-foreground hidden md:block">
                Whether it's a company website, customer app, or internal dashboard — every project includes what makes it work for your business.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <CTASection headline="Let's Build Something That Works" subtext="Premium websites and apps designed for conversion, built for scale." />
      <Footer />
    </div>
  );
};

export default WebsitesApps;
