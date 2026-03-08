import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminBlog from "./pages/AdminBlog";
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
          <Route path="/admin/blog" element={<AdminBlog />} />
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
