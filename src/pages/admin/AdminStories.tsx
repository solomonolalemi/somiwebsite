import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUploader from "@/components/admin/ImageUploader";

interface Story {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  has_video: boolean;
  video_url: string | null;
  display_order: number;
  published: boolean;
}

const AdminStories = () => {
  const [items, setItems] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Story | null>(null);
  const [form, setForm] = useState({
    title: "", description: "", category: "Community Impact",
    image_url: "", has_video: false, video_url: "", display_order: 0, published: false,
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchItems = useCallback(async () => {
    const { data } = await supabase.from("impact_stories").select("*").order("display_order");
    setItems((data as Story[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", description: "", category: "Community Impact", image_url: "", has_video: false, video_url: "", display_order: 0, published: false });
    setDialogOpen(true);
  };

  const openEdit = (item: Story) => {
    setEditing(item);
    setForm({
      title: item.title, description: item.description || "", category: item.category,
      image_url: item.image_url || "", has_video: item.has_video, video_url: item.video_url || "",
      display_order: item.display_order, published: item.published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setSaving(true);
    const payload = {
      title: form.title.trim(), description: form.description.trim() || null,
      category: form.category.trim(), image_url: form.image_url || null,
      has_video: form.has_video, video_url: form.video_url || null,
      display_order: form.display_order, published: form.published,
      updated_at: new Date().toISOString(),
    };
    const { error } = editing
      ? await supabase.from("impact_stories").update(payload).eq("id", editing.id)
      : await supabase.from("impact_stories").insert(payload);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: editing ? "Updated" : "Created" }); setDialogOpen(false); fetchItems(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this story?")) return;
    await supabase.from("impact_stories").delete().eq("id", id);
    fetchItems();
  };

  const togglePublish = async (item: Story) => {
    await supabase.from("impact_stories").update({ published: !item.published, updated_at: new Date().toISOString() }).eq("id", item.id);
    fetchItems();
  };

  const categories = ["Community Impact", "Human Story", "Digital Innovation", "Government Partnership"];

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-foreground">Impact Stories</h1>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Story
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">🎬 <strong>Appears on:</strong> Stories page → Impact media grid with video play buttons</p>

      {loading ? <p className="text-muted-foreground text-center py-12">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-16"><p className="text-muted-foreground mb-4">No stories yet.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg"><Plus className="w-4 h-4" /> Add first story</button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-background rounded-xl border border-border p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {item.image_url && <img src={item.image_url} alt="" className="w-14 h-14 rounded-lg object-cover border border-border shrink-0" />}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">{item.category} {item.has_video ? "• 🎥 Video" : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => togglePublish(item)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Story" : "New Story"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
            <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} label="Cover Image" />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.has_video} onChange={(e) => setForm({ ...form, has_video: e.target.checked })} className="rounded border-border" />
              <span className="text-sm text-foreground">Has video</span>
            </label>
            {form.has_video && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Video URL</label>
                <input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://youtube.com/..." />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Display Order</label>
              <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded border-border" />
              <span className="text-sm text-foreground">Publish immediately</span>
            </label>
            <button onClick={handleSave} disabled={saving} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update Story" : "Create Story"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStories;
