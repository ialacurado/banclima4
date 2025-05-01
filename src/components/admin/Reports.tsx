import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, FileText, FileSpreadsheet, Calendar as CalendarIcon, Map, ChartBar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("management");
  const [reportType, setReportType] = useState<string>("management");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [projectId, setProjectId] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [allSubscribers, setAllSubscribers] = useState<boolean>(false);
  const [includeFullName, setIncludeFullName] = useState<boolean>(false);
  const [includeDocument, setIncludeDocument] = useState<boolean>(false);
  const [includeSustainableDevGoals, setIncludeSustainableDevGoals] = useState<boolean[]>([false, false, false]);

  // Dados simulados para o gráfico de uso
  const usageData = [
    { month: "Jan", carbono: 4000, energia: 2400, residuos: 1800 },
    { month: "Fev", carbono: 3000, energia: 1398, residuos: 2800 },
    { month: "Mar", carbono: 2000, energia: 9800, residuos: 3200 },
    { month: "Abr", carbono: 2780, energia: 3908, residuos: 1908 },
    { month: "Mai", carbono: 1890, energia: 4800, residuos: 2300 },
    { month: "Jun", carbono: 2390, energia: 3800, residuos: 2900 },
    { month: "Jul", carbono: 3490, energia: 4300, residuos: 3100 },
  ];

  // Dados simulados para o gráfico de certificados
  const certificateData = [
    { name: "Energia Solar", value: 400 },
    { name: "Energia Eólica", value: 300 },
    { name: "Biomassa", value: 300 },
    { name: "Hidroelétrica", value: 200 },
  ];

  // Dados simulados para a comparação de projetos
  const projectComparisonData = [
    { month: "Jan", projeto1: 2400, projeto2: 1800, projeto3: 3200 },
    { month: "Fev", projeto1: 1398, projeto2: 2800, projeto3: 2500 },
    { month: "Mar", projeto1: 9800, projeto2: 3200, projeto3: 4100 },
    { month: "Abr", projeto1: 3908, projeto2: 1908, projeto3: 2800 },
    { month: "Mai", projeto1: 4800, projeto2: 2300, projeto3: 3500 },
    { month: "Jun", projeto1: 3800, projeto2: 2900, projeto3: 3100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Dados simulados para a tabela de transações
  const transactionData = [
    { id: "TRX-001", date: "2023-04-15", type: "Venda", amount: "500", value: "R$ 15.000,00" },
    { id: "TRX-002", date: "2023-04-20", type: "Compra", amount: "200", value: "R$ 6.000,00" },
    { id: "TRX-003", date: "2023-05-02", type: "Venda", amount: "100", value: "R$ 3.500,00" },
    { id: "TRX-004", date: "2023-05-15", type: "Venda", amount: "300", value: "R$ 9.000,00" },
    { id: "TRX-005", date: "2023-05-28", type: "Compra", amount: "150", value: "R$ 4.500,00" },
  ];

  // Função para gerar relatório
  const handleGenerateReport = () => {
    console.log("Gerando relatório com os seguintes filtros:");
    console.log({
      projectId,
      allSubscribers,
      includeFullName,
      includeDocument,
      region: selectedRegion,
      status: selectedStatus,
      projectType: selectedProjectType,
      fromDate,
      toDate,
    });
    // Implementação real iria enviar estes dados para backend gerar relatório
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Relatórios do Sistema</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <CalendarIcon size={16} className="mr-2" />
            Filtrar por data
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Exportar relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Certificados</CardTitle>
            <CardDescription>Emitidos no último trimestre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.248</div>
            <p className="text-xs text-muted-foreground">
              +25% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total em Créditos</CardTitle>
            <CardDescription>Emitidos no último trimestre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 875.000,00</div>
            <p className="text-xs text-muted-foreground">
              +18% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transações</CardTitle>
            <CardDescription>Realizadas no último trimestre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">532</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Emissões Evitadas</CardTitle>
            <CardDescription>Em toneladas de CO₂</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.358</div>
            <p className="text-xs text-muted-foreground">
              +30% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="management" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="management">
            <FileText className="w-4 h-4 mr-2" />
            Relatórios de Gestão
          </TabsTrigger>
          <TabsTrigger value="climate">
            <ChartBar className="w-4 h-4 mr-2" />
            Impacto Climático
          </TabsTrigger>
          <TabsTrigger value="geolocation">
            <Map className="w-4 h-4 mr-2" />
            Geolocalização
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <Users className="w-4 h-4 mr-2" />
            Métricas
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da aba Relatórios de Gestão */}
        <TabsContent value="management" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Gestão</CardTitle>
              <CardDescription>
                Configure os filtros para gerar relatórios personalizados sobre projetos e participantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Identificação do Projeto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-sm font-medium">ID do Projeto</label>
                      <Input 
                        placeholder="Digite o ID do projeto" 
                        value={projectId} 
                        onChange={(e) => setProjectId(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="allSubscribers" 
                        checked={allSubscribers} 
                        onCheckedChange={(checked) => setAllSubscribers(!!checked)}
                      />
                      <label htmlFor="allSubscribers" className="text-sm font-medium">
                        Todos os inscritos no projeto
                      </label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Informações Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="fullName" 
                        checked={includeFullName}
                        onCheckedChange={(checked) => setIncludeFullName(!!checked)}
                      />
                      <label htmlFor="fullName" className="text-sm font-medium">Nome Completo</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="document" 
                        checked={includeDocument}
                        onCheckedChange={(checked) => setIncludeDocument(!!checked)}
                      />
                      <label htmlFor="document" className="text-sm font-medium">CPF / CNPJ</label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Região</h3>
                  <RadioGroup 
                    value={selectedRegion} 
                    onValueChange={setSelectedRegion}
                    className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bairro" id="bairro" />
                      <label htmlFor="bairro" className="text-sm">Bairro</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cidade" id="cidade" />
                      <label htmlFor="cidade" className="text-sm">Cidade</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="estado" id="estado" />
                      <label htmlFor="estado" className="text-sm">Estado</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pais" id="pais" />
                      <label htmlFor="pais" className="text-sm">País</label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Status</h3>
                  <RadioGroup 
                    value={selectedStatus} 
                    onValueChange={setSelectedStatus}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="planejamento" id="planejamento" />
                      <label htmlFor="planejamento" className="text-sm">Planejamento</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="implementacao" id="implementacao" />
                      <label htmlFor="implementacao" className="text-sm">Em implementação</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="finalizado" id="finalizado" />
                      <label htmlFor="finalizado" className="text-sm">Finalizado</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="venda" id="venda" />
                      <label htmlFor="venda" className="text-sm">Crédito para Venda</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aposentado" id="aposentado" />
                      <label htmlFor="aposentado" className="text-sm">Crédito aposentado</label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Intervalo de tempo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium">De:</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {fromDate ? format(fromDate, "dd/MM/yyyy") : "Selecionar data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={setFromDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium">Até:</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {toDate ? format(toDate, "dd/MM/yyyy") : "Selecionar data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={setToDate}
                            disabled={(date) => 
                              fromDate ? date < fromDate : false
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium">Tipo de Projeto</h3>
                  <RadioGroup 
                    value={selectedProjectType} 
                    onValueChange={setSelectedProjectType}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="energia" id="energia" />
                      <label htmlFor="energia" className="text-sm">Energia Renovável</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eficiencia" id="eficiencia" />
                      <label htmlFor="eficiencia" className="text-sm">Eficiência Energética</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="residuos" id="residuos" />
                      <label htmlFor="residuos" className="text-sm">Manejo de Resíduos</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agricultura" id="agricultura" />
                      <label htmlFor="agricultura" className="text-sm">Agricultura Sustentável</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reflorestamento" id="reflorestamento" />
                      <label htmlFor="reflorestamento" className="text-sm">Reflorestamento / Restauração</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="conservacao" id="conservacao" />
                      <label htmlFor="conservacao" className="text-sm">Conservação de Florestas</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </Button>
                  <Button variant="outline">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Exportar Excel
                  </Button>
                  <Button onClick={handleGenerateReport}>
                    <Download className="w-4 h-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Impacto Climático */}
        <TabsContent value="climate" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gráficos de Impacto Climático</CardTitle>
              <CardDescription>Visualize o impacto dos projetos na redução de emissões ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Uso de Créditos por Categoria</h3>
                  <ChartContainer className="h-80" config={{}}>
                    <LineChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="carbono" name="Créditos de Carbono" stroke="#0e7cb4" strokeWidth={2} />
                      <Line type="monotone" dataKey="energia" name="Créditos de Energia" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="residuos" name="Manejo de Resíduos" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Comparação entre Projetos</h3>
                  <div className="mb-4">
                    <Select defaultValue="reducao">
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Selecionar métrica" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reducao">Redução de CO₂</SelectItem>
                        <SelectItem value="creditos">Créditos Gerados</SelectItem>
                        <SelectItem value="impacto">Impacto Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <ChartContainer className="h-80" config={{}}>
                    <BarChart data={projectComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="projeto1" name="Projeto Solar Vale Verde" fill="#8884d8" />
                      <Bar dataKey="projeto2" name="Projeto Eólico Nordeste" fill="#82ca9d" />
                      <Bar dataKey="projeto3" name="Projeto Reflorestamento Amazônia" fill="#ff7300" />
                    </BarChart>
                  </ChartContainer>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Baixar Gráfico (PDF)
                  </Button>
                  <Button variant="outline">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Exportar Dados (Excel)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Geolocalização */}
        <TabsContent value="geolocation" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Geolocalização de Projetos</CardTitle>
              <CardDescription>Visualize a distribuição geográfica dos projetos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-[500px] flex items-center justify-center">
                <p className="text-gray-500">Mapa interativo de projetos será exibido aqui</p>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Filtrar por tipo de projeto</h4>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os projetos</SelectItem>
                      <SelectItem value="energia">Energia Renovável</SelectItem>
                      <SelectItem value="reflorestamento">Reflorestamento</SelectItem>
                      <SelectItem value="agricultura">Agricultura Sustentável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Visualização</h4>
                  <Select defaultValue="marcadores">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar visualização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marcadores">Marcadores</SelectItem>
                      <SelectItem value="heatmap">Mapa de calor</SelectItem>
                      <SelectItem value="cluster">Clusterização</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Região</h4>
                  <Select defaultValue="brasil">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar região" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brasil">Brasil</SelectItem>
                      <SelectItem value="norte">Região Norte</SelectItem>
                      <SelectItem value="nordeste">Região Nordeste</SelectItem>
                      <SelectItem value="sudeste">Região Sudeste</SelectItem>
                      <SelectItem value="sul">Região Sul</SelectItem>
                      <SelectItem value="centro-oeste">Região Centro-Oeste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo da aba Métricas */}
        <TabsContent value="metrics" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral de Métricas</CardTitle>
              <CardDescription>Acompanhe os principais indicadores de desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Distribuição de Certificados</h3>
                  <ChartContainer className="h-80" config={{}}>
                    <PieChart>
                      <Pie
                        data={certificateData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {certificateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
                <div>
                  <h3 className="font-medium mb-4">KPIs do Sistema</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="shadow-sm">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-500">Usuários Ativos</p>
                        <h4 className="text-2xl font-bold">1,842</h4>
                        <p className="text-xs text-green-600">+12% no mês</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-500">Projetos Certificados</p>
                        <h4 className="text-2xl font-bold">347</h4>
                        <p className="text-xs text-green-600">+8% no mês</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-500">MSC Gerados</p>
                        <h4 className="text-2xl font-bold">58,432</h4>
                        <p className="text-xs text-green-600">+23% no mês</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm">
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-500">Emissões Evitadas (ton)</p>
                        <h4 className="text-2xl font-bold">124,382</h4>
                        <p className="text-xs text-green-600">+16% no mês</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-4">Transações Recentes</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionData.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.value}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
