import { motion } from "framer-motion";
import { Play, ArrowRight, ChevronLeft, ChevronRight, Shield, Youtube, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SomiHeader from "@/components/SomiHeader";
import SomiFooter from "@/components/SomiFooter";
import BlogSection from "@/components/BlogSection";
import somiLogo from "@/assets/somi-logo.png";
import somiEvent2 from "@/assets/somi-event-2.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

interface ImpactStory {
  id: string;
  category: string;
  image_url: string | null;
  title: string;
  description: string | null;
  has_video: boolean;
  video_url?: string | null;
}

const ITEMS_PER_PAGE = 4;

const Stories = () => {
  const [impactStories, setImpactStories] = useState<ImpactStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await supabase
        .from("impact_stories")
        .select("*")
        .eq("published", true)
        .order("display_order");
      setImpactStories((data as ImpactStory[]) || []);
      setLoading(false);
    };
    fetchStories();
  }, []);

  const totalPages = Math.ceil(impactStories.length / ITEMS_PER_PAGE);
  const paginatedStories = impactStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStoryClick = (story: ImpactStory) => {
    if (story.has_video && story.video_url) {
      // Open video in new tab with proper handling for production
      const link = document.createElement("a");
      link.href = story.video_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SomiHeader />

      {/* Section 1: Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={somiEvent2}
            alt="SOMI screening event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/85" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <motion.span {...fadeUp} className="inline-block text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Impact Stories
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-4"
          >
            We've Impacted{" "}
            <span className="somi-gradient-text">Lives.</span>
          </motion.h1>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-xl sm:text-2xl font-semibold text-background/80 mb-6"
          >
            Transforming Lives: Our Impact Story
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-background/60 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-4"
          >
            At the Saving Our Men Initiative (SOMI), we are dedicated to combating prostate cancer mortality in Nigeria. Through our mobile medical outreaches and community initiatives, we have made significant strides in improving healthcare access and early detection for men across the country.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-background/50 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-10"
          >
            From providing free Prostate-Specific Antigen (PSA) screenings and counseling to deploying financial aid for treatments, our efforts have led to tangible results and transformed countless lives. By empowering local communities, partnering with local governments, and integrating digital health data collection, we are building a sustainable foundation for healthier futures.
          </motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.5 }} className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.youtube.com/@SavingOurMen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-7 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              <Youtube className="w-4 h-4" />
              Subscribe on YouTube
            </a>
            <a
              href="https://www.instagram.com/savingourmen/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-background/20 text-background font-semibold py-3 px-7 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Follow Our Journey
            </a>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Impact Media Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h3 {...fadeUp} className="text-2xl sm:text-3xl font-bold text-foreground mb-12 text-center">
            Choose an impact story to explore:
          </motion.h3>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-muted-foreground">Loading stories...</p>
            </div>
          ) : impactStories.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-muted-foreground text-center">No published stories yet. Check back soon!</p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedStories.map((story, i) => (
              <motion.div
                key={story.id}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => handleStoryClick(story)}
                className="group relative bg-background rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_60px_-12px_hsl(160_50%_38%/0.12)]"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  {story.image_url ? (
                    <>
                      <img
                        src={story.image_url}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}

                  {/* Play button */}
                  {story.has_video && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold text-primary bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {story.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {story.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                    {story.has_video ? "Watch Story" : "Read More"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors px-3 py-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-full text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors px-3 py-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="text-center mt-10">
            <a
              href="https://www.youtube.com/@SavingOurMen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-sm py-2.5 px-6 rounded-full hover:border-primary/40 hover:text-primary transition-colors"
            >
              <Youtube className="w-4 h-4" />
              Watch All Impact Stories on YouTube
            </a>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Trust & Compliance Banner */}
      <section className="py-16 lg:py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp} className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <img src={somiLogo} alt="SOMI Logo" className="h-10 w-auto opacity-80" />
              <div className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground uppercase tracking-wide">NDPR Audit Compliant</span>
              </div>
            </motion.div>

            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
              SOMI is a registered non-profit organization birthed with the mission to reduce prostate cancer mortality in Nigeria. We are fully compliant with the Nigeria Data Protection Regulation (NDPR), ensuring all patient data collected during our outreaches is strictly confidential and secure.
            </motion.p>
          </div>
        </div>
      </section>

      <BlogSection />

      <SomiFooter />
    </div>
  );
};

export default Stories;
