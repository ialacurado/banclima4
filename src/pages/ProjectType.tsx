import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserHeader from "@/components/user/UserHeader";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Tag, LogIn, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Dados simulados dos projetos (com tipos variados)
const projectsData = [
  {
    id: "ProjRenov001",
    name: "Parque Eólico Ventos do Sul",
    registryId: "REG123",
    bairro: "Zona Rural",
    cidade: "Cidade Alegre",
    estado: "BA",
    pais: "Brasil",
    region: "BA/Brasil",
    type: "Energia Renovável",
    status: "Em operação",
    lastActivity: "15/03/2025",
    tokens: "5000",
    progress: 100,
    image: "/placeholder.svg"
  },
  {
    id: "ProjEficiência002",
    name: "Modernização Iluminação Pública",
    registryId: "REG456",
    bairro: "Centro",
    cidade: "Metrópole",
    estado: "SP",
    pais: "Brasil",
    region: "SP/Brasil",
    type: "Eficiência Energética",
    status: "Em implementação",
    lastActivity: "20/04/2025",
    tokens: "2500",
    progress: 60,
    image: "/placeholder.svg"
  },
   {
    id: "ProjResiduos003",
    name: "Aterro Sanitário Modelo",
    registryId: "REG789",
    bairro: "Distrito Industrial",
    cidade: "Cidade Limpa",
    estado: "RJ",
    pais: "Brasil",
    region: "RJ/Brasil",
    type: "Manejo de Resíduos",
    status: "Concluído",
    lastActivity: "01/02/2025",
    tokens: "10000",
    progress: 100,
    image: "/placeholder.svg"
  },
  {
    id: "ProjAgro004",
    name: "Fazenda Orgânica Sol Nascente",
    registryId: "REG101",
    bairro: "Interior",
    cidade: "Campo Verde",
    estado: "MG",
    pais: "Brasil",
    region: "MG/Brasil",
    type: "Agricultura Sustentável",
    status: "Em implementação",
    lastActivity: "10/04/2025",
    tokens: "3000",
    progress: 45,
    image: "/placeholder.svg"
  },
  {
    id: "ProjRefloresta005",
    name: "Reflorestando a Mata Atlântica",
    registryId: "REG112",
    bairro: "Reserva Florestal",
    cidade: "Vale Verde",
    estado: "ES",
    pais: "Brasil",
    region: "ES/Brasil",
    type: "Reflorestamento / Restauração",
    status: "Em implementação",
    lastActivity: "05/05/2025",
    tokens: "7500",
    progress: 30,
    image: "/placeholder.svg"
  },
   {
    id: "ProjConserv006",
    name: "Guardiões da Amazônia",
    registryId: "REG131",
    bairro: "Comunidade Ribeirinha",
    cidade: "Rio Negro",
    estado: "AM",
    pais: "Brasil",
    region: "AM/Brasil",
    type: "Conservação de Florestas",
    status: "Em operação",
    lastActivity: "01/04/2025",
    tokens: "15000",
    progress: 90,
    image: "/placeholder.svg"
  },
   {
    id: "ProjCustom007",
    name: "Mobilidade Urbana Elétrica",
    registryId: "REG141",
    bairro: "Centro",
    cidade: "Metrópole",
    estado: "SP",
    pais: "Brasil",
    region: "SP/Brasil",
    type: "Transporte Sustentável", // Tipo "Outro"
    status: "Em implementação",
    lastActivity: "18/04/2025",
    tokens: "4000",
    progress: 55,
    image: "/placeholder.svg"
  }
];

// Tipos de projeto predefinidos
const projectTypes = [
  "Energia Renovável",
  "Eficiência Energética",
  "Manejo de Resíduos",
  "Agricultura Sustentável",
  "Reflorestamento / Restauração",
  "Conservação de Florestas",
];

// Adicionando a nova prop
interface ProjectTypeProps {
  onBackToAllProjects: () => void;
}

