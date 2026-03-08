import { Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events & Outreaches", href: "/events" },
  { label: "Corporate Partners", href: "/partners" },
  { label: "Contact Us", href: "#" },
];

const legalLinks = [
  { label: "NGO Registration", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Data Protection (NDPR)", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Safeguard Policy", href: "#" },
];

const SomiFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-foreground py-16 border-t border-background/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-background mb-3">SOMI</h3>
            <p className="text-background/50 text-sm leading-relaxed">
              Saving Our Men Initiative — A Nigerian health NGO dedicated to
              fighting prostate cancer through free screenings, education, and
              treatment support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-background/50 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/50 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-primary font-semibold text-sm mb-4 uppercase tracking-wider">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-background/50 text-sm mb-3">
              Join our newsletter for outreach updates and impact stories.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-background/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-background/5 border border-background/10 text-background text-sm placeholder:text-background/30 focus:outline-none focus:border-primary/50"
                  required
                />
              </div>
              <button type="submit" className="somi-btn-gold text-sm py-2.5 px-5">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-background/30 text-xs">
            © {new Date().getFullYear()}. Saving Our Men Initiative. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-background/30 text-xs">
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Safeguard Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SomiFooter;
