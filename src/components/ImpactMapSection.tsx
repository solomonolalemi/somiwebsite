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
              viewBox="0 0 800 800"
              className="w-full h-auto opacity-25"
              aria-label="Map of Nigeria showing Saving Our Men Initiative outreach locations"
            >
              <path
                d="M233 82 L258 78 L278 85 L305 75 L330 80 L355 72 L380 78 L410 70 L435 75 L460 68 L485 72 L510 65 L535 70 L555 62 L575 68 L590 60 L610 72 L625 80 L635 95 L640 110 L648 130 L655 150 L660 170 L658 190 L650 210 L645 230 L655 250 L665 270 L670 290 L668 310 L660 330 L650 345 L640 360 L625 375 L610 390 L600 410 L585 430 L570 445 L555 460 L540 478 L525 495 L510 510 L498 525 L485 540 L475 555 L468 570 L460 585 L455 600 L448 615 L440 625 L428 635 L415 640 L400 645 L385 650 L370 655 L355 658 L340 655 L325 648 L310 640 L295 630 L280 620 L268 608 L255 595 L245 580 L238 565 L230 548 L222 530 L215 515 L208 498 L200 480 L195 465 L188 448 L182 430 L178 415 L172 398 L168 380 L165 360 L162 340 L160 320 L158 300 L160 280 L165 260 L170 240 L178 220 L185 200 L192 180 L200 160 L208 140 L215 120 L222 102 L233 82 Z"
                fill="hsl(160, 50%, 38%)"
                fillOpacity="0.08"
                stroke="hsl(160, 50%, 38%)"
                strokeWidth="2"
                opacity="0.6"
              />
              {/* Internal state boundaries (simplified) */}
              <path d="M200 300 L400 280 L600 310" fill="none" stroke="hsl(160, 50%, 38%)" strokeWidth="0.8" opacity="0.2" />
              <path d="M220 400 L420 380 L580 420" fill="none" stroke="hsl(160, 50%, 38%)" strokeWidth="0.8" opacity="0.2" />
              <path d="M350 150 L380 350 L400 550" fill="none" stroke="hsl(160, 50%, 38%)" strokeWidth="0.8" opacity="0.2" />
              <path d="M500 150 L490 350 L470 520" fill="none" stroke="hsl(160, 50%, 38%)" strokeWidth="0.8" opacity="0.2" />
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
