import { motion } from "framer-motion";
import { ClipboardList, Droplets, MessageCircleHeart, MapPin, Calendar, ArrowRight } from "lucide-react";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const steps = [
  { icon: ClipboardList, step: "1", title: "Register", text: "Fill out a short intake form — online or on-site." },
  { icon: Droplets, step: "2", title: "Quick Blood Sample", text: "A simple PSA blood draw. Takes about 15 minutes." },
  { icon: MessageCircleHeart, step: "3", title: "Results & Counseling", text: "Receive confidential results and speak with a medical counselor." },
];

const upcomingOutreaches = [
  { location: "Ikorodu LGA, Lagos", date: "April 12, 2026", slots: "Pre-register open" },
  { location: "Ife Central, Osun", date: "May 3, 2026", slots: "Pre-register open" },
  { location: "Epe LGA, Lagos", date: "June 14, 2026", slots: "Coming soon" },
];

const partnerClinics = [
  { name: "Lagos University Teaching Hospital", location: "Idi-Araba, Lagos", type: "Teaching Hospital" },
  { name: "Obafemi Awolowo University Hospital", location: "Ile-Ife, Osun", type: "Teaching Hospital" },
  { name: "Reddington Hospital", location: "Victoria Island, Lagos", type: "Private Hospital" },
  { name: "First Consultant Medical Centre", location: "Ikoyi, Lagos", type: "Private Hospital" },
];

const GetScreened = () => {
  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.h1 {...fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
            Your Health is Your Greatest{" "}
            <span className="somi-gradient-text">Wealth.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.15, duration: 0.5 }} className="text-lg sm:text-xl text-background/60 max-w-2xl mx-auto">
            Getting a PSA test is quick, virtually painless, and highly confidential. Find a free screening near you or talk to our medical advisors.
          </motion.p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            What to Expect
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-14">
            Three simple steps — that's all it takes to protect your future.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div key={s.step} {...fadeUp} transition={{ delay: i * 0.12, duration: 0.5 }} whileHover={{ y: -6 }} className="group relative bg-muted/30 rounded-2xl border border-border p-8 text-center transition-all duration-300 hover:shadow-[0_16px_48px_-12px_hsl(160_50%_38%/0.12)] hover:border-primary/30">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-colors duration-300">
                  <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {s.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-border z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Outreaches */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            Upcoming Mobile Outreaches
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-12">
            Pre-register online to streamline your visit and skip the queue.
          </motion.p>
          <div className="max-w-3xl mx-auto space-y-4">
            {upcomingOutreaches.map((o, i) => (
              <motion.div key={o.location} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ x: 4 }} className="group bg-background rounded-2xl border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{o.location}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{o.date}</span>
                    </div>
                  </div>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  {o.slots}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Clinics */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            Find a Partner Clinic
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-12">
            Missed a mobile outreach? Visit any of our partner hospitals for a PSA test.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {partnerClinics.map((c, i) => (
              <motion.div key={c.name} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="bg-muted/30 rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors duration-300">
                <h3 className="font-bold text-foreground mb-1">{c.name}</h3>
                <p className="text-muted-foreground text-sm">{c.location}</p>
                <span className="inline-block mt-3 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{c.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Confidential Support */}
      <section className="py-20 lg:py-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-background mb-4">
            Recently Diagnosed or Feeling Anxious?
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="text-background/60 text-lg mb-8">
            You are not alone. Our trained counselors are available to talk — confidentially and free of charge.
          </motion.p>
          <motion.a {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} href="https://wa.me/+2347078199819" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity">
            <MessageCircleHeart className="w-5 h-5" />
            Chat with a SOMI Counselor on WhatsApp
          </motion.a>
        </div>
      </section>

      <SomiFooter />
    </div>
  );
};

export default GetScreened;
