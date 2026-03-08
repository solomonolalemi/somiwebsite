import { useState } from "react";
import { Menu, X } from "lucide-react";
import somiLogo from "@/assets/somi-logo.png";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Impact", href: "/impact" },
  { label: "Get Screened", href: "/get-screened" },
  { label: "Events", href: "/events" },
  { label: "Stories", href: "/stories" },
  { label: "Corporate Partners", href: "/partners" },
];

const SomiHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <img
            src={somiLogo}
            alt="Saving Our Men Initiative logo"
            className="h-8 w-auto"
          />
          <span className="font-semibold text-lg text-foreground tracking-tight">SOMI</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/donate"
            className="somi-btn-gold text-sm py-2.5 px-5 hidden sm:inline-block"
          >
            Donate Now
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#action"
            className="somi-btn-gold text-sm py-2.5 px-5 mt-4 inline-block"
          >
            Donate Now
          </a>
        </div>
      )}
    </header>
  );
};

export default SomiHeader;
