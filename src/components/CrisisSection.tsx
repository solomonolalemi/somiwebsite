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
    number: "15 Min",
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
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const CrisisSection = () => {
  return (
    <section id="crisis" className="py-20 lg:py-28 somi-section-light">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            The Silent Crisis
          </h2>
          <p className="text-muted-foreground text-lg">
            Prostate cancer in Nigeria demands urgent action. Here's why.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            How We Are Changing the Narrative
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="somi-card border border-border p-8"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5">
                <sol.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-bold mb-2 text-foreground">
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
