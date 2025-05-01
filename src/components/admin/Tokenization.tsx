
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Badge, 
  Shield, 
  FileText, 
  Tag, 
  Lock,
  QrCode,
  ShieldCheck,
} from "lucide-react";

const Tokenization: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const tokens = [
    { 
      id: "TOK-26472", 
      name: "Projeto Solar Vale Verde", 
      type: "Energia Renovável", 
      value: "100.00", 
      units: "500", 
      date: "15/03/2025",
      status: "Ativo"
    },
    { 
      id: "TOK-15893", 
      name: "Reflorestamento Amazônia", 
      type: "Conservação Florestal", 
      value: "120.00", 
      units: "750", 
      date: "22/02/2025",
      status: "Ativo"
    },
    { 
      id: "TOK-78204", 
      name: "Energia Eólica Nordeste", 
      type: "Energia Renovável", 
      value: "95.00", 
      units: "300", 
      date: "05/01/2025",
      status: "Pendente"
    },
    { 
      id: "TOK-42017", 
      name: "Agricultura Sustentável Cerrado", 
      type: "Agricultura", 
      value: "85.00", 
      units: "450", 
      date: "18/03/2025",
      status: "Ativo"
    },
    { 
      id: "TOK-53681", 
      name: "Gestão de Resíduos Urbanos SP", 
      type: "Resíduos", 
      value: "75.00", 
      units: "600", 
      date: "10/02/2025",
      status: "Inativo"
    }
  ];

  const filteredTokens = tokens.filter(
    token => 
      token.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tokenização</h1>
        <Button>
          <Tag className="mr-2 h-4 w-4" />
          Novo Token
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Tokens</CardTitle>
            <CardDescription>Ativos na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,145</div>
            <p className="text-xs text-muted-foreground">
              +15% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <CardDescription>Em tokens ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1,542,300</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transações</CardTitle>
            <CardDescription>Nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              +23% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Volume Transacionado</CardTitle>
            <CardDescription>Nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 437,890</div>
            <p className="text-xs text-muted-foreground">
              +17% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="tokens">
            <Shield className="w-4 h-4 mr-2" />
            Tokens
          </TabsTrigger>
          <TabsTrigger value="transacoes">
            <QrCode className="w-4 h-4 mr-2" />
            Transações
          </TabsTrigger>
          <TabsTrigger value="certificados">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Certificados Tokenizados
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gestão de Tokens</CardTitle>
              <CardDescription>
                Gerencie os tokens de crédito de carbono e certificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
                <div className="w-full md:w-1/3">
                  <Label htmlFor="search" className="sr-only">Buscar</Label>
                  <Input 
                    id="search" 
                    placeholder="Buscar por ID, nome ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Badge className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor (R$)</TableHead>
                    <TableHead>Unidades</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell className="font-medium">{token.id}</TableCell>
                      <TableCell>{token.name}</TableCell>
                      <TableCell>{token.type}</TableCell>
                      <TableCell>{token.value}</TableCell>
                      <TableCell>{token.units}</TableCell>
                      <TableCell>{token.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          token.status === "Ativo" 
                            ? "bg-green-100 text-green-800" 
                            : token.status === "Pendente" 
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {token.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" title="Visualizar">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Proteger">
                            <Lock className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transacoes" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>
                Acompanhe todas as transações de tokens na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center">
                <Lock className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Transações serão exibidas aqui</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Este painel mostrará o histórico completo de transações quando disponível
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificados" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Certificados Tokenizados</CardTitle>
              <CardDescription>
                Visualize os certificados convertidos em tokens na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center">
                <ShieldCheck className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Certificados tokenizados serão exibidos aqui</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Este painel mostrará os certificados convertidos em tokens quando disponível
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tokenization;
