import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Cell, Line } from "recharts";
import { ArrowUp, Users, FileText, Award, ShoppingCart, Clock, AlertTriangle } from "lucide-react";

// Sample data for charts
const projectsByType = [
  { name: "Energia Renovável", value: 35 },
  { name: "Eficiência Energética", value: 25 },
  { name: "Manejo de Resíduos", value: 15 },
  { name: "Agric. Sustentável", value: 10 },
  { name: "Reflorestamento", value: 45 },
  { name: "Conservação", value: 30 },
];

const monthlyEmissionsData = [
  { month: "Jan", emission: 3000 },
  { month: "Fev", emission: 3500 },
  { month: "Mar", emission: 4200 },
  { month: "Abr", emission: 4000 },
  { month: "Mai", emission: 5000 },
  { month: "Jun", emission: 4800 },
  { month: "Jul", emission: 5200 },
  { month: "Ago", emission: 5800 },
  { month: "Set", emission: 6000 },
  { month: "Out", emission: 6300 },
  { month: "Nov", emission: 6500 },
  { month: "Dez", emission: 7000 },
];

const registrationStatus = [
  { name: "Aprovado", value: 42 },
  { name: "Em Análise", value: 15 },
  { name: "Pendente", value: 23 },
  { name: "Reprovado", value: 8 },
];

const COLORS = ["#1976D2", "#5B8DB8", "#9F8E75", "#D15252"];

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel do Administrador</h1>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total de Projetos
              </p>
              <p className="text-3xl font-bold">160</p>
              <div className="flex items-center text-blue-600 text-sm mt-2">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>12% esse mês</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-banclima-blue/20 flex items-center justify-center">
              <FileText className="h-6 w-6 text-banclima-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Usuários Registrados
              </p>
              <p className="text-3xl font-bold">478</p>
              <div className="flex items-center text-blue-600 text-sm mt-2">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>8% esse mês</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-banclima-blue/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-banclima-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Certificados Emitidos
              </p>
              <p className="text-3xl font-bold">53</p>
              <div className="flex items-center text-blue-600 text-sm mt-2">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>15% esse mês</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-banclima-blue/20 flex items-center justify-center">
              <Award className="h-6 w-6 text-banclima-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Créditos Comercializados
              </p>
              <p className="text-3xl font-bold">12.5k</p>
              <div className="flex items-center text-blue-600 text-sm mt-2">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>23% esse mês</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-banclima-blue-dark/20 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-banclima-blue-dark" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Alert Items */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center p-2 bg-yellow-50 rounded-md border border-yellow-200">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="font-medium">5 projetos necessitam de revisão técnica</p>
                <p className="text-sm text-gray-500">Revisão pendente há mais de 7 dias</p>
              </div>
            </div>
            <div className="flex items-center p-2 bg-blue-50 rounded-md border border-blue-200">
              <Clock className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <p className="font-medium">12 novos registros preliminares</p>
                <p className="text-sm text-gray-500">Aguardando avaliação inicial</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Tabs defaultValue="emissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="emissions">Emissões Evitadas</TabsTrigger>
          <TabsTrigger value="projects">Tipos de Projeto</TabsTrigger>
          <TabsTrigger value="status">Status de Registro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="emissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emissões Evitadas (tCO₂e) - 2025</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyEmissionsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="emission" stroke="#1976D2" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo de Projeto</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectsByType}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Quantidade" fill="#5B8DB8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status de Registros</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={registrationStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {registrationStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
