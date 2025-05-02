import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { LogOut } from "lucide-react";

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success("Sessão encerrada com sucesso!");
    // Redirecionamento para a página inicial após logout
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="w-full bg-[#0e7cb4] text-white flex justify-between items-center p-4">
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/f39d7417-003f-492e-a50c-3da391f017a6.png" 
          alt="Banclima Logo" 
          className="h-8" 
        />
        <div className="text-lg font-bold">
          PROJETOS DE IMPACTO SOCIOCLIMÁTICO
        </div>
      </div>
      <Button 
        variant="ghost" 
        className="text-white hover:text-white hover:bg-[#0a5a83] flex items-center gap-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        SAIR
      </Button>
    </div>
  );
};

export default UserHeader;
