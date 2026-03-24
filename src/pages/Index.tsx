import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone, MessageSquare, CalendarCheck, Globe, Smartphone, Workflow,
  PhoneIncoming, PhoneOutgoing, Bot, UserCheck, Clock, BarChart3,
  Zap, Target, Shield, ArrowRight, CheckCircle2, XCircle, TrendingUp,
  Layers, Code2, Database, LineChart, Sparkles, Activity, Bell,
  Users, Star, Headphones, Send, CreditCard
} from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";
import GradientMesh from "@/components/GradientMesh";
import AnimatedText from "@/components/AnimatedText";
import Marquee from "@/components/Marquee";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import ScrollShowcase from "@/components/ScrollShowcase";
import LazySection from "@/components/LazySection";
import ProcessGraph from "@/components/ProcessGraph";
import MagneticButton from "@/components/MagneticButton";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const stats = [
  { value: 97, suffix: "%", label: "Calls Answered", icon: Phone },
  { value: 3, suffix: "x", label: "More Bookings", icon: CalendarCheck },
  { value: 60, suffix: "%", label: "Less Admin", icon: Zap },
  { value: 24, suffix: "/7", label: "Always On", icon: Activity },
];

const services = [
  { icon: PhoneIncoming, title: "Inbound AI Agent", desc: "Answers, qualifies, books — 24/7.", benefit: "Capture every lead", accent: "primary", span: "col-span-1 md:col-span-2 md:row-span-2" },
  { icon: PhoneOutgoing, title: "Outbound AI Agent", desc: "Follow-ups, reminders, and outreach on autopilot.", benefit: "Reactivate leads", accent: "accent", span: "col-span-1" },
  { icon: Bot, title: "Support Chatbot", desc: "Instant website replies. Captures leads, handles FAQs.", benefit: "24/7 front desk", accent: "primary", span: "col-span-1" },
  { icon: Target, title: "Lead Qualification", desc: "Smart flows that qualify before reaching your team.", benefit: "Better prospects", accent: "accent", span: "col-span-1 md:col-span-2" },
  { icon: CalendarCheck, title: "Scheduling", desc: "Integrated booking that syncs and reduces no-shows.", benefit: "Auto bookings", accent: "primary", span: "col-span-1" },
  { icon: Globe, title: "Business Website", desc: "Premium sites built to convert, not just impress.", benefit: "Revenue-ready", accent: "accent", span: "col-span-1" },
  { icon: Smartphone, title: "Web & Mobile App", desc: "Custom apps that serve customers and streamline ops.", benefit: "Custom systems", accent: "primary", span: "col-span-1" },
  { icon: Workflow, title: "Workflow Automation", desc: "Connect tools, automate handoffs, eliminate busywork.", benefit: "Run smoother", accent: "accent", span: "col-span-1" },
];

const painPoints = [
  { icon: XCircle, pain: "Missed calls", solution: "AI answers every call" },
  { icon: Clock, pain: "Slow responses", solution: "Instant voice & chat" },
  { icon: XCircle, pain: "No-show chaos", solution: "Automated reminders" },
  { icon: XCircle, pain: "Weak web presence", solution: "Premium conversion site" },
  { icon: XCircle, pain: "Manual admin", solution: "Automated workflows" },
  { icon: XCircle, pain: "Fragmented tools", solution: "One connected system" },
];

const processSteps = [
  { step: "01", title: "Strategy", icon: Target },
  { step: "02", title: "Design", icon: Layers },
  { step: "03", title: "Build", icon: Code2 },
  { step: "04", title: "Automate", icon: Workflow },
  { step: "05", title: "Launch", icon: Zap },
  { step: "06", title: "Optimize", icon: LineChart },
];

const caseStudies = [
  {
    title: "Premium Café Chain",
    tag: "Hospitality",
    metric: "3x",
    metricLabel: "More Bookings",
    result: "95% call answer rate",
  },
  {
    title: "Medical Clinic Network",
    tag: "Healthcare",
    metric: "30s",
    metricLabel: "Response Time",
    result: "40% fewer missed appointments",
  },
  {
    title: "Real Estate Agency",
    tag: "Real Estate",
    metric: "2x",
    metricLabel: "Qualified Leads",
    result: "50% faster follow-up",
  },
];

