import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const caseStudies = [
  {
    tag: "Hospitality",
    title: "Arcadia Café Group",
    challenge: "A premium café chain was losing 40% of phone inquiries outside business hours. No online booking. Manual reservation management consuming 15+ staff hours per week.",
    solution: "We deployed an AI inbound calling agent, built a booking-enabled website, and automated their reservation and follow-up workflows.",
    systemBuilt: ["AI Calling Agent", "Booking Website", "Automated Reminders", "CRM Integration"],
    results: ["3x increase in online bookings", "95% call answer rate (up from 55%)", "60% reduction in admin time", "42% more repeat customers"],
  },
  {
    tag: "Healthcare",
    title: "Solara Medical Network",
    challenge: "5 clinic locations overwhelmed by phone volume. Average callback time was 4+ hours. Missed appointments costing $200K+ annually.",
    solution: "Inbound AI calling agent for patient intake, chatbot for triage and scheduling, automated appointment reminders and no-show follow-up.",
    systemBuilt: ["Inbound AI Agent", "Patient Chatbot", "Scheduling Automation", "No-Show Recovery System"],
    results: ["Response time under 30 seconds", "40% fewer missed appointments", "$180K recovered in annual revenue", "Patient satisfaction up 35%"],
  },
  {
    tag: "Real Estate",
    title: "Atlas Property Group",
    challenge: "Inconsistent lead follow-up. Sales team spending 60% of time on unqualified leads. No unified pipeline across agents.",
    solution: "Outbound AI agent for lead follow-up, qualification chatbot on listings, CRM automation connecting all touchpoints.",
    systemBuilt: ["Outbound AI Agent", "Lead Qualification Chatbot", "CRM Automation", "Unified Pipeline Dashboard"],
    results: ["2x qualified leads per month", "50% faster initial follow-up", "35% higher conversion rate", "Unified pipeline across 12 agents"],
  },
  {
    tag: "Professional Services",
    title: "Vertex Consulting",
    challenge: "Outdated website failing to convert traffic. No booking system. Client onboarding was entirely manual — emails, PDFs, phone calls.",
    solution: "Premium website redesign with integrated booking, client portal for onboarding, and automated workflow from inquiry to first meeting.",
    systemBuilt: ["Conversion Website", "Booking System", "Client Portal", "Onboarding Automation"],
    results: ["180% increase in website inquiries", "Average booking time reduced from 3 days to 15 minutes", "Client onboarding time cut by 70%", "Professional credibility significantly enhanced"],
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Case Studies</p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl">
              Real Systems.{" "}
              <span className="gradient-text">Measurable Impact.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              See how we've helped businesses capture more leads, automate operations, and build premium digital experiences that drive real growth.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto section-padding space-y-16">
          {caseStudies.map((cs, i) => (
            <SectionReveal key={cs.title} delay={i * 0.1}>
              <div className="card-premium p-10">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{cs.tag}</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl mt-4 mb-6">{cs.title}</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Challenge</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Solution</p>
                    <p className="text-sm text-foreground leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">System Built</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.systemBuilt.map((s) => (
                      <span key={s} className="text-xs bg-secondary text-muted-foreground px-3 py-1.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Results</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {cs.results.map((r) => (
                      <div key={r} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span className="font-medium text-primary">{r}</span>
                      </div>
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
