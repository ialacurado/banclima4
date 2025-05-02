import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserHeader from "@/components/user/UserHeader";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, LogIn, Activity } from "lucide-react";

// Dados simulados dos projetos para status
const projectsData = [
  {
    id: "Ban12345",
    name: "Moeda Social Carbono - Colônia Z10",
    registryId: "54321",
    region: "RJ/Brasil",
    type: "Mitigação",
    status: "Em implementação",
    lastActivity: "10/04/2025",
    tokens: "3520",
    progress: 70,
    image: "/lovable-uploads/WhatsApp Image 2025-04-03 at 18.32.45 (2).jpeg"
  }
];

// Opções de status disponíveis para filtro
const statusOptions = [
  "Planejamento",
  "Em implementação",
  "Finalizado",
  "Crédito para Venda",
  "Crédito aposentado"
];

// Função para obter a cor do status
const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    "Planejamento": "bg-blue-500",
    "Em implementação": "bg-green-500",
    "Finalizado": "bg-purple-500",
    "Crédito para Venda": "bg-yellow-500",
    "Crédito aposentado": "bg-gray-500"
  };
  
  return colorMap[status] || "bg-gray-400";
};

// Adicionando a nova prop
interface ProjectStatusProps {
  onBackToProjectType: () => void;
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({ onBackToProjectType }) => {
  // const navigate = useNavigate(); // Não precisamos mais dele aqui
  
  // Estado para armazenar os filtros de status selecionados
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  
  // Estado para armazenar os projetos filtrados
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  // Atualizar projetos filtrados quando os filtros forem alterados
  useEffect(() => {
    if (selectedStatus.length === 0) {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => selectedStatus.includes(project.status))
      );
    }
  }, [selectedStatus]);
  
  // Função para alternar a seleção de um status
  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  return (
    <>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {/* Botão Voltar agora chama a prop onBackToProjectType */}
            <Button variant="outline" size="icon" onClick={onBackToProjectType} aria-label="Voltar para Tipo de Projeto">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Activity className="h-6 w-6 text-[#0e7cb4]" />
            <h1 className="text-2xl font-bold text-gray-800">Status dos Projetos</h1>
          </div>
        </div>
        
        {/* Filtros de Status */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-4">Filtrar por Status</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {statusOptions.map(status => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox 
                  id={`status-${status}`} 
                  checked={selectedStatus.includes(status)}
                  onCheckedChange={() => toggleStatus(status)}
                />
                <label
                  htmlFor={`status-${status}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                >
                  <span className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(status)}`}></span>
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Lista de Projetos */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">Nenhum projeto encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="h-[150px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-medium text-lg">{project.name}</h2>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">ID Projeto: {project.id}</p>
                    <p className="text-sm text-gray-600 mb-1">Região: {project.region}</p>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <span className={`h-2 w-2 rounded-full ${getStatusColor(project.status)} mr-2`}></span>
                    <p className="text-sm font-medium">{project.status}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Progresso do Projeto</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`${project.status === "Crédito aposentado" ? "bg-gray-500" : "bg-[#0e7cb4]"} h-2.5 rounded-full`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Tokens Disponíveis</p>
                      <p className={`font-bold ${project.tokens === "0" ? "text-gray-400" : "text-[#0e7cb4]"}`}>
                        {project.tokens}
                      </p>
                    </div>
                    
                    <Link to={`/project/${project.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Entrar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectStatus; 