import { motion } from "framer-motion";
import heroImage from "@/assets/somi-event-10.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-background pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6 text-foreground">
              Fighting Prostate Cancer.{" "}
              <span className="somi-gradient-text">Saving Nigerian Men.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-8 text-muted-foreground max-w-lg">
              Prostate cancer is the leading cancer among men in Nigeria, but early
              detection changes everything. We bring free PSA screenings, vital
              treatment support, and hope directly to the communities that need it
              most.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#impact" className="somi-btn-gold text-sm">
                See Our Impact
              </a>
              <a href="#screened" className="somi-btn-outline text-sm">
                Get Screened for Free
              </a>
            </div>

            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-muted border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">780+</span> men screened &amp; counting
              </p>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border">
              <img
                src={heroImage}
                alt="Nigerian man smiling with his family after successful prostate cancer screening"
                className="w-full h-[400px] lg:h-[480px] object-cover"
                loading="eager"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-lg">
              <p className="text-2xl font-bold text-primary">780+</p>
              <p className="text-xs text-muted-foreground">Men Screened</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
