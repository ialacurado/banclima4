import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart,
  Clock,
  Users,
  FileText,
  MapPin,
  ArrowLeft,
  Calendar,
  Download,
  Upload,
  ShieldCheck
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the Moeda Social Carbono project
  const project = {
    id: "PRJ-001",
    name: "Moeda Social Carbono - Colônia Z10",
    registryId: "54321",
    status: "Ativo",
    location: "Cacuia, RJ",
    region: "RJ/Brasil",
    type: "Mitigação",
    date: "01/12/2024",
    progress: 75,
    description: "MOEDA SOCIAL CARBONO\n\nO projeto propõe a realização de inventário de emissões de gases de efeito estufa de unidades residenciais, comerciais e/ou empresas, com apoio de cadastro online e/ou presencial, tudo com apoio de uma Calculadora de Emissões de Gases.",
    coordinator: "Marcos Lacerda",
    team: [],
    budget: "R$ 350.000,00",
    startDate: "01/12/2024",
    endDate: "15/09/2026",
    partners: ["Prefeitura do rio Meio Ambiente e Clima", "CEA", "Colônia de pescadores z10"],
    supportedBy: "Apoio: Moove",
    milestones: [
      { name: "Planejamento e estruturação", date: "01/12/2024", status: "Completo" },
      { name: "Desenvolvimento da plataforma", date: "25/02/2025", status: "Em andamento" },
      { name: "Treinamento comunitário", date: "10/04/2025", status: "Pendente" },
      { name: "Lançamento da moeda", date: "20/06/2025", status: "Pendente" },
      { name: "Monitoramento inicial", date: "15/08/2025", status: "Pendente" }
    ],
    documents: [
      { name: "Projeto Executivo", type: "PDF", date: "15/11/2024", size: "3.5 MB" },
      { name: "Contratos de Parceria", type: "DOCX", date: "05/12/2024", size: "1.2 MB" },
      { name: "Análise de Viabilidade", type: "PDF", date: "20/11/2024", size: "2.8 MB" },
      { name: "Relatório Técnico Preliminar", type: "PDF", date: "01/12/2024", size: "4.1 MB" }
    ],
    transactions: [
      { id: "TX-1234", date: "05/12/2024", type: "Emissão", amount: "100", value: "R$ 1.500,00" },
      { id: "TX-1235", date: "10/12/2024", type: "Troca", amount: "25", value: "R$ 375,00" },
      { id: "TX-1236", date: "15/12/2024", type: "Compra", amount: "50", value: "R$ 750,00" }
    ],
    impactMetrics: {
      co2Reduction: "4.879,99 KgCO₂e",
      communitiesEngaged: "1",
      directBeneficiaries: "40",
      jobs: "?"
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "Completo":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-blue-100 text-blue-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link to="/admin/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
            <p className="text-muted-foreground">ID: {project.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800`}>
                {project.status}
              </span>
              <span className="text-sm text-muted-foreground">{project.progress}% concluído</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Localização</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{project.location}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Período</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{project.startDate} - {project.endDate}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orçamento</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">
            {project.budget}
          </CardContent>
        </Card>
      </div>

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="milestones">Marcos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sobre o Projeto</CardTitle>
              <CardDescription>Detalhes do projeto Moeda Social Carbono</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Descrição</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <h3 className="font-medium mb-3">Equipe</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coordenador:</span>
                      <span className="font-medium">{project.coordinator}</span>
                    </div>
                    {project.team.length > 0 && (
                      <div>
                        <p className="text-muted-foreground mb-1">Membros:</p>
                        <ul className="space-y-1">
                          {project.team.map((member, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{member}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Parceiros</h3>
                  <ul className="space-y-1">
                    {project.partners.map((partner, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                        <span>{partner}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{project.supportedBy}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-3">Métricas de Impacto</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Redução de CO₂</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">{project.impactMetrics.co2Reduction}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Comunidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">{project.impactMetrics.communitiesEngaged}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Beneficiários</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">{project.impactMetrics.directBeneficiaries}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Empregos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">{project.impactMetrics.jobs}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Marcos do Projeto</CardTitle>
              <CardDescription>Linha do tempo e etapas principais</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Etapa</TableHead>
                    <TableHead>Data Prevista</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.milestones.map((milestone, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{milestone.name}</TableCell>
                      <TableCell>{milestone.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Documentação do projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.documents.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transações da Moeda Social</CardTitle>
              <CardDescription>Histórico de transações relacionadas ao projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.amount} tokens</TableCell>
                      <TableCell>{transaction.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
