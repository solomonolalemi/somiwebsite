import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Trash2, Shield, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
}

const AdminUsers = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "superadmin">("admin");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchRoles = useCallback(async () => {
    const { data } = await supabase.from("user_roles").select("*");
    setRoles((data as UserRole[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchRoles(); }, [fetchRoles]);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) { toast({ title: "Email is required", variant: "destructive" }); return; }
    setSaving(true);

    // First sign up the user (they'll get an email to set password)
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: inviteEmail.trim(),
      password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2), // temp password
    });

    if (signupError) {
      toast({ title: "Failed to create user", description: signupError.message, variant: "destructive" });
      setSaving(false);
      return;
    }

    if (!signupData.user) {
      toast({ title: "User already exists. Add their role manually via the user_id.", variant: "destructive" });
      setSaving(false);
      return;
    }

    // Assign role
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: signupData.user.id,
      role: inviteRole,
    });

    setSaving(false);
    if (roleError) {
      toast({ title: "User created but role assignment failed", description: roleError.message, variant: "destructive" });
    } else {
      toast({ title: "Admin invited!", description: `${inviteEmail} has been added as ${inviteRole}` });
      setDialogOpen(false);
      setInviteEmail("");
      fetchRoles();
    }
  };

  const handleRemoveRole = async (id: string) => {
    if (!confirm("Remove this admin role?")) return;
    await supabase.from("user_roles").delete().eq("id", id);
    fetchRoles();
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-foreground">User Management</h1>
        <button onClick={() => setDialogOpen(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <UserPlus className="w-4 h-4" /> Invite Admin
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">👑 <strong>Superadmin only</strong> — Invite and manage admin accounts</p>

      {loading ? <p className="text-muted-foreground text-center py-12">Loading...</p> : roles.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No admin roles assigned yet.</p>
      ) : (
        <div className="space-y-3">
          {roles.map((r) => (
            <div key={r.id} className="bg-background rounded-xl border border-border p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {r.role === "superadmin" ? (
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                ) : (
                  <Shield className="w-5 h-5 text-primary" />
                )}
                <div>
                  <p className="font-semibold text-foreground text-sm">{r.user_id}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.role === "superadmin" ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"}`}>
                    {r.role}
                  </span>
                </div>
              </div>
              <button onClick={() => handleRemoveRole(r.id)} className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Invite Admin</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
              <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} type="email" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Role</label>
              <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value as "admin" | "superadmin")} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="admin">Admin — can manage content</option>
                <option value="superadmin">Superadmin — can manage content + invite admins</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground">The invited user will be created with a temporary password. They should use "Forgot Password" to set their own.</p>
            <button onClick={handleInvite} disabled={saving} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {saving ? "Inviting..." : "Send Invite"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
