
import React from "react";
import { useParams } from "react-router-dom";
import UserHeader from "@/components/user/UserHeader";
import UserNavMenu from "@/components/user/UserNavMenu";
import ProjectDetailView from "@/components/user/ProjectDetailView";

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        <UserNavMenu />
        
        <div className="mt-6">
          <ProjectDetailView projectId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
