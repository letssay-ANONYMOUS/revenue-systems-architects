import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone, Bot, CalendarCheck, Globe, ArrowRight, CheckCircle2,
  PhoneIncoming, Zap, Target, BarChart3, MessageSquare,
  Clock, Users, TrendingUp, Play, Shield, Headphones
} from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/sections/SectionWrapper";
import SectionHeading from "@/components/sections/SectionHeading";
import MetricStrip from "@/components/sections/MetricStrip";
import ProcessStep from "@/components/sections/ProcessStep";
import TestimonialCard from "@/components/sections/TestimonialCard";
import FAQSection from "@/components/sections/FAQSection";
import CTABlock from "@/components/sections/CTABlock";
import SectionReveal from "@/components/SectionReveal";
import Marquee from "@/components/Marquee";
import CountUp from "@/components/CountUp";

/* ─── DATA ─── */

const proofMetrics = [
  { value: 97, suffix: "%", label: "Calls answered" },
  { value: 3, suffix: "x", label: "More bookings" },
  { value: 60, suffix: "%", label: "Less admin work" },
  { value: 40, suffix: "+", label: "Businesses automated" },
];

const services = [
  {
    icon: PhoneIncoming,
    title: "Never Miss a Call",
    desc: "AI voice agents answer, qualify, and book — around the clock. No more lost leads after hours.",
    tag: "AI Calling",
  },
  {
    icon: Bot,
    title: "Instant Customer Support",
    desc: "Chatbots that resolve 80% of questions without staff. Customers get help in seconds, not hours.",
    tag: "Chatbots",
  },
  {
    icon: Target,
    title: "Capture Every Lead",
    desc: "Automated qualification and booking pipelines that turn website visitors into paying clients.",
    tag: "Lead Systems",
  },
  {
    icon: Globe,
    title: "A Website That Converts",
    desc: "Premium sites engineered for trust and conversion — not just aesthetics.",
    tag: "Web & Apps",
  },
];

const caseStudies = [
  {
    tag: "Healthcare",
    client: "Multi-Location Clinic",
    metric: "3.2x",
    metricLabel: "more booked appointments",
    quote: "We went from missing 40% of after-hours calls to capturing every single one.",
  },
  {
    tag: "Hospitality",
    client: "Premium Restaurant Group",
    metric: "95%",
    metricLabel: "call answer rate",
    quote: "Our team stopped spending hours on the phone. The AI handles it better than we did.",
  },
  {
    tag: "Real Estate",
    client: "Regional Brokerage",
    metric: "2x",
    metricLabel: "qualified leads per month",
    quote: "Follow-ups used to fall through the cracks. Now every lead gets a response in under 30 seconds.",
  },
];

const processSteps = [
  { number: "01", title: "Strategy Call", desc: "We audit your operations and identify the highest-impact automation opportunities." },
  { number: "02", title: "System Design", desc: "We architect the AI agents, workflows, and integrations tailored to your business." },
  { number: "03", title: "Build & Integrate", desc: "We develop, test, and deploy your systems — integrated with your existing tools." },
  { number: "04", title: "Optimize & Scale", desc: "We monitor performance, refine scripts, and expand as your business grows." },
];

const testimonials = [
  { quote: "We replaced three part-time staff with one AI system. It pays for itself every week.", name: "Sarah M.", role: "Clinic Owner" },
  { quote: "The website they built us generates more leads than our entire previous marketing stack.", name: "James K.", role: "Agency Director" },
  { quote: "Our response time went from 4 hours to 12 seconds. Customers notice.", name: "Priya D.", role: "Operations Manager" },
];

const faqItems = [
  { q: "How long does it take to set up an AI calling agent?", a: "Most businesses are live within 2–3 weeks. We handle everything from voice design to integration with your booking system, CRM, or calendar." },
  { q: "Will the AI sound robotic or scripted?", a: "No. Our voice agents use natural language models that adapt to each caller. They sound professional, warm, and context-aware — not like a phone tree." },
  { q: "What happens if the AI can't handle a call?", a: "It gracefully escalates to your team via SMS, email, or live transfer. You set the rules — the AI follows them." },
  { q: "Do I need to change my existing systems?", a: "No. We integrate with your current CRM, calendar, and phone system. No rip-and-replace." },
  { q: "What does pricing look like?", a: "We offer project-based pricing for builds and monthly retainers for managed AI systems. Book a strategy call for a custom quote based on your needs." },
  { q: "Can I try before I commit?", a: "Yes. We offer a free strategy call where we audit your current operations and show you exactly where AI can save you time and revenue — with projected ROI." },
];

const trustLogos = ["Meridian Group", "Vertex Capital", "Solara Health", "Atlas RE", "Prism Digital", "Arcadia Cafés", "Nova Systems", "Apex Ventures"];

