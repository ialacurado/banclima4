import React, { useState, useEffect } from "react";
import UserHeader from "@/components/user/UserHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ChevronDown, RefreshCw, ArrowLeft, LogIn, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import ProjectType from "./ProjectType";
import OdsFilter from "./OdsFilter";
import ProjectRegion from "./ProjectRegion";
import ProjectStatus from "./ProjectStatus";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Dados simulados dos projetos do usuário
const myProjects = [
  {
    id: "Ban12345",
    name: "Moeda Social Carbono - Colônia Z10",
    registryId: "MSC-Z10-RJ",
    bairro: "Ilha do Governador",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    pais: "Brasil",
    region: "RJ/Brasil",
    type: "Mitigação",
    status: "Em andamento",
    lastActivity: "25/05/2025",
    tokens: "3520",
    progress: 85,
    image: "/lovable-uploads/WhatsApp-Image-2025-04-03-at-18.32.45-_2_.jpg"
  }
];

const MyProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'type' | 'status' | 'region' | 'ods'>('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Função para lidar com a navegação do menu
  const handleTabClick = (tab: 'all' | 'type' | 'status' | 'region' | 'ods') => {
    console.log(`[handleTabClick] Definindo aba para: ${tab}`);
    setActiveTab(tab);
  };
  
  // Função placeholder para "Sair" do projeto
  const handleLeaveProject = (projectId: string, projectName: string) => {
    console.log(`Saindo do projeto ${projectName} (ID: ${projectId})`);
    // TODO: Implementar a lógica real para sair do projeto
    // Ex: remover o projeto da lista 'myProjects', chamar API, etc.
    alert(`Lógica para sair do projeto '${projectName}' ainda não implementada.`);
  };

  useEffect(() => {
    // Poderia buscar projetos aqui baseado no usuário logado
  }, []);

  const tabs = [
    { key: 'all', label: 'Todos os Projetos' },
    { key: 'type', label: 'Tipo de Projeto' },
    { key: 'status', label: 'Status do Projeto' },
    { key: 'region', label: 'Região' },
    { key: 'ods', label: 'ODS' }
  ];

  // Log 3: Valor atual de activeTab a cada renderização
  console.log(`[MyProjects Render] activeTab atual: ${activeTab}`);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Meus Projetos</h1>
          <Link to="/dashboard">
            <Button 
              size="icon" 
              aria-label="Voltar para o Dashboard"
              className="bg-[#0e7cb4] hover:bg-[#0a5c87] text-white h-10 w-10"
            >
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        {/* Menu de navegação */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key as 'all' | 'type' | 'status' | 'region' | 'ods')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-[#0e7cb4] text-[#0e7cb4]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Renderização condicional do conteúdo */}
        {activeTab === 'all' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="h-[150px] md:h-[200px] overflow-hidden">
                    <img
                      src={project.image === "/placeholder.svg" ? `https://via.placeholder.com/400x200?text=Projeto+Imagem` : project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="font-medium text-lg flex-1 mr-2">{project.name}</h2>
                       <Badge variant="outline">{project.type}</Badge>
                    </div>
                    <div className="mb-3 space-y-1 text-sm text-gray-600">
                      <p>ID: {project.id}</p>
                      <p>Local: {project.bairro}, {project.cidade} - {project.estado}</p>
                     </div>
                     <div className="flex items-center mb-3">
                       <span className={`h-2 w-2 rounded-full ${ 
                         project.status === "Em andamento" ? "bg-green-500" :
                         project.status === "Em operação" ? "bg-blue-500" :
                         project.status === "Em implementação" ? "bg-yellow-500" :
                          "bg-gray-500"
                       } mr-2`}></span>
                       <p className="text-sm font-medium">{project.status}</p>
                     </div>
                     <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Progresso</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#0e7cb4] h-2.5 rounded-full"
                           style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                       <div>
                        <p className="text-xs text-gray-500">Tokens</p>
                        <p className="text-[#0e7cb4] font-bold">{project.tokens}</p>
                       </div>
                       <Link to={`/project/${project.id}`}> 
                         <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => {
                           toast({
                             title: "Acessando projeto",
                             description: `Navegando para os detalhes de ${project.name}`,
                          });
                        }}>
                           <LogIn className="h-4 w-4" />
                           Ver Detalhes
                         </Button>
                       </Link>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Atividades Recentes</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0e7cb4]">AT</div>
                  <div>
                    <p className="font-medium">Tokens adicionados ao projeto Moeda Social Carbono</p>
                    <p className="text-sm text-gray-600">+ 520 tokens • 10/04/2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">PF</div>
                  <div>
                    <p className="font-medium">Fase 2 do projeto concluída</p>
                    <p className="text-sm text-gray-600">Moeda Social Carbono • 28/03/2025</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'type' && (
           <ProjectType onBackToAllProjects={() => handleTabClick('all')} /> 
        )}

        {activeTab === 'ods' && <OdsFilter onBackToRegion={() => handleTabClick('region')} />}

        {activeTab === 'region' && <ProjectRegion onBackToStatus={() => handleTabClick('status')} />}
        
        {activeTab === 'status' && (
          <ProjectStatus onBackToProjectType={() => handleTabClick('type')} />
        )}
        
      </div>
      
      <Footer />
    </div>
  );
};

export default MyProjects; 