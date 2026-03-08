import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Calendar, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUploader from "@/components/admin/ImageUploader";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string;
  description: string | null;
  is_upcoming: boolean;
  pre_register_open: boolean;
  stat: string | null;
  cover_image_url: string | null;
  gallery_urls: string[];
  display_order: number;
}

const AdminEvents = () => {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({
    title: "", date: "", time: "", location: "", description: "",
    is_upcoming: true, pre_register_open: false, stat: "", cover_image_url: "",
    gallery_urls: [] as string[], display_order: 0,
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetch = useCallback(async () => {
    const { data } = await supabase.from("events").select("*").order("display_order");
    setItems((data as Event[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", date: "", time: "", location: "", description: "", is_upcoming: true, pre_register_open: false, stat: "", cover_image_url: "", gallery_urls: [], display_order: 0 });
    setDialogOpen(true);
  };

  const openEdit = (item: Event) => {
    setEditing(item);
    setForm({
      title: item.title, date: item.date, time: item.time || "", location: item.location,
      description: item.description || "", is_upcoming: item.is_upcoming, pre_register_open: item.pre_register_open,
      stat: item.stat || "", cover_image_url: item.cover_image_url || "",
      gallery_urls: item.gallery_urls || [], display_order: item.display_order,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.location.trim()) {
      toast({ title: "Title and location are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(), date: form.date.trim(), time: form.time.trim() || null,
      location: form.location.trim(), description: form.description.trim() || null,
      is_upcoming: form.is_upcoming, pre_register_open: form.pre_register_open,
      stat: form.stat.trim() || null, cover_image_url: form.cover_image_url || null,
      gallery_urls: form.gallery_urls.filter(Boolean), display_order: form.display_order,
      updated_at: new Date().toISOString(),
    };

    const { error } = editing
      ? await supabase.from("events").update(payload).eq("id", editing.id)
      : await supabase.from("events").insert(payload);

    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: editing ? "Updated" : "Created" }); setDialogOpen(false); fetch(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetch();
  };

  const addGalleryImage = () => setForm({ ...form, gallery_urls: [...form.gallery_urls, ""] });
  const updateGalleryImage = (idx: number, url: string) => {
    const updated = [...form.gallery_urls];
    updated[idx] = url;
    setForm({ ...form, gallery_urls: updated });
  };
  const removeGalleryImage = (idx: number) => {
    setForm({ ...form, gallery_urls: form.gallery_urls.filter((_, i) => i !== idx) });
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-foreground">Events & Outreaches</h1>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">📍 <strong>Appears on:</strong> Events page → Upcoming & Past Events sections</p>

      {loading ? <p className="text-muted-foreground text-center py-12">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-16"><p className="text-muted-foreground mb-4">No events yet.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg"><Plus className="w-4 h-4" /> Add first event</button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-background rounded-xl border border-border p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.is_upcoming ? "bg-blue-500/10 text-blue-500" : "bg-muted text-muted-foreground"}`}>
                    {item.is_upcoming ? "Upcoming" : "Past"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Event" : "New Event"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Event title" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Date *</label>
                <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Saturday, April 18, 2026" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Time</label>
                <input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="9:00 AM – 2:00 PM" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Location *</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Venue, City, State" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="What happens at this event..." />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Stat (for past events)</label>
              <input value={form.stat} onChange={(e) => setForm({ ...form, stat: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Over 400 men screened" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Display Order</label>
              <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_upcoming} onChange={(e) => setForm({ ...form, is_upcoming: e.target.checked })} className="rounded border-border" />
                <span className="text-sm text-foreground">Upcoming event</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.pre_register_open} onChange={(e) => setForm({ ...form, pre_register_open: e.target.checked })} className="rounded border-border" />
                <span className="text-sm text-foreground">Pre-registration open</span>
              </label>
            </div>
            <ImageUploader value={form.cover_image_url} onChange={(url) => setForm({ ...form, cover_image_url: url })} label="Cover Image" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Gallery Images (for past events)</label>
                <button type="button" onClick={addGalleryImage} className="text-xs text-primary font-semibold">+ Add Image</button>
              </div>
              {form.gallery_urls.map((url, idx) => (
                <div key={idx} className="mb-2">
                  <ImageUploader
                    value={url}
                    onChange={(newUrl) => updateGalleryImage(idx, newUrl)}
                    label={`Gallery Image ${idx + 1}`}
                  />
                  <button type="button" onClick={() => removeGalleryImage(idx)} className="text-xs text-destructive mt-1">Remove</button>
                </div>
              ))}
            </div>

            <button onClick={handleSave} disabled={saving} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update Event" : "Create Event"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
