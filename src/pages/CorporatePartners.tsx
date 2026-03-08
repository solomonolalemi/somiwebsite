import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Briefcase, Building, Flag, Users, Send } from "lucide-react";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const businessCase = [
  { icon: ShieldCheck, title: "Staff Welfare", text: "Proactively protect the health and longevity of your male workforce with on-site PSA screenings." },
  { icon: TrendingUp, title: "Brand Impact", text: "Align your company with one of Nigeria's most critical health movements and demonstrate genuine CSR." },
  { icon: Briefcase, title: "Turnkey Execution", text: "We handle all medical logistics, data security, and personnel. Your team just shows up." },
];

const tiers = [
  { icon: Building, tier: "Tier 1", title: "In-Office Wellness Days", text: "We bring the screening to your headquarters. Perfect for International Men's Day, staff wellness weeks, or annual health checks.", featured: true },
  { icon: Flag, tier: "Tier 2", title: "Community Sponsorship", text: "Your company fully funds a mobile outreach in an underserved Local Government Area, directly impacting hundreds of men.", featured: false },
];

const trustLogos = [
  "Providus Bank", "Lekki LCDA", "First Consultant Medical Centre", "Reddington Hospital",
];

const partnershipInterests = [
  "In-Office Wellness Day",
  "Community Sponsorship",
  "CSR Partnership",
  "Event Sponsorship",
  "Other",
];

const CorporatePartners = () => {
  const [formData, setFormData] = useState({ name: "", company: "", jobTitle: "", interest: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.interest) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.h1 {...fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
            Champion Men's Health{" "}
            <span className="somi-gradient-text">in Your Workplace.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.15, duration: 0.5 }} className="text-lg sm:text-xl text-background/60 max-w-2xl mx-auto">
            Partner with SOMI to deliver high-impact Corporate Social Responsibility (CSR) initiatives and life-saving staff wellness programs.
          </motion.p>
        </div>
      </section>

      {/* Business Case */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            Why Partner With Us?
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-14">
            A partnership that protects your people and strengthens your brand.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {businessCase.map((b, i) => (
              <motion.div key={b.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -6 }} className="group bg-muted/30 rounded-2xl border border-border p-8 text-center transition-all duration-300 hover:shadow-[0_16px_48px_-12px_hsl(160_50%_38%/0.12)] hover:border-primary/30">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-colors duration-300">
                  <b.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Partnership Tiers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tiers.map((t, i) => (
              <motion.div key={t.title} {...fadeUp} transition={{ delay: i * 0.12, duration: 0.5 }} whileHover={{ y: -6 }} className={`group rounded-2xl p-8 border transition-all duration-300 ${t.featured ? "bg-foreground border-foreground text-background" : "bg-background border-border hover:border-primary/30"}`}>
                <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 ${t.featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                  {t.tier}
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${t.featured ? "bg-background/10" : "bg-primary/10"}`}>
                  <t.icon className={`w-6 h-6 ${t.featured ? "text-primary" : "text-primary"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${t.featured ? "text-background" : "text-foreground"}`}>{t.title}</h3>
                <p className={`text-sm leading-relaxed ${t.featured ? "text-background/70" : "text-muted-foreground"}`}>{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Trust */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-bold text-foreground mb-10">
            Our Wall of Trust
          </motion.h2>
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-3xl mx-auto">
            {trustLogos.map((logo, i) => (
              <motion.div key={logo} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="px-6 py-4 bg-muted/50 rounded-xl border border-border text-muted-foreground font-semibold text-sm">
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-20 lg:py-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-background mb-4 text-center">
            Request a Corporate Proposal
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-background/60 text-center mb-10">
            Fill out the form below and our partnerships team will be in touch within 48 hours.
          </motion.p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-background mb-2">Thank You!</h3>
              <p className="text-background/60">We've received your request and will reach out shortly.</p>
            </motion.div>
          ) : (
            <motion.form {...fadeUp} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                maxLength={100}
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                maxLength={100}
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Job Title (e.g., HR Manager)"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                maxLength={100}
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                maxLength={255}
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary transition-colors"
              />
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                required
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" className="text-foreground">Partnership Interest</option>
                {partnershipInterests.map((p) => (
                  <option key={p} value={p} className="text-foreground">{p}</option>
                ))}
              </select>
              <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Request a Corporate Proposal
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <SomiFooter />
    </div>
  );
};

export default CorporatePartners;
