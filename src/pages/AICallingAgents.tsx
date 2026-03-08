import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PhoneIncoming, PhoneOutgoing, CheckCircle2, Building2, Stethoscope, Home as HomeIcon, UtensilsCrossed, Briefcase, Car, Bot, Phone, CalendarCheck, UserCheck, Send, ArrowRight, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const inboundFeatures = [
  "Answers every call 24/7",
  "Handles questions naturally",
  "Qualifies callers",
  "Routes urgent calls",
  "Books in real-time",
  "Captures lead info",
];

const outboundFeatures = [
  "Lead follow-up in minutes",
  "Appointment reminders",
  "Reactivation campaigns",
  "Post-inquiry callbacks",
  "Qualification at scale",
  "Workflow triggers",
];

const industries = [
  { icon: Stethoscope, name: "Healthcare", desc: "Patient intake, scheduling, reminders" },
  { icon: HomeIcon, name: "Real Estate", desc: "Lead qualification, viewing scheduling" },
  { icon: UtensilsCrossed, name: "Hospitality", desc: "Reservations, event inquiries" },
  { icon: Briefcase, name: "Professional", desc: "Consultation booking, onboarding" },
  { icon: Building2, name: "Home Services", desc: "Quote requests, job scheduling" },
  { icon: Car, name: "Automotive", desc: "Service booking, test drives" },
];

const callOutcomes = [
  { label: "Lead Qualified", desc: "Meets criteria → booked", color: "text-primary" },
  { label: "Appointment Set", desc: "Calendar synced, confirmed", color: "text-accent" },
  { label: "Info Captured", desc: "All details logged", color: "text-primary" },
  { label: "Urgent Routed", desc: "Transferred instantly", color: "text-destructive" },
];

const faqs = [
  { q: "How natural does the AI sound?", a: "Advanced voice synthesis that sounds conversational. Most callers can't tell." },
  { q: "Can it handle complex questions?", a: "Trained on your business knowledge. Edge cases route to your team." },
  { q: "How quickly can this be set up?", a: "Most agents are live within 1-2 weeks." },
  { q: "Does it integrate with my tools?", a: "Calendars, CRMs, scheduling tools — all connected." },
  { q: "What if AI can't handle a call?", a: "Follows your escalation rules — transfer, message, or callback." },
];

