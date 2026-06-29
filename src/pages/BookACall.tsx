import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle2, Clock3, Phone, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";

const projectTypes = [
  "AI calling agent",
  "Chatbot or lead capture",
  "Booking and reminders",
  "Website or landing page",
  "Operations automation",
  "Full revenue system",
  "Not sure yet",
];

const budgetRanges = ["AED 7K - 18K", "AED 18K - 40K", "AED 40K - 90K", "AED 90K+", "Need guidance"];

const callOutcomes = [
  { icon: CalendarCheck, title: "A clear build path", sub: "What should be automated first, and why." },
  { icon: Sparkles, title: "Specific system ideas", sub: "AI, website, CRM, and follow-up opportunities." },
  { icon: ShieldCheck, title: "No-pressure decision", sub: "You leave with clarity even if we do not work together." },
];

const BookACall = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldClass =
    "w-full rounded-xl border border-[#d9e3f2] bg-white px-4 py-3 text-sm text-[#101831] outline-none transition-all placeholder:text-[#65718a]/54 focus:border-[#1447d4]/40 focus:ring-4 focus:ring-[#1447d4]/10";

  return (
    <div className="min-h-screen bg-[#f7faff] text-[#101831]">
      <Navbar />

      <main className="relative overflow-hidden pt-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(210,226,255,0.72),transparent_42%),radial-gradient(ellipse_at_12%_88%,rgba(255,255,255,0.98),transparent_48%),linear-gradient(135deg,#ffffff_0%,#f8fbff_46%,#eef5ff_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(93,119,174,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(93,119,174,0.045) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage: "linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        />

        <section className="relative z-10 pb-16 md:pb-24">
          <div className="mx-auto grid max-w-[1380px] gap-8 px-5 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-16 xl:gap-16">
            <SectionReveal>
              <div className="lg:sticky lg:top-28">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#4358ff] md:text-xs">
                  Strategy Call
                </p>
                <h1 className="font-display text-[3rem] font-extrabold leading-[0.94] tracking-[-0.06em] text-[#101831] md:text-[4.8rem] lg:text-[5.7rem]">
                  Let us map the system your business should build next.
                </h1>
                <p className="mt-6 max-w-[42rem] text-base font-medium leading-relaxed text-[#41517d] md:text-xl">
                  Tell us where leads, calls, bookings, or manual admin slow you down. We will respond with a practical direction for the first system to build.
                </p>

                <div className="mt-8 grid gap-3 md:mt-10">
                  {callOutcomes.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-white/68 bg-white/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1447d4]/9 text-[#1447d4]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#101831] md:text-base">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#65718a] md:text-sm">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#101831]/52">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/68 bg-white/70 px-4 py-2">
                    <Clock3 className="h-3.5 w-3.5 text-[#1447d4]" />
                    30 minutes
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/68 bg-white/70 px-4 py-2">
                    <Phone className="h-3.5 w-3.5 text-[#1447d4]" />
                    UAE and GCC businesses
                  </span>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-5 shadow-[0_28px_90px_rgba(20,32,50,0.12),inset_0_1px_0_rgba(255,255,255,0.96)] md:p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#1447d4]/32 to-transparent" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[34rem] flex-col items-center justify-center text-center"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1447d4]/10 text-[#1447d4]">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h2 className="font-display text-3xl font-bold tracking-[-0.035em] md:text-4xl">We received your brief.</h2>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#65718a] md:text-base">
                      We will review the details and come back with the clearest next step for your business.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#4358ff]">Call Brief</p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.035em] text-[#101831] md:text-3xl">
                        Give us the useful context.
                      </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#41517d]">Full name *</span>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={fieldClass}
                          placeholder="Your name"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#41517d]">Work email *</span>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={fieldClass}
                          placeholder="you@company.com"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#41517d]">Company</span>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={fieldClass}
                          placeholder="Business name"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#41517d]">Phone or WhatsApp</span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={fieldClass}
                          placeholder="+971 ..."
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#41517d]">What do you need? *</span>
                        <select
                          required
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className={fieldClass}
                        >
                          <option value="">Select one</option>
                          {projectTypes.map((pt) => (
                            <option key={pt} value={pt}>
                              {pt}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold text-[#41517d]">Likely budget</span>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className={fieldClass}
                        >
                          <option value="">Select a range</option>
                          {budgetRanges.map((br) => (
                            <option key={br} value={br}>
                              {br}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold text-[#41517d]">What is the problem worth solving?</span>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${fieldClass} resize-none`}
                        placeholder="Tell us what is leaking revenue, slowing the team, or making customers wait."
                      />
                    </label>

                    <button
                      type="submit"
                      className="premium-btn inline-flex w-full items-center justify-center gap-3 rounded-full py-4 text-xs md:py-5"
                    >
                      Send the brief
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <p className="text-center text-[11px] leading-relaxed text-[#65718a]">
                      We usually respond within one business day with practical next steps.
                    </p>
                  </form>
                )}
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookACall;
