import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  FileText,
  Calendar,
  BookOpen,
  BarChart3,
  DollarSign,
  Users,
  LogOut,
  Home,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Blog Posts", url: "/admin/blog", icon: FileText, hint: "Appears on: Stories page → Blog section" },
  { title: "Events & Outreaches", url: "/admin/events", icon: Calendar, hint: "Appears on: Events page" },
  { title: "Impact Stories", url: "/admin/stories", icon: BookOpen, hint: "Appears on: Stories page → Media grid" },
  { title: "Impact Statistics", url: "/admin/stats", icon: BarChart3, hint: "Appears on: Our Impact page → Counters" },
  { title: "Publications", url: "/admin/publications", icon: GraduationCap, hint: "Appears on: Homepage → Research section" },
  { title: "Donations", url: "/admin/donations", icon: DollarSign, hint: "Internal records tracking" },
];

const AdminSidebar = ({ isSuperadmin }: { isSuperadmin: boolean }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const allItems = isSuperadmin
    ? [...navItems, { title: "User Management", url: "/admin/users", icon: Users, hint: "Invite & manage admin roles" }]
    : navItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allItems.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={collapsed ? item.title : undefined}
                    >
                      <button
                        onClick={() => navigate(item.url)}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={collapsed ? "Logout" : undefined}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Logout</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
