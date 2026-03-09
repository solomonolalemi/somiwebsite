import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Heart } from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";

const metrics = [
  { icon: Users, label: "Total Men Screened", value: "780+" },
  { icon: Building2, label: "Communities Reached", value: "5+" },
  { icon: Heart, label: "Men Supported with Care", value: "300+" },
];

const pins = [
  { id: 1, state: "Osun State", title: "Ilesha Outreach", detail: "400+", lat: 7.6167, lng: 4.7333, date: "February 2025" },
  { id: 2, state: "Lagos State", title: "Lekki LCDA Outreach", detail: "200+", lat: 6.4698, lng: 3.5852, date: "December 2025" },
  { id: 3, state: "Lagos State", title: "Ajah LCDA Outreach", detail: "180+", lat: 6.4667, lng: 3.6167, date: "February 2026" },
];

const ImpactMapSection = () => {
  return (
    <section id="impact" className="py-20 lg:py-28 bg-foreground">
      <div className="container mx-auto px-4 lg:px-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
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
            </motion.div>
          ))}
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
