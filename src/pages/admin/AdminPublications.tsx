import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

interface Publication {
  id: string;
  title: string;
  publisher: string;
  url: string;
  description: string | null;
  cover_image_url: string | null;
  display_order: number;
  published: boolean;
}

const empty: Omit<Publication, "id"> = {
  title: "",
  publisher: "",
  url: "",
  description: "",
  cover_image_url: "",
  display_order: 0,
  published: true,
};

const AdminPublications = () => {
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [form, setForm] = useState<Omit<Publication, "id">>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase
      .from("research_publications")
      .select("*")
      .order("display_order");
    if (data) setPubs(data);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setEditId(null); setOpen(true); };
  const openEdit = (p: Publication) => {
    setForm({ title: p.title, publisher: p.publisher, url: p.url, description: p.description, cover_image_url: p.cover_image_url, display_order: p.display_order, published: p.published });
    setEditId(p.id);
    setOpen(true);
  };

  const save = async () => {
    if (!form.title || !form.publisher || !form.url) {
      toast({ title: "Title, publisher and URL are required", variant: "destructive" });
      return;
    }
    const payload = { ...form, description: form.description || null, cover_image_url: form.cover_image_url || null };

    if (editId) {
      await supabase.from("research_publications").update(payload).eq("id", editId);
      toast({ title: "Publication updated" });
    } else {
      await supabase.from("research_publications").insert(payload);
      toast({ title: "Publication added" });
    }
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this publication?")) return;
    await supabase.from("research_publications").delete().eq("id", id);
    toast({ title: "Deleted" });
    load();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Research Publications</h1>
          <p className="text-sm text-muted-foreground">Appears on: Homepage → Research &amp; Publications section</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Add Publication</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editId ? "Edit" : "Add"} Publication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Textarea value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <Label>Publisher *</Label>
                <Input value={form.publisher} onChange={e => setForm(f => ({ ...f, publisher: e.target.value }))} />
              </div>
              <div>
                <Label>URL *</Label>
                <Input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: Number(e.target.value) }))} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.published} onCheckedChange={v => setForm(f => ({ ...f, published: v }))} />
                <Label>Published</Label>
              </div>
              <Button onClick={save} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {pubs.map(p => (
          <div key={p.id} className="flex items-start gap-4 p-4 border rounded-xl bg-card">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2">{p.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{p.publisher}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 mt-1">
                View <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {p.published ? "Live" : "Draft"}
              </span>
              <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {pubs.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No publications yet.</p>}
      </div>
    </div>
  );
};

export default AdminPublications;
