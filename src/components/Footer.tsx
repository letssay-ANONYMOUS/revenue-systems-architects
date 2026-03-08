import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="font-display font-bold text-xl tracking-tight">
              <span className="gradient-text">Nexus</span>
              <span className="text-foreground">AI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              We build AI systems, websites, and apps that help businesses capture more leads, respond faster, and operate better.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/ai-calling-agents" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Calling Agents</Link></li>
              <li><Link to="/chatbots-automation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Chatbots & Automation</Link></li>
              <li><Link to="/websites-apps" className="text-sm text-muted-foreground hover:text-primary transition-colors">Websites & Apps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/book-a-call" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Ready to Start?</h4>
            <p className="text-sm text-muted-foreground mb-4">Let's discuss how AI and automation can transform your operations.</p>
            <Link to="/book-a-call" className="premium-btn text-xs inline-block">
              Book a Call
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 NexusAI. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
