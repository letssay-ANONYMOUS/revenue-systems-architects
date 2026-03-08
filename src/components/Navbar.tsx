import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Solutions", path: "/solutions" },
  { label: "Results", path: "/case-studies" },
  { label: "Process", path: "/process" },
  { label: "About", path: "/about" },
];

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
    setScrolled(latest > 60);

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
        animate={{ y: hidden && !mobileOpen ? "-140%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ padding: scrolled ? "10px 16px 0" : "0" }}
      >
        <motion.div
          layout="position"
          transition={{ layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } }}
          className={`mx-auto ${
            scrolled
              ? "max-w-xl rounded-full bg-background/60 backdrop-blur-2xl border border-border/40 shadow-[0_8px_32px_hsl(0_0%_0%/0.35)]"
              : "max-w-full bg-transparent"
          }`}
          style={{ transition: "max-width 0.5s cubic-bezier(0.32,0.72,0,1), border-radius 0.5s cubic-bezier(0.32,0.72,0,1), background-color 0.5s cubic-bezier(0.32,0.72,0,1), backdrop-filter 0.5s cubic-bezier(0.32,0.72,0,1), box-shadow 0.5s cubic-bezier(0.32,0.72,0,1), border-color 0.5s cubic-bezier(0.32,0.72,0,1)" }}
        >
          <div
            className={`flex items-center justify-between ${
              scrolled
                ? "px-4 md:px-5 h-11"
                : "max-w-6xl mx-auto px-5 md:px-10 lg:px-16 xl:px-24 h-14 md:h-16"
            }`}
            style={{ transition: "padding 0.5s cubic-bezier(0.32,0.72,0,1), height 0.5s cubic-bezier(0.32,0.72,0,1)" }}
          >
            {/* Logo */}
            <Link to="/" className="font-display font-bold text-base tracking-tight shrink-0">
              <span className="gradient-text">Nexus</span>
              <span className="text-foreground">AI</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block shrink-0">
              <Link
                to="/book-a-call"
                className="premium-btn text-xs px-5 py-2"
                data-analytics="nav-cta"
              >
                Book a Call
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-foreground p-1.5 -mr-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl"
          >
            <div className="h-14" />
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
                data-analytics="mobile-nav-cta"
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