const AICallingAgents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="absolute top-20 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3">AI Calling Agents</p>
            <h1 className="font-display font-bold text-2xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 md:mb-6 max-w-4xl">
              Every Call Answered.{" "}
              <span className="gradient-text">Every Lead Captured.</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mb-6 md:mb-10 leading-relaxed">
              AI voice agents that answer calls, follow up, qualify leads, and book appointments — without adding headcount.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/book-a-call" className="premium-btn text-center text-sm py-3.5">Book a Strategy Call</Link>
              <Link to="/case-studies" className="btn-outline-premium text-center text-sm py-3.5">See Results</Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Visual call flow */}
      <section className="py-10 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <div className="rounded-xl md:rounded-2xl border border-border p-4 md:p-10 overflow-hidden" style={{ background: "hsl(var(--card))" }}>
              <h4 className="font-display font-semibold text-sm md:text-xl mb-5 md:mb-8 text-center">How It Works</h4>
              <div className="flex items-center justify-between gap-1 md:gap-4">
                {[
                  { label: "Call", icon: Phone, color: "primary" },
                  { label: "AI Answers", icon: Bot, color: "primary" },
                  { label: "Qualifies", icon: UserCheck, color: "accent" },
                  { label: "Books", icon: CalendarCheck, color: "primary" },
                  { label: "Confirms", icon: Send, color: "accent" },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-1 md:gap-4">
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center ${
                          step.color === "primary" ? "bg-primary/10 border-primary/20" : "bg-accent/10 border-accent/20"
                        }`}
                      >
                        <step.icon className={`w-4 h-4 md:w-6 md:h-6 ${step.color === "primary" ? "text-primary" : "text-accent"}`} />
                      </motion.div>
                      <p className="text-[8px] md:text-sm font-medium">{step.label}</p>
                    </div>
                    {i < 4 && <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/30 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Inbound vs Outbound — with visual mockups */}
      <section className="py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <div className="grid md:grid-cols-2 gap-4 md:gap-12">
            <SectionReveal>
              <div className="card-premium p-5 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-5 md:mb-8">
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PhoneIncoming className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg md:text-2xl">Inbound Agent</h2>
                    <p className="text-[10px] md:text-sm text-muted-foreground">24/7 AI receptionist</p>
                  </div>
                </div>
                {/* Conversation visual */}
                <div className="rounded-lg border border-border p-3 mb-4" style={{ background: "hsl(var(--background) / 0.5)" }}>
                  <div className="space-y-2">
                    {[
                      { from: "ai", text: "Thank you for calling! How can I help?" },
                      { from: "user", text: "I'd like to book for Tuesday." },
                      { from: "ai", text: "10 AM or 2 PM available. Which works?" },
                    ].map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }}
                        className={`flex ${msg.from === "user" ? "justify-end" : ""}`}>
                        <div className={`rounded-lg px-2.5 py-1.5 max-w-[80%] ${msg.from === "user" ? "bg-secondary" : "bg-primary/10"}`}>
                          <p className="text-[10px] md:text-xs">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                  {inboundFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-1.5 text-[10px] md:text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="card-premium p-5 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-5 md:mb-8">
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <PhoneOutgoing className="w-5 h-5 md:w-7 md:h-7 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg md:text-2xl">Outbound Agent</h2>
                    <p className="text-[10px] md:text-sm text-muted-foreground">Automated outreach</p>
                  </div>
                </div>
                {/* Analytics visual */}
                <div className="rounded-lg border border-border p-3 mb-4" style={{ background: "hsl(var(--background) / 0.5)" }}>
                  <div className="flex items-end gap-1 h-12 md:h-16 mb-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                        className="flex-1 rounded-t-sm bg-accent/30" />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[{ l: "Calls", v: "342" }, { l: "Connected", v: "89%" }, { l: "Booked", v: "47" }].map((m) => (
                      <div key={m.l}><p className="text-xs font-bold">{m.v}</p><p className="text-[8px] text-muted-foreground">{m.l}</p></div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                  {outboundFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-1.5 text-[10px] md:text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Call outcomes — visual cards */}
      <section className="py-14 md:py-32 surface-elevated">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-xl md:text-5xl leading-tight mb-8 md:mb-16 max-w-3xl">
              After the AI Picks Up
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {callOutcomes.map((o, i) => (
              <SectionReveal key={o.label} delay={i * 0.06}>
                <div className="card-premium p-4 md:p-6 h-full text-center">
                  <h3 className={`font-display font-semibold text-sm md:text-lg mb-1 md:mb-2 ${o.color}`}>{o.label}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground">{o.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries — visual grid */}
      <section className="py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-2 md:mb-4">Industries</p>
            <h2 className="font-display font-bold text-xl md:text-5xl leading-tight mb-8 md:mb-16 max-w-3xl">
              Built for Businesses That Can't Miss a Call
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {industries.map((ind, i) => (
              <SectionReveal key={ind.name} delay={i * 0.06}>
                <motion.div whileHover={{ y: -3 }} className="card-premium p-4 md:p-6 h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2.5 md:mb-4">
                    <ind.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xs md:text-base mb-1">{ind.name}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground">{ind.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — compact */}
      <section className="py-14 md:py-32 surface-elevated">
        <div className="max-w-3xl mx-auto px-5 md:section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-xl md:text-4xl mb-8 md:mb-12">FAQs</h2>
          </SectionReveal>
          <div className="space-y-3 md:space-y-6">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.04}>
                <div className="card-premium p-4 md:p-6">
                  <h3 className="font-display font-semibold text-xs md:text-base mb-1 md:mb-2">{faq.q}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Never Miss a Lead Again" subtext="Let's build an AI calling agent for your business." />
      <Footer />
    </div>
  );
};

export default AICallingAgents;
