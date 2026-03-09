import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Calendar, BookOpen, BarChart3, DollarSign, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface CountItem {
  label: string;
  count: number;
  icon: typeof FileText;
  href: string;
  color: string;
}

const AdminDashboard = () => {
  const [counts, setCounts] = useState<CountItem[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const [blogs, events, stories, stats, donations, subs] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("impact_stories").select("id", { count: "exact", head: true }),
        supabase.from("impact_stats").select("id", { count: "exact", head: true }),
        supabase.from("donation_records").select("id", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      ]);

      setCounts([
        { label: "Blog Posts", count: blogs.count || 0, icon: FileText, href: "/admin/blog", color: "bg-primary/10 text-primary" },
        { label: "Events", count: events.count || 0, icon: Calendar, href: "/admin/events", color: "bg-blue-500/10 text-blue-500" },
        { label: "Impact Stories", count: stories.count || 0, icon: BookOpen, href: "/admin/stories", color: "bg-amber-500/10 text-amber-500" },
        { label: "Impact Stats", count: stats.count || 0, icon: BarChart3, href: "/admin/stats", color: "bg-violet-500/10 text-violet-500" },
        { label: "Donations", count: donations.count || 0, icon: DollarSign, href: "/admin/donations", color: "bg-emerald-500/10 text-emerald-500" },
        { label: "Subscribers", count: subs.count || 0, icon: Mail, href: "/admin/subscribers", color: "bg-pink-500/10 text-pink-500" },
      ]);
    };
    fetchCounts();
  }, []);

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to SOMI Admin</h1>
      <p className="text-muted-foreground text-sm mb-8">Manage your website content from here. Each section is labelled with where it appears on the website.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {counts.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="bg-background rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
              <item.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{item.count}</p>
            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-background rounded-xl border border-border p-6">
        <h2 className="font-bold text-foreground mb-3">Quick Reference — Where content appears</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><span className="font-semibold text-foreground">Blog Posts</span> → Stories page → Blog section at bottom</li>
          <li><span className="font-semibold text-foreground">Events & Outreaches</span> → Events page → Upcoming & Past Events sections</li>
          <li><span className="font-semibold text-foreground">Impact Stories</span> → Stories page → Media grid with play buttons</li>
          <li><span className="font-semibold text-foreground">Impact Statistics</span> → Our Impact page → Animated counters at top</li>
          <li><span className="font-semibold text-foreground">Donations</span> → Internal tracking only (not shown publicly)</li>
          <li><span className="font-semibold text-foreground">Subscribers</span> → Newsletter sign-ups from popup & footer</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
