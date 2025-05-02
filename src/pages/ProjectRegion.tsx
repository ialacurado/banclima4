import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserHeader from "@/components/user/UserHeader";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, LogIn, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dados simulados dos projetos para região
const projectsData = [
  {
    id: "Ban12345",
    name: "Moeda Social Carbono - Colônia Z10",
    registryId: "54321",
    bairro: "Cacuia",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    pais: "Brasil",
    region: "RJ/Brasil",
    type: "Mitigação",
    status: "Em implementação",
    lastActivity: "10/04/2025",
    tokens: "3520",
    progress: 70,
    image: "/lovable-uploads/WhatsApp Image 2025-04-03 at 18.32.45 (2).jpeg"
  }
];

// Opções de região disponíveis para filtro
const regionTypes = [
  "Bairro",
  "Cidade",
  "Estado",
  "País"
];

// Lista de cidades do Rio de Janeiro
const cidadesRJ = [
  "Angra dos Reis",
  "Araruama", 
  "Barra Mansa",
  "Belford Roxo",
  "Cabo Frio",
  "Campos dos Goytacazes",
  "Duque de Caxias",
  "Itaboraí",
  "Macaé",
  "Magé",
  "Maricá",
  "Mesquita",
  "Nilópolis",
  "Niterói",
  "Nova Friburgo",
  "Nova Iguaçu",
  "Petrópolis",
  "Queimados",
  "Resende",
  "Rio das Ostras",
  "Rio de Janeiro",
  "São Gonçalo",
  "São João de Meriti",
  "Teresópolis",
  "Volta Redonda"
];

// Lista de todos os países (exemplo, pode ser mais completa)
const allCountries = [
  "Afeganistão", "África do Sul", "Albânia", "Alemanha", "Andorra", "Angola", "Antígua e Barbuda", "Arábia Saudita", 
  "Argélia", "Argentina", "Armênia", "Austrália", "Áustria", "Azerbaijão", "Bahamas", "Bahrein", "Bangladesh", 
  "Barbados", "Belarus", "Bélgica", "Belize", "Benin", "Butão", "Bolívia", "Bósnia e Herzegovina", "Botsuana", 
  "Brasil", "Brunei", "Bulgária", "Burquina Faso", "Burundi", "Cabo Verde", "Camboja", "Camarões", "Canadá", 
  "Cazaquistão", "Chade", "Chile", "China", "Chipre", "Colômbia", "Comores", "Congo-Brazzaville", "Congo-Kinshasa", 
  "Coreia do Norte", "Coreia do Sul", "Costa do Marfim", "Costa Rica", "Croácia", "Cuba", "Dinamarca", "Djibuti", 
  "Dominica", "Egito", "El Salvador", "Emirados Árabes Unidos", "Equador", "Eritreia", "Eslováquia", "Eslovênia", 
  "Espanha", "Estados Unidos", "Estônia", "Etiópia", "Filipinas", "Finlândia", "França", "Gabão", "Gâmbia", 
  "Gana", "Geórgia", "Granada", "Grécia", "Guatemala", "Guiné", "Guiné Equatorial", "Guiné-Bissau", "Guiana", 
  "Haiti", "Honduras", "Hungria", "Iêmen", "Índia", "Indonésia", "Irã", "Iraque", "Irlanda", "Islândia", 
  "Israel", "Itália", "Jamaica", "Japão", "Jordânia", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letônia", 
  "Líbano", "Libéria", "Líbia", "Liechtenstein", "Lituânia", "Luxemburgo", "Macedônia do Norte", "Madagáscar", 
  "Maláui", "Malásia", "Maldivas", "Mali", "Malta", "Ilhas Marshall", "Mauritânia", "Maurício", "México", 
  "Micronésia", "Moldávia", "Mônaco", "Mongólia", "Montenegro", "Marrocos", "Moçambique", "Mianmar", "Namíbia", 
  "Nauru", "Nepal", "Nicarágua", "Níger", "Nigéria", "Noruega", "Nova Zelândia", "Omã", "Países Baixos", 
  "Palau", "Palestina", "Panamá", "Papua-Nova Guiné", "Paraguai", "Peru", "Polônia", "Portugal", "Catar", 
  "Quênia", "Quirguistão", "Reino Unido", "República Centro-Africana", "República Dominicana", "República Tcheca", 
  "Romênia", "Ruanda", "Rússia", "Samoa", "San Marino", "São Tomé e Príncipe", "São Vicente e Granadinas", 
  "Arábia Saudita", "Senegal", "Sérvia", "Seicheles", "Serra Leoa", "Singapura", "Síria", "Eslováquia", 
  "Eslovênia", "Somália", "África do Sul", "Sudão do Sul", "Espanha", "Sri Lanka", "Sudão", "Suriname", 
  "Suazilândia", "Suécia", "Suíça", "Tajiquistão", "Tanzânia", "Tailândia", "Timor-Leste", "Togo", "Tonga", 
  "Trindade e Tobago", "Tunísia", "Turquia", "Turcomenistão", "Tuvalu", "Uganda", "Ucrânia", "Uruguai", 
  "Uzbequistão", "Vanuatu", "Vaticano", "Venezuela", "Vietnã", "Iêmen", "Zâmbia", "Zimbábue"
]; // Adicionar mais países conforme necessário

