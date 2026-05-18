import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const contactLinks = [
  { label: "050-922-4832", href: "tel:0509224832", Icon: Phone },
  { label: "CustomerSupport@sterk.systems", href: "mailto:CustomerSupport@sterk.systems", Icon: Mail },
  { label: "Sales@sterk.systems", href: "mailto:Sales@sterk.systems", Icon: Mail },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#cfd8e6]/70 bg-[#f5f8fc]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,24,49,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(16,24,49,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(20,71,212,0.16),transparent_66%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-full bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.72))]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 md:section-padding md:py-16">
        <div className="grid gap-8 rounded-[2rem] border border-white/72 bg-white/58 p-6 shadow-[0_28px_90px_rgba(20,32,50,0.10),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-2xl md:grid-cols-[1.1fr_1fr_0.7fr] md:gap-10 md:p-9">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="STERK.systems home">
              <img
                src="/sterk-logo.jpg"
                alt="STERK.systems"
                width={512}
                height={512}
                loading="eager"
                decoding="sync"
                className="h-11 w-11 rounded-[0.85rem] object-cover shadow-[0_14px_36px_rgba(20,32,50,0.16)]"
              />
              <span className="font-display text-xl font-semibold tracking-[-0.04em] text-[#07101f]">
                STERK.systems
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#314052]/78 md:text-base">
              AI systems, conversion websites, and automation built to answer faster, capture more demand, and keep operations moving.
            </p>
            <Link
              to="/book-a-call"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#101831] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_38px_rgba(16,24,49,0.18)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#101831]/52">Contact</h4>
            <div className="mt-5 space-y-2.5">
              {contactLinks.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-2.5 text-xs font-medium leading-snug text-[#314052]/78 transition-colors duration-300 hover:text-[#1447d4] md:text-sm"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eef4ff] text-[#1447d4]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 break-words">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#101831]/52">Navigate</h4>
            <nav className="mt-5 flex flex-col gap-3 text-sm font-medium text-[#314052]/78">
              <Link to="/" className="transition-colors hover:text-[#1447d4]">Home</Link>
              <Link to="/about" className="transition-colors hover:text-[#1447d4]">About</Link>
              <Link to="/book-a-call" className="transition-colors hover:text-[#1447d4]">Book a Call</Link>
            </nav>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#07101f]/10 pt-6 text-[11px] text-[#314052]/64 md:flex-row md:items-center md:justify-between">
          <p>© 2026 STERK.systems. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