const trustNames = ["Meridian Group", "Vertex Capital", "Solara Health", "Atlas RE", "Prism Digital", "Arcadia Cafés", "Nova Systems", "Apex Ventures"];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO — immediate, no lazy loading */}
      <section ref={heroRef} className="relative min-h-[85vh] md:min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
        <GradientMesh />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-5 md:section-padding w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 mb-5 md:mb-8"
              >
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground">AI-Powered Business Systems</span>
              </motion.div>
              <h1 className="font-display font-bold text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] mb-4 md:mb-6">
                <AnimatedText text="Your Business," delay={0.2} />
                <br />
                <AnimatedText text="Answered. Automated. Accelerated." delay={0.5} gradient />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-sm md:text-lg text-muted-foreground max-w-xl mb-6 md:mb-10 leading-relaxed"
              >
                AI agents, chatbots, websites & automation that capture leads, book appointments, and run your operations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link to="/book-a-call" className="premium-btn text-center text-sm px-6 py-3.5 md:px-8 md:py-4 group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book a Strategy Call
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link to="/case-studies" className="btn-outline-premium text-center text-sm px-6 py-3.5 md:px-8 md:py-4">
                  See Our Work
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative mt-2 lg:mt-0"
            >
              {/* Main dashboard */}
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img src={heroDashboard} alt="AI-powered business dashboard" className="w-full h-auto" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                {/* Overlay mini stats */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex gap-2">
                  {[
                    { label: "Active Calls", val: "12" },
                    { label: "Leads Today", val: "47" },
                    { label: "Booked", val: "23" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.15 }}
                      className="flex-1 rounded-lg border border-border/50 p-2 md:p-3 backdrop-blur-xl"
                      style={{ background: "hsl(var(--card) / 0.85)" }}
                    >
                      <p className="font-display font-bold text-base md:text-xl text-foreground">{s.val}</p>
                      <p className="text-[8px] md:text-[10px] text-muted-foreground truncate">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating call card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-1 md:-left-4 top-1/4 rounded-xl border border-border p-2.5 md:p-4 max-w-[150px] md:max-w-[200px] backdrop-blur-xl"
                style={{ background: "hsl(var(--card) / 0.95)", boxShadow: "0 8px 32px hsl(var(--primary) / 0.15)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-semibold">Incoming Call</p>
                    <p className="text-[9px] md:text-xs text-muted-foreground">AI Answering...</p>
                  </div>
                </div>
                <div className="flex items-end gap-0.5 mt-2 h-3 md:h-4">
                  {[3, 5, 2, 6, 4, 3, 5, 7, 4, 3].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 md:w-1 rounded-full bg-primary/60"
                      animate={{ height: [h * 1.5, h * 3, h * 1.5] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating booked card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-1 md:-right-4 bottom-1/3 rounded-xl border border-border p-2.5 md:p-4 backdrop-blur-xl"
                style={{ background: "hsl(var(--card) / 0.95)", boxShadow: "0 8px 32px hsl(var(--accent) / 0.15)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CalendarCheck className="w-3.5 h-3.5 md:w-5 md:h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-semibold">Booked ✓</p>
                    <p className="text-[9px] md:text-xs text-muted-foreground">Tomorrow, 2 PM</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats strip with CountUp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-10 md:mt-20 grid grid-cols-4 gap-2 md:gap-8 border-t border-border pt-6 md:pt-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-display font-bold text-xl md:text-4xl gradient-text">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[9px] md:text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE TRUST STRIP — lightweight, no lazy needed */}
      <section className="py-8 md:py-16 border-b border-border overflow-hidden">
        <SectionReveal>
          <p className="text-center text-[9px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 md:mb-8">
            Trusted by forward-thinking businesses
          </p>
        </SectionReveal>
        <Marquee speed={35} className="opacity-30 mb-3">
          {trustNames.map((name) => (
            <span key={name} className="font-display font-semibold text-lg md:text-2xl text-foreground px-4">{name}</span>
          ))}
        </Marquee>
        <Marquee speed={40} reverse className="opacity-20">
          {trustNames.map((name) => (
            <span key={`r-${name}`} className="font-display font-semibold text-sm md:text-lg text-foreground px-4">{name}</span>
          ))}
        </Marquee>
      </section>

      {/* WHAT WE BUILD — Scroll Showcase (preloaded 300px before) */}
      <LazySection rootMargin="400px" minHeight="800vh">
        <section className="pt-14 md:pt-32">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">What We Build</p>
              <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-3 md:mb-6">
                A Complete System, <span className="gradient-text">Not Scattered Tools</span>
              </h2>
              <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mb-8 md:mb-16 hidden md:block">
                Every service connects. Your AI agent books appointments. Your chatbot captures leads. Your website converts. Your backend keeps it all running.
              </p>
            </SectionReveal>
          </div>
        </section>

        <ScrollShowcase />

        <section className="pb-14 md:pb-32">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <SectionReveal delay={0.2}>
              <div className="mt-8 md:mt-16 relative rounded-xl md:rounded-2xl border border-border p-5 md:p-10 overflow-hidden" style={{ background: "hsl(var(--card))" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.03), transparent 70%)" }} />
                <div className="relative z-10">
                  <h4 className="font-display font-semibold text-sm md:text-lg mb-4 md:mb-6 text-center">Everything Connects</h4>
                  <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4">
                    {[
                      { icon: Phone, label: "AI Calls" },
                      { icon: Bot, label: "Chatbot" },
                      { icon: Globe, label: "Website" },
                      { icon: CalendarCheck, label: "Booking" },
                      { icon: CreditCard, label: "Payments" },
                      { icon: Database, label: "Backend" },
                      { icon: BarChart3, label: "Analytics" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        className="flex flex-col items-center gap-1.5 md:gap-2 p-2 md:p-4 cursor-default"
                      >
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <item.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                        </div>
                        <span className="text-[9px] md:text-xs font-medium text-muted-foreground">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      </LazySection>

      {/* BUSINESS PAIN — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="400px">
        <section className="py-14 md:py-32 surface-elevated relative overflow-hidden">
          <GradientMesh />
          <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Why It Matters</p>
              <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-8 md:mb-16">
                Every Missed Call Is a <span className="text-destructive">Missed Sale</span>
              </h2>
            </SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {painPoints.map((pp, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <TiltCard>
                    <div
                      className="group rounded-xl md:rounded-2xl border border-border p-3.5 md:p-6 h-full overflow-hidden transition-all duration-500 hover:border-primary/20"
                      style={{ background: "hsl(var(--card))" }}
                    >
                      <div className="flex items-center gap-2 mb-2 md:mb-4">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                          <pp.icon className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                        </div>
                        <p className="text-[10px] md:text-sm text-muted-foreground line-through decoration-destructive/30">{pp.pain}</p>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-destructive/20 via-primary/20 to-primary/20 my-2 md:my-3" />
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        </div>
                        <p className="text-[10px] md:text-sm font-medium text-foreground">{pp.solution}</p>
                      </div>
                    </div>
                  </TiltCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* AI CALLING AGENT SHOWCASE — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="500px">
        <section className="py-14 md:py-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary/3 blur-[100px] md:blur-[150px]" />
          <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
            <SectionReveal>
              <div className="text-center mb-8 md:mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4 md:mb-6">
                  <Headphones className="w-3 h-3 text-primary" />
                  <span className="text-[10px] md:text-xs font-medium text-primary">Featured Product</span>
                </div>
                <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mx-auto mb-3 md:mb-6">
                  AI Calling Agents That <span className="gradient-text">Work While You Sleep</span>
                </h2>
              </div>
            </SectionReveal>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Inbound */}
              <SectionReveal>
                <TiltCard>
                  <div className="rounded-xl md:rounded-2xl border border-border p-4 md:p-8 h-full" style={{ background: "hsl(var(--card))" }}>
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <PhoneIncoming className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-sm md:text-xl">Inbound Agent</h3>
                        <p className="text-[10px] md:text-xs text-muted-foreground">Answers & Qualifies</p>
                      </div>
                    </div>

                    <div className="rounded-lg md:rounded-xl border border-border p-3 md:p-4 mb-4 md:mb-5" style={{ background: "hsl(var(--background) / 0.5)" }}>
                      <div className="space-y-2">
                        {[
                          { from: "ai", text: "Good morning! How can I help?" },
                          { from: "user", text: "I need to book for Tuesday." },
                          { from: "ai", text: "10 AM or 2 PM — which works?" },
                        ].map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: msg.from === "ai" ? -8 : 8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.15 }}
                            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 max-w-[80%] ${
                              msg.from === "user" ? "bg-secondary" : "bg-primary/10"
                            }`}>
                              <p className="text-[10px] md:text-xs">{msg.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                      {["24/7 Answers", "Qualifies", "Books Live", "Routes Urgent", "Captures Leads", "Custom Scripts"].map((item) => (
                        <div key={item} className="flex items-center gap-1.5 text-[10px] md:text-sm text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>

              {/* Outbound */}
              <SectionReveal delay={0.15}>
                <TiltCard>
                  <div className="rounded-xl md:rounded-2xl border border-border p-4 md:p-8 h-full" style={{ background: "hsl(var(--card))" }}>
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <PhoneOutgoing className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-sm md:text-xl">Outbound Agent</h3>
                        <p className="text-[10px] md:text-xs text-muted-foreground">Follows Up & Converts</p>
                      </div>
                    </div>

                    <div className="rounded-lg md:rounded-xl border border-border p-3 md:p-4 mb-4 md:mb-5" style={{ background: "hsl(var(--background) / 0.5)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] md:text-[10px] font-medium text-muted-foreground">Campaign Performance</span>
                        <span className="text-[9px] md:text-[10px] text-primary font-medium">This Week</span>
                      </div>
                      <div className="flex items-end gap-1 h-14 md:h-20">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                            className="flex-1 rounded-t-sm bg-accent/30"
                          />
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                        {[
                          { label: "Calls", val: "342" },
                          { label: "Connected", val: "89%" },
                          { label: "Booked", val: "47" },
                        ].map((m) => (
                          <div key={m.label}>
                            <p className="text-xs md:text-sm font-bold text-foreground">{m.val}</p>
                            <p className="text-[8px] text-muted-foreground">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                      {["Follow-ups", "Reminders", "Reactivation", "Callbacks", "Scale Outreach", "Triggers"].map((item) => (
                        <div key={item} className="flex items-center gap-1.5 text-[10px] md:text-sm text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            </div>

            {/* Call flow pipeline */}
            <SectionReveal delay={0.2}>
              <div className="mt-6 md:mt-16 rounded-xl md:rounded-2xl border border-border p-4 md:p-10 overflow-hidden" style={{ background: "hsl(var(--card))" }}>
                <h4 className="font-display font-semibold text-xs md:text-lg mb-4 md:mb-8 text-center">How a Call Flows</h4>
                <div className="flex items-center justify-between gap-1 md:gap-0">
                  {[
                    { label: "Call", icon: Phone, color: "primary" },
                    { label: "AI Answers", icon: Bot, color: "primary" },
                    { label: "Qualifies", icon: UserCheck, color: "accent" },
                    { label: "Books", icon: CalendarCheck, color: "primary" },
                    { label: "Confirms", icon: Send, color: "accent" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1 md:gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                          className={`w-9 h-9 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center cursor-default ${
                            step.color === "primary" ? "bg-primary/10 border-primary/20" : "bg-accent/10 border-accent/20"
                          }`}
                        >
                          <step.icon className={`w-3.5 h-3.5 md:w-5 md:h-5 ${step.color === "primary" ? "text-primary" : "text-accent"}`} />
                        </motion.div>
                        <p className="text-[8px] md:text-xs font-medium text-center">{step.label}</p>
                      </div>
                      {i < 4 && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                          className="origin-left"
                        >
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/30 shrink-0" />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <div className="mt-4 md:mt-8 text-center">
              <Link to="/ai-calling-agents" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:underline group">
                Explore AI Calling Agents <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </LazySection>

      {/* CHATBOTS & AUTOMATION — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="400px">
        <section className="py-14 md:py-32 surface-elevated">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
              <SectionReveal>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Chatbots & Automation</p>
                <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                  Instant Replies. <span className="gradient-text">Zero Wait Times.</span>
                </h2>
                <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-8 leading-relaxed hidden md:block">
                  Your chatbot handles FAQs, captures leads, qualifies prospects, and books appointments — while your team closes deals.
                </p>
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-0">
                  {["24/7 replies", "Lead qualification", "Booking flow", "FAQ handling", "CRM sync", "Multi-channel"].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[10px] md:text-sm">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/chatbots-automation" className="inline-flex items-center gap-2 mt-3 md:mt-8 text-xs md:text-sm font-medium text-primary hover:underline group">
                  Learn more <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <TiltCard>
                  <div className="rounded-xl md:rounded-2xl border border-border overflow-hidden" style={{ background: "hsl(var(--card))", boxShadow: "0 20px 60px hsl(var(--primary) / 0.08)" }}>
                    <div className="px-3 py-2.5 md:px-4 md:py-3 border-b border-border flex items-center gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs font-semibold">AgentForge Assistant</p>
                        <div className="flex items-center gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-green-500"
                          />
                          <p className="text-[9px] md:text-[10px] text-muted-foreground">Online</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 md:p-4 space-y-2.5 md:space-y-3">
                      {[
                        { from: "bot", text: "Hi! 👋 How can I help?" },
                        { from: "user", text: "I'd like to book an appointment." },
                        { from: "bot", text: "What service are you looking for?" },
                        { from: "user", text: "Digital presence for my restaurant." },
                        { from: "bot", text: "Tuesday 10 AM or Thursday 2 PM?" },
                      ].map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + i * 0.12 }}
                          className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[80%] rounded-xl px-3 py-2 ${
                            msg.from === "user" ? "bg-primary/10 rounded-br-sm" : "bg-secondary rounded-bl-sm"
                          }`}>
                            <p className="text-[10px] md:text-xs leading-relaxed">{msg.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-3 py-2.5 md:px-4 md:py-3 border-t border-border flex items-center gap-2">
                      <div className="flex-1 rounded-full border border-border px-3 py-1.5 md:py-2">
                        <p className="text-[9px] md:text-[10px] text-muted-foreground">Type a message...</p>
                      </div>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center">
                        <Send className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            </div>
          </div>
        </section>
      </LazySection>

      {/* WEBSITES & APPS — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="400px">
        <section className="py-14 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Websites & Apps</p>
              <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-3 md:mb-6">
                Built to <span className="gradient-text">Convert</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="mb-8 md:mb-16 flex justify-center items-end gap-3 md:gap-8">
                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="w-[90px] md:w-[180px] rounded-xl md:rounded-2xl border-2 border-border overflow-hidden"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="h-2.5 md:h-4 border-b border-border flex items-center justify-center">
                    <div className="w-6 md:w-8 h-0.5 md:h-1 rounded-full bg-border" />
                  </div>
                  <div className="p-1.5 md:p-2 space-y-1.5 md:space-y-2">
                    <div className="h-8 md:h-14 rounded-md md:rounded-lg bg-primary/10" />
                    <div className="space-y-0.5 md:space-y-1">
                      <div className="h-1 md:h-1.5 rounded bg-foreground/10 w-3/4" />
                      <div className="h-1 md:h-1.5 rounded bg-foreground/10 w-1/2" />
                    </div>
                    <div className="h-4 md:h-8 rounded bg-primary/20" />
                  </div>
                </motion.div>

                {/* Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex-1 max-w-[400px] md:max-w-[500px] rounded-lg md:rounded-xl border-2 border-border overflow-hidden"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="h-3 md:h-6 border-b border-border flex items-center gap-1 px-2 md:px-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-destructive/40" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/40" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/40" />
                  </div>
                  <div className="p-2 md:p-4 space-y-2 md:space-y-3">
                    <div className="flex gap-2 md:gap-3">
                      <div className="flex-1 space-y-1 md:space-y-2">
                        <div className="h-1 md:h-2 rounded bg-foreground/10 w-2/3" />
                        <div className="h-1 md:h-2 rounded bg-foreground/10 w-full" />
                        <div className="h-4 md:h-8 rounded bg-primary/20 w-16 md:w-28 mt-1 md:mt-2" />
                      </div>
                      <div className="w-16 md:w-40 h-14 md:h-28 rounded-md md:rounded-lg bg-primary/10" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 md:gap-2">
                      <div className="h-8 md:h-16 rounded bg-accent/10" />
                      <div className="h-8 md:h-16 rounded bg-primary/10" />
                      <div className="h-8 md:h-16 rounded bg-accent/10" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6">
              {[
                { icon: Globe, title: "Websites", desc: "Premium sites that convert" },
                { icon: Target, title: "Landing Pages", desc: "Campaign-ready pages" },
                { icon: CalendarCheck, title: "Booking", desc: "Scheduling with payments" },
                { icon: BarChart3, title: "Dashboards", desc: "Real-time operations" },
                { icon: Smartphone, title: "Apps", desc: "Customer-facing apps" },
                { icon: Database, title: "Backend", desc: "APIs & automation" },
              ].map((item, i) => (
                <SectionReveal key={item.title} delay={i * 0.05}>
                  <TiltCard>
                    <div
                      className="group rounded-xl md:rounded-2xl border border-border p-3.5 md:p-6 h-full hover:border-primary/20 transition-colors duration-500"
                      style={{ background: "hsl(var(--card))" }}
                    >
                      <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-2.5 md:mb-5">
                        <item.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-xs md:text-base mb-0.5 md:mb-2">{item.title}</h3>
                      <p className="text-[9px] md:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </TiltCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* PROCESS — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <ProcessGraph />
      </LazySection>

      {/* CASE STUDIES — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <section className="py-14 md:py-32">
          <div className="max-w-7xl mx-auto px-5 md:section-padding">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Results</p>
              <h2 className="font-display font-bold text-xl md:text-5xl leading-tight max-w-3xl mb-8 md:mb-16">
                Real Systems. <span className="gradient-text">Measurable Impact.</span>
              </h2>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-8">
              {caseStudies.map((cs, i) => (
                <SectionReveal key={cs.title} delay={i * 0.1}>
                  <TiltCard>
                    <div
                      className="group rounded-xl md:rounded-2xl border border-border h-full flex flex-col overflow-hidden hover:border-primary/20 transition-colors duration-500"
                      style={{ background: "hsl(var(--card))" }}
                    >
                      <div className="p-4 md:p-6 border-b border-border relative overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 100%, hsl(var(--primary) / 0.05), transparent)" }} />
                        <span className="text-[9px] md:text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{cs.tag}</span>
                        <div className="mt-3 flex items-baseline gap-1.5">
                          <span className="font-display font-bold text-3xl md:text-5xl gradient-text">{cs.metric}</span>
                          <span className="text-[10px] md:text-xs text-muted-foreground">{cs.metricLabel}</span>
                        </div>
                      </div>
                      <div className="p-4 md:p-6 flex flex-col flex-1">
                        <h3 className="font-display font-semibold text-sm md:text-xl mb-1.5 md:mb-3">{cs.title}</h3>
                        <p className="text-[10px] md:text-sm text-muted-foreground flex-1">{cs.result}</p>
                        <Link to="/case-studies" className="inline-flex items-center gap-1.5 mt-3 pt-3 border-t border-border text-[10px] md:text-sm font-medium text-primary hover:underline group/link">
                          View case study <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* WHY US — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="300px">
        <section className="py-14 md:py-32 surface-elevated relative overflow-hidden">
          <GradientMesh />
          <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
              <SectionReveal>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Why Us</p>
                <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                  Business Thinking. <span className="gradient-text">Engineering Execution.</span>
                </h2>
                <p className="text-xs md:text-base text-muted-foreground leading-relaxed mb-3 md:mb-6 hidden md:block">
                  We design revenue systems — where every piece connects, every workflow triggers the next, and your business runs tighter with every passing week.
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-primary hover:underline group">
                  About us <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <div className="grid grid-cols-2 gap-2.5 md:gap-4">
                  {[
                    { icon: Shield, label: "Strategic", desc: "Business-first" },
                    { icon: Layers, label: "Full-Stack", desc: "Every layer" },
                    { icon: TrendingUp, label: "Growth", desc: "Measurable results" },
                    { icon: Zap, label: "Fast", desc: "Weeks, not months" },
                  ].map((item) => (
                    <TiltCard key={item.label}>
                      <div
                        className="group rounded-xl md:rounded-2xl border border-border flex flex-col items-center text-center p-4 md:p-6 hover:border-primary/20 transition-colors duration-500"
                        style={{ background: "hsl(var(--card))" }}
                      >
                        <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-primary/15 transition-colors">
                          <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <p className="text-xs md:text-sm font-semibold">{item.label}</p>
                        <p className="text-[9px] md:text-[10px] text-muted-foreground">{item.desc}</p>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </LazySection>

      {/* CTA & Footer — lazy loaded */}
      <LazySection rootMargin="300px" minHeight="200px">
        <CTASection />
        <Footer />
      </LazySection>
    </div>
  );
};

export default Index;