// Lista de todos os estados do Brasil
const allBrazilianStates = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", 
  "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", 
  "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", 
  "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

// Função para obter a cor da região
const getRegionColor = (regionType: string): string => {
  const colorMap: Record<string, string> = {
    "Bairro": "bg-emerald-500",
    "Cidade": "bg-indigo-500",
    "Estado": "bg-amber-500",
    "País": "bg-rose-500"
  };
  
  return colorMap[regionType] || "bg-gray-400";
};

// Função para obter o valor de região com base no tipo
const getRegionValue = (project: any, regionType: string): string => {
  switch (regionType.toLowerCase()) {
    case "bairro":
      return project.bairro || "Cacuia";
    case "cidade":
      return project.cidade || "Rio de Janeiro";
    case "estado":
      return project.estado || "RJ";
    case "pais":
      return project.pais || "Brasil";
    default:
      return "N/A";
  }
};

// Função para extrair valores únicos de região de cada tipo
const getUniqueRegionValues = (regionType: string): string[] => {
  const lowerCaseRegionType = regionType.toLowerCase();
  if (lowerCaseRegionType === "cidade") {
    return cidadesRJ.sort();
  }
  if (lowerCaseRegionType === "pais") {
    return allCountries.sort();
  }
  if (lowerCaseRegionType === "estado") {
    return allBrazilianStates.sort();
  }
  const values = projectsData.map(project => getRegionValue(project, regionType));
  return [...new Set(values)].filter(value => value !== "N/A").sort();
};

// Tipos de região
type RegionType = "bairro" | "cidade" | "estado" | "pais";

// Adicionando a nova prop
interface ProjectRegionProps {
  onBackToStatus: () => void;
}

