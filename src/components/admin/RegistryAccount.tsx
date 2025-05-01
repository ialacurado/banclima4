
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const RegistryAccount = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Conta de Registro</h1>
        <Button className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Localizar registro
        </Button>
      </div>
    </div>
  );
};

export default RegistryAccount;
