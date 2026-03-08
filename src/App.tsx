import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import AICallingAgents from "./pages/AICallingAgents";
import ChatbotsAutomation from "./pages/ChatbotsAutomation";
import WebsitesApps from "./pages/WebsitesApps";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import BookACall from "./pages/BookACall";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTopOnNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-calling-agents" element={<AICallingAgents />} />
          <Route path="/chatbots-automation" element={<ChatbotsAutomation />} />
          <Route path="/websites-apps" element={<WebsitesApps />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-a-call" element={<BookACall />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

function ScrollToTopOnNav() {
  const { pathname } = require("react-router-dom").useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default App;
