import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import screeningImage from "@/assets/screening-event.jpg";

const PatientPortalSection = () => {
  return (
    <section id="screened" className="py-20 lg:py-28 somi-section-light">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Your Health Matters.{" "}
            <span className="somi-gradient-text">Get Screened Today.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="somi-card border border-border p-8 flex flex-col"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-5">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Attend a Free Outreach
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
              View our calendar for upcoming free mobile screening events in your
              area.
            </p>
            <a href="#calendar" className="somi-btn-gold text-sm py-2.5 px-5 text-center">
              View Event Calendar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="somi-card border border-border p-8 flex flex-col"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-5">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Talk to a Professional
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
              Have questions? Speak confidentially with our medical advisors.
            </p>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="somi-btn-outline text-sm py-2.5 px-5 text-center">
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border"
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