const pricingTiers = [
  {
    name: "Starter",
    desc: "One AI system to solve your biggest bottleneck",
    price: "From $2,500",
    features: ["1 AI calling agent or chatbot", "CRM & calendar integration", "Custom voice/script design", "30-day optimization"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    desc: "A connected automation stack for serious businesses",
    price: "From $5,000",
    features: ["AI calling + chatbot + booking", "Lead qualification workflows", "Premium website or landing page", "60-day managed optimization", "Priority support"],
    cta: "Book a Call",
    highlighted: true,
  },
  {
    name: "Enterprise",
    desc: "Full-stack AI infrastructure built around your operations",
    price: "Custom",
    features: ["Multi-agent AI system", "Custom web app or dashboard", "API integrations & backend", "Ongoing managed service", "Dedicated account manager"],
    cta: "Talk to Us",
    highlighted: false,
  },
];

/* ─── PAGE ─── */

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════
          1. HERO
          Job: Stop the scroll. Communicate value in <5s.
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] md:min-h-screen flex items-center pt-20 md:pt-0"
      >
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full blur-[150px] opacity-20" style={{ background: "hsl(var(--primary) / 0.2)" }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-6xl mx-auto section-padding w-full relative z-10"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 font-medium tracking-wide"
            >
              AI systems for service businesses
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display font-bold text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-5 md:mb-7"
            >
              Your business is losing revenue every hour
              <br className="hidden md:block" />
              {" "}
              <span className="gradient-text">it's not automated.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 md:mb-10 leading-relaxed"
            >
              We build AI systems that answer every call, capture every lead, and book every appointment — so you don't have to.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/book-a-call"
                className="premium-btn text-center group"
                data-analytics="hero-cta-primary"
              >
                <span className="flex items-center justify-center gap-2">
                  Book a Strategy Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <a
                href="#results"
                className="btn-outline-premium text-center"
                data-analytics="hero-cta-secondary"
              >
                See Results
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          2. PROOF / TRUST STRIP
          Job: Establish credibility through numbers + logos.
      ═══════════════════════════════════════════ */}
      <section className="section-y-sm border-y border-border">
        <div className="max-w-6xl mx-auto section-padding">
          <MetricStrip metrics={proofMetrics} />
        </div>
      </section>

      <section className="py-6 md:py-10 overflow-hidden">
        <p className="text-center text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 md:mb-6 font-medium">
          Trusted by forward-thinking businesses
        </p>
        <Marquee speed={30} className="opacity-25">
          {trustLogos.map((name) => (
            <span key={name} className="font-display font-semibold text-lg md:text-xl text-foreground px-6 md:px-8">{name}</span>
          ))}
        </Marquee>
      </section>

      {/* ═══════════════════════════════════════════
          3. OUTCOME-LED SERVICES GRID
          Job: Show what you solve — framed as outcomes.
      ═══════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionHeading
          overline="What We Build"
          title="Systems that run your business,"
          titleAccent="not just impress visitors."
          subtitle="Every service connects. Your AI agent books appointments. Your chatbot captures leads. Your website converts. Your backend keeps it all running."
        />

        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {services.map((svc, i) => (
            <SectionReveal key={svc.title} delay={i * 0.08}>
              <div className="card-premium p-6 md:p-8 h-full group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0">
                    <svc.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display font-semibold text-base md:text-lg">{svc.title}</h3>
                      <span className="text-[10px] font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full hidden md:inline">{svc.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          4. CASE STUDIES PREVIEW
          Job: Prove it works with specific, measurable results.
      ═══════════════════════════════════════════ */}
      <SectionWrapper elevated id="results">
        <SectionHeading
          overline="Results"
          title="Real systems."
          titleAccent="Measurable impact."
        />

        <div className="space-y-4 md:space-y-6">
          {caseStudies.map((cs, i) => (
            <SectionReveal key={cs.client} delay={i * 0.1}>
              <div className="card-premium p-6 md:p-10 grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-center">
                <div className="text-center md:text-left">
                  <span className="text-[10px] md:text-xs font-medium text-primary bg-primary/8 px-2.5 py-1 rounded-full">{cs.tag}</span>
                  <p className="font-display font-bold text-4xl md:text-5xl gradient-text mt-3">{cs.metric}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{cs.metricLabel}</p>
                </div>
                <div>
                  <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-3 md:mb-4">
                    "{cs.quote}"
                  </blockquote>
                  <p className="text-sm text-muted-foreground">— {cs.client}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
              data-analytics="case-studies-link"
            >
              View all case studies
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionReveal>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          5. PROCESS
          Job: Reduce perceived complexity and risk.
      ═══════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionHeading
          overline="How It Works"
          title="Strategy to system"
          titleAccent="in weeks, not months."
          subtitle="A clear, repeatable process designed around your business goals — not ours."
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-10">
          {processSteps.map((s, i) => (
            <ProcessStep
              key={s.number}
              number={s.number}
              title={s.title}
              description={s.desc}
              index={i}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          6. AI DEMO / INTERACTIVE PREVIEW
          Job: Make the product tangible. Show, don't tell.
      ═══════════════════════════════════════════ */}
      <SectionWrapper elevated>
        <SectionHeading
          overline="See It In Action"
          title="Your AI agent, handling a real call"
          align="center"
        />

        <SectionReveal>
          <div className="max-w-2xl mx-auto">
            <div className="card-premium p-5 md:p-8 overflow-hidden">
              {/* Call header */}
              <div className="flex items-center justify-between mb-5 md:mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-display">Inbound Call</p>
                    <p className="text-xs text-muted-foreground">AI Agent Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>

              {/* Conversation */}
              <div className="space-y-3">
                {[
                  { from: "ai", text: "Good morning, thanks for calling. How can I help you today?" },
                  { from: "caller", text: "Hi, I'd like to book an appointment for next week." },
                  { from: "ai", text: "Of course. I have Tuesday at 10 AM or Thursday at 2 PM available. Which works better for you?" },
                  { from: "caller", text: "Tuesday works." },
                  { from: "ai", text: "Perfect — you're booked for Tuesday at 10 AM. I'll send a confirmation to your phone now. Anything else I can help with?" },
                ].map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className={`flex ${msg.from === "caller" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-xl px-4 py-2.5 ${
                      msg.from === "caller"
                        ? "bg-secondary rounded-br-md"
                        : "bg-primary/8 rounded-bl-md"
                    }`}>
                      <p className="text-xs md:text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="mt-5 pt-4 border-t border-border flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs md:text-sm font-medium">Appointment booked · Confirmation sent</span>
                </div>
                <span className="text-xs text-muted-foreground">Duration: 42s</span>
              </motion.div>
            </div>
          </div>
        </SectionReveal>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          7. OFFER / PRICING
          Job: Make the next step tangible. Remove uncertainty.
      ═══════════════════════════════════════════ */}
      <SectionWrapper>
        <SectionHeading
          overline="Pricing"
          title="Transparent pricing,"
          titleAccent="no surprises."
          subtitle="Choose a starting point. Every engagement begins with a free strategy call."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {pricingTiers.map((tier, i) => (
            <SectionReveal key={tier.name} delay={i * 0.1}>
              <div
                className={`card-premium p-6 md:p-8 h-full flex flex-col ${
                  tier.highlighted ? "border-primary/30 relative" : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
                <div className="mb-5">
                  <h3 className="font-display font-semibold text-lg mb-1">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground">{tier.desc}</p>
                </div>
                <p className="font-display font-bold text-2xl md:text-3xl mb-5">{tier.price}</p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-a-call"
                  className={tier.highlighted ? "premium-btn text-center" : "btn-outline-premium text-center"}
                  data-analytics={`pricing-${tier.name.toLowerCase()}`}
                >
                  {tier.cta}
                </Link>
              </div>
            </SectionReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          8. TESTIMONIALS
          Job: Social proof from real people.
      ═══════════════════════════════════════════ */}
      <SectionWrapper elevated>
        <SectionHeading
          overline="Testimonials"
          title="What our clients say"
          align="center"
        />
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              role={t.role}
              index={i}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          9. FAQ
          Job: Remove objections. Answer before they ask.
      ═══════════════════════════════════════════ */}
      <FAQSection items={faqItems} />

      {/* ═══════════════════════════════════════════
          10. LEAD MAGNET / AUDIT CTA
          Job: Capture leads not ready to book yet.
      ═══════════════════════════════════════════ */}
      <SectionWrapper elevated>
        <SectionReveal>
          <div className="card-premium p-8 md:p-12 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <p className="text-xs font-medium text-primary mb-3 uppercase tracking-[0.15em]">Free Resource</p>
              <h3 className="font-display font-bold text-xl md:text-3xl leading-tight mb-3">
                Get a free AI readiness audit for your business
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We'll analyze your current operations and show you exactly where AI can save you time, reduce costs, and increase revenue — with projected ROI.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/book-a-call"
                className="premium-btn text-center group"
                data-analytics="lead-magnet-cta"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Your Free Audit
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <p className="text-xs text-muted-foreground text-center">No commitment. 15-minute call.</p>
            </div>
          </div>
        </SectionReveal>
      </SectionWrapper>

      {/* ═══════════════════════════════════════════
          11. FINAL CTA
          Job: Close. One clear action.
      ═══════════════════════════════════════════ */}
      <CTABlock
        headline="Ready to stop losing leads?"
        subtitle="Book a free strategy call. We'll show you exactly where AI can save you time and make you money."
        secondaryLabel="See Our Work"
        secondaryHref="/case-studies"
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Index;