const ProjectType: React.FC<ProjectTypeProps> = ({ onBackToAllProjects }) => {
  const { toast } = useToast();
  // const navigate = useNavigate(); // Não precisamos mais dele aqui
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Função para lidar com a mudança nos checkboxes predefinidos
  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Função para lidar com a mudança no checkbox "Outros"
  const handleOtherCheckboxChange = (checked: boolean | 'indeterminate') => {
    setIsOtherSelected(!!checked);
    if (!checked) {
      setOtherValue(""); // Limpa o input se desmarcar "Outros"
    }
  };

  // Função para lidar com a mudança no input "Outros"
  const handleOtherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(event.target.value);
  };

  // Filtra os projetos quando os tipos selecionados mudam
  useEffect(() => {
    const activeFilters = [...selectedTypes];
    if (isOtherSelected && otherValue.trim() !== "") {
      activeFilters.push(otherValue.trim());
    }

    if (activeFilters.length === 0) {
      setFilteredProjects(projectsData); // Mostra todos se nenhum filtro ativo
    } else {
      const lowerCaseFilters = activeFilters.map(f => f.toLowerCase());
      const filtered = projectsData.filter(project => 
        lowerCaseFilters.includes(project.type.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [selectedTypes, isOtherSelected, otherValue]);

  // Define os dados do projeto específico "Moeda Social Carbono" (Se precisar manter)
  const specificProject = {
    id: "Ban12345", // ID da imagem
    name: "Moeda Social Carbono - Colônia Z10",
    region: "RJ/Brasil", // Região da imagem
    type: "Mitigação", // Tipo da imagem
    status: "Em andamento", // Status da imagem (mapeado para cor)
    progress: 85, // Progresso estimado da imagem
    tokens: "3520", // Tokens da imagem
    image: "/lovable-uploads/WhatsApp-Image-2025-04-03-at-18.32.45-_2_.jpg"
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
             {/* Botão Voltar agora chama a prop onBackToAllProjects */}
             <Button variant="outline" size="icon" onClick={onBackToAllProjects} aria-label="Voltar para Todos os Projetos">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Filter className="h-6 w-6 text-[#0e7cb4]" />
            <h1 className="text-2xl font-bold text-gray-800">Projetos por Tipo</h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-medium mb-4">Selecione os Tipos de Projeto</h2>
          <div className="space-y-3">
            {projectTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => handleTypeChange(type)}
                />
                <Label htmlFor={`type-${type}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {type}
                </Label>
              </div>
            ))}
            
            {/* Opção "Outros" */}
            <div className="flex flex-col space-y-2 pt-2">
               <div className="flex items-center space-x-2">
                 <Checkbox
                    id="type-other"
                    checked={isOtherSelected}
                    onCheckedChange={handleOtherCheckboxChange}
                  />
                  <Label htmlFor="type-other" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Outros:
                  </Label>
               </div>
                <Input
                  type="text"
                  placeholder="Especifique outro tipo"
                  value={otherValue}
                  onChange={handleOtherInputChange}
                  disabled={!isOtherSelected} 
                  className="max-w-sm"
                />
            </div>
          </div>
        </div>

        {/* Área para exibir o projeto específico */}
        <div>
          {/* Exibe os filtros ativos (opcional) */}
          {(selectedTypes.length > 0 || (isOtherSelected && otherValue.trim())) && (
            <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
                <p className="mb-2">Filtros ativos:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTypes.map((type) => (
                    <Badge key={type} variant="secondary">{type}</Badge>
                  ))}
                  {isOtherSelected && otherValue.trim() && (
                     <Badge key="other" variant="secondary">Outros: {otherValue.trim()}</Badge>
                  )}
                </div>
            </div>
          )}

          {/* Renderiza o card do projeto específico "Moeda Social Carbono" */}
          {/* NOTE: Esta lógica parece exibir SEMPRE o projeto Moeda Social Carbono */}
          {/* Considere se ele deveria ser filtrado também */} 
          {specificProject ? (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Projetos encontrados (1)</h3>
              <Card key={specificProject.id} className="overflow-hidden max-w-md md:max-w-lg">
                <div className="h-[150px] md:h-[200px] overflow-hidden">
                  <img
                    src={specificProject.image}
                    alt={specificProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                   <h2 className="font-medium text-xl mb-3">{specificProject.name}</h2>

                   <div className="mb-3 space-y-1 text-sm text-gray-600">
                     <p><span className="font-medium">ID Projeto:</span> {specificProject.id}</p>
                     <p><span className="font-medium">Região:</span> {specificProject.region}</p>
                     <p><span className="font-medium">Tipo:</span> {specificProject.type}</p>
                   </div>

                   <div className="flex items-center mb-4">
                     <span className={`h-2.5 w-2.5 rounded-full ${ // Ajuste para h-2.5 w-2.5 como em MyProjects
                       specificProject.status === "Em andamento" ? "bg-green-500" :
                       specificProject.status === "Em operação" ? "bg-blue-500" :
                       specificProject.status === "Concluído" ? "bg-gray-500" : "bg-yellow-500"
                     } mr-2`}></span>
                     <p className="text-sm font-medium">{specificProject.status}</p>
                   </div>

                   <div className="mb-4">
                     <p className="text-xs text-gray-500 mb-1">Progresso</p>
                     <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                       <div
                         className="bg-[#0e7cb4] h-2.5 rounded-full"
                         style={{ width: `${specificProject.progress}%` }}
                       ></div>
                     </div>
                   </div>

                   <div className="flex justify-between items-end">
                     <div>
                       <p className="text-xs text-gray-500">Tokens Disponíveis</p>
                       <p className="text-[#0e7cb4] font-bold text-lg">{specificProject.tokens}</p>
                     </div>
                     <Link to={`/project/${specificProject.id}`}>
                       <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => {
                         toast({
                           title: "Acessando projeto",
                           description: `Navegando para os detalhes de ${specificProject.name}`,
                         });
                       }}>
                         <LogIn className="h-4 w-4" />
                         Ver Detalhes
                       </Button>
                     </Link>
                   </div>
                </CardContent>
              </Card>
            </div>
          ) : (
             filteredProjects.length === 0 && selectedTypes.length === 0 && !isOtherSelected && (
               <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                 <p className="text-gray-500">Nenhum projeto encontrado com os filtros selecionados.</p>
               </div>
             )
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectType; 