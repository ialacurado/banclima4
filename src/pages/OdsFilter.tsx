import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LogIn, ArrowLeft, Globe, Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Dados simulados dos projetos com contribuições ODS
// (Adaptação dos dados anteriores, adicionando o campo 'ods')
const projectsWithOdsData = [
  {
    id: "ProjRenov001",
    name: "Parque Eólico Ventos do Sul",
    region: "BA/Brasil",
    type: "Energia Renovável",
    status: "Em operação",
    progress: 100,
    tokens: "5000",
    image: "/placeholder.svg",
    ods: [7, 13] // ODS 7 (Energia Limpa), ODS 13 (Ação Climática)
  },
  {
    id: "ProjEficiência002",
    name: "Modernização Iluminação Pública",
    region: "SP/Brasil",
    type: "Eficiência Energética",
    status: "Em implementação",
    progress: 60,
    tokens: "2500",
    image: "/placeholder.svg",
    ods: [7, 11, 13] // ODS 7, ODS 11 (Cidades Sustentáveis), ODS 13
  },
   {
    id: "ProjResiduos003",
    name: "Aterro Sanitário Modelo",
    region: "RJ/Brasil",
    type: "Manejo de Resíduos",
    status: "Concluído",
    progress: 100,
    tokens: "10000",
    image: "/placeholder.svg",
    ods: [11, 12] // ODS 11, ODS 12 (Consumo Responsável)
  },
  {
    id: "ProjAgro004",
    name: "Fazenda Orgânica Sol Nascente",
    region: "MG/Brasil",
    type: "Agricultura Sustentável",
    status: "Em implementação",
    progress: 45,
    tokens: "3000",
    image: "/placeholder.svg",
    ods: [2, 15] // ODS 2 (Fome Zero), ODS 15 (Vida Terrestre)
  },
  {
    id: "ProjRefloresta005",
    name: "Reflorestando a Mata Atlântica",
    region: "ES/Brasil",
    type: "Reflorestamento / Restauração",
    status: "Em implementação",
    progress: 30,
    tokens: "7500",
    image: "/placeholder.svg",
    ods: [13, 15] // ODS 13, ODS 15
  },
   {
    id: "ProjConserv006",
    name: "Guardiões da Amazônia",
    region: "AM/Brasil",
    type: "Conservação de Florestas",
    status: "Em operação",
    progress: 90,
    tokens: "15000",
    image: "/placeholder.svg",
    ods: [13, 14, 15] // ODS 13, ODS 14 (Vida na Água), ODS 15
  },
   {
    id: "ProjCustom007",
    name: "Mobilidade Urbana Elétrica",
    region: "SP/Brasil",
    type: "Transporte Sustentável",
    status: "Em implementação",
    progress: 55,
    tokens: "4000",
    image: "/placeholder.svg",
    ods: [9, 11, 13] // ODS 9 (Inovação), ODS 11, ODS 13
  },
  {
    id: "ProjEduca008",
    name: "Educação Ambiental nas Escolas",
    region: "RJ/Brasil",
    type: "Educação",
    status: "Em implementação",
    progress: 20,
    tokens: "1500",
    image: "/placeholder.svg",
    ods: [4] // ODS 4 (Educação de Qualidade)
  }
];

// Lista dos 17 ODSs
const odsList = Array.from({ length: 17 }, (_, i) => i + 1);

// Adicionando a nova prop
interface OdsFilterProps {
  onBackToRegion: () => void;
}

