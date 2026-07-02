import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Building, Flag, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";
import patternSvg from "@/assets/pattern-outline.svg";

const cards = [
  {
    step: 1,
    icon: Heart,
    title: "Join the Life-Savers Club",
    text: "Commit to a monthly donation of ₦5,000 to ensure we have a steady supply of PSA testing kits year-round.",
    cta: "Give Monthly",
    href: "/donate",
    featured: true,
  },
  {
    step: 2,
    icon: Building,
    title: "Corporate Partnerships & CSR",
    text: "Sponsor a mobile screening event for a local community, or bring our medical team to your office for staff wellness.",
    cta: "Partner With Us",
    href: "/partners",
    featured: false,
  },
  {
    step: 3,
    icon: Flag,
    title: "Start a Fundraiser",
    text: "Dedicate your birthday, a 10km run, or a full marathon to raising funds.",
    cta: "Start Campaign",
    href: "/donate",
    featured: false,
  },
  {
    step: 4,
    icon: Stethoscope,
    title: "Volunteer Your Expertise",
    text: "Are you a doctor, nurse, or psychologist? Join our mobile outreach teams.",
    cta: "Become a Volunteer",
    href: "https://wa.me/+2348079025059",
    featured: false,
  },
];

const ActionCardsSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);

  const maxScroll = Math.max(0, cards.length - 3);

  return (
    <section id="action" className="relative py-20 lg:py-28 bg-background overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img 
          src={patternSvg} 
          alt="" 
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground max-w-lg"
          >
            Join the Fight.{" "}
            <span className="somi-gradient-text">Take Action Today.</span>
          </motion.h2>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2"
          >
            <button
              onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
              disabled={scrollIndex === 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous cards"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScrollIndex(Math.min(maxScroll, scrollIndex + 1))}
              disabled={scrollIndex >= maxScroll}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next cards"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Cards carousel */}
        <div className="relative">
          <motion.div
            className="flex gap-5"
            animate={{ x: `-${scrollIndex * (100 / 3 + 1.25)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {cards.map((card, i) => {
              const isActive = activeCard === i;
              const isFeatured = card.featured && isActive;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onMouseEnter={() => setActiveCard(i)}
                  className={`
                    relative flex-shrink-0 w-[85%] sm:w-[45%] md:w-[calc(33.333%-14px)] rounded-2xl p-7 flex flex-col cursor-pointer
                    transition-all duration-500 ease-out min-h-[380px]
                    ${isActive
                      ? "bg-foreground text-background border-foreground shadow-2xl scale-[1.02]"
                      : "bg-muted/40 text-foreground border border-border hover:border-primary/30"
                    }
                  `}
                >
                  {/* Step number */}
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold mb-6
                      transition-colors duration-500
                      ${isActive ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground"}
                    `}
                  >
                    {card.step}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                      isActive ? "text-background" : "text-foreground"
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed flex-1 mb-8 transition-colors duration-500 ${
                      isActive ? "text-background/70" : "text-muted-foreground"
                    }`}
                  >
                    {card.text}
                  </p>

                  {/* Icon / visual area */}
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.4 }}
                    className="mt-auto"
                  >
                    <div
                      className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                        ${isActive ? "bg-primary/20" : "bg-primary/10"}
                      `}
                    >
                      <card.icon
                        className={`w-7 h-7 transition-colors duration-500 ${
                          isActive ? "text-primary" : "text-primary/60"
                        }`}
                      />
                    </div>
                  </motion.div>

                  {/* CTA button — only visible on active */}
                  <motion.a
                    href={card.href}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`
                      mt-5 inline-flex items-center justify-center text-sm font-semibold py-2.5 px-5 rounded-full
                      transition-colors duration-300
                      ${isActive
                        ? "bg-primary text-primary-foreground hover:opacity-90 pointer-events-auto"
                        : "pointer-events-none"
                      }
                    `}
                  >
                    {card.cta}
                  </motion.a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile dots indicator */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveCard(i);
                setScrollIndex(Math.min(i, maxScroll));
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCard === i ? "bg-primary w-6" : "bg-border"
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionCardsSection;
