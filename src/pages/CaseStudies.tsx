import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, CalendarCheck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const caseStudies = [
  {
    tag: "Hospitality",
    title: "Arcadia Café Group",
    challenge: "Losing 40% of phone inquiries outside hours. No online booking.",
    solution: "AI calling agent + booking website + automated workflows.",
    systemBuilt: ["AI Calling Agent", "Booking Website", "Reminders", "CRM"],
    results: [
      { icon: TrendingUp, val: "3x", label: "More bookings" },
      { icon: Clock, val: "95%", label: "Call answer rate" },
      { icon: CalendarCheck, val: "60%", label: "Less admin time" },
      { icon: Users, val: "42%", label: "More repeat customers" },
    ],
  },
  {
    tag: "Healthcare",
    title: "Solara Medical Network",
    challenge: "5 clinics overwhelmed by phone volume. 4+ hour callback time.",
    solution: "AI inbound agent + chatbot triage + appointment automation.",
    systemBuilt: ["Inbound AI Agent", "Patient Chatbot", "Scheduling", "No-Show Recovery"],
    results: [
      { icon: Clock, val: "30s", label: "Response time" },
      { icon: CalendarCheck, val: "40%", label: "Fewer no-shows" },
      { icon: TrendingUp, val: "$180K", label: "Revenue recovered" },
      { icon: Users, val: "35%", label: "Higher satisfaction" },
    ],
  },
  {
    tag: "Real Estate",
    title: "Atlas Property Group",
    challenge: "Inconsistent follow-up. 60% of time on unqualified leads.",
    solution: "Outbound AI agent + qualification chatbot + CRM automation.",
    systemBuilt: ["Outbound AI", "Lead Chatbot", "CRM Automation", "Pipeline Dashboard"],
    results: [
      { icon: TrendingUp, val: "2x", label: "Qualified leads" },
      { icon: Clock, val: "50%", label: "Faster follow-up" },
      { icon: Users, val: "35%", label: "Higher conversion" },
      { icon: CalendarCheck, val: "12", label: "Agents unified" },
    ],
  },
  {
    tag: "Professional Services",
    title: "Vertex Consulting",
    challenge: "Outdated website. No booking system. Manual onboarding.",
    solution: "Premium redesign + booking + client portal + automation.",
    systemBuilt: ["Conversion Website", "Booking System", "Client Portal", "Onboarding"],
    results: [
      { icon: TrendingUp, val: "180%", label: "More inquiries" },
      { icon: Clock, val: "15min", label: "Booking time" },
      { icon: CalendarCheck, val: "70%", label: "Faster onboarding" },
      { icon: Users, val: "↑", label: "Credibility enhanced" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <SectionReveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3">Case Studies</p>
            <h1 className="font-display font-bold text-2xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 md:mb-6 max-w-4xl">
              Real Systems.{" "}
              <span className="gradient-text">Measurable Impact.</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              See how we've helped businesses capture more leads, automate operations, and drive real growth.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-10 md:py-20">
        <div className="max-w-5xl mx-auto px-5 md:section-padding space-y-6 md:space-y-16">
          {caseStudies.map((cs, i) => (
            <SectionReveal key={cs.title} delay={i * 0.08}>
              <div className="card-premium p-5 md:p-10">
                <span className="text-[9px] md:text-xs font-medium text-primary bg-primary/10 px-2 md:px-3 py-0.5 md:py-1 rounded-full">{cs.tag}</span>
                <h2 className="font-display font-bold text-lg md:text-3xl mt-3 md:mt-4 mb-4 md:mb-6">{cs.title}</h2>

                {/* Results — big visual metrics */}
                <div className="grid grid-cols-4 gap-2 md:gap-4 mb-5 md:mb-8">
                  {cs.results.map((r, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.08 }}
                      className="text-center p-2 md:p-4 rounded-lg md:rounded-xl border border-border"
                      style={{ background: "hsl(var(--background) / 0.5)" }}
                    >
                      <r.icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary mx-auto mb-1" />
                      <p className="font-display font-bold text-lg md:text-2xl gradient-text">{r.val}</p>
                      <p className="text-[8px] md:text-xs text-muted-foreground">{r.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-5 md:mb-8">
                  <div>
                    <p className="text-[9px] md:text-xs uppercase tracking-wider text-muted-foreground mb-1 md:mb-2">Challenge</p>
                    <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-xs uppercase tracking-wider text-muted-foreground mb-1 md:mb-2">Solution</p>
                    <p className="text-[10px] md:text-sm text-foreground leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] md:text-xs uppercase tracking-wider text-muted-foreground mb-2">System Built</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {cs.systemBuilt.map((s) => (
                      <span key={s} className="text-[9px] md:text-xs bg-secondary text-muted-foreground px-2 md:px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <CTASection headline="Want Results Like These?" subtext="Every business is different. Let's design the right system for yours." />
      <Footer />
    </div>
  );
};

export default CaseStudies;
