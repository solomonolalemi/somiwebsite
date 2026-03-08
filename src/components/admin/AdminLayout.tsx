import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }

      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      const { data: isSA } = await supabase.rpc("is_superadmin", {
        _user_id: session.user.id,
      });

      if (!isAdmin && !isSA) { navigate("/admin"); return; }
      setIsSuperadmin(!!isSA);
      setLoading(false);
    };
    check();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar isSuperadmin={isSuperadmin} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border bg-background px-4 gap-3">
            <SidebarTrigger />
            <span className="text-sm font-bold text-foreground">SOMI Admin</span>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet context={{ isSuperadmin }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
