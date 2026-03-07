import { useState } from "react";
import { Menu, X } from "lucide-react";
import somiLogo from "@/assets/somi-logo.png";

const navLinks = [
  { label: "About Us", href: "#crisis" },
  { label: "Our Impact", href: "#impact" },
  { label: "Get Screened", href: "#screened" },
  { label: "Stories", href: "#stories" },
  { label: "Corporate Partners", href: "#action" },
];

const SomiHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-somi-navy/95 backdrop-blur-md border-b border-somi-navy-light/50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <img
            src={somiLogo}
            alt="Saving Our Men Initiative logo"
            className="h-10 w-auto"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-somi-warm/80 hover:text-somi-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#action"
            className="somi-btn-gold text-sm py-2 px-6 animate-pulse-glow hidden sm:inline-block"
          >
            Donate Now
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-somi-warm/80"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-somi-navy border-t border-somi-navy-light/30 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-somi-warm/80 hover:text-somi-gold transition-colors border-b border-somi-navy-light/20"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#action"
            className="somi-btn-gold text-sm py-2 px-6 mt-4 inline-block"
          >
            Donate Now
          </a>
        </div>
      )}
    </header>
  );
};

export default SomiHeader;
