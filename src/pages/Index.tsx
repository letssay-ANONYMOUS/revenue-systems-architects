import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, MessageSquare, CalendarCheck, Globe, Smartphone, Workflow,
  PhoneIncoming, PhoneOutgoing, Bot, UserCheck, Clock, BarChart3,
  Zap, Target, Shield, ArrowRight, CheckCircle2, XCircle, TrendingUp,
  Layers, Code2, Database, LineChart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const stats = [
  { value: "97%", label: "Calls Answered" },
  { value: "3x", label: "More Bookings" },
  { value: "60%", label: "Less Admin Work" },
  { value: "24/7", label: "Always On" },
];

const services = [
  { icon: PhoneIncoming, title: "AI Inbound Calling Agent", desc: "Never miss a call again. Your AI receptionist answers, qualifies, and books — around the clock.", benefit: "Capture every lead" },
  { icon: PhoneOutgoing, title: "AI Outbound Calling Agent", desc: "Automated follow-ups, reminders, and outreach campaigns that keep your pipeline moving.", benefit: "Reactivate lost leads" },
  { icon: Bot, title: "Customer Support Chatbot", desc: "Instant replies on your website. Handles FAQs, captures leads, and routes complex queries.", benefit: "24/7 front desk" },
  { icon: Target, title: "Lead Capture & Qualification", desc: "Smart forms and conversation flows that qualify prospects before they reach your team.", benefit: "Better lead quality" },
  { icon: CalendarCheck, title: "Appointment Scheduling", desc: "Integrated booking systems that sync with your calendar and reduce no-shows.", benefit: "Automated bookings" },
  { icon: Globe, title: "Full-Stack Business Website", desc: "Premium websites built to convert visitors into customers, not just look good.", benefit: "Revenue-ready sites" },
  { icon: Smartphone, title: "Full-Stack Web & Mobile App", desc: "Custom applications that streamline operations and serve your customers better.", benefit: "Custom systems" },
  { icon: Workflow, title: "Backend & Workflow Automation", desc: "Connect your tools, automate handoffs, and eliminate repetitive manual work.", benefit: "Operational efficiency" },
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
  { step: "01", title: "Strategy", desc: "We map your business goals, customer journey, and growth levers." },
  { step: "02", title: "System Design", desc: "We architect the right combination of AI, automation, and web infrastructure." },
  { step: "03", title: "Build", desc: "We develop every component to production standard — no shortcuts." },
  { step: "04", title: "Automate", desc: "We connect workflows, triggers, and integrations so the system runs itself." },
  { step: "05", title: "Launch", desc: "We deploy, test, and ensure everything works under real conditions." },
  { step: "06", title: "Optimize", desc: "We monitor performance and refine for better results over time." },
];

