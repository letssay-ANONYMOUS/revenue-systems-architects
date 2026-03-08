import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active index (0–7)
  const activeIndexRaw = useTransform(scrollYProgress, [0, 1], [0, services.length - 1]);

  return (
    <div ref={containerRef} style={{ height: `${services.length * 100}vh` }} className="relative">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:section-padding w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left: Image panel */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border" style={{ background: "hsl(var(--card))" }}>
              {services.map((svc, i) => (
                <ServiceImage key={svc.title} index={i} image={svc.image} title={svc.title} activeIndexRaw={activeIndexRaw} />
              ))}
              {/* Progress dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {services.map((_, i) => (
                  <ProgressDot key={i} index={i} activeIndexRaw={activeIndexRaw} />
                ))}
              </div>
            </div>

            {/* Right: Description panel */}
            <div className="relative h-[280px] md:h-[340px] overflow-hidden">
              {services.map((svc, i) => (
                <ServiceDescription key={svc.title} service={svc} index={i} activeIndexRaw={activeIndexRaw} />
              ))}
            </div>
          </div>
        </div>

        {/* Vertical scroll progress bar */}
        <motion.div
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-1 h-32 rounded-full overflow-hidden"
          style={{ background: "hsl(var(--border))" }}
        >
          <motion.div
            className="w-full rounded-full"
            style={{
              background: "hsl(var(--primary))",
              height: useTransform(scrollYProgress, [0, 1], ["12.5%", "100%"]),
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Sub-component: crossfading image
const ServiceImage = ({
  index,
  image,
  title,
  activeIndexRaw,
}: {
  index: number;
  image: string;
  title: string;
  activeIndexRaw: ReturnType<typeof useTransform>;
}) => {
  const opacity = useTransform(activeIndexRaw, (v: number) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? 1 : 0;
  });
  const scale = useTransform(activeIndexRaw, (v: number) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? 1 : 1.05;
  });

  return (
    <motion.img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity, scale }}
      transition={{ duration: 0.5 }}
    />
  );
};

// Sub-component: progress dot
const ProgressDot = ({
  index,
  activeIndexRaw,
}: {
  index: number;
  activeIndexRaw: ReturnType<typeof useTransform>;
}) => {
  const scale = useTransform(activeIndexRaw, (v: number) => {
    return Math.abs(v - index) < 0.5 ? 1.4 : 1;
  });
  const bg = useTransform(activeIndexRaw, (v: number) => {
    return Math.abs(v - index) < 0.5 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.4)";
  });

  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ scale, backgroundColor: bg }}
    />
  );
};

// Sub-component: service description
const ServiceDescription = ({
  service,
  index,
  activeIndexRaw,
}: {
  service: (typeof services)[0];
  index: number;
  activeIndexRaw: ReturnType<typeof useTransform>;
}) => {
  const Icon = service.icon;
  const opacity = useTransform(activeIndexRaw, (v: number) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? 1 : 0;
  });
  const y = useTransform(activeIndexRaw, (v: number) => {
    const dist = v - index;
    if (Math.abs(dist) < 0.5) return 0;
    return dist > 0 ? -30 : 30;
  });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 ${
        service.accent === "primary" ? "bg-primary/10" : "bg-accent/10"
      }`}>
        <Icon className={`w-5 h-5 md:w-7 md:h-7 ${service.accent === "primary" ? "text-primary" : "text-accent"}`} />
      </div>
      <p className={`text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 ${
        service.accent === "primary" ? "text-primary" : "text-accent"
      }`}>
        {service.title}
      </p>
      <h3 className="font-display font-bold text-xl md:text-3xl lg:text-4xl leading-tight mb-3 md:mb-4">
        {service.headline}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
        {service.description}
      </p>
    </motion.div>
  );
};

export default ScrollShowcase;
