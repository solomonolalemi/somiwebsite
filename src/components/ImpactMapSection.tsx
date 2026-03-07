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
    <section id="impact" className="somi-map-bg py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-somi-warm">
            Real Proof.{" "}
            <span className="somi-gradient-text">Real Lives Saved.</span>
          </h2>
          <p className="text-somi-warm/70 max-w-2xl mx-auto text-lg">
            We track every outreach because transparency matters. See exactly where
            our medical teams have been and the direct impact of donor support.
          </p>
        </motion.div>

        {/* Live Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-somi-navy-light/50 backdrop-blur-sm border border-somi-gold/20 rounded-xl p-6 text-center"
            >
              <m.icon className="w-6 h-6 text-somi-gold mx-auto mb-2" />
              <p className="somi-stat-number text-3xl font-bold">{m.value}</p>
              <p className="text-somi-warm/60 text-sm mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Stylized Map of Nigeria */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative bg-somi-navy-light/30 rounded-2xl border border-somi-gold/10 p-8 overflow-hidden">
            {/* Simplified Nigeria map SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-auto opacity-30"
              aria-label="Map of Nigeria showing Saving Our Men Initiative outreach locations"
            >
              <path
                d="M20 25 L35 20 L50 22 L60 18 L70 22 L75 30 L78 40 L75 50 L72 55 L65 60 L58 65 L50 68 L42 70 L35 68 L28 65 L22 58 L18 50 L16 40 L18 32 Z"
                fill="none"
                stroke="hsl(38, 90%, 55%)"
                strokeWidth="0.5"
                opacity="0.5"
              />
              {/* State divisions hint */}
              <path d="M35 30 L45 45 L55 40" fill="none" stroke="hsl(38, 90%, 55%)" strokeWidth="0.2" opacity="0.3" />
              <path d="M45 45 L40 55 L50 58" fill="none" stroke="hsl(38, 90%, 55%)" strokeWidth="0.2" opacity="0.3" />
              <path d="M55 40 L60 50 L50 58" fill="none" stroke="hsl(38, 90%, 55%)" strokeWidth="0.2" opacity="0.3" />
            </svg>

            {/* Map Pins */}
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
                    className="w-6 h-6 text-somi-gold drop-shadow-lg transition-transform hover:scale-125"
                    fill="hsl(38, 90%, 55%)"
                  />
                  {/* Pulse ring */}
                  <span className="absolute -inset-2 rounded-full bg-somi-gold/20 animate-ping" />
                </div>

                {/* Tooltip */}
                {activePin === pin.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-somi-navy border border-somi-gold/30 rounded-lg p-3 min-w-[200px] shadow-lg z-10">
                    <p className="text-somi-gold font-semibold text-xs mb-1">
                      {pin.state}
                    </p>
                    <p className="text-somi-warm text-sm font-medium">
                      {pin.title}
                    </p>
                    <p className="text-somi-warm/70 text-xs mt-1">
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
