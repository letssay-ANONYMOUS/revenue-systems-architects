import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "AI Calling", path: "/ai-calling-agents" },
  { label: "Automation", path: "/chatbots-automation" },
  { label: "Web & Apps", path: "/websites-apps" },
  { label: "Results", path: "/case-studies" },
  { label: "About", path: "/about" },
];

const SCROLL_THRESHOLD = 50;
const TRANSITION_CSS = "all 700ms cubic-bezier(0.16, 1, 0.3, 1)";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    lastScrollY.current = latest;
    setScrolled(latest > SCROLL_THRESHOLD);

    if (latest < 80) {
      setHidden(false);
    } else {
      setHidden(direction === "down");
    }
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transform-gpu"
        style={{ padding: scrolled ? "10px 16px 0" : "0" }}
      >
        <div
          className={`mx-auto transform-gpu ${
            scrolled ? "nav-glass rounded-full" : "bg-transparent"
          }`}
          style={{
            maxWidth: scrolled ? "1000px" : "100%",
            borderRadius: scrolled ? "9999px" : "0px",
            transition: TRANSITION_CSS,
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              padding: scrolled ? "6px 20px" : "0 32px",
              height: scrolled ? "52px" : "64px",
              transition: TRANSITION_CSS,
            }}
          >
            {/* Logo */}
            <Link to="/" className="font-display font-bold text-base md:text-lg tracking-tight shrink-0">
              <span className="gradient-text">Nexus</span>
              <span className="text-foreground">AI</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-underline text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block shrink-0">
              <Link
                to="/book-a-call"
                className="premium-btn text-[11px] px-5 py-2 rounded-full"
              >
                Book a Call
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-foreground p-1.5 -mr-1 transition-transform duration-200 hover:scale-110"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl"
          >
            <div className="h-16" />
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
                    <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 hover:scale-110" />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-10">
              <Link
                to="/book-a-call"
                onClick={() => setMobileOpen(false)}
                className="premium-btn text-sm text-center w-full block py-4 rounded-full"
              >
                Book a Strategy Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
