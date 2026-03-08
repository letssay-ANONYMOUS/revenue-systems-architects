import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, MessageSquare, CalendarCheck, Globe, Smartphone, Workflow,
  PhoneIncoming, PhoneOutgoing, Bot, UserCheck, Clock, BarChart3,
  Zap, Target, Shield, ArrowRight, CheckCircle2, XCircle, TrendingUp,
  Layers, Code2, Database, LineChart, Sparkles, Activity, Bell,
  Users, Star, Headphones, Send
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const stats = [
  { value: "97%", label: "Calls Answered", icon: Phone },
  { value: "3x", label: "More Bookings", icon: CalendarCheck },
  { value: "60%", label: "Less Admin Work", icon: Zap },
  { value: "24/7", label: "Always On", icon: Activity },
];

const services = [
  { icon: PhoneIncoming, title: "AI Inbound Calling Agent", desc: "Never miss a call again. Your AI receptionist answers, qualifies, and books — around the clock.", benefit: "Capture every lead", accent: "primary" },
  { icon: PhoneOutgoing, title: "AI Outbound Calling Agent", desc: "Automated follow-ups, reminders, and outreach campaigns that keep your pipeline moving.", benefit: "Reactivate lost leads", accent: "accent" },
  { icon: Bot, title: "Customer Support Chatbot", desc: "Instant replies on your website. Handles FAQs, captures leads, and routes complex queries.", benefit: "24/7 front desk", accent: "primary" },
  { icon: Target, title: "Lead Capture & Qualification", desc: "Smart forms and conversation flows that qualify prospects before they reach your team.", benefit: "Better lead quality", accent: "accent" },
  { icon: CalendarCheck, title: "Appointment Scheduling", desc: "Integrated booking systems that sync with your calendar and reduce no-shows.", benefit: "Automated bookings", accent: "primary" },
  { icon: Globe, title: "Full-Stack Business Website", desc: "Premium websites built to convert visitors into customers, not just look good.", benefit: "Revenue-ready sites", accent: "accent" },
  { icon: Smartphone, title: "Full-Stack Web & Mobile App", desc: "Custom applications that streamline operations and serve your customers better.", benefit: "Custom systems", accent: "primary" },
  { icon: Workflow, title: "Backend & Workflow Automation", desc: "Connect your tools, automate handoffs, and eliminate repetitive manual work.", benefit: "Operational efficiency", accent: "accent" },
];

const painPoints = [
  { icon: XCircle, pain: "Missed calls and lost leads", solution: "AI answers every call, 24/7" },
  { icon: Clock, pain: "Slow response times", solution: "Instant replies via chat and voice" },
  { icon: XCircle, pain: "No-shows and scheduling chaos", solution: "Automated booking with reminders" },
  { icon: XCircle, pain: "Weak online presence", solution: "Premium site that converts" },
  { icon: XCircle, pain: "Manual admin eating your day", solution: "Automated workflows and handoffs" },
  { icon: XCircle, pain: "Fragmented tools and data", solution: "Connected systems, one source of truth" },
];

const processSteps = [
  { step: "01", title: "Strategy", desc: "We map your business goals, customer journey, and growth levers.", icon: Target },
  { step: "02", title: "System Design", desc: "We architect the right combination of AI, automation, and web infrastructure.", icon: Layers },
  { step: "03", title: "Build", desc: "We develop every component to production standard — no shortcuts.", icon: Code2 },
  { step: "04", title: "Automate", desc: "We connect workflows, triggers, and integrations so the system runs itself.", icon: Workflow },
  { step: "05", title: "Launch", desc: "We deploy, test, and ensure everything works under real conditions.", icon: Zap },
  { step: "06", title: "Optimize", desc: "We monitor performance and refine for better results over time.", icon: LineChart },
];

