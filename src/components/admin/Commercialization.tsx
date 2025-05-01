
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, CreditCard, Tag, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const Commercialization: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("sales");
  
  const dummySales = [
    { id: "S001", customer: "Empresa ABC", certificate: "CERT-2023-001", credits: 500, value: 15000, date: "2023-10-15", status: "Completa" },
    { id: "S002", customer: "Corporação XYZ", certificate: "CERT-2023-005", credits: 300, value: 9000, date: "2023-11-03", status: "Pendente" },
    { id: "S003", customer: "Grupo Verde", certificate: "CERT-2023-008", credits: 1000, value: 30000, date: "2023-12-20", status: "Completa" },
  ];
  
  const dummyTransactions = [
    { id: "T001", type: "Venda", certificate: "CERT-2023-001", value: 15000, date: "2023-10-15", status: "Aprovada" },
    { id: "T002", type: "Venda", certificate: "CERT-2023-005", value: 9000, date: "2023-11-03", status: "Aguardando" },
    { id: "T003", type: "Transferência", certificate: "CERT-2023-008", value: 30000, date: "2023-12-20", status: "Aprovada" },
  ];
  
  const dummyPricings = [
    { id: "P001", category: "Carbono Florestal", price: 30, unit: "tCO2e", update: "2023-09-01" },
    { id: "P002", category: "Biodiversidade", price: 35, unit: "crédito", update: "2023-10-15" },
    { id: "P003", category: "Energia Renovável", price: 25, unit: "tCO2e", update: "2023-11-20" },
  ];
  
  const handleNewSale = () => {
    toast("Nova venda iniciada", {
      description: "O formulário de venda foi aberto."
    });
  };
  
  const handleNewPrice = () => {
    toast("Nova categoria de preço adicionada", {
      description: "A categoria de preço foi registrada."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Comercialização</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Vendas
            </CardTitle>
            <CardDescription>Total de vendas realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Valor Total
            </CardTitle>
            <CardDescription>Vendas realizadas (R$)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ 54.000</p>
            <p className="text-sm text-muted-foreground">+R$ 30.000 no último mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Créditos
            </CardTitle>
            <CardDescription>Total de créditos vendidos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1.800</p>
            <p className="text-sm text-muted-foreground">+1.000 no último mês</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="pricing">Precificação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Registro de Vendas</h2>
            <Button onClick={handleNewSale}>Nova Venda</Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Certificado</TableHead>
                    <TableHead>Créditos</TableHead>
                    <TableHead>Valor (R$)</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummySales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.id}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell>{sale.certificate}</TableCell>
                      <TableCell>{sale.credits}</TableCell>
                      <TableCell>{sale.value.toLocaleString('pt-BR')}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          sale.status === 'Completa' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sale.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Histórico de Transações</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Certificado</TableHead>
                    <TableHead>Valor (R$)</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.certificate}</TableCell>
                      <TableCell>{transaction.value.toLocaleString('pt-BR')}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'Aprovada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tabela de Preços</h2>
            <Button onClick={handleNewPrice}>Novo Preço</Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço (R$)</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Última Atualização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyPricings.map((price) => (
                    <TableRow key={price.id}>
                      <TableCell>{price.id}</TableCell>
                      <TableCell>{price.category}</TableCell>
                      <TableCell>{price.price.toLocaleString('pt-BR')}</TableCell>
                      <TableCell>{price.unit}</TableCell>
                      <TableCell>{price.update}</TableCell>
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

export default Commercialization;
