import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Heart, Tablet, ShieldCheck, Lock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import NigeriaMapInteractive from "@/components/NigeriaMapInteractive";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const pins = [
  { id: 1, state: "Osun State", title: "Ilesha Outreach (Feb 2025)", detail: "400+ Men Screened", x: 42, y: 58 },
  { id: 2, state: "Lagos State", title: "Lekki LCDA Outreach (Dec 2025)", detail: "200+ Men Screened", x: 30, y: 68 },
  { id: 3, state: "Lagos State", title: "Ajah LCDA Outreach (Feb 2026)", detail: "180+ Men Screened", x: 33, y: 72 },
];

const fundAllocation = [
  { name: "Medical Supplies & Testing Kits", value: 45, color: "hsl(160, 50%, 38%)" },
  { name: "Patient Financial Aid", value: 25, color: "hsl(160, 45%, 48%)" },
  { name: "Outreach & Logistics", value: 15, color: "hsl(210, 80%, 45%)" },
  { name: "Operations & Administration", value: 10, color: "hsl(220, 25%, 22%)" },
  { name: "Technology & Data", value: 5, color: "hsl(220, 10%, 46%)" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const metrics = [
  { icon: Users, label: "Total Men Screened", value: 780, suffix: "+" },
  { icon: Building2, label: "Communities Reached", value: 5, suffix: "+" },
  { icon: Heart, label: "Men in Active Care", value: 300, suffix: "+" },
];

const dataFeatures = [
  { icon: Tablet, title: "Offline-Capable Tablets", text: "Our teams use secure mobile tablets to collect data during outreaches in areas with limited connectivity." },
  { icon: Lock, title: "NDPR Compliant", text: "All patient data is encrypted and handled in strict compliance with the Nigeria Data Protection Regulation." },
  { icon: ShieldCheck, title: "Accurate Tracking", text: "Every screening is recorded in real-time, ensuring our impact numbers are verifiable and auditable." },
];

const OurImpact = () => {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.h1 {...fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
            Data-Driven Empathy.{" "}
            <span className="somi-gradient-text">Proven Results.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.15, duration: 0.5 }} className="text-lg sm:text-xl text-background/60 max-w-2xl mx-auto">
            We believe in complete transparency. Explore our outreach data and see exactly how your support is saving lives across Nigeria.
          </motion.p>
        </div>
      </section>

      {/* Animated Counters */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div key={m.label} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center p-8 rounded-2xl border border-border bg-muted/30">
                <m.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </p>
                <p className="text-muted-foreground text-sm">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 lg:py-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-background mb-4 text-center">
            Where We've Been
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-background/60 max-w-2xl mx-auto text-center text-lg mb-12">
            Click on any pin to see detailed outreach data from that location.
          </motion.p>

          <motion.div {...fadeUp} className="relative max-w-3xl mx-auto">
            <div className="relative bg-background/5 rounded-2xl border border-background/10 p-8 overflow-hidden">
              <svg viewBox="0 0 800 800" className="w-full h-auto opacity-25" aria-label="Map of Nigeria showing SOMI outreach locations">
                <path
                  d="M233 82 L258 78 L278 85 L305 75 L330 80 L355 72 L380 78 L410 70 L435 75 L460 68 L485 72 L510 65 L535 70 L555 62 L575 68 L590 60 L610 72 L625 80 L635 95 L640 110 L648 130 L655 150 L660 170 L658 190 L650 210 L645 230 L655 250 L665 270 L670 290 L668 310 L660 330 L650 345 L640 360 L625 375 L610 390 L600 410 L585 430 L570 445 L555 460 L540 478 L525 495 L510 510 L498 525 L485 540 L475 555 L468 570 L460 585 L455 600 L448 615 L440 625 L428 635 L415 640 L400 645 L385 650 L370 655 L355 658 L340 655 L325 648 L310 640 L295 630 L280 620 L268 608 L255 595 L245 580 L238 565 L230 548 L222 530 L215 515 L208 498 L200 480 L195 465 L188 448 L182 430 L178 415 L172 398 L168 380 L165 360 L162 340 L160 320 L158 300 L160 280 L165 260 L170 240 L178 220 L185 200 L192 180 L200 160 L208 140 L215 120 L222 102 L233 82 Z"
                  fill="hsl(160, 50%, 38%)" fillOpacity="0.08" stroke="hsl(160, 50%, 38%)" strokeWidth="2" opacity="0.6"
                />
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
                    <MapPin className="w-5 h-5 text-primary drop-shadow-lg transition-transform hover:scale-125" fill="hsl(160, 50%, 38%)" />
                    <span className="absolute -inset-2 rounded-full bg-primary/20 animate-ping" />
                  </div>
                  {activePin === pin.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-foreground border border-background/20 rounded-xl p-3 min-w-[200px] shadow-lg z-10">
                      <p className="text-primary font-semibold text-xs mb-1">{pin.state}</p>
                      <p className="text-background text-sm font-medium">{pin.title}</p>
                      <p className="text-background/60 text-xs mt-1">{pin.detail}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Infrastructure */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            Our Data Infrastructure
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-2xl mx-auto text-center text-lg mb-12">
            How we ensure every data point is accurate, secure, and compliant.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {dataFeatures.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -6 }} className="group bg-muted/30 rounded-2xl border border-border p-8 text-center transition-shadow duration-300 hover:shadow-[0_16px_48px_-12px_hsl(160_50%_38%/0.12)] hover:border-primary/30">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-colors duration-300">
                  <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            Financial Transparency
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-2xl mx-auto text-center text-lg mb-14">
            See exactly how every naira is put to work saving lives.
          </motion.p>
          <motion.div {...fadeUp} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-[320px] mx-auto aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fundAllocation} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={3} dataKey="value" stroke="none">
                    {fundAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ background: "hsl(220, 20%, 14%)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "14px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {fundAllocation.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-foreground font-medium text-sm flex-1">{item.name}</span>
                  <span className="text-primary font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Donate to Fund the Next Outreach.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="text-primary-foreground/70 text-lg mb-8">
            Every naira goes directly to saving lives. Help us reach the next community.
          </motion.p>
          <motion.a {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} href="#" className="inline-block bg-background text-foreground font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity">
            Donate Now
          </motion.a>
        </div>
      </section>

      <SomiFooter />
    </div>
  );
};

export default OurImpact;
