import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Heart } from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";
import patternSvg from "@/assets/pattern-outline.svg";

const metrics = [
  { icon: Users, label: "Total Men Screened", value: "330", suffix: "" },
  { icon: Building2, label: "No. with Normal PSA", value: "286", suffix: " (86.7%)" },
  { icon: Heart, label: "No. with High PSA", value: "44", suffix: " (13.3%)" },
];

const referralMetric = { label: "No. Referred", value: "38", suffix: " (86%)" };

const pins = [
  { 
    id: 1, 
    state: "Eti-Osa, Lagos State", 
    title: "Eti-Osa Outreach", 
    detail: "59",
    lat: 6.4532,
    lng: 3.6209,
    date: "2025",
    screened: 59,
    normal: 51,
    highPsa: 8
  },
  { 
    id: 2, 
    state: "Ibeju-Lekki, Lagos State", 
    title: "Ibeju-Lekki Outreach", 
    detail: "190",
    lat: 6.4698,
    lng: 3.5852,
    date: "2025",
    screened: 190,
    normal: 171,
    highPsa: 19
  },
  { 
    id: 3, 
    state: "Ilesa West, Osun State", 
    title: "Ilesa West Outreach", 
    detail: "81",
    lat: 7.6167,
    lng: 4.7333,
    date: "2025",
    screened: 81,
    normal: 64,
    highPsa: 17
  },
];

const ImpactMapSection = () => {
  return (
    <section id="impact" className="relative py-20 lg:py-28 bg-foreground overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img 
          src={patternSvg} 
          alt="" 
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-background">
            Real Proof.{" "}
            <span className="somi-gradient-text">Real Lives Saved.</span>
          </h2>
          <p className="text-background/60 max-w-2xl mx-auto text-lg">
            We track every outreach because transparency matters. See exactly where
            our medical teams have been and the direct impact of donor support.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 text-center"
            >
              <m.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary">{m.value}</p>
              <p className="text-background/50 text-sm mt-1">{m.label}</p>
              {m.suffix && <p className="text-primary text-xs font-semibold mt-1">{m.suffix}</p>}
            </motion.div>
          ))}
          {/* No. Referred */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 text-center"
          >
            <Heart className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold text-primary">{referralMetric.value}</p>
            <p className="text-background/50 text-sm mt-1">{referralMetric.label}</p>
            <p className="text-primary text-xs font-semibold mt-1">{referralMetric.suffix}</p>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <InteractiveMap pins={pins} variant="dark" />
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMapSection;
