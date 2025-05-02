import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserHeader from "@/components/user/UserHeader";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X, FileText, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Esquema de validação do formulário
const formSchema = z.object({
  projectName: z.string().min(2, "Nome do projeto é obrigatório"),
  region: z.string().min(2, "Região é obrigatória"),
  projectType: z.string().min(2, "Tipo de projeto é obrigatório"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  developer: z.string().min(2, "Desenvolvedor é obrigatório"),
  partnerships: z.string().optional(),
  startDate: z.string().optional(),
  residents: z.string().optional(),
  benefits: z.string().optional()
});

type ProjectUpdateFormValues = z.infer<typeof formSchema>;

// Mock de dados de projeto para o formulário
const getProjectData = (id: string) => {
  return {
    id: id,
    name: "Moeda Social Carbono - Colônia Z10",
    registryId: "54321",
    region: "RJ/Brasil",
    type: "Mitigação",
    status: "Em andamento",
    description: "MOEDA SOCIAL CARBONO\n\nO projeto propõe a realização de inventário de emissões de gases de efeito estufa de unidades residenciais, comerciais e/ou empresas.",
    developer: "Instituto Terrazul",
    partnerships: "Prefeitura do Rio / CEA / Colônia de Pescadores Z10",
    support: "Moove",
    startDate: "2025-01-15",
    residents: "40",
    benefits: "R$ 2.740,00",
    emissionsAvoided: "5.280,80",
    lastActivity: "10/04/2025",
    tokens: "3520",
    progress: 70
  };
};

const ProjectUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectData = getProjectData(id || "Ban12345");
  
  // Estado para gerenciar os documentos
  const [documents, setDocuments] = useState<{ name: string; status: string; date: string }[]>([
    { name: "Documento de Validação", status: "Válido", date: "05/04/2025" },
    { name: "Certificado de Emissões", status: "Pendente Renovação", date: "10/03/2025" },
    { name: "Relatório de Monitoramento", status: "Vencido", date: "01/02/2025" }
  ]);
  
  // Estado para gerenciar novos uploads
  const [uploads, setUploads] = useState<{ name: string; progress: number }[]>([]);
  
  // Configuração do formulário
  const form = useForm<ProjectUpdateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: projectData.name,
      region: projectData.region,
      projectType: projectData.type,
      description: projectData.description,
      developer: projectData.developer,
      partnerships: projectData.partnerships,
      startDate: projectData.startDate,
      residents: projectData.residents,
      benefits: projectData.benefits
    },
  });
  
  // Função de envio do formulário
  const onSubmit = (values: ProjectUpdateFormValues) => {
    console.log(values);
    toast.success("Projeto atualizado com sucesso!");
    
    // Simular delay e redirecionar
    setTimeout(() => {
      navigate("/my-projects");
    }, 1500);
  };
  
  // Função para simular upload de arquivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Adicionar novo arquivo ao estado de uploads
      setUploads([...uploads, { name: file.name, progress: 0 }]);
      
      // Simular progresso de upload
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploads(prev => 
            prev.map(upload => 
              upload.name === file.name ? { ...upload, progress } : upload
            )
          );
        } else {
          clearInterval(interval);
          
          // Adicionar documento à lista quando upload completo
          setTimeout(() => {
            setDocuments([...documents, { 
              name: file.name, 
              status: "Válido", 
              date: new Date().toLocaleDateString('pt-BR')
            }]);
            
            // Remover do estado de uploads
            setUploads(prev => prev.filter(upload => upload.name !== file.name));
            
            toast.success(`${file.name} enviado com sucesso!`);
          }, 500);
        }
      }, 300);
    }
  };
  
  // Função para remover documento
  const removeDocument = (documentName: string) => {
    setDocuments(documents.filter(doc => doc.name !== documentName));
    toast.info(`Documento ${documentName} removido`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Link to="/my-projects">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Meus Projetos
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mb-8">
          <Card>
            <CardHeader className="bg-[#0e7cb4] text-white">
              <CardTitle className="text-xl">Atualização de Projeto</CardTitle>
              <CardDescription className="text-gray-100">
                Atualize os dados do projeto ID: {projectData.id}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Projeto</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Região</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Projeto</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Mitigação">Mitigação</SelectItem>
                              <SelectItem value="Compensação">Compensação</SelectItem>
                              <SelectItem value="Adaptação">Adaptação</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="developer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desenvolvedor</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="partnerships"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parcerias</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Início</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="residents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade de Moradores</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="benefits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Benefícios Concedidos</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do Projeto</FormLabel>
                        <FormControl>
                          <Textarea rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Documentos do Projeto</h3>
                    
                    <div className="space-y-4 mb-6">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-[#0e7cb4]" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  doc.status === "Válido" 
                                    ? "bg-green-100 text-green-800" 
                                    : doc.status === "Vencido" 
                                      ? "bg-red-100 text-red-800" 
                                      : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {doc.status}
                                </span>
                                <span className="text-xs text-gray-500">Atualizado em {doc.date}</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeDocument(doc.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      {uploads.map((upload, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                          <div className="flex items-center gap-3 w-full">
                            <Upload className="h-5 w-5 text-[#0e7cb4]" />
                            <div className="w-full">
                              <p className="font-medium">{upload.name}</p>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div 
                                  className="bg-[#0e7cb4] h-1.5 rounded-full" 
                                  style={{ width: `${upload.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">Enviando... {upload.progress}%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="fileUpload"
                        className="flex items-center gap-2 px-4 py-2 border rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        Enviar Novo Documento
                      </label>
                      <FormDescription>
                        Formatos aceitos: PDF, DOC, JPG (máx. 10MB)
                      </FormDescription>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate("/my-projects")}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#0e7cb4] hover:bg-[#0a5c87]"
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectUpdate; 