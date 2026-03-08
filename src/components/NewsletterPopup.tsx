import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("newsletter_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("newsletter_dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ name: name.trim(), email: email.trim().toLowerCase() });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "You're already subscribed!", description: "Thank you for your continued support." });
      } else {
        toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      }
    } else {
      toast({ title: "Welcome aboard! 🎉", description: "You've joined the fight against prostate cancer." });
    }

    handleClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-background rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close newsletter popup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 pt-7">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">
                Stay in the Loop
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Get updates on our screenings, outreach events, and the impact your support is making in the fight against prostate cancer.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Subscribing..." : "Join the Movement"}
                </button>
              </form>

              <p className="text-muted-foreground text-xs mt-4 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
