
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: "PRJ-001",
      name: "Moeda Social Carbono",
      status: "Ativo",
      location: "Cacuia, RJ",
      type: "Moeda Social",
      date: "01/12/2024",
      progress: 75,
    },
    {
      id: "PRJ-002",
      name: "Reflorestamento Amazônia",
      status: "Em andamento",
      location: "Manaus, AM",
      type: "Conservação",
      date: "05/02/2025",
      progress: 45,
    },
    {
      id: "PRJ-003",
      name: "Energia Solar Comunidade",
      status: "Planejamento",
      location: "Fortaleza, CE",
      type: "Energia Renovável",
      date: "20/04/2025", 
      progress: 15,
    },
    {
      id: "PRJ-004",
      name: "Gestão de Resíduos Urbanos",
      status: "Ativo",
      location: "Curitiba, PR",
      type: "Reciclagem",
      date: "08/01/2025",
      progress: 90,
    }
  ];

  const filteredProjects = projects.filter(
    project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Planejamento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Projetos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Gestão de Projetos</CardTitle>
          <CardDescription>
            Acompanhe e gerencie todos os seus projetos de crédito de carbono
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
            <div className="w-full md:w-1/3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-10"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filtrar</Button>
              <Button variant="outline" size="sm">Exportar</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>{project.location}</CardDescription>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-medium">{project.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="font-medium">{project.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Data de início:</span>
                      <span className="font-medium">{project.date}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso:</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Link to={`/admin/projects/${project.id}`}>
                        <Button variant="outline" className="w-full">
                          Ver detalhes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
