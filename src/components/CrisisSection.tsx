import { motion } from "framer-motion";
import { BookOpen, Truck, HeartHandshake } from "lucide-react";

const stats = [
  {
    number: "1 in 6",
    text: "Black men are disproportionately affected by prostate cancer globally, facing higher risks and more aggressive forms of the disease.",
  },
  {
    number: "80%",
    text: "The estimated percentage of cases in Nigeria that are diagnosed at an advanced, late stage due to a lack of early screening.",
  },
  {
    number: "15 Minutes",
    text: "The time it takes for a simple PSA blood test that can detect abnormalities early and save a life.",
  },
];

const solutions = [
  {
    icon: BookOpen,
    title: "Awareness & Education",
    text: "Breaking the stigma and educating men across urban centers and rural communities.",
  },
  {
    icon: Truck,
    title: "Free Mobile Screenings",
    text: "Removing financial barriers by bringing free PSA tests to local government areas and corporate offices.",
  },
  {
    icon: HeartHandshake,
    title: "Treatment & Financial Aid",
    text: "Providing medical advisory, psychological counseling, and financial assistance.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const CrisisSection = () => {
  return (
    <section id="crisis" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-foreground"
        >
          The Silent Crisis:{" "}
          <span className="somi-gradient-text">Prostate Cancer in Nigeria</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.number}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="somi-card p-8 text-center border border-border"
            >
              <p className="somi-stat-number text-5xl lg:text-6xl font-bold mb-4">
                {stat.number}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {stat.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Solutions */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl sm:text-3xl font-bold text-center mb-12 text-foreground"
        >
          How We Are Changing the Narrative
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center p-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-somi-gold/10 mb-6">
                <sol.icon className="w-8 h-8 text-somi-gold" />
              </div>
              <h4 className="font-display text-xl font-bold mb-3 text-foreground">
                {sol.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {sol.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrisisSection;
