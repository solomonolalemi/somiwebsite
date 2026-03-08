import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  author_name: string;
  created_at: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      setPosts((data as BlogPost[]) || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            From the <span className="somi-gradient-text">Blog</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Insights, updates, and stories from our ongoing fight against prostate cancer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post, i) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(post)}
              className="group text-left bg-background rounded-2xl border border-border overflow-hidden cursor-pointer transition-shadow duration-500 hover:shadow-[0_16px_48px_-12px_hsl(var(--primary)/0.15)] hover:border-primary/40"
            >
              {post.cover_image_url && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author_name}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-400">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Full post dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl leading-snug">{selected?.title}</DialogTitle>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selected && new Date(selected.created_at).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <User className="w-3 h-3" />
                {selected?.author_name}
              </span>
            </div>
          </DialogHeader>
          {selected?.cover_image_url && (
            <img
              src={selected.cover_image_url}
              alt={selected.title}
              className="w-full rounded-lg object-cover max-h-64 mt-2"
            />
          )}
          <DialogDescription className="text-foreground/80 leading-relaxed whitespace-pre-line mt-2 text-sm">
            {selected?.content}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogSection;
