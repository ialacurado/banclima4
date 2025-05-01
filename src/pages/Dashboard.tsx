import React from "react";
import UserNavMenu from "@/components/user/UserNavMenu";
import UserHeader from "@/components/user/UserHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, CreditCard, Folder, Award } from "lucide-react";

const Dashboard: React.FC = () => {
  // Dados mock - em uma aplicação real viriam de uma API
  const dashboardData = {
    projetosAtivos: 1,
    mscTotal: 282813,
    certificadosEmitidos: 40,
    ultimaAtividade: {
      tipo: "Login",
      data: "15/09/2024",
      hora: "14:32"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        <UserNavMenu />
        
        <div className="w-full text-center py-10 bg-[#0e7cb4] text-white mt-6">
          <h1 className="text-3xl font-bold mb-2">DASHBOARD</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Card de Projetos Ativos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
              <Folder className="h-4 w-4 text-[#0e7cb4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.projetosAtivos}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de projetos em andamento
              </p>
            </CardContent>
          </Card>

          {/* Card de MSCs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MSCs</CardTitle>
              <CreditCard className="h-4 w-4 text-[#0e7cb4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.mscTotal.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Moedas Sociais Carbono disponíveis
              </p>
            </CardContent>
          </Card>

          {/* Card de Certificados */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificados</CardTitle>
              <Award className="h-4 w-4 text-[#0e7cb4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.certificadosEmitidos}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de certificados emitidos
              </p>
            </CardContent>
          </Card>

          {/* Card de Última Atividade */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atividade</CardTitle>
              <Clock className="h-4 w-4 text-[#0e7cb4]" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold">{dashboardData.ultimaAtividade.tipo}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {dashboardData.ultimaAtividade.data} às {dashboardData.ultimaAtividade.hora}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Seção de resumo de projeto */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Resumo do Projeto</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src="/lovable-uploads/MOEDA-SOCIAL-CARBONO.png" 
                  alt="Moeda Social Carbono"
                  className="h-24 object-contain"
                />
                <div>
                  <h3 className="text-lg font-medium mb-2">Moeda Social Carbono - Colônia Z10</h3>
                  <p className="text-sm text-gray-600 mb-1">Registro Banclima 54321</p>
                  <p className="text-sm text-gray-600 mb-1">Região: RJ/Brasil</p>
                  <p className="text-sm text-gray-600 mb-3">Tipo: Mitigação</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Tokens Publicados</p>
                      <p className="text-[#0e7cb4] font-bold">282813</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm">Projeto Certificado Gold Standard</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500 mt-auto">
        <span className="inline-flex items-center justify-center">
          Todos os direitos reservados
          <img
            src="/lovable-uploads/07427772-7049-41cb-996b-2d1ad53f5d8e.png"
            alt="Banclima Logo"
            className="h-4 inline-block ml-1"
          />
        </span>
      </footer>
    </div>
  );
};

export default Dashboard; 