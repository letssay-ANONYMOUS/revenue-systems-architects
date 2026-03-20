import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  PhoneIncoming, PhoneOutgoing, Bot, Target,
  CalendarCheck, Globe, Smartphone, Workflow
} from "lucide-react";

import serviceInbound from "@/assets/service-inbound.jpg";
import serviceOutbound from "@/assets/service-outbound.jpg";
import serviceChatbot from "@/assets/service-chatbot.jpg";
import serviceLeads from "@/assets/service-leads.jpg";
import serviceScheduling from "@/assets/service-scheduling.jpg";
import serviceWebsite from "@/assets/service-website.jpg";
import serviceApps from "@/assets/service-apps.jpg";
import serviceAutomation from "@/assets/service-automation.jpg";

const services = [
  {
    icon: PhoneIncoming,
    title: "Inbound AI Agent",
    headline: "Never Miss a Call",
    description: "Answers every call, qualifies the lead, and books the appointment — while your team focuses on high-value work.",
    image: serviceInbound,
    accent: "primary" as const,
  },
  {
    icon: PhoneOutgoing,
    title: "Outbound AI Agent",
    headline: "Follow Up on Autopilot",
    description: "Automated outreach, follow-ups, and reactivation calls. No lead goes cold.",
    image: serviceOutbound,
    accent: "accent" as const,
  },
  {
    icon: Bot,
    title: "Support Chatbot",
    headline: "Instant Answers, 24/7",
    description: "Handles FAQs, captures leads, and routes complex issues — your website never sleeps.",
    image: serviceChatbot,
    accent: "primary" as const,
  },
  {
    icon: Target,
    title: "Lead Qualification",
    headline: "A Digital Salesman That Never Clocks Out",
    description: "Qualifies visitors, scores leads, and books meetings automatically.",
    image: serviceLeads,
    accent: "accent" as const,
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    headline: "Scheduling Without the Back-and-Forth",
    description: "Syncs calendars, sends reminders, eliminates no-shows.",
    image: serviceScheduling,
    accent: "primary" as const,
  },
  {
    icon: Globe,
    title: "Business Website",
    headline: "Built to Convert, Not Just Impress",
    description: "Premium sites engineered to turn visitors into paying customers.",
    image: serviceWebsite,
    accent: "accent" as const,
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Apps",
    headline: "Custom Systems for Your Business",
    description: "Applications that serve your customers and streamline your operations.",
    image: serviceApps,
    accent: "primary" as const,
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    headline: "Connect Everything, Automate the Rest",
    description: "Link your tools, automate handoffs, and eliminate repetitive busywork.",
    image: serviceAutomation,
    accent: "accent" as const,
  },
];

const prefersReducedMotion = typeof window !== "undefined"
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

// Preload all images immediately
if (typeof window !== "undefined") {
  services.forEach((svc) => {
    const img = new Image();
    img.src = svc.image;
  });
}

const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track whether we're in the scroll container — show as soon as top hits viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Show when the container top reaches the viewport top, hide when bottom leaves
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setIsInView(inView);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Also preload via link tags for browser-level priority
  useEffect(() => {
    services.forEach((svc) => {
      const existing = document.querySelector(`link[href="${svc.image}"]`);
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = svc.image;
        document.head.appendChild(link);
      }
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (services.length - 1));
    setActiveIndex(Math.min(Math.max(idx, 0), services.length - 1));
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["12.5%", "100%"]);

  const transitionDuration = prefersReducedMotion ? 0 : 0.6;
  const transitionEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div ref={containerRef} style={{ height: `${services.length * 100}vh` }} className="relative">
      {/* Always render the fixed overlay but toggle visibility — avoids mount/unmount flicker */}
      <div
        className="fixed inset-0 z-30 flex items-center transition-opacity duration-300"
        style={{
          background: "hsl(var(--background))",
          opacity: isInView ? 1 : 0,
          pointerEvents: isInView ? "auto" : "none",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-14 items-center">
            {/* Left: Large image panel — bigger on desktop */}
            <div
              className="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-border"
              style={{
                background: "hsl(var(--card))",
                aspectRatio: "16 / 10",
              }}
            >
              {services.map((svc, i) => (
                <motion.img
                  key={svc.title}
                  src={svc.image}
                  alt={svc.title}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ willChange: "opacity" }}
                  initial={false}
                  animate={{
                    opacity: i === activeIndex ? 1 : 0,
                    scale: i === activeIndex ? 1 : 1.04,
                  }}
                  transition={{
                    opacity: { duration: transitionDuration, ease: transitionEase },
                    scale: { duration: transitionDuration * 1.2, ease: transitionEase },
                  }}
                />
              ))}

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />

              {/* Progress dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {services.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    animate={{
                      scale: i === activeIndex ? 1.4 : 1,
                      backgroundColor: i === activeIndex ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.4)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Description panel */}
            <div className="relative h-[280px] md:h-[380px] lg:h-[420px] overflow-hidden">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={svc.title}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={false}
                    animate={{
                      opacity: i === activeIndex ? 1 : 0,
                      y: i === activeIndex ? 0 : i > activeIndex ? 30 : -30,
                    }}
                    transition={{
                      opacity: { duration: transitionDuration * 0.5 },
                      y: { duration: transitionDuration, ease: transitionEase },
                    }}
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 ${
                      svc.accent === "primary" ? "bg-primary/10" : "bg-accent/10"
                    }`}>
                      <Icon className={`w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 ${svc.accent === "primary" ? "text-primary" : "text-accent"}`} />
                    </div>
                    <p className={`text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 lg:mb-3 ${
                      svc.accent === "primary" ? "text-primary" : "text-accent"
                    }`}>
                      {svc.title}
                    </p>
                    <h3 className="font-display font-bold text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-3 md:mb-4 lg:mb-5">
                      {svc.headline}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                      {svc.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vertical scroll progress bar */}
        <div
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-1 h-32 rounded-full overflow-hidden"
          style={{ background: "hsl(var(--border))" }}
        >
          <motion.div
            className="w-full rounded-full"
            style={{
              background: "hsl(var(--primary))",
              height: progressHeight,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollShowcase;
