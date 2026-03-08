import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quote, Stethoscope, Heart } from "lucide-react";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const stories = [
  {
    id: 1,
    name: "Mr. Adebayo",
    location: "Ajah, Lagos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    excerpt: "A routine screening at 52 changed everything.",
    fullStory: "Mr. Adebayo, a 52-year-old father of three, almost didn't attend the SOMI outreach in Ajah. 'I thought prostate cancer was something that happened to other people,' he recalls. His PSA levels were elevated, and thanks to early detection, he received treatment before the cancer could spread. Today, he is cancer-free and advocates for regular screening in his community.",
  },
  {
    id: 2,
    name: "Chief Okonkwo",
    location: "Ilesha, Osun",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    excerpt: "Early detection gave him more years with his grandchildren.",
    fullStory: "Chief Okonkwo, 64, is a retired civil servant who was diagnosed during the Ilesha outreach. 'The doctors told me that if I had waited even six more months, the outcome would have been very different.' With SOMI's financial assistance fund, he was able to afford his treatment. He now volunteers at every outreach event.",
  },
  {
    id: 3,
    name: "Mr. Fashola",
    location: "Lekki, Lagos",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    excerpt: "From anxiety to advocacy in one afternoon.",
    fullStory: "Mr. Fashola, 47, was terrified of getting tested. 'The stigma around prostate issues is real,' he says. After attending the Lekki LCDA event and receiving a clean bill of health, he started bringing colleagues and friends to subsequent screenings. 'If I can do it, anyone can.'",
  },
  {
    id: 4,
    name: "Pastor Eze",
    location: "Ajah, Lagos",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    excerpt: "His congregation followed his example.",
    fullStory: "Pastor Eze, 58, decided to get screened and then shared his experience with his congregation of over 200 men. 'Health is a blessing we must protect,' he preached. Within weeks, dozens of men from his church signed up for the next SOMI outreach, creating a ripple effect of awareness.",
  },
];

const rippleQuotes = [
  { quote: "When my husband got his results back clear, I cried tears of joy. SOMI gave us peace of mind.", author: "Mrs. Adebayo", role: "Wife" },
  { quote: "Papa is here because someone cared enough to offer a free test. I will always be grateful.", author: "Chioma Okonkwo", role: "Daughter" },
  { quote: "Seeing the relief on families' faces is why I volunteer every single outreach.", author: "Dr. Nnamdi Ibe", role: "Volunteer Urologist" },
];

const volunteers = [
  { name: "Dr. Amara Okeke", role: "Lead Urologist", text: "I've seen firsthand how early detection saves lives. SOMI's model is exactly what Nigeria needs.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face" },
  { name: "Nurse Folake Bello", role: "Outreach Coordinator", text: "Coordinating these screenings and watching men walk away empowered — there's nothing more fulfilling.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=300&h=300&fit=crop&crop=face" },
];

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.h1 {...fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
            Stories of Survival, Strength,{" "}
            <span className="somi-gradient-text">and Brotherhood.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.15, duration: 0.5 }} className="text-lg sm:text-xl text-background/60 max-w-2xl mx-auto">
            Behind every statistic is a father, a brother, a husband, and a friend. These are the men of SOMI.
          </motion.p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            The Faces Behind the Numbers
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-border bg-background transition-all duration-300 hover:shadow-[0_20px_60px_-12px_hsl(160_50%_38%/0.15)] hover:border-primary/40"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-1">{story.name}</h3>
                  <p className="text-xs text-primary font-semibold mb-2">{story.location}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{story.excerpt}</p>
                  <span className="inline-block mt-3 text-sm font-semibold text-primary group-hover:underline">Read story →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm" onClick={() => setSelectedStory(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-background rounded-2xl max-w-lg w-full p-8 relative shadow-2xl">
              <button onClick={() => setSelectedStory(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                <X className="w-4 h-4 text-foreground" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedStory.image} alt={selectedStory.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-foreground text-lg">{selectedStory.name}</h3>
                  <p className="text-primary text-sm font-semibold">{selectedStory.location}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{selectedStory.fullStory}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple Effect */}
      <section className="py-20 lg:py-28 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            The Ripple Effect
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-12">
            When one man is saved, entire families are transformed.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rippleQuotes.map((q, i) => (
              <motion.div key={q.author} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-background rounded-2xl border border-border p-8 relative">
                <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
                <p className="text-foreground leading-relaxed mb-6 italic">"{q.quote}"</p>
                <div>
                  <p className="font-bold text-foreground text-sm">{q.author}</p>
                  <p className="text-muted-foreground text-xs">{q.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Spotlights */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
            <Stethoscope className="inline w-8 h-8 text-primary mr-2 -mt-1" />
            Volunteer Spotlights
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-12">
            The incredible medical professionals who donate their time and expertise.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {volunteers.map((v, i) => (
              <motion.div key={v.name} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex gap-5 bg-muted/30 rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors duration-300">
                <img src={v.image} alt={v.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">{v.name}</h3>
                  <p className="text-primary text-xs font-semibold mb-2">{v.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
            Join the Life-Savers Club.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="text-primary-foreground/70 text-lg mb-8">
            Your monthly gift ensures we never stop screening, educating, and saving lives.
          </motion.p>
          <motion.a {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} href="#" className="inline-flex items-center gap-2 bg-background text-foreground font-semibold py-3.5 px-8 rounded-full hover:opacity-90 transition-opacity">
            <Heart className="w-5 h-5" />
            Give Monthly
          </motion.a>
        </div>
      </section>

      <SomiFooter />
    </div>
  );
};

export default Stories;
