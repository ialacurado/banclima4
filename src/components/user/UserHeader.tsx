import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UserHeader: React.FC = () => {
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
      <Link to="/login">
        <Button variant="ghost" className="text-white hover:text-white hover:bg-[#0a5a83]">
          SAIR
        </Button>
      </Link>
    </div>
  );
};

export default UserHeader;
