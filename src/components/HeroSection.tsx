import { motion } from "framer-motion";
import heroImage from "@/assets/hero-family.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Nigerian man smiling with his family after successful prostate cancer screening"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-somi-navy/90 via-somi-navy/75 to-somi-navy/40" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-somi-warm">
            Fighting Prostate Cancer.{" "}
            <span className="somi-gradient-text">Saving Nigerian Men.</span>
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-10 text-somi-warm/80 max-w-xl">
            Prostate cancer is the leading cancer among men in Nigeria, but early
            detection changes everything. We bring free PSA screenings, vital
            treatment support, and hope directly to the communities that need it
            most.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#impact" className="somi-btn-gold text-base">
              See Our Impact
            </a>
            <a href="#screened" className="somi-btn-outline text-base">
              Get Screened for Free
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="hsl(220, 20%, 97%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
