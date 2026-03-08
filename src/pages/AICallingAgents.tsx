import { Link } from "react-router-dom";
import { PhoneIncoming, PhoneOutgoing, CheckCircle2, ArrowRight, Building2, Stethoscope, Home as HomeIcon, UtensilsCrossed, Briefcase, Car } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const inboundFeatures = [
  "Answers every call, 24 hours a day, 7 days a week",
  "Handles common questions with natural conversation",
  "Qualifies callers based on your criteria",
  "Routes urgent calls directly to your team",
  "Books appointments in real-time",
  "Captures full lead information automatically",
  "Reduces missed opportunities to near zero",
  "Follows structured scripts tailored to your business",
  "Integrates with your scheduling and CRM tools",
  "Acts as your always-on first-line receptionist",
];

const outboundFeatures = [
  "Automated follow-up on new leads within minutes",
  "Appointment reminders to reduce no-shows",
  "Reactivation campaigns for dormant contacts",
  "Post-inquiry callbacks that close the loop",
  "Lead qualification at scale",
  "Consistent messaging across every interaction",
  "Data capture from every conversation",
  "Workflow triggers based on call outcomes",
  "Outbound outreach without hiring more staff",
  "Campaign-level analytics and reporting",
];

const industries = [
  { icon: Stethoscope, name: "Healthcare & Clinics", desc: "Patient intake, appointment booking, prescription reminders, triage routing" },
  { icon: HomeIcon, name: "Real Estate", desc: "Lead qualification, property inquiry handling, viewing scheduling, follow-up" },
  { icon: UtensilsCrossed, name: "Restaurants & Hospitality", desc: "Reservation handling, event inquiries, catering follow-up, feedback collection" },
  { icon: Briefcase, name: "Professional Services", desc: "Consultation booking, client onboarding, case status updates" },
  { icon: Building2, name: "Home Services", desc: "Quote requests, job scheduling, emergency dispatch, payment follow-up" },
  { icon: Car, name: "Automotive", desc: "Service booking, test drive scheduling, recall notifications, status updates" },
];

const callOutcomes = [
  { label: "Lead Qualified", desc: "Caller meets your criteria → booked for consultation", color: "text-primary" },
  { label: "Appointment Set", desc: "Calendar synced, confirmation sent, reminder scheduled", color: "text-accent" },
  { label: "Info Captured", desc: "Name, contact, needs, timeline — all logged automatically", color: "text-primary" },
  { label: "Urgent Routed", desc: "High-priority caller transferred to your team instantly", color: "text-destructive" },
];

const faqs = [
  { q: "How natural does the AI voice sound?", a: "Our AI agents use advanced voice synthesis that sounds conversational and professional. Most callers can't tell they're speaking with AI." },
  { q: "Can the agent handle complex questions?", a: "Yes. We train agents on your specific business knowledge, FAQs, pricing, and processes. For edge cases, the agent seamlessly routes to your team." },
  { q: "How quickly can this be set up?", a: "Most AI calling agents are live within 1-2 weeks, including script development, testing, and integration with your existing systems." },
  { q: "Does it integrate with my existing tools?", a: "Yes. We integrate with calendars, CRMs, scheduling tools, and notification systems you already use." },
  { q: "What happens if the AI can't handle a call?", a: "The agent follows escalation rules you define — it can transfer to a human, take a message, or schedule a callback." },
];

const AICallingAgents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">AI Calling Agents</p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl">
              Every Call Answered.{" "}
              <span className="gradient-text">Every Lead Captured.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              AI-powered voice agents that answer inbound calls, make outbound follow-ups, qualify leads, and book appointments — without adding headcount.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book-a-call" className="premium-btn text-center">Book a Strategy Call</Link>
              <Link to="/case-studies" className="btn-outline-premium text-center">See Results</Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Inbound vs Outbound */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            <SectionReveal>
              <div className="card-premium h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PhoneIncoming className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl">Inbound Agent</h2>
                    <p className="text-sm text-muted-foreground">Your 24/7 AI receptionist</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {inboundFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="card-premium h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <PhoneOutgoing className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl">Outbound Agent</h2>
                    <p className="text-sm text-muted-foreground">Automated outreach & follow-up</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {outboundFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Call outcomes */}
      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-16 max-w-3xl">
              What Happens After the AI Picks Up
            </h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {callOutcomes.map((o, i) => (
              <SectionReveal key={o.label} delay={i * 0.08}>
                <div className="card-premium h-full text-center">
                  <h3 className={`font-display font-semibold text-lg mb-2 ${o.color}`}>{o.label}</h3>
                  <p className="text-sm text-muted-foreground">{o.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Use Cases by Industry</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-16 max-w-3xl">
              Built for Businesses That Can't Afford to Miss a Call
            </h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <SectionReveal key={ind.name} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <ind.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display font-semibold text-base mb-2">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground">{ind.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 surface-elevated">
        <div className="max-w-3xl mx-auto section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">Frequently Asked Questions</h2>
          </SectionReveal>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="card-premium">
                  <h3 className="font-display font-semibold text-base mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ready to Never Miss a Lead Again?" subtext="Let's build an AI calling agent tailored to your business, your scripts, and your workflows." />
      <Footer />
    </div>
  );
};

export default AICallingAgents;
