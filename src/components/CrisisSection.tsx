import { useState } from "react";
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

const NarrativeCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {solutions.map((sol, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <motion.div
            key={sol.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative rounded-2xl bg-foreground p-8 min-h-[280px] flex flex-col cursor-pointer overflow-hidden transition-all duration-500"
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={false}
              animate={{
                boxShadow: isHovered
                  ? "inset 0 0 0 1.5px hsl(var(--primary)), 0 20px 60px -15px hsl(var(--primary) / 0.2)"
                  : "inset 0 0 0 1px hsl(var(--background) / 0.08), 0 0 0 0 transparent",
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Icon */}
            <motion.div
              className="w-11 h-11 rounded-xl bg-background/10 flex items-center justify-center mb-6"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <sol.icon className="w-5 h-5 text-primary" />
            </motion.div>

            {/* Title */}
            <h4 className="text-xl font-bold text-background mb-3 leading-snug">
              {sol.title}
            </h4>

            {/* Description */}
            <p className="text-background/50 text-sm leading-relaxed flex-1">
              {sol.text}
            </p>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full"
              initial={false}
              animate={{ width: isHovered ? "40%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
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

        <NarrativeCards />
      </div>
    </section>
  );
};

export default CrisisSection;