const caseStudies = [
  {
    title: "Premium Café Chain",
    challenge: "Losing 40% of phone inquiries outside business hours. No online booking system.",
    solution: "AI calling agent + automated booking flow + new website",
    result: "3x more bookings, 95% call answer rate, 60% less admin",
    tag: "Hospitality",
    metric: "3x",
    metricLabel: "More Bookings",
  },
  {
    title: "Medical Clinic Network",
    challenge: "Overwhelmed front desk. Patients waiting 4+ hours for callback.",
    solution: "Inbound AI agent + chatbot triage + appointment automation",
    result: "Response time under 30 seconds. 40% fewer missed appointments.",
    tag: "Healthcare",
    metric: "30s",
    metricLabel: "Response Time",
  },
  {
    title: "Real Estate Agency",
    challenge: "Manual lead follow-up. Inconsistent outreach. No unified system.",
    solution: "Outbound AI agent + CRM automation + lead qualification chatbot",
    result: "2x qualified leads. 50% faster follow-up. Unified pipeline.",
    tag: "Real Estate",
    metric: "2x",
    metricLabel: "Qualified Leads",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-accent/5 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="max-w-7xl mx-auto px-5 md:section-padding w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border bg-secondary/50 mb-6 md:mb-8">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground">AI-Powered Business Systems</span>
              </div>
              <h1 className="font-display font-bold text-[2.25rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] mb-5 md:mb-6">
                Your Business,{" "}
                <span className="gradient-text">Answered. Automated. Accelerated.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 md:mb-10 leading-relaxed">
                We build AI calling agents, chatbots, websites, and automation systems that capture more leads, book more appointments, and eliminate the work that slows you down.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/book-a-call" className="premium-btn text-center text-sm px-6 py-3.5 md:px-8 md:py-4">
                  Book a Strategy Call
                </Link>
                <Link to="/case-studies" className="btn-outline-premium text-center text-sm px-6 py-3.5 md:px-8 md:py-4">
                  See Our Work
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative mt-4 lg:mt-0"
            >
              {/* Main dashboard */}
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img src={heroDashboard} alt="AI-powered business dashboard showing call analytics, chatbot conversations, and booking metrics" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                
                {/* Overlay stats on image */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 md:gap-3">
                  {[
                    { label: "Active Calls", val: "12", color: "primary" },
                    { label: "Leads Today", val: "47", color: "accent" },
                    { label: "Booked", val: "23", color: "primary" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.15 }}
                      className="flex-1 rounded-lg border border-border/50 p-2 md:p-3 backdrop-blur-xl"
                      style={{ background: "hsl(var(--card) / 0.85)" }}
                    >
                      <p className="font-display font-bold text-lg md:text-xl text-foreground">{s.val}</p>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground truncate">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating call card - visible on mobile too */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-2 md:-left-4 top-1/4 rounded-xl border border-border p-3 md:p-4 max-w-[170px] md:max-w-[200px] backdrop-blur-xl"
                style={{ background: "hsl(var(--card) / 0.95)", boxShadow: "0 8px 32px hsl(var(--primary) / 0.15)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] md:text-xs font-semibold">Incoming Call</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">AI Answering...</p>
                  </div>
                </div>
                {/* Animated waveform */}
                <div className="flex items-end gap-0.5 mt-2.5 h-4">
                  {[3, 5, 2, 6, 4, 3, 5, 7, 4, 3, 6, 4].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-primary/60"
                      animate={{ height: [h * 2, h * 4, h * 2] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating appointment card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-2 md:-right-4 bottom-1/4 rounded-xl border border-border p-3 md:p-4 max-w-[170px] md:max-w-[200px] backdrop-blur-xl"
                style={{ background: "hsl(var(--card) / 0.95)", boxShadow: "0 8px 32px hsl(var(--accent) / 0.15)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CalendarCheck className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] md:text-xs font-semibold">Booked ✓</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground">Tomorrow, 2 PM</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-border pt-8 md:pt-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="font-display font-bold text-2xl md:text-4xl gradient-text">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="py-12 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <p className="text-center text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 md:mb-10">
              Trusted by forward-thinking businesses
            </p>
            <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center items-center gap-6 md:gap-12 opacity-40">
              {["Meridian Group", "Vertex Capital", "Solara Health", "Atlas Real Estate", "Prism Digital", "Arcadia Cafés"].map((name) => (
                <span key={name} className="font-display font-semibold text-sm md:text-lg text-foreground text-center">{name}</span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">What We Build</p>
            <h2 className="font-display font-bold text-2xl md:text-5xl leading-tight max-w-3xl mb-4 md:mb-6">
              A Complete System, <span className="gradient-text">Not Scattered Tools</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 md:mb-16">
              Every service connects. Your AI agent books appointments. Your chatbot captures leads. Your website converts. Your backend keeps it all running.
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((svc, i) => (
              <SectionReveal key={svc.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group relative rounded-2xl border border-border p-6 md:p-8 h-full flex flex-col overflow-hidden transition-colors duration-500 hover:border-primary/20"
                  style={{ background: "hsl(var(--card))" }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px]"
                    style={{ background: svc.accent === "primary" ? "hsl(var(--primary) / 0.08)" : "hsl(var(--accent) / 0.08)" }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 md:mb-5 ${
                      svc.accent === "primary" ? "bg-primary/10" : "bg-accent/10"
                    }`}>
                      <svc.icon className={`w-5 h-5 md:w-6 md:h-6 ${svc.accent === "primary" ? "text-primary" : "text-accent"}`} />
                    </div>
                    <h3 className="font-display font-semibold text-sm md:text-base mb-2">{svc.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1">{svc.desc}</p>
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
                      <span className={`text-xs font-medium ${svc.accent === "primary" ? "text-primary" : "text-accent"}`}>{svc.benefit}</span>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>

          {/* System connection visual */}
          <SectionReveal delay={0.3}>
            <div className="mt-10 md:mt-16 relative rounded-2xl border border-border p-6 md:p-10 overflow-hidden" style={{ background: "hsl(var(--card))" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.03), transparent 70%)" }} />
              <div className="relative z-10">
                <h4 className="font-display font-semibold text-base md:text-lg mb-6 text-center">Everything Connects</h4>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {[
                    { icon: Phone, label: "AI Calls" },
                    { icon: Bot, label: "Chatbot" },
                    { icon: Globe, label: "Website" },
                    { icon: CalendarCheck, label: "Booking" },
                    { icon: Database, label: "Backend" },
                    { icon: BarChart3, label: "Analytics" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex flex-col items-center gap-2 p-3 md:p-4"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <span className="text-[10px] md:text-xs font-medium text-muted-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* BUSINESS PAIN — with visual comparison */}
      <section className="py-16 md:py-32 surface-elevated relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-destructive/3 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Why It Matters</p>
            <h2 className="font-display font-bold text-2xl md:text-5xl leading-tight max-w-3xl mb-10 md:mb-16">
              Every Missed Call Is a <span className="text-destructive">Missed Sale</span>
            </h2>
          </SectionReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {painPoints.map((pp, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="group rounded-2xl border border-border p-5 md:p-6 h-full overflow-hidden transition-all duration-500 hover:border-primary/20"
                  style={{ background: "hsl(var(--card))" }}
                >
                  {/* Before → After visual */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <pp.icon className="w-4 h-4 text-destructive" />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-through decoration-destructive/30">{pp.pain}</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-destructive/20 via-primary/20 to-primary/20 my-3" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-foreground">{pp.solution}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI CALLING AGENT SHOWCASE — with live visual mockups */}
      <section className="py-16 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px]" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <div className="text-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4 md:mb-6">
                <Headphones className="w-3 h-3 text-primary" />
                <span className="text-[10px] md:text-xs font-medium text-primary">Featured Product</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-5xl leading-tight max-w-3xl mx-auto mb-4 md:mb-6">
                AI Calling Agents That <span className="gradient-text">Work While You Sleep</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Your phone rings. The AI answers, qualifies the caller, answers their questions, and books the appointment — all without human intervention.
              </p>
            </div>
          </SectionReveal>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Inbound — with visual conversation */}
            <SectionReveal>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border p-5 md:p-8 h-full overflow-hidden"
                style={{ background: "hsl(var(--card))" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PhoneIncoming className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg md:text-xl">Inbound Agent</h3>
                    <p className="text-xs text-muted-foreground">Answers & Qualifies</p>
                  </div>
                </div>

                {/* Visual conversation mockup */}
                <div className="rounded-xl border border-border p-4 mb-5" style={{ background: "hsl(var(--background) / 0.5)" }}>
                  <div className="space-y-2.5">
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><Bot className="w-3 h-3 text-primary" /></div>
                      <div className="bg-primary/10 rounded-lg rounded-tl-sm px-3 py-2 max-w-[85%]">
                        <p className="text-[11px] md:text-xs text-foreground">"Good morning! Thank you for calling. How can I help you today?"</p>
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex gap-2 justify-end">
                      <div className="bg-secondary rounded-lg rounded-tr-sm px-3 py-2 max-w-[85%]">
                        <p className="text-[11px] md:text-xs text-muted-foreground">"I'd like to book an appointment for next Tuesday."</p>
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><Bot className="w-3 h-3 text-primary" /></div>
                      <div className="bg-primary/10 rounded-lg rounded-tl-sm px-3 py-2 max-w-[85%]">
                        <p className="text-[11px] md:text-xs text-foreground">"I have 10 AM and 2 PM available. Which works better?"</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {["Answers calls 24/7", "Qualifies callers", "Books in real-time", "Routes urgent calls", "Captures leads", "Structured scripts"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SectionReveal>

            {/* Outbound — with analytics mockup */}
            <SectionReveal delay={0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border p-5 md:p-8 h-full overflow-hidden"
                style={{ background: "hsl(var(--card))" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <PhoneOutgoing className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg md:text-xl">Outbound Agent</h3>
                    <p className="text-xs text-muted-foreground">Follows Up & Converts</p>
                  </div>
                </div>

                {/* Analytics mockup */}
                <div className="rounded-xl border border-border p-4 mb-5" style={{ background: "hsl(var(--background) / 0.5)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-medium text-muted-foreground">Campaign Performance</span>
                    <span className="text-[10px] text-primary font-medium">This Week</span>
                  </div>
                  {/* Bar chart mockup */}
                  <div className="flex items-end gap-1.5 h-20">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                        className="flex-1 rounded-t-sm bg-accent/30"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} className="text-[8px] text-muted-foreground flex-1 text-center">{d}</span>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { label: "Calls Made", val: "342" },
                      { label: "Connected", val: "89%" },
                      { label: "Booked", val: "47" },
                    ].map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="text-sm font-bold text-foreground">{m.val}</p>
                        <p className="text-[8px] text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2">
                  {["Lead follow-up", "Reminders", "Reactivation", "Callbacks", "Scale outreach", "Workflow triggers"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SectionReveal>
          </div>

          {/* Call flow — visual pipeline */}
          <SectionReveal delay={0.2}>
            <div className="mt-8 md:mt-16 rounded-2xl border border-border p-6 md:p-10 overflow-hidden" style={{ background: "hsl(var(--card))" }}>
              <h4 className="font-display font-semibold text-sm md:text-lg mb-6 md:mb-8 text-center">How a Call Flows</h4>
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-0">
                {[
                  { label: "Incoming Call", icon: Phone, color: "primary" },
                  { label: "AI Answers", icon: Bot, color: "primary" },
                  { label: "Qualifies", icon: UserCheck, color: "accent" },
                  { label: "Books", icon: CalendarCheck, color: "primary" },
                  { label: "Confirms", icon: Send, color: "accent" },
                ].map((step, i) => (
                  <div key={step.label} className="flex md:flex-col items-center gap-3 md:gap-0">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 }}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl border flex items-center justify-center mb-0 md:mb-2 ${
                          step.color === "primary" ? "bg-primary/10 border-primary/20" : "bg-accent/10 border-accent/20"
                        }`}
                      >
                        <step.icon className={`w-5 h-5 ${step.color === "primary" ? "text-primary" : "text-accent"}`} />
                      </motion.div>
                    </div>
                    <p className="text-xs font-medium md:text-center">{step.label}</p>
                    {i < 4 && <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block md:mx-4 md:mt-0" />}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <div className="mt-6 md:mt-8 text-center">
            <Link to="/ai-calling-agents" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              Explore AI Calling Agents <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CHATBOTS & AUTOMATION — with live chat visual */}
      <section className="py-16 md:py-32 surface-elevated">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Chatbots & Automation</p>
              <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight mb-4 md:mb-6">
                Instant Replies. Qualified Leads. <span className="gradient-text">Zero Wait Times.</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                Your website chatbot handles FAQs, captures lead details, qualifies prospects, and books appointments — all while your team focuses on closing deals.
              </p>
              <ul className="space-y-3">
                {["24/7 instant website replies", "Smart lead qualification", "Integrated booking flow", "FAQ & customer support handling", "CRM & notification integrations", "Works on website, WhatsApp, and web chat"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs md:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/chatbots-automation" className="inline-flex items-center gap-2 mt-6 md:mt-8 text-sm font-medium text-primary hover:underline">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              {/* Enhanced chat mockup */}
              <div className="rounded-2xl border border-border overflow-hidden" style={{ background: "hsl(var(--card))", boxShadow: "0 20px 60px hsl(var(--primary) / 0.08)" }}>
                {/* Chat header */}
                <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">NexusAI Assistant</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <p className="text-[10px] text-muted-foreground">Online</p>
                    </div>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-4 space-y-3 min-h-[240px]">
                  {[
                    { from: "bot", text: "Hi! 👋 How can I help you today?" },
                    { from: "user", text: "I'd like to book an appointment for next week." },
                    { from: "bot", text: "Of course! What type of service are you looking for?" },
                    { from: "user", text: "A consultation for my restaurant's digital presence." },
                    { from: "bot", text: "I have Tuesday at 10 AM or Thursday at 2 PM available. Which works?" },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                        msg.from === "user"
                          ? "bg-primary/10 rounded-br-sm"
                          : "bg-secondary rounded-bl-sm"
                      }`}>
                        <p className="text-[11px] md:text-xs leading-relaxed">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Input */}
                <div className="px-4 py-3 border-t border-border flex items-center gap-2">
                  <div className="flex-1 rounded-full border border-border px-3 py-2">
                    <p className="text-[10px] text-muted-foreground">Type a message...</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Send className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* WEBSITES & APPS — with device mockups */}
      <section className="py-16 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Websites & Apps</p>
            <h2 className="font-display font-bold text-2xl md:text-5xl leading-tight max-w-3xl mb-4 md:mb-6">
              Digital Presence That <span className="gradient-text">Actually Converts</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 md:mb-16">
              We don't build decoration. We build business infrastructure — premium websites and apps with booking systems, payment flows, lead capture, and analytics built in.
            </p>
          </SectionReveal>

          {/* Device mockup visual */}
          <SectionReveal delay={0.1}>
            <div className="mb-10 md:mb-16 flex justify-center items-end gap-4 md:gap-8">
              {/* Phone frame */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-[120px] md:w-[180px] rounded-2xl border-2 border-border overflow-hidden"
                style={{ background: "hsl(var(--card))" }}
              >
                <div className="h-3 md:h-4 border-b border-border flex items-center justify-center">
                  <div className="w-8 h-1 rounded-full bg-border" />
                </div>
                <div className="p-2 space-y-2">
                  <div className="h-10 md:h-14 rounded-lg bg-primary/10" />
                  <div className="space-y-1">
                    <div className="h-1.5 rounded bg-foreground/10 w-3/4" />
                    <div className="h-1.5 rounded bg-foreground/10 w-1/2" />
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-8 md:h-12 rounded bg-accent/10" />
                    <div className="h-8 md:h-12 rounded bg-primary/10" />
                  </div>
                  <div className="h-6 md:h-8 rounded-lg bg-primary/20" />
                </div>
              </motion.div>

              {/* Desktop frame */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex-1 max-w-[500px] rounded-xl border-2 border-border overflow-hidden"
                style={{ background: "hsl(var(--card))" }}
              >
                <div className="h-4 md:h-6 border-b border-border flex items-center gap-1.5 px-3">
                  <div className="w-2 h-2 rounded-full bg-destructive/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                  <div className="w-2 h-2 rounded-full bg-green-500/40" />
                </div>
                <div className="p-3 md:p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="h-2 rounded bg-foreground/10 w-2/3" />
                      <div className="h-2 rounded bg-foreground/10 w-full" />
                      <div className="h-2 rounded bg-foreground/10 w-3/4" />
                      <div className="h-6 md:h-8 rounded bg-primary/20 w-28 mt-2" />
                    </div>
                    <div className="w-24 md:w-40 h-20 md:h-28 rounded-lg bg-primary/10" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 md:h-16 rounded bg-accent/10" />
                    <div className="h-12 md:h-16 rounded bg-primary/10" />
                    <div className="h-12 md:h-16 rounded bg-accent/10" />
                  </div>
                </div>
              </motion.div>

              {/* Tablet frame */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="hidden md:block w-[140px] rounded-xl border-2 border-border overflow-hidden"
                style={{ background: "hsl(var(--card))" }}
              >
                <div className="h-4 border-b border-border" />
                <div className="p-2 space-y-2">
                  <div className="h-12 rounded bg-primary/10" />
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-8 rounded bg-accent/10" />
                    <div className="h-8 rounded bg-primary/10" />
                  </div>
                  <div className="h-1.5 rounded bg-foreground/10" />
                  <div className="h-1.5 rounded bg-foreground/10 w-3/4" />
                </div>
              </motion.div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {[
              { icon: Globe, title: "Company Websites", desc: "Premium, conversion-focused sites that establish trust and generate leads." },
              { icon: Target, title: "Landing Pages", desc: "High-converting pages designed for campaigns, launches, and lead capture." },
              { icon: CalendarCheck, title: "Booking Platforms", desc: "Integrated scheduling systems with payment and reminder workflows." },
              { icon: BarChart3, title: "Dashboards", desc: "Internal tools and analytics dashboards for operations visibility." },
              { icon: Smartphone, title: "Customer Apps", desc: "Mobile-friendly applications that serve customers and streamline processes." },
              { icon: Database, title: "Backend Systems", desc: "APIs, databases, and automation that power your business operations." },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="group rounded-2xl border border-border p-4 md:p-6 h-full hover:border-primary/20 transition-colors duration-500"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-5">
                    <item.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xs md:text-base mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — timeline with visual connections */}
      <section className="py-16 md:py-32 surface-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent hidden lg:block" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Our Process</p>
              <h2 className="font-display font-bold text-2xl md:text-5xl leading-tight max-w-3xl mx-auto">
                From Strategy to System <span className="gradient-text">in Weeks</span>
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {processSteps.map((s, i) => (
              <SectionReveal key={s.step} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl border border-border p-5 md:p-8 h-full overflow-hidden hover:border-primary/20 transition-colors duration-500"
                  style={{ background: "hsl(var(--card))" }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-primary/3 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <s.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-display font-bold text-xl md:text-2xl gradient-text">{s.step}</span>
                    </div>
                    <h3 className="font-display font-semibold text-sm md:text-lg mb-1 md:mb-2">{s.title}</h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES — with big metrics */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Results</p>
            <h2 className="font-display font-bold text-2xl md:text-5xl leading-tight max-w-3xl mb-10 md:mb-16">
              Real Systems. <span className="gradient-text">Measurable Impact.</span>
            </h2>
          </SectionReveal>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {caseStudies.map((cs, i) => (
              <SectionReveal key={cs.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-border h-full flex flex-col overflow-hidden hover:border-primary/20 transition-colors duration-500"
                  style={{ background: "hsl(var(--card))" }}
                >
                  {/* Big metric header */}
                  <div className="p-5 md:p-6 border-b border-border relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 100%, hsl(var(--primary) / 0.05), transparent)" }} />
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{cs.tag}</span>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-display font-bold text-4xl md:text-5xl gradient-text">{cs.metric}</span>
                      <span className="text-xs text-muted-foreground">{cs.metricLabel}</span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h3 className="font-display font-semibold text-base md:text-xl mb-3">{cs.title}</h3>
                    <div className="space-y-2.5 flex-1">
                      <div>
                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Challenge</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Solution</p>
                        <p className="text-xs md:text-sm text-foreground">{cs.solution}</p>
                      </div>
                    </div>
                    <Link to="/case-studies" className="inline-flex items-center gap-2 mt-4 pt-3 border-t border-border text-xs md:text-sm font-medium text-primary hover:underline">
                      Full case study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / WHY US — with visual grid */}
      <section className="py-16 md:py-32 surface-elevated relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-accent/3 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Why Us</p>
              <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight mb-4 md:mb-6">
                We Think Like Business Owners, <span className="gradient-text">Then Build Like Engineers</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                Most agencies sell you a website or a chatbot. We design revenue systems — the kind where every piece connects, every workflow triggers the next, and your business runs tighter with every passing week.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                We obsess over quality because our clients charge premium prices. Their brand demands it. Their customers expect it. And their growth depends on it.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 mt-6 md:mt-8 text-sm font-medium text-primary hover:underline">
                More about us <ArrowRight className="w-4 h-4" />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { icon: Shield, label: "Strategic Approach", desc: "Business-first thinking" },
                  { icon: Layers, label: "Full-Stack Execution", desc: "Every layer handled" },
                  { icon: TrendingUp, label: "Growth-Focused", desc: "Measurable outcomes" },
                  { icon: Zap, label: "Fast Delivery", desc: "Weeks, not months" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -3 }}
                    className="group rounded-2xl border border-border flex flex-col items-center text-center p-4 md:p-6 hover:border-primary/20 transition-colors duration-500"
                    style={{ background: "hsl(var(--card))" }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2.5 md:mb-3 group-hover:bg-primary/15 transition-colors">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <p className="text-xs md:text-sm font-semibold mb-0.5">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Index;
