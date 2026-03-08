import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, MessageSquare, CalendarCheck, CheckCircle2, ArrowRight, Workflow, Bell, Database, Zap, Users, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const chatbotFeatures = [
  "Instant website replies",
  "Smart lead qualification",
  "FAQ handling",
  "Booking integration",
  "Human handoff",
  "Multi-channel support",
];

const automationFeatures = [
  { icon: Workflow, title: "Workflow Automation", desc: "Trigger actions from forms, bookings, or conversations." },
  { icon: Bell, title: "Smart Notifications", desc: "Alert your team via email, SMS, or Slack instantly." },
  { icon: Database, title: "CRM Integration", desc: "Push leads and data directly into your CRM." },
  { icon: CalendarCheck, title: "Scheduling Flows", desc: "Automated booking, reminders, and follow-ups." },
  { icon: Users, title: "Lead Routing", desc: "Assign leads by location, service, or availability." },
  { icon: Zap, title: "Process Optimization", desc: "Automate repetitive tasks your team shouldn't do." },
];

const ChatbotsAutomation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-accent/5 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3">Chatbots & Automation</p>
            <h1 className="font-display font-bold text-2xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 md:mb-6 max-w-4xl">
              Conversations That Convert.{" "}
              <span className="gradient-text">Workflows That Scale.</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mb-6 md:mb-10 leading-relaxed">
              Intelligent chatbots that qualify leads and support customers — backed by automation that runs without you.
            </p>
            <Link to="/book-a-call" className="premium-btn text-sm py-3.5">Book a Strategy Call</Link>
          </SectionReveal>
        </div>
      </section>

      {/* Chatbot — with live visual */}
      <section className="py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Chatbot</p>
              <h2 className="font-display font-bold text-xl md:text-4xl leading-tight mb-3 md:mb-6">
                Your 24/7 Digital Front Desk
              </h2>
              <p className="text-xs md:text-base text-muted-foreground mb-4 md:mb-8 leading-relaxed hidden md:block">
                Every visitor gets an instant, intelligent response. Qualifies leads, answers questions, captures info, and books — before a human lifts a finger.
              </p>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {chatbotFeatures.map((c) => (
                  <div key={c} className="flex items-center gap-1.5 text-[10px] md:text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0" />
                    {c}
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="rounded-xl md:rounded-2xl border border-border overflow-hidden" style={{ background: "hsl(var(--card))", boxShadow: "0 20px 60px hsl(var(--primary) / 0.08)" }}>
                <div className="px-3 py-2.5 md:px-4 md:py-3 border-b border-border flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-sm font-medium">Support Assistant</p>
                    <span className="text-[9px] md:text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">Online</span>
                  </div>
                </div>
                <div className="p-3 md:p-4 space-y-2.5">
                  {[
                    { from: "bot", text: "Welcome! How can I help you today?" },
                    { from: "user", text: "I need automation for my clinic." },
                    { from: "bot", text: "We've helped several clinics! Want to book a free strategy call?" },
                  ].map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.12 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : ""}`}>
                      <div className={`rounded-xl px-3 py-2 max-w-[80%] ${msg.from === "user" ? "bg-primary/10 rounded-br-sm" : "bg-secondary rounded-bl-sm"}`}>
                        <p className="text-[10px] md:text-sm text-muted-foreground">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <span className="text-[10px] md:text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">Yes, book a call</span>
                    <span className="text-[10px] md:text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-full">Tell me more</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Automation */}
      <section className="py-14 md:py-32 surface-elevated">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Automation</p>
            <h2 className="font-display font-bold text-xl md:text-5xl leading-tight mb-3 md:mb-6 max-w-3xl">
              The System Behind the Scenes
            </h2>
            <p className="text-xs md:text-lg text-muted-foreground max-w-2xl mb-8 md:mb-16 hidden md:block">
              Chatbots are the front line. Behind them, workflows route leads, trigger actions, and keep everything connected.
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {automationFeatures.map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -3 }} className="card-premium p-4 md:p-6 h-full">
                  <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2.5 md:mb-4">
                    <f.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xs md:text-base mb-1">{f.title}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Automate Your Customer Journey" subtext="From first visit to booked appointment — every step handled." />
      <Footer />
    </div>
  );
};

export default ChatbotsAutomation;
