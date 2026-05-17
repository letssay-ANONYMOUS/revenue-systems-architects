import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "AI Calling", path: "/ai-calling-agents" },
  { label: "Automation", path: "/chatbots-automation" },
  { label: "Results", path: "/case-studies" },
  { label: "About", path: "/about" },
];

const SCROLL_ENTER = 56;
const SCROLL_EXIT = 28;
const SHELL_TRANSITION = "max-width 760ms cubic-bezier(0.16, 1, 0.3, 1), border-radius 760ms cubic-bezier(0.16, 1, 0.3, 1), background-color 760ms cubic-bezier(0.16, 1, 0.3, 1), border-color 760ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 760ms cubic-bezier(0.16, 1, 0.3, 1), transform 760ms cubic-bezier(0.16, 1, 0.3, 1), padding 760ms cubic-bezier(0.16, 1, 0.3, 1)";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled((prev) => {
      const next = prev ? latest > SCROLL_EXIT : latest > SCROLL_ENTER;
      return prev === next ? prev : next;
    });
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Link
        to="/"
        className="absolute left-4 top-[max(0.85rem,env(safe-area-inset-top))] z-[1190] flex items-center gap-2.5 md:left-6"
        aria-label="STERK.systems home"
      >
        <img
          src="/sterk-logo.jpg"
          alt="STERK.systems"
          width={512}
          height={512}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="h-9 w-9 rounded-[0.7rem] object-cover shadow-[0_12px_34px_rgba(20,32,50,0.14)] md:h-10 md:w-10"
        />
        <span className="font-display text-[1.08rem] font-semibold tracking-[-0.035em] text-[#101831]">
          STERK.systems
        </span>
      </Link>

      <motion.nav
        className="fixed left-0 right-0 top-0 z-[1200] transform-gpu"
        style={{
          padding: "max(0.65rem, env(safe-area-inset-top)) 1rem 0",
          willChange: "transform",
        }}
      >
        <div
          className="mx-auto flex h-16 items-center justify-end md:h-[82px] lg:justify-between"
          style={{ maxWidth: "1400px" }}
        >
          <div className="hidden w-[12rem] shrink-0 lg:block" aria-hidden="true" />

          {/* Center links — only this morphs into frosted pill */}
          <div
            className={`hidden lg:flex items-center gap-1 transform-gpu ${scrolled ? "nav-glass" : "bg-transparent"}`}
            style={{
              padding: scrolled ? "13px 38px" : "8px 14px",
              borderRadius: scrolled ? "9999px" : "14px",
              transform: scrolled ? "translateY(14px) scale(1.035)" : "translateY(0px) scale(0.985)",
              transition: SHELL_TRANSITION,
              willChange: "background-color, border-color, box-shadow, border-radius, transform",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link-underline rounded-full px-5 py-2.5 text-[14px] font-medium whitespace-nowrap ${
                  scrolled
                    ? location.pathname === link.path ? "nav-text-ink" : "nav-text-muted-ink hover:nav-text-ink"
                    : location.pathname === link.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ transition: "color 500ms cubic-bezier(0.16,1,0.3,1)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Book a Call — far right, never morphs */}
          <div className="hidden lg:block shrink-0">
            <motion.div data-native-press>
              <Link to="/book-a-call" data-native-press className="nav-cta-arrow-button">
                <span>Book a Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            className="relative z-[1300] -mr-1 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/68 text-foreground shadow-[0_16px_42px_rgba(20,32,50,0.13),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-2xl transition-transform duration-200 active:scale-95 lg:hidden"
            onPointerDown={(event) => {
              event.preventDefault();
              setMobileOpen((open) => !open);
            }}
            onClick={(event) => event.preventDefault()}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[1400] flex flex-col overflow-hidden bg-[#f8fafc]/96 backdrop-blur-2xl lg:hidden"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_22%_0%,rgba(255,255,255,0.96),transparent_38%),radial-gradient(ellipse_at_80%_18%,rgba(199,216,255,0.42),transparent_38%),linear-gradient(180deg,#ffffff_0%,#f7faff_48%,#edf3f9_100%)]" />
            <div
              className="relative z-10 flex items-center justify-between px-6 pb-3"
              style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
            >
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <img
                  src="/sterk-logo.jpg"
                  alt="STERK.systems"
                  width={512}
                  height={512}
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  className="h-9 w-9 rounded-[0.7rem] object-cover shadow-[0_12px_34px_rgba(20,32,50,0.14)]"
                />
                <span className="font-display text-[1.08rem] font-semibold tracking-[-0.035em] text-[#101831]">
                  STERK.systems
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/75 bg-white/72 text-foreground shadow-[0_20px_52px_rgba(20,32,50,0.14),inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-10px_22px_rgba(17,24,39,0.055)] backdrop-blur-2xl transition-transform active:translate-y-0.5 active:scale-95"
                onPointerDown={(event) => {
                  event.preventDefault();
                  setMobileOpen(false);
                }}
              >
                <X size={24} strokeWidth={2.35} />
              </button>
            </div>
            <motion.div
              className="relative z-10 mx-5 mt-8 rounded-[2rem] border border-white/70 bg-white/64 p-3 shadow-[0_28px_80px_rgba(32,48,74,0.12),inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-18px_34px_rgba(17,24,39,0.045)] backdrop-blur-2xl"
              initial={{ y: 26, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.045, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-[1.35rem] px-4 py-4 transition-colors ${
                      location.pathname === link.path ? "bg-[#101831] text-white shadow-[0_12px_28px_rgba(16,24,49,0.18)]" : "text-[#101831]"
                    }`}
                  >
                    <span className="font-display text-[1.32rem] font-semibold tracking-[-0.02em]">{link.label}</span>
                    <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${location.pathname === link.path ? "text-white/78" : "text-[#101831]/42"}`} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="relative z-10 mt-auto px-5 pb-[calc(1.35rem+env(safe-area-inset-bottom))]">
              <Link
                to="/book-a-call"
                onClick={() => setMobileOpen(false)}
                className="nav-cta-arrow-button flex w-full py-5"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
