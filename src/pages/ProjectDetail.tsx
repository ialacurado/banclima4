import React from "react";
import { useParams } from "react-router-dom";
import UserHeader from "@/components/user/UserHeader";
import UserNavMenu from "@/components/user/UserNavMenu";
import ProjectDetailView from "@/components/user/ProjectDetailView";
import Footer from "@/components/layout/Footer";

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  
  // Forçando o valor do bairro para ser "Cacuia"
  const projectData = {
    // ... outros dados ...
    bairro: "CACUIA",
    // ... outros dados ...
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <UserNavMenu />
        
        <div className="mt-6">
          <ProjectDetailView projectId={id} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
