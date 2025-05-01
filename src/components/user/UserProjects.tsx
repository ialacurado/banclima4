import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

// Mock projects data - in a real app this would come from an API
const projects = [
  {
    id: "Ban12345",
    name: "Moeda Social Carbono",
    region: "RJ/Brasil",
    developer: "Instituto Terrazul",
    status: "Projeto Certificado Gold Standard",
    description: "Primeira certificação Gold Standard de \"redução de emissões de CO2 a partir de reciclagem de PET\".",
    publishedTokens: "282813",
    retiredTokens: "119879",
    attributes: ["Certificação Gold Standard"],
    odsIcons: [1, 8, 13, 5, 12, 17],
    image: "/lovable-uploads/MOEDA-SOCIAL-CARBONO.png"
  },
];

const UserProjects: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Card do projeto */}
        <div className="lg:w-1/3">
          <Card className="overflow-hidden">
            <div className="bg-[#0e7cb4] flex justify-center items-center">
              <img
                src={projects[0].image}
                alt={projects[0].name}
                className="h-40 p-6 object-contain"
              />
            </div>
            
            <CardContent className="p-4">
              <div className="mb-4">
                <p className="font-medium">{projects[0].name}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  <p className="text-sm">{projects[0].status}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Impactos ODS</p>
                <img 
                  src="/lovable-uploads/4eb508d4-ec81-401d-9011-ea6f683b721e.png" 
                  alt="ODS Icons" 
                  className="w-auto h-auto"
                />
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-xs text-gray-500">Tokens Publicados</p>
                  <p className="text-[#0e7cb4] font-bold">{projects[0].publishedTokens}</p>
                </div>
                
                <Link to={`/project/${projects[0].id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Detalhes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Texto explicativo */}
        <div className="lg:w-2/3">
          <Card className="h-full">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <p className="text-gray-800 leading-relaxed">
                Os projetos certificados pelo BANCLIMA MITIGAÇÃO E COMPENSAÇÃO DE CARBONO financiam projetos de proteção climática que reduzem as emissões de gases de efeito estufa e geram benefícios de desenvolvimento sustentável para as comunidades que mais precisam. Cada projeto de MITIGAÇÃO E COMPENSAÇÃO DE CARBONO registrado contribui com as metas de vários Objetivos de Desenvolvimento Sustentável das Nações Unidas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProjects;
