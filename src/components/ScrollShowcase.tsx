import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: PhoneIncoming, title: "Inbound AI Agent", headline: "Never Miss a Call", description: "Answers every call, qualifies the lead, and books the appointment — while your team focuses on high-value work.", image: serviceInbound, accent: "primary" as const },
  { icon: PhoneOutgoing, title: "Outbound AI Agent", headline: "Follow Up on Autopilot", description: "Automated outreach, follow-ups, and reactivation calls. No lead goes cold.", image: serviceOutbound, accent: "accent" as const },
  { icon: Bot, title: "Support Chatbot", headline: "Instant Answers, 24/7", description: "Handles FAQs, captures leads, and routes complex issues — your website never sleeps.", image: serviceChatbot, accent: "primary" as const },
  { icon: Target, title: "Lead Qualification", headline: "A Digital Salesman That Never Clocks Out", description: "Qualifies visitors, scores leads, and books meetings automatically.", image: serviceLeads, accent: "accent" as const },
  { icon: CalendarCheck, title: "Appointment Booking", headline: "Scheduling Without the Back-and-Forth", description: "Syncs calendars, sends reminders, eliminates no-shows.", image: serviceScheduling, accent: "primary" as const },
  { icon: Globe, title: "Business Website", headline: "Built to Convert, Not Just Impress", description: "Premium sites engineered to turn visitors into paying customers.", image: serviceWebsite, accent: "accent" as const },
  { icon: Smartphone, title: "Web & Mobile Apps", headline: "Custom Systems for Your Business", description: "Applications that serve your customers and streamline your operations.", image: serviceApps, accent: "primary" as const },
  { icon: Workflow, title: "Workflow Automation", headline: "Connect Everything, Automate the Rest", description: "Link your tools, automate handoffs, and eliminate repetitive busywork.", image: serviceAutomation, accent: "accent" as const },
];

// Preload all images
if (typeof window !== "undefined") {
  services.forEach((svc) => {
    const img = new Image();
    img.src = svc.image;
  });
}

const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const totalSlides = services.length;
      // Shorter scroll: 60vh per slide instead of 100vh
      const scrollPerSlide = 60;

      // Set initial states
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.06 });
      });
      textRefs.current.forEach((txt, i) => {
        if (!txt) return;
        gsap.set(txt, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
      });
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.set(dot, {
          scale: i === 0 ? 1.5 : 1,
          backgroundColor: i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)",
        });
      });

      // Main pinning trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalSlides * scrollPerSlide}vh`,
        pin: panelRef.current,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          // Update progress bar
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleY: self.progress });
          }
        },
      });

      // Create individual slide transitions
      for (let i = 1; i < totalSlides; i++) {
        const triggerPoint = i / totalSlides;
        const duration = 1 / totalSlides;
        // Transition zone: 30% of each slide's scroll for the crossfade
        const fadeStart = triggerPoint - duration * 0.15;
        const fadeEnd = triggerPoint + duration * 0.15;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSlides * scrollPerSlide}vh`,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;

            if (p >= fadeStart && p <= fadeEnd) {
              // Normalized progress within transition zone (0 → 1)
              const t = Math.min(Math.max((p - fadeStart) / (fadeEnd - fadeStart), 0), 1);
              // Smooth easing
              const ease = t * t * (3 - 2 * t); // smoothstep

              // Fade out previous
              const prev = imageRefs.current[i - 1];
              const prevTxt = textRefs.current[i - 1];
              if (prev) {
                gsap.set(prev, { opacity: 1 - ease, scale: 1 + ease * 0.04 });
              }
              if (prevTxt) {
                gsap.set(prevTxt, { opacity: 1 - ease, y: -ease * 16 });
              }

              // Fade in current
              const curr = imageRefs.current[i];
              const currTxt = textRefs.current[i];
              if (curr) {
                gsap.set(curr, { opacity: ease, scale: 1.06 - ease * 0.06 });
              }
              if (currTxt) {
                gsap.set(currTxt, { opacity: ease, y: 24 - ease * 24 });
              }

              // Update dots
              dotRefs.current.forEach((dot, di) => {
                if (!dot) return;
                const isActive = di === i ? ease > 0.5 : di === i - 1 ? ease <= 0.5 : false;
                const wasPrev = di < i - 1;
                const isUpcoming = di > i;
                if (isActive) {
                  gsap.set(dot, { scale: 1.5, backgroundColor: "hsl(var(--primary))" });
                } else if (!wasPrev && !isUpcoming) {
                  // Don't touch dots outside this transition
                } else {
                  gsap.set(dot, { scale: 1, backgroundColor: "hsl(var(--muted-foreground) / 0.3)" });
                }
              });
            }
          },
        });
      }

      // Handle dots for all slides based on overall progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalSlides * scrollPerSlide}vh`,
        scrub: 0.6,
        onUpdate: (self) => {
          const activeIdx = Math.round(self.progress * (totalSlides - 1));
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return;
            gsap.set(dot, {
              scale: i === activeIdx ? 1.5 : 1,
              backgroundColor: i === activeIdx ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)",
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: simple stacked layout
  if (isMobile) {
    return (
      <div className="space-y-12 px-5 py-16">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div key={svc.title} className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border aspect-video">
                <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${svc.accent === "primary" ? "bg-primary/10" : "bg-accent/10"}`}>
                <Icon className={`w-5 h-5 ${svc.accent === "primary" ? "text-primary" : "text-accent"}`} />
              </div>
              <p className={`text-[10px] uppercase tracking-[0.2em] ${svc.accent === "primary" ? "text-primary" : "text-accent"}`}>{svc.title}</p>
              <h3 className="font-display font-bold text-xl leading-tight">{svc.headline}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.description}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div
        ref={panelRef}
        className="h-screen w-full flex items-center"
        style={{ background: "hsl(var(--background))" }}
      >
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
            {/* Image panel */}
            <div
              className="relative rounded-2xl overflow-hidden border border-border"
              style={{ background: "hsl(var(--card))", aspectRatio: "16 / 10" }}
            >
              {services.map((svc, i) => (
                <img
                  key={svc.title}
                  ref={(el) => { imageRefs.current[i] = el; }}
                  src={svc.image}
                  alt={svc.title}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ willChange: "opacity, transform" }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {services.map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => { dotRefs.current[i] = el; }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ willChange: "transform, background-color" }}
                  />
                ))}
              </div>
            </div>

            {/* Text panel */}
            <div className="relative h-[320px] lg:h-[380px] overflow-hidden">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={svc.title}
                    ref={(el) => { textRefs.current[i] = el; }}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{ willChange: "opacity, transform" }}
                  >
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-4 ${
                      svc.accent === "primary" ? "bg-primary/10" : "bg-accent/10"
                    }`}>
                      <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${svc.accent === "primary" ? "text-primary" : "text-accent"}`} />
                    </div>
                    <p className={`text-[10px] uppercase tracking-[0.2em] mb-2 ${
                      svc.accent === "primary" ? "text-primary" : "text-accent"
                    }`}>
                      {svc.title}
                    </p>
                    <h3 className="font-display font-bold text-2xl lg:text-4xl xl:text-[2.75rem] leading-tight mb-3">
                      {svc.headline}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-md">
                      {svc.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-0.5 h-28 rounded-full overflow-hidden"
          style={{ background: "hsl(var(--border))" }}
        >
          <div
            ref={progressRef}
            className="w-full h-full rounded-full origin-top"
            style={{
              background: "hsl(var(--primary))",
              transform: "scaleY(0)",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollShowcase;
