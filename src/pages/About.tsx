import { Shield, Layers, TrendingUp, Zap, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const values = [
  { icon: Eye, title: "Strategic Thinking", desc: "We start with your business model, revenue levers, and customer journey — not a template." },
  { icon: Shield, title: "Premium Quality", desc: "Every pixel, every interaction, every workflow is held to the highest standard. Our clients charge premium prices — their systems should reflect that." },
  { icon: TrendingUp, title: "Growth Obsessed", desc: "We measure success in leads captured, appointments booked, and hours saved — not just deliverables shipped." },
  { icon: Layers, title: "Full-Stack Execution", desc: "From AI voice agents to backend infrastructure, we handle every layer of your system." },
  { icon: Zap, title: "Fast, Not Rushed", desc: "We move quickly because we know what works. Not because we cut corners." },
  { icon: Users, title: "Partnership Model", desc: "We're not a vendor. We're the team behind your digital infrastructure, invested in your outcomes." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">About</p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl">
              We Build Revenue Systems,{" "}
              <span className="gradient-text">Not Just Websites.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              NexusAI exists because we saw too many businesses paying for disconnected tools, generic websites, and automation that doesn't actually automate anything. We decided to fix that.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-16">
            <SectionReveal>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                The Problem We Solve
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Most businesses operate with a patchwork of tools — a website here, a booking tool there, manual follow-up everywhere. Leads fall through the cracks. Calls go unanswered. Admin work piles up.
                </p>
                <p>
                  We build integrated systems where every piece works together. Your AI agent answers calls and books appointments. Your chatbot qualifies leads and routes them. Your website converts visitors. Your backend connects it all.
                </p>
                <p>
                  The result: fewer missed opportunities, less manual work, and a business that runs smoother every week.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                Who We Work With
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We partner with premium businesses that take their operations seriously — clinics, agencies, real estate firms, hospitality brands, service companies, and fast-growing SMEs.
                </p>
                <p>
                  Our clients are leaders who understand that every missed call is a missed sale, every slow response is a lost customer, and every manual process is time they'll never get back.
                </p>
                <p>
                  If you're serious about growth and ready to invest in systems that work, we're the right team.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="py-32 surface-elevated">
        <div className="max-w-7xl mx-auto section-padding">
          <SectionReveal>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-16 max-w-3xl">
              What We Stand For
            </h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.08}>
                <div className="card-premium h-full">
                  <v.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display font-semibold text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
