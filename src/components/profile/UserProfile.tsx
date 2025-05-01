
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Lock, Edit, UserCheck, Award, BarChart } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "João Silva",
      email: "joao.silva@example.com",
      phone: "(11) 98765-4321",
      company: "Empresa Verde Ltda.",
      role: "Gestor Ambiental"
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    toast.success("Perfil atualizado com sucesso!");
    setIsEditing(false);
  };

  const carbonStats = [
    { label: "Créditos de Carbono", value: "2.500", change: "+15%" },
    { label: "Certificados Emitidos", value: "12", change: "+3" },
    { label: "Emissões Evitadas (ton)", value: "7.845", change: "+22%" },
    { label: "Projetos Participantes", value: "5", change: "+1" }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit size={16} className="mr-2" />
          {isEditing ? "Cancelar edição" : "Editar perfil"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/lovable-uploads/de4cbd17-2564-4706-9233-a15b28b360da.png" alt="@joaosilva" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <CardTitle>João Silva</CardTitle>
            <CardDescription>Gestor Ambiental</CardDescription>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" />
              <span>joao.silva@example.com</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Phone className="mr-2 h-4 w-4" />
              <span>(11) 98765-4321</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm">Empresa</h3>
                <p className="text-sm text-muted-foreground">Empresa Verde Ltda.</p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Membro desde</h3>
                <p className="text-sm text-muted-foreground">Junho 2023</p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Nível de Acesso</h3>
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Usuário Premium
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3">
              <TabsTrigger value="personal">
                <User className="w-4 h-4 mr-2" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="w-4 h-4 mr-2" />
                Segurança
              </TabsTrigger>
              <TabsTrigger value="impact">
                <Award className="w-4 h-4 mr-2" />
                Meu Impacto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cargo</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!isEditing} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {isEditing && (
                        <div className="flex justify-end">
                          <Button type="submit">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Salvar Alterações
                          </Button>
                        </div>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Gerencie sua senha e configurações de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="flex justify-end">
                      <Button>
                        <Lock className="mr-2 h-4 w-4" />
                        Atualizar Senha
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="text-lg font-medium mb-4">Preferências de Segurança</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Autenticação em duas etapas</h4>
                          <p className="text-sm text-muted-foreground">
                            Adicione uma camada extra de segurança à sua conta
                          </p>
                        </div>
                        <Button variant="outline">Configurar</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Dispositivos conectados</h4>
                          <p className="text-sm text-muted-foreground">
                            Gerencie dispositivos que têm acesso à sua conta
                          </p>
                        </div>
                        <Button variant="outline">Visualizar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil de Impacto</CardTitle>
                  <CardDescription>
                    Acompanhe sua contribuição para a sustentabilidade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {carbonStats.map((stat, index) => (
                      <Card key={index} className="shadow-sm">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-500">{stat.label}</p>
                          <h4 className="text-2xl font-bold">{stat.value}</h4>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Certificados Conquistados</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 flex items-center">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                          <Award size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium">Protetor do Clima</h4>
                          <p className="text-sm text-muted-foreground">
                            Conquistado em 10/02/2024
                          </p>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 flex items-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                          <BarChart size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium">Especialista em Créditos</h4>
                          <p className="text-sm text-muted-foreground">
                            Conquistado em 15/03/2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
