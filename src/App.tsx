import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPublications from "./pages/admin/AdminPublications";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import OurImpact from "./pages/OurImpact";
import GetScreened from "./pages/GetScreened";
import Stories from "./pages/Stories";
import CorporatePartners from "./pages/CorporatePartners";
import Events from "./pages/Events";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlog from "./pages/AdminBlog";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminStories from "./pages/admin/AdminStories";
import AdminStats from "./pages/admin/AdminStats";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminUsers from "./pages/admin/AdminUsers";
import SomiChatbot from "./components/SomiChatbot";
import NewsletterPopup from "./components/NewsletterPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/impact" element={<OurImpact />} />
          <Route path="/get-screened" element={<GetScreened />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/partners" element={<CorporatePartners />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="stories" element={<AdminStories />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SomiChatbot />
        <NewsletterPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
