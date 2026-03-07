import { motion } from "framer-motion";
import { Heart, Building, Flag, Stethoscope } from "lucide-react";

const cards = [
  {
    icon: Heart,
    title: "Join the Life-Savers Club",
    text: "Commit to a monthly donation of ₦5,000 to ensure we have a steady supply of PSA testing kits year-round.",
    cta: "Give Monthly",
    href: "#donate",
  },
  {
    icon: Building,
    title: "Corporate Partnerships & CSR",
    text: "Sponsor a mobile screening event for a local community, or bring our medical team to your office for staff wellness.",
    cta: "Partner With Us",
    href: "#partner",
  },
  {
    icon: Flag,
    title: "Start a Fundraiser",
    text: "Dedicate your birthday, a 10km run, or a full marathon to raising funds.",
    cta: "Start Campaign",
    href: "#campaign",
  },
  {
    icon: Stethoscope,
    title: "Volunteer Your Expertise",
    text: "Are you a doctor, nurse, or psychologist? Join our mobile outreach teams.",
    cta: "Become a Volunteer",
    href: "#volunteer",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const ActionCardsSection = () => {
  return (
    <section id="action" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Join the Fight.{" "}
            <span className="somi-gradient-text">Take Action Today.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="somi-card p-6 flex flex-col border border-border group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-2 text-foreground">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                {card.text}
              </p>
              <a
                href={card.href}
                className="somi-btn-gold text-sm py-2.5 px-5 text-center"
              >
                {card.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionCardsSection;
