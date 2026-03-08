import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string | null;
  icon: string | null;
  display_order: number;
  section: string;
}

const AdminStats = () => {
  const [items, setItems] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Stat | null>(null);
  const [form, setForm] = useState({
    label: "", value: 0, suffix: "+", icon: "Users", display_order: 0, section: "hero",
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchItems = useCallback(async () => {
    const { data } = await supabase.from("impact_stats").select("*").order("display_order");
    setItems((data as Stat[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openNew = () => {
    setEditing(null);
    setForm({ label: "", value: 0, suffix: "+", icon: "Users", display_order: 0, section: "hero" });
    setDialogOpen(true);
  };

  const openEdit = (item: Stat) => {
    setEditing(item);
    setForm({ label: item.label, value: item.value, suffix: item.suffix || "", icon: item.icon || "Users", display_order: item.display_order, section: item.section });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.label.trim()) { toast({ title: "Label is required", variant: "destructive" }); return; }
    setSaving(true);
    const payload = {
      label: form.label.trim(), value: form.value, suffix: form.suffix || null,
      icon: form.icon || null, display_order: form.display_order, section: form.section,
      updated_at: new Date().toISOString(),
    };
    const { error } = editing
      ? await supabase.from("impact_stats").update(payload).eq("id", editing.id)
      : await supabase.from("impact_stats").insert(payload);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: editing ? "Updated" : "Created" }); setDialogOpen(false); fetchItems(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this stat?")) return;
    await supabase.from("impact_stats").delete().eq("id", id);
    fetchItems();
  };

  const icons = ["Users", "Building2", "Heart", "Tablet", "ShieldCheck", "MapPin", "Calendar", "DollarSign"];
  const sections = [
    { value: "hero", label: "Hero counters (Our Impact page top)" },
    { value: "map", label: "Map section (Our Impact page)" },
    { value: "landing", label: "Landing page" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-foreground">Impact Statistics</h1>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Stat
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">📊 <strong>Appears on:</strong> Our Impact page → Animated counters section at top</p>

      {loading ? <p className="text-muted-foreground text-center py-12">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-16"><p className="text-muted-foreground mb-4">No statistics yet.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg"><Plus className="w-4 h-4" /> Add first stat</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-background rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{item.section}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{item.value}{item.suffix}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit Stat" : "New Stat"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Label *</label>
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Men Screened" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Value *</label>
                <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Suffix</label>
                <input value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Icon</label>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                {icons.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Section (where it appears)</label>
              <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                {sections.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Display Order</label>
              <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update Stat" : "Create Stat"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStats;
