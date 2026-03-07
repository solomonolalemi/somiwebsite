import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Building2, Heart } from "lucide-react";

const metrics = [
  { icon: Users, label: "Total Men Screened", value: "780+" },
  { icon: Building2, label: "Communities Reached", value: "5+" },
  { icon: Heart, label: "Men Supported with Care", value: "300+" },
];

const pins = [
  {
    id: 1,
    state: "Osun State",
    title: "Ilesha Outreach (Feb 2025)",
    detail: "400+ Men Screened",
    x: 32,
    y: 55,
  },
  {
    id: 2,
    state: "Lagos State",
    title: "Lekki LCDA Outreach (Dec 2025)",
    detail: "200+ Men Screened",
    x: 24,
    y: 60,
  },
  {
    id: 3,
    state: "Lagos State",
    title: "Ajah LCDA Outreach (Feb 2026)",
    detail: "180+ Men Screened",
    x: 26,
    y: 62,
  },
];

const ImpactMapSection = () => {
  const [activePin, setActivePin] = useState<number | null>(null);

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
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative bg-background/5 rounded-2xl border border-background/10 p-8 overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-auto opacity-25"
              aria-label="Map of Nigeria showing Saving Our Men Initiative outreach locations"
            >
              <path
                d="M20 25 L35 20 L50 22 L60 18 L70 22 L75 30 L78 40 L75 50 L72 55 L65 60 L58 65 L50 68 L42 70 L35 68 L28 65 L22 58 L18 50 L16 40 L18 32 Z"
                fill="none"
                stroke="hsl(160, 50%, 38%)"
                strokeWidth="0.5"
                opacity="0.6"
              />
              <path d="M35 30 L45 45 L55 40" fill="none" stroke="hsl(160, 50%, 38%)" strokeWidth="0.2" opacity="0.3" />
              <path d="M45 45 L40 55 L50 58" fill="none" stroke="hsl(160, 50%, 38%)" strokeWidth="0.2" opacity="0.3" />
              <path d="M55 40 L60 50 L50 58" fill="none" stroke="hsl(160, 50%, 38%)" strokeWidth="0.2" opacity="0.3" />
            </svg>

            {pins.map((pin) => (
              <div
                key={pin.id}
                className="absolute cursor-pointer group"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
                onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              >
                <div className="relative">
                  <MapPin
                    className="w-5 h-5 text-primary drop-shadow-lg transition-transform hover:scale-125"
                    fill="hsl(160, 50%, 38%)"
                  />
                  <span className="absolute -inset-2 rounded-full bg-primary/20 animate-ping" />
                </div>

                {activePin === pin.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-foreground border border-background/20 rounded-xl p-3 min-w-[200px] shadow-lg z-10">
                    <p className="text-primary font-semibold text-xs mb-1">
                      {pin.state}
                    </p>
                    <p className="text-background text-sm font-medium">
                      {pin.title}
                    </p>
                    <p className="text-background/60 text-xs mt-1">
                      {pin.detail}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMapSection;
