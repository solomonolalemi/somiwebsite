import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  updated_at: string;
}

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    author_name: "SOMI Team",
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (!isAdmin) { navigate("/admin"); return; }
      fetchPosts();
    };
    checkAdmin();
  }, [navigate, fetchPosts]);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author_name: "SOMI Team", published: false });
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      cover_image_url: post.cover_image_url || "",
      author_name: post.author_name,
      published: post.published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: "Title and content are required", variant: "destructive" });
      return;
    }

    setSaving(true);
    const slug = form.slug.trim() || generateSlug(form.title);
    const payload = {
      title: form.title.trim(),
      slug,
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim(),
      cover_image_url: form.cover_image_url.trim() || null,
      author_name: form.author_name.trim() || "SOMI Team",
      published: form.published,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error saving post", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editing ? "Post updated" : "Post created" });
      setDialogOpen(false);
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting", description: error.message, variant: "destructive" });
    } else {
      fetchPosts();
    }
  };

  const togglePublish = async (post: BlogPost) => {
    await supabase.from("blog_posts").update({ published: !post.published, updated_at: new Date().toISOString() }).eq("id", post.id);
    fetchPosts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">Blog Dashboard</h1>
          <div className="flex items-center gap-3">
            <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> New Post
            </button>
            <button onClick={handleLogout} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-muted-foreground text-center py-12">Loading...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No blog posts yet.</p>
            <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-background rounded-xl border border-border p-5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm truncate">{post.excerpt || "No excerpt"}</p>
                  <p className="text-muted-foreground text-xs mt-1">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => togglePublish(post)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title={post.published ? "Unpublish" : "Publish"}>
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(post)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || generateSlug(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="post-url-slug"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="Short summary..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Content *</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={10}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                placeholder="Write your blog post content here..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Cover Image URL</label>
              <input
                value={form.cover_image_url}
                onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Author Name</label>
              <input
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="SOMI Team"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-sm text-foreground">Publish immediately</span>
            </label>
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
