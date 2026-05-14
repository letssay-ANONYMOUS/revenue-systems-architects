import { Link } from "react-router-dom";
import agentforgeLogo from "@/assets/agentforge-logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/45">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/cta-croc-generated-video.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:section-padding py-10 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img src={agentforgeLogo} alt="AgentForge" className="h-8 w-auto" />
            </Link>
            <p className="mt-3 text-xs md:text-sm text-[#314052]/78 leading-relaxed max-w-xs">
              AI systems, websites, and apps that capture leads, respond faster, and run your operations.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-3 md:mb-4 text-[#07101f]">Services</h4>
            <ul className="space-y-2.5">
              <li><Link to="/ai-calling-agents" className="text-xs md:text-sm text-[#314052]/78 hover:text-primary transition-colors">AI Calling Agents</Link></li>
              <li><Link to="/chatbots-automation" className="text-xs md:text-sm text-[#314052]/78 hover:text-primary transition-colors">Chatbots & Automation</Link></li>
              
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-3 md:mb-4 text-[#07101f]">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-xs md:text-sm text-[#314052]/78 hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/case-studies" className="text-xs md:text-sm text-[#314052]/78 hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/book-a-call" className="text-xs md:text-sm text-[#314052]/78 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-3 md:mb-4 text-[#07101f]">Ready to Start?</h4>
            <Link to="/book-a-call" className="premium-btn text-xs inline-block">
              Book a Call
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[#07101f]/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] md:text-xs text-[#314052]/72">© 2026 AgentForge. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-[10px] md:text-xs text-[#314052]/72 hover:text-[#07101f] cursor-pointer transition-colors">Privacy</span>
            <span className="text-[10px] md:text-xs text-[#314052]/72 hover:text-[#07101f] cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
