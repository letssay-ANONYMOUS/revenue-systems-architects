import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="max-w-6xl mx-auto section-padding py-12 md:py-16">
      {/* Last-chance CTA */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 md:mb-14 pb-10 md:pb-14 border-b border-border">
        <div>
          <h3 className="font-display font-bold text-lg md:text-2xl mb-1">Let's build your revenue system.</h3>
          <p className="text-sm text-muted-foreground">Free strategy call · No commitment · Real ROI projections</p>
        </div>
        <Link
          to="/book-a-call"
          className="premium-btn shrink-0 group"
          data-analytics="footer-cta"
        >
          <span className="flex items-center gap-2">
            Book a Call
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      {/* Links grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-display font-bold text-lg tracking-tight">
            <span className="gradient-text">Nexus</span>
            <span className="text-foreground">AI</span>
          </Link>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-xs">
            AI systems that answer calls, capture leads, book appointments, and run operations.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-foreground">Solutions</h4>
          <ul className="space-y-2.5">
            <li><Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Calling Agents</Link></li>
            <li><Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Chatbots & Automation</Link></li>
            <li><Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Websites & Apps</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-foreground">Company</h4>
          <ul className="space-y-2.5">
            <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</Link></li>
            <li><Link to="/book-a-call" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-foreground">Legal</h4>
          <ul className="space-y-2.5">
            <li><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy</span></li>
            <li><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 md:mt-14 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">© 2026 NexusAI. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