const OdsFilter: React.FC<OdsFilterProps> = ({ onBackToRegion }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedOds, setSelectedOds] = useState<number[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projectsWithOdsData);
  const [showProjectCard, setShowProjectCard] = useState(false);
  const [showNoProjectsMessage, setShowNoProjectsMessage] = useState(false);

  // Define os dados do projeto específico "Moeda Social Carbono" para exibição fixa
  const specificProject = {
    id: "Ban12345",
    name: "Moeda Social Carbono - Colônia Z10",
    region: "RJ/Brasil",
    type: "Mitigação", 
    status: "Em andamento",
    progress: 85, 
    tokens: "3520", 
    image: "/lovable-uploads/WhatsApp-Image-2025-04-03-at-18.32.45-_2_.jpg",
    ods: [3, 4, 5, 7, 8, 9] 
  };

  // Função para lidar com a seleção/desseleção de ODS
  const handleOdsChange = (odsNumber: number) => {
    setSelectedOds(prev =>
      prev.includes(odsNumber)
        ? prev.filter(ods => ods !== odsNumber)
        : [...prev, odsNumber]
    );
  };

  // Filtra os projetos quando a seleção de ODS muda
  useEffect(() => {
    if (selectedOds.length === 0) {
      setFilteredProjects(projectsWithOdsData); // Mostra todos se nenhum ODS selecionado
    } else {
      const filtered = projectsWithOdsData.filter(project =>
        // Verifica se o projeto contribui para PELO MENOS UM dos ODS selecionados
        project.ods.some(ods => selectedOds.includes(ods))
      );
      setFilteredProjects(filtered);
    }

    // Verifica se algum dos ODS selecionados está presente nos ODS do projeto Moeda Social
    const isProjectSelected = selectedOds.some(ods => specificProject.ods.includes(ods));
    
    setShowProjectCard(isProjectSelected);

    // Define se a mensagem "nenhum projeto" deve ser exibida:
    // - Se algum ODS está selecionado
    // - E o projeto Moeda Social *não* foi selecionado
    setShowNoProjectsMessage(selectedOds.length > 0 && !isProjectSelected);
  }, [selectedOds]);

  return (
    <>
      {/* Container principal */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {/* Botão Voltar agora chama a prop onBackToRegion */}
            <Button variant="outline" size="icon" onClick={onBackToRegion} aria-label="Voltar para Região">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Target className="h-6 w-6 text-[#0e7cb4]" />
            <h1 className="text-2xl font-bold text-gray-800">Projetos por ODS</h1>
          </div>
        </div>
        
        {/* Filtros de ODS */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-4">Filtrar por Objetivos de Desenvolvimento Sustentável (ODS)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {odsList.map((odsNumber) => (
              <div key={odsNumber} className="flex items-center space-x-2">
                <Checkbox
                  id={`ods-${odsNumber}`}
                  checked={selectedOds.includes(odsNumber)}
                  onCheckedChange={() => handleOdsChange(odsNumber)}
                />
                <Label htmlFor={`ods-${odsNumber}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  ODS {odsNumber}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Lista de Projetos (ou mensagem) */}
        <div className="mt-8">
          {selectedOds.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm font-medium text-blue-800">ODS selecionados:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedOds.map(ods => (
                  <Badge key={ods} className={`${odsList.includes(ods) ? "bg-[#0e7cb4] text-white" : "bg-gray-200 text-gray-500"}`}>
                    ODS {ods}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {showProjectCard && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card key={specificProject.id} className="overflow-hidden">
                <div className="h-[150px] overflow-hidden">
                  <img
                    src={specificProject.image}
                    alt={specificProject.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder.svg";
                      e.currentTarget.alt = "Imagem indisponível";
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="font-medium text-lg mb-2">{specificProject.name}</h2>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">ID: {specificProject.id}</p>
                    <p className="text-sm text-gray-600 mb-1">Região: {specificProject.region}</p>
                    <p className="text-sm text-gray-600 mb-1">Tipo: {specificProject.type}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">ODS Associados:</p>
                    <div className="flex flex-wrap gap-1">
                      {specificProject.ods.map(odsNum => (
                        <Badge key={odsNum} className={`${odsList.includes(odsNum) ? "bg-[#0e7cb4] text-white" : "bg-gray-200 text-gray-500"}`}>
                          ODS {odsNum}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link to={`/project/${specificProject.id}`}>
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Ver Detalhes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {showNoProjectsMessage && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Nenhum projeto encontrado corresponde aos ODS selecionados.</p>
              <p className="text-xs text-gray-400 mt-1">(O filtro ODS atualmente só exibe o projeto "Moeda Social Carbono" se os ODS 3, 4, 5, 7, 8 ou 9 forem selecionados)</p>
            </div>
          )}

          {selectedOds.length === 0 && (
             <div className="text-center py-10 bg-white rounded-lg shadow-sm">
               <p className="text-gray-500">Selecione um ou mais ODS para filtrar os projetos.</p>
             </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OdsFilter; 