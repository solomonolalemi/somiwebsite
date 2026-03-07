import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import screeningImage from "@/assets/screening-event.jpg";

const PatientPortalSection = () => {
  return (
    <section id="screened" className="somi-map-bg py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 text-somi-warm"
        >
          Your Health Matters.{" "}
          <span className="somi-gradient-text">Get Screened Today.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-somi-navy-light/50 backdrop-blur-sm border border-somi-gold/20 rounded-2xl p-8 flex flex-col"
          >
            <Calendar className="w-10 h-10 text-somi-gold mb-4" />
            <h3 className="font-display text-xl font-bold text-somi-warm mb-3">
              Attend a Free Outreach
            </h3>
            <p className="text-somi-warm/70 text-sm leading-relaxed flex-1 mb-6">
              View our calendar for upcoming free mobile screening events in your
              area.
            </p>
            <a href="#calendar" className="somi-btn-gold text-sm py-2 px-5 text-center">
              View Event Calendar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-somi-navy-light/50 backdrop-blur-sm border border-somi-gold/20 rounded-2xl p-8 flex flex-col"
          >
            <MessageCircle className="w-10 h-10 text-somi-gold mb-4" />
            <h3 className="font-display text-xl font-bold text-somi-warm mb-3">
              Talk to a Professional
            </h3>
            <p className="text-somi-warm/70 text-sm leading-relaxed flex-1 mb-6">
              Have questions? Speak confidentially with our medical advisors.
            </p>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="somi-btn-outline text-sm py-2 px-5 text-center">
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Supporting image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-somi-gold/10"
        >
          <img
            src={screeningImage}
            alt="Nigerian medical team conducting free prostate cancer screening for local men"
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PatientPortalSection;
