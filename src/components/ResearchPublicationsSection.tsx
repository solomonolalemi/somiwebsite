import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import patternSvg from "@/assets/pattern-outline.svg";

interface Publication {
  id: string;
  title: string;
  publisher: string;
  url: string;
  description: string | null;
  cover_image_url: string | null;
  display_order: number;
}

const CARD_COLORS = [
  "bg-[hsl(var(--somi-navy))] text-white",
  "bg-[hsl(var(--secondary))] text-foreground",
  "bg-[hsl(var(--somi-navy))] text-white",
  "bg-[hsl(var(--secondary))] text-foreground",
  "bg-[hsl(var(--somi-navy))] text-white",
];

const ResearchPublicationsSection = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("research_publications")
        .select("*")
        .eq("published", true)
        .order("display_order");
      if (data) setPublications(data);
    };
    fetch();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (publications.length === 0) return null;

  return (
    <section className="relative py-20 lg:py-28 somi-section-light overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img 
          src={patternSvg} 
          alt="" 
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Our Research &amp; Publications
            </h2>
            <p className="text-muted-foreground mt-3 text-base lg:text-lg">
              Peer-reviewed journals advancing prostate cancer research in
              Africa.
            </p>
          </motion.div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {publications.map((pub, i) => {
            const colorClass = CARD_COLORS[i % CARD_COLORS.length];
            const isDark = colorClass.includes("text-white");

            return (
              <motion.a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group flex-shrink-0 w-[300px] sm:w-[320px] rounded-2xl p-7 flex flex-col justify-between min-h-[280px] snap-start transition-shadow hover:shadow-lg ${colorClass}`}
              >
                <div>
                  <h3 className="text-lg font-bold leading-snug mb-3 line-clamp-4">
                    {pub.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {pub.publisher}
                  </p>
                </div>

                <div
                  className={`mt-6 flex items-center gap-1.5 text-sm font-medium ${
                    isDark
                      ? "text-white/80 group-hover:text-white"
                      : "text-primary group-hover:text-primary/80"
                  } transition-colors`}
                >
                  Read Paper
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchPublicationsSection;
