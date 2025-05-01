
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import {
  Users,
  FileText,
  Clock,
  Layers,
  Award,
  BarChart,
  ShoppingCart,
  LogOut,
  Settings,
  UserCheck,
  Home
} from "lucide-react";

interface SidebarNavProps {
  userRole: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ userRole }) => {
  const location = useLocation();

  // Check if current path starts with the given path
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <SidebarHeader className="p-4 flex flex-col justify-center items-center gap-2">
        <img 
          src="/lovable-uploads/f39d7417-003f-492e-a50c-3da391f017a6.png" 
          alt="Banclima Logo" 
          className="h-8" 
        />
        <span className="text-white text-sm font-medium">Plataforma de gestão</span>
      </SidebarHeader>
      <SidebarContent>
        {userRole === "admin" && (
          <div className="px-3 py-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin") && !isActive("/admin/") ? "bg-sidebar-accent" : "bg-transparent"}>
                  <Link to="/admin" className="flex items-center gap-3 font-semibold text-white/90">
                    <Home size={18} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/users") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/users" className="flex items-center gap-3">
                    <Users size={18} />
                    <span>Gerenciar Usuários</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/access-log") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/access-log" className="flex items-center gap-3">
                    <Clock size={18} />
                    <span>Log de Acesso</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/registry") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/registry" className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>Conta de Registro</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/projects") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/projects" className="flex items-center gap-3">
                    <Layers size={18} />
                    <span>Projetos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/certificates") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/certificates" className="flex items-center gap-3">
                    <Award size={18} />
                    <span>Certificados</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/tokenization") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/tokenization" className="flex items-center gap-3">
                    <BarChart size={18} />
                    <span>Tokenização</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/commercialization") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/commercialization" className="flex items-center gap-3">
                    <ShoppingCart size={18} />
                    <span>Comercialização</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={isActive("/admin/reports") ? "bg-sidebar-accent" : ""}>
                  <Link to="/admin/reports" className="flex items-center gap-3">
                    <BarChart size={18} />
                    <span>Relatório Sistema</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        )}

        {/* Regular User Menu */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-sm font-semibold text-white/90">
            Conta
          </h2>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={isActive("/profile") ? "bg-sidebar-accent" : ""}>
                <Link to="/profile" className="flex items-center gap-3">
                  <UserCheck size={18} />
                  <span>Meu Perfil</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={isActive("/settings") ? "bg-sidebar-accent" : ""}>
                <Link to="/settings" className="flex items-center gap-3">
                  <Settings size={18} />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-red-200">
                <button className="flex items-center gap-3 w-full text-left">
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </>
  );
};

export default SidebarNav;
