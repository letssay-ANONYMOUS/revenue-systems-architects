import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";

const projectTypes = [
  "AI Calling Agent",
  "Customer Support Chatbot",
  "Lead Generation Automation",
  "Appointment Scheduling",
  "Website Design & Development",
  "App Development",
  "Full System Build",
  "Not sure yet",
];

const budgetRanges = [
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Let's discuss",
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-30" />
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Book a Call</p>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                Let's Build Your{" "}
                <span className="gradient-text">Revenue System</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Tell us about your business and what you're looking to achieve. We'll come prepared with ideas, not a sales pitch.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Free 30-minute strategy session</p>
                    <p className="text-xs text-muted-foreground">No commitment. No pressure. Just clarity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Custom recommendations</p>
                    <p className="text-xs text-muted-foreground">Based on your industry, goals, and current setup.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Clear next steps</p>
                    <p className="text-xs text-muted-foreground">You'll leave knowing exactly what to build and why.</p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              {submitted ? (
                <div className="card-premium p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3">We'll Be in Touch</h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. We'll review your details and get back to you within 24 hours to schedule your strategy call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-premium p-8 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project Type *</label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((pt) => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    >
                      <option value="">Select a range</option>
                      {budgetRanges.map((br) => (
                        <option key={br} value={br}>{br}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tell Us More</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                      placeholder="What are you looking to build? What challenges are you facing?"
                    />
                  </div>

                  <button type="submit" className="premium-btn w-full text-center">
                    Submit & Book Your Call
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll respond within 24 hours. No spam, no fluff.
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
