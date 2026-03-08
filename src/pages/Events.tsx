import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Users, Building2, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const upcomingEvents = [
  {
    date: "Saturday, April 18, 2026",
    time: "9:00 AM – 2:00 PM",
    location: "Ikeja City Secretariat, Lagos State",
    description: "Free PSA blood tests, one-on-one medical consultations, and educational workshops.",
    preRegisterOpen: true,
  },
  {
    date: "Saturday, May 2, 2026",
    time: "10:00 AM – 3:00 PM",
    location: "Mapo Hall, Ibadan, Oyo State",
    description: "Free PSA blood tests and private counseling sessions.",
    preRegisterOpen: true,
  },
];

import somiEvent1 from "@/assets/somi-event-1.jpg";
import somiEvent2 from "@/assets/somi-event-2.jpg";
import somiEvent3 from "@/assets/somi-event-3.jpg";
import somiEvent4 from "@/assets/somi-event-4.jpg";
import somiEvent5 from "@/assets/somi-event-5.jpg";
import somiEvent6 from "@/assets/somi-event-6.jpg";
import somiEvent7 from "@/assets/somi-event-7.jpg";
import somiEvent8 from "@/assets/somi-event-8.jpg";
import somiEvent9 from "@/assets/somi-event-9.jpg";
import somiEvent10 from "@/assets/somi-event-10.jpg";

const pastEvents = [
  {
    image: somiEvent3,
    caption: "Ilesha Outreach (Feb 2025)",
    stat: "Over 400 men screened",
    location: "Osun State",
    gallery: [somiEvent3, somiEvent1, somiEvent2, somiEvent5],
  },
  {
    image: somiEvent4,
    caption: "Lekki LCDA (Dec 2025)",
    stat: "Over 200 men screened",
    location: "Lagos",
    gallery: [somiEvent4, somiEvent6, somiEvent7, somiEvent8],
  },
  {
    image: somiEvent9,
    caption: "Ajah LCDA (Feb 2026)",
    stat: "Over 180 men screened",
    location: "Lagos",
    gallery: [somiEvent9, somiEvent10, somiEvent1, somiEvent6],
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* SEO-optimized head would go here in a real SSR setup */}

      {/* Section 1: Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <motion.div {...fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Events & Outreaches</span>
          </motion.div>
          <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
            Meet Us in Your{" "}
            <span className="somi-gradient-text">Community.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} className="text-lg sm:text-xl text-background/60 max-w-2xl mx-auto mb-10">
            We are constantly on the move, bringing free prostate cancer screenings, medical advisory, and hope directly to neighborhoods across Nigeria. Find an upcoming outreach near you and take control of your health.
          </motion.p>
          <motion.a
            {...fadeUp}
            transition={{ delay: 0.3, duration: 0.5 }}
            href="#upcoming"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity"
          >
            Find an Event
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Section 2: Upcoming Events */}
      <section id="upcoming" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            Upcoming Free Screenings
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-14">
            Walk-ins are always welcome, but pre-registering helps our medical team prepare and ensures you get seen faster.
          </motion.p>

          <div className="max-w-4xl mx-auto space-y-6">
            {upcomingEvents.length === 0 ? (
              <motion.div {...fadeUp} className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
                <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-medium">New events coming soon.</p>
                <p className="text-muted-foreground/60 text-sm mt-1">Check back or follow us on social media for announcements.</p>
              </motion.div>
            ) : (
              upcomingEvents.map((event, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group relative bg-background rounded-2xl border border-border p-0 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_60px_-12px_hsl(160_50%_38%/0.12)]"
                >
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Date badge */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <Calendar className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-0.5" />
                        <span className="text-[10px] font-bold text-primary group-hover:text-primary-foreground transition-colors duration-300 uppercase tracking-wide">Event</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2 flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          {event.location}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{event.description}</p>

                        <div className="flex flex-wrap gap-3">
                          <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm py-2.5 px-6 rounded-full hover:opacity-90 transition-opacity"
                          >
                            Pre-Register for Free
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href="#"
                            className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-sm py-2.5 px-6 rounded-full hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            <Users className="w-3.5 h-3.5" />
                            Volunteer for this Event
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Past Events & Impact */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            Look Back at Our Impact
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-14">
            We don't just talk about the crisis; we take action. Since our inception, we have successfully screened hundreds of men across multiple local government areas.
          </motion.p>

          {/* Masonry-style grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {pastEvents.map((event, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "md:row-span-2" : ""}`}
              >
                <div className={`relative ${i === 0 ? "h-80 md:h-full" : "h-64"}`}>
                  <img
                    src={event.image}
                    alt={event.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block text-[10px] font-bold text-primary bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      {event.location}
                    </span>
                    <h3 className="text-lg font-bold text-background mb-1">{event.caption}</h3>
                    <p className="text-background/70 text-sm font-medium">{event.stat}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Behind every number is a father, a brother, and a community strengthened by early detection. Discover the human impact behind our medical outreaches.
            </p>
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity"
            >
              <Heart className="w-4 h-4" />
              Read Their Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Host an Outreach */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto bg-foreground rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="relative z-10 text-center">
              <motion.div {...fadeUp} className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.h2 {...fadeUp} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl font-bold text-background mb-4">
                Bring SOMI to Your Community or Workplace
              </motion.h2>
              <motion.p {...fadeUp} transition={{ delay: 0.2 }} className="text-background/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Are you a corporate HR director, an LCDA chairman, or a community leader? Partner with us to host a dedicated prostate cancer screening event for your staff or residents. We handle the medical logistics; you provide the venue.
              </motion.p>
              <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity"
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <SomiFooter />
    </div>
  );
};

export default Events;
