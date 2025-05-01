import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft, Check } from "lucide-react";
import ProjectMap from "./ProjectMap";

interface ProjectDetailViewProps {
  projectId?: string;
}

// Mock project data - in a real app this would come from an API
const getProjectData = (id: string) => {
  return {
    id: id || "Ban12345",
    name: "Moeda Social Carbono",
    region: "RJ/Brasil",
    description: "Primeira certificação Gold Standard de \"redução de emissões de CO2 a partir de reciclagem de PET\". Referencial: aproximadamente mais de 45.380 t de CO2 O Projeto \"Redução de Emissões de Greentech a partir da Reciclagem de PET, România\" desenvolvido pela Greentech — uma empresa membro do Green Group é o primeiro projeto na Europa a aplicar estruturas de redução de PET por meio da reciclagem de resíduos de PET, reduzindo proativamente as emissões de gases de efeito estufa (GEE) que seriam necessárias para a produção de produtos feitos de polímeros virgens. O projeto PET marca um progresso em direção a muitos dos Objetivos de Desenvolvimento Sustentável (ODS). As reduções totais de emissões de GEE para o período de crédito de 10 anos (2016-2025) são estimadas em 453.800 t de CO2. A redução média anual estimada de emissões de GEE é de 45.380 t de CO2e. A reciclagem mecânica pode reduzir drasticamente os requisitos específicos de GN/kJ, pois contribui para a sustentabilidade ambiental local, uma vez que a reciclagem, em vez da utilização de materiais de insumos virgens, reduz o consumo total de energia, as emissões de GEE e o impacto ambiental causado pela extração de recursos virgens. As fábricas de reciclagem a nível operacional de PET reduz a quantidade de resíduos a serem descartados em aterros sanitários.",
    developer: "Instituto Terrazul",
    methodology: "AMS-III.AJ: Recuperação e reciclagem de materiais de resíduos sólidos",
    version: "Padrão Ouro para os Objetivos Globais",
    scale: "Pequena escala",
    creditPeriod: "01 de janeiro de 2017 a 31 de dezembro de 2026",
    annualCredits: "45.380",
    projectType: "Mitigação",
    status: "Projeto Certificado Gold Standard",
    publishedTokens: "282813",
    retiredTokens: "119879",
    odsIcons: [1, 8, 13, 5, 12, 17],
    attributes: ["Certificação Gold Standard"],
    images: ["/lovable-uploads/3523a330-6976-4e1b-be29-3d2856fa5ade.png"]
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
  return <></>;
};

export default ProjectDetailView;
