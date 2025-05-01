
import React from "react";
import { MapPin } from "lucide-react";

interface ProjectMapProps {
  projectId: string;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ projectId }) => {
  // In a real app, you would use the projectId to fetch specific location data
  return (
    <div className="w-full h-full min-h-[140px] rounded-lg overflow-hidden relative">
      <img 
        src="/lovable-uploads/7962ee92-41b5-472a-b502-df4b7ad81947.png" 
        alt="Project location map" 
        className="w-full h-full object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-green-500 rounded-full p-1.5">
          <MapPin className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ProjectMap;
