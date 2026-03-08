import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "AI Calling Agents", path: "/ai-calling-agents" },
  { label: "Automation", path: "/chatbots-automation" },
  { label: "Websites & Apps", path: "/websites-apps" },
  { label: "Results", path: "/case-studies" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    lastScrollY.current = latest;

    setScrolled(latest > 20);

    if (latest < 50) {
      setHidden(false);
    } else {
      setHidden(direction === "down");
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      animate={{ y: hidden && !mobileOpen ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-[0_4px_30px_hsl(0_0%_0%/0.2)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="font-display font-bold text-lg md:text-xl tracking-tight">
            <span className="gradient-text">Nexus</span>
            <span className="text-foreground">AI</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link to="/book-a-call" className="premium-btn text-xs">
              Book a Strategy Call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-14 z-40 flex flex-col bg-background/95 backdrop-blur-2xl"
          >
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-4 border-b border-border/50 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    <span className="font-display font-semibold text-xl">{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-10">
              <Link
                to="/book-a-call"
                onClick={() => setMobileOpen(false)}
                className="premium-btn text-sm text-center w-full block py-4"
              >
                Book a Strategy Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
