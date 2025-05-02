import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft, Check, LogIn, Shapes } from "lucide-react";
import ProjectMap from "./ProjectMap";
import ProjectRegion from "./ProjectRegion";
import { Badge } from "@/components/ui/badge";

interface ProjectDetailViewProps {
  projectId?: string;
}

// Mock project data - in a real app this would come from an API
const getProjectData = (id: string) => {
  return {
    id: id || "Ban12345",
    name: "Moeda Social Carbono - Colônia Z10",
    registryId: "54321",
    bairro: "CACUIA",
    region: "RJ/Brasil",
    description: "MOEDA SOCIAL CARBONO\n\nO projeto propõe a realização de inventário de emissões de gases de efeito estufa de unidades residenciais, comerciais e/ou empresas, com apoio de cadastro online e/ou presencial, tudo com apoio de uma Calculadora de Emissões de Gases.\n\nAs reduções significam geração de créditos de carbono, que transformados em Moeda Social Carbono, são lançados no BANCLIMA, em sua conta cadastrada.",
    developer: "Instituto Terrazul",
    partnerships: "Prefeitura do Rio / CEA / Colônia de Pescadores Z10",
    support: "Moove",
    projectType: "Mitigação",
    status: "Ativo",
    publishedTokens: "282813",
    retiredTokens: "119879",
    odsIcons: [1, 8, 13, 5, 12, 17],
    attributes: [],
    images: ["/lovable-uploads/WhatsApp Image 2025-04-03 at 18.32.45 (2).jpeg"]
  };
};

// Gets color class based on ODS number
const getOdsColorClass = (odsNumber: number): string => {
  const colorMap: Record<number, string> = {
    1: "bg-[#e5243b]", // Red
    2: "bg-[#DDA63A]", // Yellow-orange
    3: "bg-[#4C9F38]", // Green
    4: "bg-[#C5192D]", // Deep red
    5: "bg-[#FF3A21]", // Orange-red
    6: "bg-[#26BDE2]", // Light blue
    7: "bg-[#FCC30B]", // Yellow
    8: "bg-[#A21942]", // Burgundy
    9: "bg-[#FD6925]", // Orange
    10: "bg-[#DD1367]", // Pink
    11: "bg-[#FD9D24]", // Light orange
    12: "bg-[#BF8B2E]", // Brown
    13: "bg-[#3F7E44]", // Dark green
    14: "bg-[#0A97D9]", // Blue
    15: "bg-[#56C02B]", // Light green
    16: "bg-[#00689D]", // Dark blue
    17: "bg-[#19486A]"  // Navy
  };
  
  return colorMap[odsNumber] || "bg-gray-500";
};

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ projectId }) => {
  const project = getProjectData(projectId || "");
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="mb-4">
         <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="w-full text-center py-10 bg-[#0e7cb4] text-white">
        <h1 className="text-3xl font-bold mb-2">MOEDA SOCIAL CARBONO – COLÔNIA Z10</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="bg-[#0e7cb4] p-0">
              <img
                src={project.images[0]}
                alt={project.name}
                className="w-full h-[300px] object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-lg">{project.name}</p>
                  <p className="text-sm text-gray-600">Registro Banclima {project.registryId}</p>
                  <p className="text-sm text-gray-600">Região: {project.region}</p>
                  <p className="text-sm text-gray-600">Tipo: {project.projectType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <p className="text-sm">{project.status}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Tokens Publicados</p>
                  <p className="text-xl font-bold text-[#0e7cb4]">{project.publishedTokens}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Tokens Aposentados</p>
                  <p className="text-xl font-bold text-[#0e7cb4]">{project.retiredTokens}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Sobre o Projeto</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Desenvolvedor</strong>: {project.developer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Parcerias</strong>: {project.partnerships}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Apoio</strong>: {project.support}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Quantidade de Moradores:</strong> 40</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Início do Projeto:</strong> Janeiro de 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Emissões Evitadas:</strong> 5.280,80 KgCO2e</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Período de Bonificação:</strong> Trimestral</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#0e7cb4]"></div>
                      <span><strong>Benefícios concedidos:</strong> R$ 2.740,00</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Impactos ODS</h3>
                <div>
                  <img 
                    src="/lovable-uploads/6204ceab-eb43-4664-a6b6-11446c29a6f6.png" 
                    alt="Impactos ODS" 
                    className="max-w-full h-auto max-h-24 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const alternativeImg = document.getElementById('alternative-ods-img') as HTMLImageElement;
                      if (alternativeImg) alternativeImg.style.display = 'block';
                    }}
                  />
                  <img 
                    id="alternative-ods-img"
                    src="/lovable-uploads/4eb508d4-ec81-401d-9011-ea6f683b721e.png" 
                    alt="Impactos ODS Alternativos" 
                    className="max-w-full h-auto max-h-24 object-contain"
                    style={{display: 'none'}}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      document.getElementById('ods-fallback')!.style.display = 'flex';
                    }}
                  />
                  <div id="ods-fallback" className="flex flex-wrap gap-2 mt-2" style={{display: 'none'}}>
                    {project.odsIcons.map((ods) => (
                      <div 
                        key={ods} 
                        className={`${getOdsColorClass(ods)} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}
                      >
                        {ods}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Map section if needed */}
      {/* <ProjectMap /> */}
    </div>
  );
};

export default ProjectDetailView;