const ProjectRegion: React.FC<ProjectRegionProps> = ({ onBackToStatus }) => {
  const { toast } = useToast();
  
  // Estados para controlar os filtros de região selecionados
  const [selectedRegionType, setSelectedRegionType] = useState<RegionType>("bairro");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
  // Estado para armazenar os projetos filtrados
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  // Valores únicos disponíveis para o tipo de região selecionado
  const [availableRegionValues, setAvailableRegionValues] = useState<string[]>([]);
  
  // Atualizar valores disponíveis quando o tipo de região muda
  useEffect(() => {
    console.log("[ProjectRegion] useEffect - Calculando availableRegionValues para:", selectedRegionType);
    const values = getUniqueRegionValues(selectedRegionType);
    console.log("[ProjectRegion] Valores únicos encontrados:", values);
    setAvailableRegionValues(values);
    setSelectedRegions([]);
  }, [selectedRegionType]);
  
  // Atualizar projetos filtrados quando os filtros forem alterados
  useEffect(() => {
    console.log("[ProjectRegion] useEffect - Filtrando projetos. Regiões selecionadas:", selectedRegions, "Tipo:", selectedRegionType);
    if (selectedRegions.length === 0) {
      console.log("[ProjectRegion] Nenhuma região selecionada, mostrando todos os projetos.");
      setFilteredProjects(projectsData);
      return;
    }
    const filtered = projectsData.filter(project => {
      const projectRegionValue = getRegionValue(project, selectedRegionType);
      const shouldInclude = selectedRegions.includes(projectRegionValue);
      return shouldInclude;
    });
    console.log("[ProjectRegion] Projetos filtrados:", filtered);
    setFilteredProjects(filtered);
  }, [selectedRegionType, selectedRegions]);
  
  // Função para alternar a seleção de um tipo de região
  const handleRegionTypeChange = (regionType: string) => {
    console.log("[ProjectRegion] handleRegionTypeChange para:", regionType);
    setSelectedRegionType(regionType as RegionType);
  };
  
  // Função para alternar a seleção de um valor de região
  const toggleRegion = (value: string) => {
    console.log("[ProjectRegion] toggleRegion:", value);
    if (selectedRegions.includes(value)) {
      setSelectedRegions(selectedRegions.filter(v => v !== value));
    } else {
      setSelectedRegions([...selectedRegions, value]);
    }
  };
  
  // Converter o tipo de região para um formato mais legível
  const getRegionTypeLabel = (type: RegionType): string => {
    const labels: Record<RegionType, string> = {
      bairro: "Bairro",
      cidade: "Cidade",
      estado: "Estado",
      pais: "País"
    };
    return labels[type] || type;
  };
  
  // Função para atualizar a cidade selecionada
  const handleCidadeChange = (cidade: string) => {
    console.log("[ProjectRegion] handleCidadeChange:", cidade);
    setSelectedRegions(cidade ? [cidade] : []);
  };

  // Função para atualizar o bairro selecionado
  const handleBairroChange = (bairro: string) => {
    console.log("[ProjectRegion] handleBairroChange:", bairro);
    setSelectedRegions(bairro ? [bairro] : []);
  };

  // Função para atualizar o estado selecionado
  const handleEstadoChange = (estado: string) => {
    console.log("[ProjectRegion] handleEstadoChange:", estado);
    setSelectedRegions(estado ? [estado] : []);
  };

  // Função para atualizar o país selecionado
  const handlePaisChange = (pais: string) => {
    console.log("[ProjectRegion] handlePaisChange:", pais);
    setSelectedRegions(pais ? [pais] : []);
  };
  
  console.log("[ProjectRegion] Renderizando. Tipo Selecionado:", selectedRegionType, "Regiões:", selectedRegions, "Projetos Filtrados:", filteredProjects.length);

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={onBackToStatus} aria-label="Voltar para Status do Projeto">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <MapPin className="h-6 w-6 text-[#0e7cb4]" />
            <h1 className="text-2xl font-bold text-gray-800">Projetos por Região</h1>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-4">Selecione o Tipo de Região</h2>
          <div className="flex flex-wrap gap-3">
            {(["bairro", "cidade", "estado", "pais"] as RegionType[]).map((type) => (
              <Button
                key={type}
                variant={selectedRegionType === type ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  selectedRegionType === type ? "bg-[#0e7cb4] text-white" : ""
                }`}
                onClick={() => handleRegionTypeChange(type)}
              >
                <span className={`h-3 w-3 rounded-full ${getRegionColor(getRegionTypeLabel(type))}`}></span>
                {getRegionTypeLabel(type)}
              </Button>
            ))}
          </div>
        </div>
        
        <div key={selectedRegionType} className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-4">
            Filtrar por {getRegionTypeLabel(selectedRegionType)}
          </h2>
          
          {selectedRegionType === "cidade" && (
             <div className="max-w-md">
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Cidades do Estado do Rio de Janeiro</span>
                <br />
                Selecione uma cidade para filtrar os projetos:
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Select onValueChange={handleCidadeChange} value={selectedRegions[0] || ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma cidade" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px] overflow-y-auto">
                    {availableRegionValues.map((cidade) => (
                      <SelectItem key={cidade} value={cidade}>
                        {cidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedRegions.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedRegions([])} 
                    className="whitespace-nowrap"
                  >
                    Limpar seleção
                  </Button>
                )}
              </div>
              {selectedRegions.length > 0 && (
                <div className="mt-4 p-3 bg-slate-50 rounded-md">
                  <p className="text-sm">
                    Filtrando projetos na cidade: <Badge variant="outline" className="ml-1">{selectedRegions[0]}</Badge>
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedRegionType === "bairro" && (
            <div className="max-w-md">
              <p className="text-sm text-gray-600 mb-3">
                Selecione um bairro para filtrar os projetos:
              </p>
              <Select onValueChange={handleBairroChange} value={selectedRegions[0] || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os bairros" />
                </SelectTrigger>
                <SelectContent>
                  {availableRegionValues && availableRegionValues.length > 0 ? (
                    availableRegionValues.map((bairro) => (
                      <SelectItem key={bairro} value={bairro}>
                        {bairro}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-gray-500">Nenhum bairro disponível para seleção.</div> 
                  )}
                </SelectContent>
              </Select>
               {selectedRegions.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedRegions([])} 
                  className="mt-2"
                >
                  Limpar seleção
                </Button>
              )}
            </div>
          )}

          {selectedRegionType === "estado" && (
             <div className="max-w-md">
              <p className="text-sm text-gray-600 mb-3">
                Selecione um estado para filtrar os projetos:
              </p>
              <Select onValueChange={handleEstadoChange} value={selectedRegions[0] || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os estados" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px] overflow-y-auto">
                  {availableRegionValues && availableRegionValues.length > 0 ? (
                    availableRegionValues.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-gray-500">Nenhum estado disponível para seleção.</div> 
                  )}
                </SelectContent>
              </Select>
              {selectedRegions.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedRegions([])} 
                  className="mt-2"
                >
                  Limpar seleção
                </Button>
              )}
            </div>
          )}

          {selectedRegionType === "pais" && (
            <div className="max-w-md">
              <p className="text-sm text-gray-600 mb-3">
                Selecione um país para filtrar os projetos:
              </p>
              <Select onValueChange={handlePaisChange} value={selectedRegions[0] || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os países" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px] overflow-y-auto">
                  {availableRegionValues && availableRegionValues.length > 0 ? (
                    availableRegionValues.map((pais) => (
                      <SelectItem key={pais} value={pais}>
                        {pais}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-gray-500">Nenhum país disponível para seleção.</div> 
                  )}
                </SelectContent>
              </Select>
              {selectedRegions.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedRegions([])} 
                  className="mt-2"
                >
                  Limpar seleção
                </Button>
              )}
            </div>
          )}
        </div>
        
        {filteredProjects.length === 0 ? (
           <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">Nenhum projeto encontrado com os filtros selecionados.</p>
            {selectedRegionType === 'bairro' && availableRegionValues.length === 0 && (
                <p className="text-xs text-gray-400 mt-1">(Não há bairros registrados nos projetos para filtrar)</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full mb-4">
              {selectedRegions.length > 0 ? (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="mb-2">Projetos filtrados por {getRegionTypeLabel(selectedRegionType)}:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegions.map((region) => (
                      <Badge key={region} variant="outline">{region}</Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mb-4">Mostrando todos os projetos ({projectsData.length}). Selecione filtros para refinar os resultados.</p>
              )}
            </div>
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
                  <div className="mb-3 space-y-1">
                    <p className="text-sm text-gray-600">ID Projeto: {project.id}</p>
                    <p className="text-sm text-gray-600">Bairro: {project.bairro || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Cidade: {project.cidade || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Estado: {getRegionValue(project, 'estado')}</p>
                    <p className="text-sm text-gray-600">País: {getRegionValue(project, 'pais')}</p>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className={`h-2 w-2 rounded-full ${
                      project.status === "Em implementação" ? "bg-green-500" : "bg-gray-500"
                    } mr-2`}></span>
                    <p className="text-sm font-medium">{project.status}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Progresso do Projeto</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#0e7cb4] h-2.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Tokens Disponíveis</p>
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

      {/* <Footer /> */}
    </>
  );
};

export default ProjectRegion; 