import React from "react";
import UserNavMenu from "@/components/user/UserNavMenu";
import UserHeader from "@/components/user/UserHeader";
import UserProjectsHeader from "@/components/user/UserProjectsHeader";
import UserProjects from "@/components/user/UserProjects";
import { Copyright } from "lucide-react";

const UserPanel: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        <UserNavMenu />
        
        <UserProjectsHeader />
        
        <div className="mt-6">
          <UserProjects />
        </div>
      </div>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        <span className="inline-flex items-center justify-center">
        <Copyright className="h-4 w-4 mx-1 inline-block" />
          <img
            src="/lovable-uploads/07427772-7049-41cb-996b-2d1ad53f5d8e.png"
            alt="Banclima Logo"
            className="h-4 inline-block ml-1"
          /> -Todos os direitos reservados
         
        </span>
      </footer>
    </div>
  );
};

export default UserPanel;
