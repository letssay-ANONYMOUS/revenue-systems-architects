import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, CalendarCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";

const projectTypes = [
  "AI Calling Agent",
  "Chatbot",
  "Lead Automation",
  "Scheduling",
  "Website",
  "App",
  "Full System",
  "Not sure yet",
];

const budgetRanges = ["$2K – $5K", "$5K – $10K", "$10K – $25K", "$25K+", "Let's discuss"];

const BookACall = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "", projectType: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 md:pt-32 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-5 md:section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <SectionReveal>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3">Book a Call</p>
              <h1 className="font-display font-bold text-2xl md:text-5xl lg:text-6xl leading-[1.1] mb-4 md:mb-6">
                Let's Build Your{" "}
                <span className="sterk-chrome-text">Revenue System</span>
              </h1>
              <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-10 leading-relaxed">
                Tell us about your business. We'll come prepared with ideas, not a pitch.
              </p>

              {/* Trust points — visual cards on mobile */}
              <div className="grid grid-cols-1 gap-3 md:space-y-6 md:block">
                {[
                  { icon: CalendarCheck, title: "Free 30-min strategy session", sub: "No commitment. Just clarity." },
                  { icon: Sparkles, title: "Custom recommendations", sub: "Based on your industry and goals." },
                  { icon: Phone, title: "Clear next steps", sub: "Know exactly what to build." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 md:p-0 rounded-lg md:rounded-none border border-border md:border-0" style={{ background: "hsl(var(--card))" }}>
                    <div className="w-9 h-9 md:w-auto md:h-auto rounded-lg md:rounded-none bg-primary/10 md:bg-transparent flex items-center justify-center shrink-0 md:mt-0.5">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">{item.title}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="card-premium p-8 md:p-10 text-center"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 md:mb-6">
                    <CheckCircle2 className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl mb-2 md:mb-3">We'll Be in Touch</h3>
                  <p className="text-xs md:text-base text-muted-foreground">
                    We'll review your details and respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card-premium p-5 md:p-8 space-y-4 md:space-y-5">
                  {/* Single column on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">Full Name *</label>
                      <input required type="text" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">Email *</label>
                      <input required type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">Company</label>
                      <input type="text" value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Company name" />
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">Phone</label>
                      <input type="tel" value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">Project Type *</label>
                    <select required value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all">
                      <option value="">Select project type</option>
                      {projectTypes.map((pt) => (<option key={pt} value={pt}>{pt}</option>))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">Budget Range</label>
                    <select value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all">
                      <option value="">Select a range</option>
                      {budgetRanges.map((br) => (<option key={br} value={br}>{br}</option>))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">Tell Us More</label>
                    <textarea rows={3} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                      placeholder="What are you looking to build?" />
                  </div>

                  <button type="submit" className="premium-btn w-full text-center text-sm py-3.5 md:py-4">
                    Submit & Book Your Call
                  </button>
                  <p className="text-[9px] md:text-xs text-muted-foreground text-center">
                    We respond within 24 hours.
                  </p>
                </form>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookACall;
