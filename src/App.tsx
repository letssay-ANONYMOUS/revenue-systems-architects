import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import Index from "./pages/Index";

const AICallingAgents = lazy(() => import("./pages/AICallingAgents"));
const ChatbotsAutomation = lazy(() => import("./pages/ChatbotsAutomation"));
const WebsitesApps = lazy(() => import("./pages/WebsitesApps"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const About = lazy(() => import("./pages/About"));
const BookACall = lazy(() => import("./pages/BookACall"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const BrandLoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-[3000] grid place-items-center overflow-hidden bg-[#f8fafc]"
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, filter: "blur(14px)" }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    aria-label="Loading AgentForge"
  >
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(255,255,255,1),transparent_36%),radial-gradient(ellipse_at_28%_54%,rgba(198,216,255,0.36),transparent_34%),radial-gradient(ellipse_at_72%_68%,rgba(255,255,255,0.9),transparent_36%),linear-gradient(180deg,#ffffff_0%,#f8fbff_48%,#edf3f9_100%)]" />
    <motion.div
      className="absolute h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(20,71,212,0.13),transparent_64%)] blur-2xl"
      animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.45, 0.88, 0.45] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.div
      className="relative flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-20 w-20 rounded-[1.7rem] border border-white/80 bg-white/66 shadow-[0_30px_90px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-16px_30px_rgba(17,24,39,0.06)] backdrop-blur-2xl">
        <motion.span
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1447d4] shadow-[0_0_28px_rgba(20,71,212,0.8)]"
          animate={{ scale: [1, 1.55, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="absolute inset-3 rounded-[1.25rem] border border-[#1447d4]/18"
          animate={{ opacity: [0.25, 0.62, 0.25], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="text-center">
        <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-[#101831]">AgentForge</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#101831]/46">
          AI Automation Studio
        </p>
      </div>
      <div className="h-1 w-36 overflow-hidden rounded-full bg-[#101831]/10">
        <motion.span
          className="block h-full rounded-full bg-[#101831]"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "0%", "100%"] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  </motion.div>
);

function InitialLoader() {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let hideTimer = 0;
    let removeTimer = 0;
    const showMinimum = 1050;
    const startedAt = performance.now();
    const finish = () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
      const remaining = Math.max(0, showMinimum - (performance.now() - startedAt));
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        removeTimer = window.setTimeout(() => setMounted(false), 650);
      }, remaining);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    const fallbackTimer = window.setTimeout(finish, 2400);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[3000] transition-[opacity,filter] ${
        visible ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-md"
      }`}
      style={{ transitionDuration: "650ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <BrandLoadingScreen />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageRouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/ai-calling-agents" element={<PageTransition><AICallingAgents /></PageTransition>} />
          <Route path="/chatbots-automation" element={<PageTransition><ChatbotsAutomation /></PageTransition>} />
          <Route path="/websites-apps" element={<PageTransition><WebsitesApps /></PageTransition>} />
          <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/book-a-call" element={<PageTransition><BookACall /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

const PageRouteFallback = () => (
  <div className="grid min-h-[100dvh] place-items-center bg-[#f7f9fc]" aria-label="Loading page">
    <div className="relative flex flex-col items-center gap-5">
      <motion.div
        className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(20,71,212,0.14),transparent_62%)] blur-2xl"
        animate={{ opacity: [0.35, 0.78, 0.35], scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="relative h-14 w-14 rounded-full border border-white/80 bg-white/62 shadow-[0_24px_70px_rgba(20,32,50,0.16),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-10px_22px_rgba(17,24,39,0.06)] backdrop-blur-2xl"
        animate={{ y: [0, -3, 0], scale: [1, 1.025, 1] }}
        transition={{ duration: 1.25, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1447d4] shadow-[0_0_18px_rgba(20,71,212,0.7)]" />
      </motion.div>
      <p className="relative text-[10px] font-semibold uppercase tracking-[0.34em] text-[#111827]/58">AgentForge</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll />
      <FilmGrain />
      <BrowserRouter>
        <InitialLoader />
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
