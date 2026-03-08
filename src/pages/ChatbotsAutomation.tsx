import { Link } from "react-router-dom";
import { Bot, MessageSquare, CalendarCheck, CheckCircle2, ArrowRight, Workflow, Bell, Database, Zap, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const chatbotCapabilities = [
  "Instant website replies — no wait time",
  "Smart lead qualification through conversation",
  "FAQ handling for common customer questions",
  "Customer support for orders, accounts, and services",
  "Integrated appointment booking flow",
  "Seamless handoff to human agents when needed",
  "Works on website, WhatsApp, and web chat",
  "Multi-language support available",
];

const automationFeatures = [
  { icon: Workflow, title: "Workflow Automation", desc: "Trigger actions based on form submissions, bookings, purchases, or chatbot conversations." },
  { icon: Bell, title: "Smart Notifications", desc: "Alert your team via email, SMS, or Slack the moment a lead qualifies or a booking is made." },
  { icon: Database, title: "CRM Integration", desc: "Push lead data, call outcomes, and booking details directly into your existing CRM." },
  { icon: CalendarCheck, title: "Scheduling Flows", desc: "Automated booking, rescheduling, and reminder sequences that reduce no-shows." },
  { icon: Users, title: "Lead Routing", desc: "Assign leads to the right team member based on location, service type, or availability." },
  { icon: Zap, title: "Process Optimization", desc: "Identify bottlenecks and automate repetitive tasks that eat into your team's time." },
];

const ChatbotsAutomation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Chatbots & Automation</p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl">
              Conversations That Convert.{" "}
              <span className="gradient-text">Workflows That Scale.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Deploy intelligent chatbots that qualify leads and support customers around the clock — backed by automation that keeps your business running without manual effort.
            </p>
            <Link to="/book-a-call" className="premium-btn">Book a Strategy Call</Link>
          </SectionReveal>
        </div>
      </section>

      {/* Chatbot */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Chatbot</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                Your 24/7 Digital Front Desk
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Every visitor gets an instant, intelligent response. Your chatbot qualifies leads, answers questions, captures information, and books appointments — all before a human lifts a finger.
              </p>
              <ul className="space-y-3">
                {chatbotCapabilities.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="card-premium p-6">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <Bot className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Support Assistant</span>
                  <span className="ml-auto text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Online</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 max-w-[280px]">
                      <p className="text-sm text-muted-foreground">Welcome! How can I help you today? I can answer questions, schedule appointments, or connect you with our team.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary/10 rounded-2xl rounded-br-md px-4 py-3 max-w-[280px]">
                      <p className="text-sm">I need help setting up automation for my clinic.</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 max-w-[280px]">
                      <p className="text-sm text-muted-foreground">Great — we've helped several clinics automate patient intake, appointment scheduling, and follow-ups. Would you like to book a free strategy call with our team?</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full cursor-pointer hover:bg-primary/20 transition-colors">Yes, book a call</span>
                    <span className="text-xs bg-secondary text-muted-foreground px-3 py-1.5 rounded-full cursor-pointer hover:bg-secondary/80 transition-colors">Tell me more</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Automation */}
      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Automation</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-6 max-w-3xl">
              The System Behind the Scenes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-16">
              Chatbots and AI agents are just the front line. Behind them, we build the workflows that route leads, trigger actions, and keep everything connected.
            </p>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationFeatures.map((f, i) => (
              <SectionReveal key={f.title} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <f.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display font-semibold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ready to Automate Your Customer Journey?" subtext="From first website visit to booked appointment — every step handled, qualified, and tracked." />
      <Footer />
    </div>
  );
};

export default ChatbotsAutomation;
