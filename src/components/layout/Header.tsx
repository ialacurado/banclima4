
import React from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserCheck } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
      <div className="flex items-center">
        <SidebarTrigger />
        <span className="text-[#0e7cb4] ml-4 font-semibold">Plataforma de gestão</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <Button variant="ghost" size="icon">
          <UserCheck size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
