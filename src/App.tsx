import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAccessLog from "./pages/admin/AdminAccessLog";
import AdminRegistry from "./pages/admin/AdminRegistry";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminCommercialization from "./pages/admin/AdminCommercialization";
import AdminReports from "./pages/admin/AdminReports";
import AdminTokenization from "./pages/admin/AdminTokenization";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectDetail from "./pages/admin/AdminProjectDetail";
import Profile from "./pages/Profile";
import UserPanel from "./pages/UserPanel";
import ProjectDetail from "./pages/ProjectDetail";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/panel" element={<UserPanel />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/carbon-currency" element={<UserPanel />} />
          <Route path="/emission" element={<UserPanel />} />
          <Route path="/traceability" element={<UserPanel />} />
          <Route path="/certificates" element={<UserPanel />} />
          <Route path="/marketplace" element={<UserPanel />} />
          <Route path="/compliance" element={<UserPanel />} />
          <Route path="/retirement" element={<UserPanel />} />
          <Route path="/educational" element={<UserPanel />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/access-log" element={<AdminAccessLog />} />
          <Route path="/admin/registry" element={<AdminRegistry />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          <Route path="/admin/tokenization" element={<AdminTokenization />} />
          <Route path="/admin/commercialization" element={<AdminCommercialization />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/:id" element={<AdminProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
