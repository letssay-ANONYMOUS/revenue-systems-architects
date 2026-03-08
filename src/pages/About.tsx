import { motion } from "framer-motion";
import { Shield, Layers, TrendingUp, Zap, Eye, Users, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const values = [
  { icon: Eye, title: "Strategic Thinking", desc: "We start with your business model, revenue levers, and customer journey — not a template.", accent: "primary" },
  { icon: Shield, title: "Premium Quality", desc: "Every pixel, every interaction, every workflow is held to the highest standard. Our clients charge premium prices — their systems should reflect that.", accent: "accent" },
  { icon: TrendingUp, title: "Growth Obsessed", desc: "We measure success in leads captured, appointments booked, and hours saved — not just deliverables shipped.", accent: "primary" },
  { icon: Layers, title: "Full-Stack Execution", desc: "From AI voice agents to backend infrastructure, we handle every layer of your system.", accent: "accent" },
  { icon: Zap, title: "Fast, Not Rushed", desc: "We move quickly because we know what works. Not because we cut corners.", accent: "primary" },
  { icon: Users, title: "Partnership Model", desc: "We're not a vendor. We're the team behind your digital infrastructure, invested in your outcomes.", accent: "accent" },
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
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
        
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide">The Team Behind Your Growth</span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-8xl leading-[1.05] mb-8">
              We Build Revenue{" "}
              <br className="hidden md:block" />
              Systems,{" "}
              <span className="gradient-text">Not Just</span>
              <br className="hidden md:block" />
              <span className="gradient-text">Websites.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
              NexusAI exists because we saw too many businesses paying for disconnected tools, generic websites, and automation that doesn't actually automate anything.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {numbers.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 text-center">
                  <p className="font-display font-bold text-4xl md:text-5xl gradient-text mb-2">{n.value}</p>
                  <p className="text-sm text-muted-foreground tracking-wide">{n.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STORY — Two Column with dramatic divider */}
      <section className="py-32 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-20">
            <SectionReveal>
              <div className="lg:pr-16">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6 font-medium">The Problem</p>
                <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-8">
                  Patchwork Tools.{" "}
                  <span className="text-muted-foreground">Broken Workflows.</span>
                </h2>
                <div className="space-y-6 text-muted-foreground leading-[1.8] text-lg">
                  <p>
                    Most businesses operate with a patchwork of tools — a website here, a booking tool there, manual follow-up everywhere. Leads fall through the cracks. Calls go unanswered. Admin work piles up.
                  </p>
                  <p>
                    The cost isn't just inefficiency. It's lost revenue, frustrated customers, and a team that spends more time managing tools than growing the business.
                  </p>
                </div>
                {/* Decorative element */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-destructive/30 to-transparent" />
                  <span className="text-xs text-destructive/60 font-medium tracking-wider">THE COST OF DOING NOTHING</span>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="lg:pl-16">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6 font-medium">Our Answer</p>
                <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-8">
                  Integrated Systems.{" "}
                  <span className="text-muted-foreground">Real Results.</span>
                </h2>
                <div className="space-y-6 text-muted-foreground leading-[1.8] text-lg">
                  <p>
                    We build integrated systems where every piece works together. Your AI agent answers calls and books appointments. Your chatbot qualifies leads and routes them. Your website converts visitors. Your backend connects it all.
                  </p>
                  <p>
                    The result: fewer missed opportunities, less manual work, and a business that runs smoother every week.
                  </p>
                </div>
                {/* Decorative element */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  <span className="text-xs text-primary/60 font-medium tracking-wider">THE SYSTEM ADVANTAGE</span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH — immersive panel */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 surface-elevated" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/4 blur-[150px]" />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6 font-medium">Our Clients</p>
              <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-8">
                Built for Businesses That{" "}
                <span className="gradient-text">Take Growth Seriously</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We partner with premium businesses that understand that every missed call is a missed sale, every slow response is a lost customer, and every manual process is time they'll never get back.
              </p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { sector: "Healthcare & Clinics", detail: "Reduce patient wait times, automate scheduling, and never miss an inquiry." },
              { sector: "Real Estate & Property", detail: "Qualify leads instantly, follow up automatically, and close faster." },
              { sector: "Hospitality & F&B", detail: "Handle reservations, answer common questions, and build a premium online presence." },
            ].map((item, i) => (
              <SectionReveal key={item.sector} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="relative group rounded-2xl border border-border p-10 h-full overflow-hidden"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)" }}
                  />
                  <div className="relative z-10">
                    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary/80 mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-bold text-xl mb-3">{item.sector}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {["Agencies", "Service Companies", "E-Commerce", "Law Firms", "Education", "SaaS"].map((tag) => (
                <span key={tag} className="px-5 py-2.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors duration-300 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* VALUES — staggered grid with glow */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-medium">Our Principles</p>
                <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight max-w-2xl">
                  What We <span className="gradient-text">Stand For</span>
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                These aren't values on a wall. They're filters we run every decision through.
              </p>
            </div>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group relative rounded-2xl border border-border p-8 h-full overflow-hidden transition-colors duration-500 hover:border-primary/20"
                  style={{ background: "hsl(var(--card))" }}
                >
                  {/* Hover glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[60px]"
                    style={{ background: v.accent === "primary" ? "hsl(var(--primary) / 0.1)" : "hsl(var(--accent) / 0.1)" }}
                  />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                      v.accent === "primary" ? "bg-primary/10 group-hover:bg-primary/15" : "bg-accent/10 group-hover:bg-accent/15"
                    }`}>
                      <v.icon className={`w-6 h-6 ${v.accent === "primary" ? "text-primary" : "text-accent"}`} />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-3">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND MANIFESTO — full-width cinematic */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 surface-elevated" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.04), transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(var(--accent) / 0.04), transparent 60%)" }} />
        
        <div className="max-w-5xl mx-auto section-padding relative z-10 text-center">
          <SectionReveal>
            <motion.blockquote
              className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-[1.15] mb-10"
            >
              We don't just build tools.{" "}
              <span className="gradient-text">We build the infrastructure your business runs on.</span>
            </motion.blockquote>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Our work sits at the intersection of design, engineering, and business strategy. Every system we build is designed to grow revenue, reduce overhead, and give you back the hours you've been losing.
            </p>
            <Link
              to="/book-a-call"
              className="premium-btn inline-flex items-center gap-2"
            >
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
