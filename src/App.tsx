import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
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
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
