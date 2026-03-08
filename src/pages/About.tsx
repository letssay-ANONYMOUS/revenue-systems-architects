import { motion } from "framer-motion";
import { Shield, Layers, TrendingUp, Zap, Eye, Users, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const values = [
  { icon: Eye, title: "Strategic", desc: "Business model first, not templates.", accent: "primary" },
  { icon: Shield, title: "Premium Quality", desc: "Every pixel and workflow held to the highest standard.", accent: "accent" },
  { icon: TrendingUp, title: "Growth Obsessed", desc: "Leads captured, appointments booked, hours saved.", accent: "primary" },
  { icon: Layers, title: "Full-Stack", desc: "From AI agents to backend infrastructure.", accent: "accent" },
  { icon: Zap, title: "Fast, Not Rushed", desc: "We move quickly because we know what works.", accent: "primary" },
  { icon: Users, title: "Partnership", desc: "Invested in your outcomes, not just deliverables.", accent: "accent" },
];

const numbers = [
  { value: "50+", label: "Systems Deployed" },
  { value: "97%", label: "Client Retention" },
  { value: "3x", label: "Avg. Lead Increase" },
  { value: "24/7", label: "Always Running" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-24 md:pt-40 pb-14 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[600px] rounded-full bg-primary/5 blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-accent/5 blur-[60px] md:blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 mb-5 md:mb-8">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] md:text-xs font-medium text-muted-foreground">The Team Behind Your Growth</span>
            </div>
            <h1 className="font-display font-bold text-2xl md:text-6xl lg:text-8xl leading-[1.05] mb-5 md:mb-8">
              We Build Revenue{" "}
              <span className="gradient-text">Systems, Not Just Websites.</span>
            </h1>
            <p className="text-sm md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
              Too many businesses pay for disconnected tools and automation that doesn't automate anything. We fix that.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 md:mt-24 grid grid-cols-4 gap-2 md:gap-8"
          >
            {numbers.map((n, i) => (
              <motion.div key={n.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="text-center p-3 md:p-6 rounded-xl md:rounded-2xl group hover:bg-primary/5 transition-colors"
              >
                <p className="font-display font-bold text-xl md:text-5xl gradient-text mb-0.5 md:mb-2">{n.value}</p>
                <p className="text-[9px] md:text-sm text-muted-foreground">{n.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-14 md:py-32 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-20">
            <SectionReveal>
              <div className="lg:pr-16">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-4 md:mb-6 font-medium">The Problem</p>
                <h2 className="font-display font-bold text-xl md:text-5xl leading-tight mb-4 md:mb-8">
                  Patchwork Tools.{" "}
                  <span className="text-muted-foreground">Broken Workflows.</span>
                </h2>
                <p className="text-xs md:text-lg text-muted-foreground leading-[1.8]">
                  A website here, a booking tool there, manual follow-up everywhere. Leads fall through cracks. The cost isn't just inefficiency — it's lost revenue.
                </p>
                <div className="mt-6 md:mt-10 flex items-center gap-3 md:gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-destructive/30 to-transparent" />
                  <span className="text-[9px] md:text-xs text-destructive/60 font-medium tracking-wider">THE COST</span>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="lg:pl-16">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent mb-4 md:mb-6 font-medium">Our Answer</p>
                <h2 className="font-display font-bold text-xl md:text-5xl leading-tight mb-4 md:mb-8">
                  Integrated Systems.{" "}
                  <span className="text-muted-foreground">Real Results.</span>
                </h2>
                <p className="text-xs md:text-lg text-muted-foreground leading-[1.8]">
                  Every piece works together. Your AI answers calls, chatbot qualifies leads, website converts, backend connects it all. Fewer missed opportunities, less manual work.
                </p>
                <div className="mt-6 md:mt-10 flex items-center gap-3 md:gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  <span className="text-[9px] md:text-xs text-primary/60 font-medium tracking-wider">THE ADVANTAGE</span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="relative py-14 md:py-32 overflow-hidden">
        <div className="absolute inset-0 surface-elevated" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-20">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent mb-4 md:mb-6 font-medium">Our Clients</p>
              <h2 className="font-display font-bold text-xl md:text-5xl lg:text-6xl leading-tight mb-3 md:mb-8">
                Built for Businesses That{" "}
                <span className="gradient-text">Take Growth Seriously</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            {[
              { sector: "Healthcare & Clinics", detail: "Reduce wait times, automate scheduling." },
              { sector: "Real Estate & Property", detail: "Qualify leads, follow up automatically." },
              { sector: "Hospitality & F&B", detail: "Handle reservations, build premium presence." },
            ].map((item, i) => (
              <SectionReveal key={item.sector} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative group rounded-xl md:rounded-2xl border border-border p-6 md:p-10 h-full overflow-hidden"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)" }} />
                  <div className="relative z-10">
                    <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary/80 mb-3 md:mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-bold text-base md:text-xl mb-2 md:mb-3">{item.sector}</h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2}>
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-2 md:gap-3">
              {["Agencies", "Service Companies", "E-Commerce", "Law Firms", "Education", "SaaS"].map((tag) => (
                <span key={tag} className="px-3 md:px-5 py-1.5 md:py-2.5 rounded-full border border-border text-[10px] md:text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <div className="mb-10 md:mb-20">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 md:mb-4 font-medium">Our Principles</p>
              <h2 className="font-display font-bold text-xl md:text-5xl lg:text-6xl leading-tight max-w-2xl">
                What We <span className="gradient-text">Stand For</span>
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative rounded-xl md:rounded-2xl border border-border p-4 md:p-8 h-full overflow-hidden transition-colors duration-500 hover:border-primary/20"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px]"
                    style={{ background: v.accent === "primary" ? "hsl(var(--primary) / 0.1)" : "hsl(var(--accent) / 0.1)" }} />
                  <div className="relative z-10">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 ${
                      v.accent === "primary" ? "bg-primary/10" : "bg-accent/10"
                    }`}>
                      <v.icon className={`w-4 h-4 md:w-6 md:h-6 ${v.accent === "primary" ? "text-primary" : "text-accent"}`} />
                    </div>
                    <h3 className="font-display font-semibold text-xs md:text-lg mb-1 md:mb-3">{v.title}</h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative py-20 md:py-40 overflow-hidden">
        <div className="absolute inset-0 surface-elevated" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.04), transparent 60%)" }} />
        <div className="max-w-5xl mx-auto px-5 md:section-padding relative z-10 text-center">
          <SectionReveal>
            <blockquote className="font-display font-bold text-xl md:text-5xl lg:text-6xl leading-[1.15] mb-6 md:mb-10">
              We don't just build tools.{" "}
              <span className="gradient-text">We build the infrastructure your business runs on.</span>
            </blockquote>
            <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 hidden md:block">
              Every system we build is designed to grow revenue, reduce overhead, and give you back the hours you've been losing.
            </p>
            <Link to="/book-a-call" className="premium-btn inline-flex items-center gap-2 py-3.5 md:py-4">
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
