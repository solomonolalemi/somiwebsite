import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Donation {
  id: string;
  donor_name: string | null;
  amount: number;
  currency: string;
  donation_type: string;
  notes: string | null;
  recorded_at: string;
}

const AdminDonations = () => {
  const [items, setItems] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Donation | null>(null);
  const [form, setForm] = useState({
    donor_name: "", amount: 0, currency: "NGN", donation_type: "one-time", notes: "", recorded_at: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchItems = useCallback(async () => {
    const { data } = await supabase.from("donation_records").select("*").order("recorded_at", { ascending: false });
    setItems((data as Donation[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openNew = () => {
    setEditing(null);
    setForm({ donor_name: "", amount: 0, currency: "NGN", donation_type: "one-time", notes: "", recorded_at: new Date().toISOString().split("T")[0] });
    setDialogOpen(true);
  };

  const openEdit = (item: Donation) => {
    setEditing(item);
    setForm({
      donor_name: item.donor_name || "", amount: item.amount, currency: item.currency,
      donation_type: item.donation_type, notes: item.notes || "",
      recorded_at: item.recorded_at.split("T")[0],
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (form.amount <= 0) { toast({ title: "Amount must be > 0", variant: "destructive" }); return; }
    setSaving(true);
    const payload = {
      donor_name: form.donor_name.trim() || null, amount: form.amount,
      currency: form.currency, donation_type: form.donation_type,
      notes: form.notes.trim() || null, recorded_at: new Date(form.recorded_at).toISOString(),
    };
    const { error } = editing
      ? await supabase.from("donation_records").update(payload).eq("id", editing.id)
      : await supabase.from("donation_records").insert(payload);
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: editing ? "Updated" : "Recorded" }); setDialogOpen(false); fetchItems(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    await supabase.from("donation_records").delete().eq("id", id);
    fetchItems();
  };

  const totalNGN = items.filter((d) => d.currency === "NGN").reduce((sum, d) => sum + d.amount, 0);
  const totalUSD = items.filter((d) => d.currency === "USD").reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-foreground">Donation Records</h1>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Record Donation
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">💰 <strong>Internal tracking only</strong> — not displayed publicly on the website</p>

      <div className="flex gap-4 mb-6">
        <div className="bg-background rounded-xl border border-border p-4 flex-1">
          <p className="text-xs text-muted-foreground mb-1">Total (NGN)</p>
          <p className="text-xl font-bold text-foreground">₦{totalNGN.toLocaleString()}</p>
        </div>
        <div className="bg-background rounded-xl border border-border p-4 flex-1">
          <p className="text-xs text-muted-foreground mb-1">Total (USD)</p>
          <p className="text-xl font-bold text-foreground">${totalUSD.toLocaleString()}</p>
        </div>
      </div>

      {loading ? <p className="text-muted-foreground text-center py-12">Loading...</p> : items.length === 0 ? (
        <div className="text-center py-16"><p className="text-muted-foreground mb-4">No donations recorded.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg"><Plus className="w-4 h-4" /> Record first donation</button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-background rounded-xl border border-border p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{item.currency === "NGN" ? "₦" : "$"}{item.amount.toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs">{item.donor_name || "Anonymous"} • {item.donation_type} • {new Date(item.recorded_at).toLocaleDateString()}</p>
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit Record" : "Record Donation"}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Donor Name</label>
              <input value={form.donor_name} onChange={(e) => setForm({ ...form, donor_name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Leave empty for anonymous" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Amount *</label>
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Currency</label>
                <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="NGN">NGN (₦)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Type</label>
              <select value={form.donation_type} onChange={(e) => setForm({ ...form, donation_type: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
              <input type="date" value={form.recorded_at} onChange={(e) => setForm({ ...form, recorded_at: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? "Saving..." : editing ? "Update" : "Record Donation"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDonations;
