import React from "react";
import { Link } from "react-router-dom";
import UserNavMenu from "@/components/user/UserNavMenu";
import UserHeader from "@/components/user/UserHeader";
import UserProjectsHeader from "@/components/user/UserProjectsHeader";
import UserProjects from "@/components/user/UserProjects";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const UserPanel: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <UserNavMenu />
        
        <UserProjectsHeader />
        
        <div className="mt-4 flex justify-end">
          <Link to="/my-projects">
            <Button variant="outline" className="flex items-center gap-2 bg-[#0e7cb4] text-white hover:bg-[#0a5c87]">
              <User className="h-4 w-4" />
              Meus Projetos
            </Button>
          </Link>
        </div>

        <div className="mt-6">
          <UserProjects />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPanel;
