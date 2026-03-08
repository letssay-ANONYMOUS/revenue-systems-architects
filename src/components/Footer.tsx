import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-5 md:section-padding py-10 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="font-display font-bold text-xl tracking-tight">
              <span className="gradient-text">Nexus</span>
              <span className="text-foreground">AI</span>
            </Link>
            <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI systems, websites, and apps that capture leads, respond faster, and run your operations.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-3 md:mb-4 text-foreground">Services</h4>
            <ul className="space-y-2.5">
              <li><Link to="/ai-calling-agents" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">AI Calling Agents</Link></li>
              <li><Link to="/chatbots-automation" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">Chatbots & Automation</Link></li>
              <li><Link to="/websites-apps" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">Websites & Apps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-3 md:mb-4 text-foreground">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/case-studies" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/book-a-call" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-3 md:mb-4 text-foreground">Ready to Start?</h4>
            <Link to="/book-a-call" className="premium-btn text-xs inline-block">
              Book a Call
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] md:text-xs text-muted-foreground">© 2026 NexusAI. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-[10px] md:text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="text-[10px] md:text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