const caseStudies = [
  {
    title: "Premium Café Chain",
    challenge: "Losing 40% of phone inquiries outside business hours. No online booking system.",
    solution: "AI calling agent + automated booking flow + new website",
    result: "3x more bookings, 95% call answer rate, 60% less admin",
    tag: "Hospitality",
  },
  {
    title: "Medical Clinic Network",
    challenge: "Overwhelmed front desk. Patients waiting 4+ hours for callback.",
    solution: "Inbound AI agent + chatbot triage + appointment automation",
    result: "Response time under 30 seconds. 40% fewer missed appointments.",
    tag: "Healthcare",
  },
  {
    title: "Real Estate Agency",
    challenge: "Manual lead follow-up. Inconsistent outreach. No unified system.",
    solution: "Outbound AI agent + CRM automation + lead qualification chatbot",
    result: "2x qualified leads. 50% faster follow-up. Unified pipeline.",
    tag: "Real Estate",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto section-padding w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-xs font-medium text-muted-foreground">AI-Powered Business Systems</span>
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
                Your Business,{" "}
                <span className="gradient-text">Answered. Automated. Accelerated.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
                We build AI calling agents, chatbots, websites, and automation systems that capture more leads, book more appointments, and eliminate the work that slows you down.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-a-call" className="premium-btn text-center">
                  Book a Strategy Call
                </Link>
                <Link to="/case-studies" className="btn-outline-premium text-center">
                  See Our Work
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img src={heroDashboard} alt="AI-powered business dashboard showing call analytics, chatbot conversations, and booking metrics" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 top-1/4 card-premium p-4 max-w-[200px] hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Incoming Call</p>
                    <p className="text-xs text-muted-foreground">AI Answering...</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 bottom-1/4 card-premium p-4 max-w-[200px] hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Appointment Booked</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
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
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-3xl md:text-4xl gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
              Trusted by forward-thinking businesses
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
              {["Meridian Group", "Vertex Capital", "Solara Health", "Atlas Real Estate", "Prism Digital", "Arcadia Cafés"].map((name) => (
                <span key={name} className="font-display font-semibold text-lg text-foreground">{name}</span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">What We Build</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl mb-6">
              A Complete System, Not Scattered Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16">
              Every service connects. Your AI agent books appointments. Your chatbot captures leads. Your website converts. Your backend keeps it all running.
            </p>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <SectionReveal key={svc.title} delay={i * 0.08}>
                <div className="card-premium h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <svc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{svc.desc}</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs font-medium text-primary">{svc.benefit}</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS PAIN */}
      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Why It Matters</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl mb-16">
              Every Missed Call Is a Missed Sale
            </h2>
          </SectionReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((pp, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <pp.icon className="w-4 h-4 text-destructive" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pp.pain}</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{pp.solution}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI CALLING AGENT SHOWCASE */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Featured</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl mb-6">
              AI Calling Agents That Work While You Sleep
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16">
              Your phone rings. The AI answers, qualifies the caller, answers their questions, and books the appointment — all without human intervention.
            </p>
          </SectionReveal>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Inbound */}
            <SectionReveal>
              <div className="card-premium">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PhoneIncoming className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl">Inbound Agent</h3>
                </div>
                <ul className="space-y-3">
                  {["Answers calls 24/7", "Qualifies callers automatically", "Books appointments in real-time", "Routes urgent calls to your team", "Captures lead information", "Follows structured conversation scripts"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            {/* Outbound */}
            <SectionReveal delay={0.15}>
              <div className="card-premium">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <PhoneOutgoing className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl">Outbound Agent</h3>
                </div>
                <ul className="space-y-3">
                  {["Automated lead follow-up", "Appointment reminders & confirmations", "Reactivation campaigns for cold leads", "Post-inquiry callbacks", "Outbound outreach at scale", "Data capture and workflow triggers"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>

          {/* Call flow mockup */}
          <SectionReveal delay={0.2}>
            <div className="mt-16 card-premium p-10">
              <h4 className="font-display font-semibold text-lg mb-8 text-center">How a Call Flows</h4>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {["Incoming Call", "AI Answers", "Qualifies Caller", "Books Appointment", "Sends Confirmation"].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                        <span className="font-display font-bold text-primary">{i + 1}</span>
                      </div>
                      <p className="text-xs font-medium">{step}</p>
                    </div>
                    {i < 4 && <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CHATBOTS & AUTOMATION */}
      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Chatbots & Automation</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                Instant Replies. Qualified Leads. Zero Wait Times.
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Your website chatbot handles FAQs, captures lead details, qualifies prospects, and books appointments — all while your team focuses on closing deals.
              </p>
              <ul className="space-y-4">
                {["24/7 instant website replies", "Smart lead qualification", "Integrated booking flow", "FAQ & customer support handling", "CRM & notification integrations", "Works on website, WhatsApp, and web chat"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/chatbots-automation" className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-primary hover:underline">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              {/* Chat mockup */}
              <div className="card-premium p-6">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary/10 rounded-2xl rounded-br-md px-4 py-3 max-w-[280px]">
                      <p className="text-sm">Hi, I'd like to book an appointment for next week.</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 max-w-[280px]">
                      <p className="text-sm text-muted-foreground">Of course! I can help with that. What type of service are you looking for?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary/10 rounded-2xl rounded-br-md px-4 py-3 max-w-[280px]">
                      <p className="text-sm">A consultation for my restaurant's digital presence.</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 max-w-[280px]">
                      <p className="text-sm text-muted-foreground">I have availability on Tuesday at 10 AM or Thursday at 2 PM. Which works best for you?</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* WEBSITES & APPS */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Websites & Apps</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl mb-6">
              Digital Presence That Actually Converts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16">
              We don't build decoration. We build business infrastructure — premium websites and apps with booking systems, payment flows, lead capture, and analytics built in.
            </p>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Company Websites", desc: "Premium, conversion-focused sites that establish trust and generate leads." },
              { icon: Target, title: "Landing Pages", desc: "High-converting pages designed for campaigns, launches, and lead capture." },
              { icon: CalendarCheck, title: "Booking Platforms", desc: "Integrated scheduling systems with payment and reminder workflows." },
              { icon: BarChart3, title: "Dashboards", desc: "Internal tools and analytics dashboards for operations visibility." },
              { icon: Smartphone, title: "Customer Apps", desc: "Mobile-friendly applications that serve customers and streamline processes." },
              { icon: Database, title: "Backend Systems", desc: "APIs, databases, and automation that power your business operations." },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Our Process</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl mb-16">
              From Strategy to System in Weeks, Not Months
            </h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((s, i) => (
              <SectionReveal key={s.step} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <span className="font-display font-bold text-3xl gradient-text">{s.step}</span>
                  <h3 className="font-display font-semibold text-lg mt-4 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Results</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl mb-16">
              Real Systems. Measurable Impact.
            </h2>
          </SectionReveal>
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <SectionReveal key={cs.title} delay={i * 0.1}>
                <div className="card-premium h-full flex flex-col">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full self-start mb-5">{cs.tag}</span>
                  <h3 className="font-display font-semibold text-xl mb-4">{cs.title}</h3>
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Challenge</p>
                      <p className="text-sm text-muted-foreground">{cs.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Solution</p>
                      <p className="text-sm text-foreground">{cs.solution}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Result</p>
                      <p className="text-sm font-medium text-primary">{cs.result}</p>
                    </div>
                  </div>
                  <Link to="/case-studies" className="inline-flex items-center gap-2 mt-6 pt-4 border-t border-border text-sm font-medium text-primary hover:underline">
                    Read full case study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / WHY US */}
      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Why Us</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                We Think Like Business Owners, Then Build Like Engineers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most agencies sell you a website or a chatbot. We design revenue systems — the kind where every piece connects, every workflow triggers the next, and your business runs tighter with every passing week.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We obsess over quality because our clients charge premium prices. Their brand demands it. Their customers expect it. And their growth depends on it.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-primary hover:underline">
                More about us <ArrowRight className="w-4 h-4" />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Strategic Approach" },
                  { icon: Layers, label: "Full-Stack Execution" },
                  { icon: TrendingUp, label: "Growth-Focused" },
                  { icon: Zap, label: "Fast Delivery" },
                ].map((item) => (
                  <div key={item.label} className="card-premium flex flex-col items-center text-center p-6">
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
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
