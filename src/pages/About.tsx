import { motion } from "framer-motion";
import { ArrowRight, Bot, CalendarCheck, Layers, PhoneCall, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";

const systems = [
  {
    icon: PhoneCall,
    title: "Response systems",
    body: "AI calling and chat flows that answer quickly, qualify intent, and move serious leads into the next step.",
  },
  {
    icon: CalendarCheck,
    title: "Conversion systems",
    body: "Premium landing pages and booking paths designed around speed, trust, and clear decision moments.",
  },
  {
    icon: Workflow,
    title: "Operations systems",
    body: "Automations that connect follow-up, reminders, routing, and admin work so the team is not carrying every task manually.",
  },
];

const principles = [
  "Revenue before decoration",
  "Fast response as a default",
  "Clean systems over scattered tools",
  "Premium details without slow pages",
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#07101f]">
      <Navbar />

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-28 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_8%,rgba(20,71,212,0.16),transparent_38%),linear-gradient(rgba(16,24,49,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(16,24,49,0.045)_1px,transparent_1px)] bg-[size:auto,72px_72px,72px_72px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.94fr_1.06fr] md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d7e1ef] bg-white/70 px-4 py-2 shadow-[0_16px_45px_rgba(20,32,50,0.08)] backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-[#1447d4]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#1447d4]">About STERK</span>
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[3.5rem] font-bold leading-[0.88] tracking-normal text-[#07101f] sm:text-[4.6rem] md:text-[5.8rem] lg:text-[6.8rem]">
              Built for businesses that cannot afford slow follow-up.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#314052]/82 md:text-xl">
              STERK.systems builds the layer between demand and revenue: AI agents, websites, and automations that capture leads, book appointments, and keep work moving after the first click or call.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/book-a-call" className="premium-btn inline-flex items-center justify-center gap-3 px-7 py-4 text-xs">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-[#d7e1ef] bg-white/70 px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#101831] shadow-[0_14px_38px_rgba(20,32,50,0.08)] transition-all duration-300 hover:bg-white"
              >
                View Landing Page
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[430px] md:min-h-[560px]"
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute left-0 top-8 w-[62%] overflow-hidden rounded-[2rem] border border-white/76 bg-white/62 p-2 shadow-[0_34px_90px_rgba(20,32,50,0.16)] backdrop-blur-2xl">
              <img src="/calls-captured-card.jpg" alt="AI calling system" className="aspect-[1.22] w-full rounded-[1.45rem] object-cover" loading="eager" decoding="async" />
            </div>
            <div className="absolute right-0 top-0 w-[55%] overflow-hidden rounded-[2rem] border border-white/76 bg-white/62 p-2 shadow-[0_34px_90px_rgba(20,32,50,0.14)] backdrop-blur-2xl">
              <img src="/bookings-lifted-card.jpg" alt="Lead booking automation" className="aspect-[1.18] w-full rounded-[1.45rem] object-cover" loading="eager" decoding="async" />
            </div>
            <div className="absolute bottom-0 right-8 w-[68%] overflow-hidden rounded-[2rem] border border-white/76 bg-white/62 p-2 shadow-[0_34px_90px_rgba(20,32,50,0.15)] backdrop-blur-2xl">
              <img src="/clinic-website-card.jpg" alt="Conversion website preview" className="aspect-[1.42] w-full rounded-[1.45rem] object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="absolute bottom-16 left-2 rounded-[1.5rem] border border-white/78 bg-white/72 px-5 py-4 shadow-[0_24px_70px_rgba(20,32,50,0.13)] backdrop-blur-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1447d4]">Always On</p>
              <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em]">Capture. Route. Book.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-14 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#1447d4]">What we build</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.055em] md:text-6xl">
                One connected system, not a stack of disconnected tools.
              </h2>
            </div>
          </SectionReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {systems.map(({ icon: Icon, title, body }, index) => (
              <SectionReveal key={title} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="h-full rounded-[1.75rem] border border-[#d9e2ef] bg-white/68 p-6 shadow-[0_22px_70px_rgba(20,32,50,0.08)] backdrop-blur-xl md:p-8"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eef4ff] text-[#1447d4]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#314052]/76 md:text-base">{body}</p>
                </motion.article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-16 md:py-24">
        <div className="absolute inset-0 bg-[#101831]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_24%,rgba(80,129,255,0.28),transparent_42%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 text-white md:grid-cols-[0.88fr_1.12fr] md:items-center">
          <SectionReveal>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/48">Operating standard</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-[-0.055em] md:text-6xl">
                Designed to feel premium and work under pressure.
              </h2>
            </div>
          </SectionReveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <SectionReveal key={principle} delay={index * 0.06}>
                <div className="flex min-h-28 items-center gap-4 rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-[#1447d4]">
                    {index % 2 === 0 ? <ShieldCheck className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
                  </span>
                  <p className="font-semibold leading-snug text-white/88">{principle}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-[#d9e2ef] bg-white/66 p-6 shadow-[0_30px_90px_rgba(20,32,50,0.10)] backdrop-blur-2xl md:grid-cols-[0.9fr_1.1fr] md:p-9">
          <SectionReveal>
            <div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#1447d4]">
                <Bot className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-[-0.055em] md:text-5xl">
                The goal is simple: fewer missed opportunities.
              </h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.12}>
            <div className="space-y-5 text-base leading-relaxed text-[#314052]/78 md:text-lg">
              <p>
                Most businesses do not need more dashboards. They need the important moments to happen faster: answer the lead, qualify the request, book the call, route the task, and follow up without delay.
              </p>
              <p>
                That is the work STERK.systems focuses on. We build the customer-facing experience and the operational layer behind it so the business feels sharper from the outside and lighter from the inside.
              </p>
              <Link to="/book-a-call" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-[#1447d4]">
                Talk to STERK
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
