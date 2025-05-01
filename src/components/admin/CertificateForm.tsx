
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Check, Signature, Hash, Calendar, DollarSign, Tag } from "lucide-react";

interface CertificateFormData {
  name: string;
  cpfCnpj: string;
  emissionsReduction: string;
  period: string;
  benefitValue: string;
  projectName: string;
  address: string;
  methodology: string;
  blockchainCode?: string;
  signature?: string;
  projectId?: string;
  emissionDate?: string;
  creditValue?: string;
  creditCategory?: string;
}

interface CertificateFormProps {
  onSubmit: (data: CertificateFormData) => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit }) => {
  const form = useForm<CertificateFormData>({
    defaultValues: {
      name: "",
      cpfCnpj: "",
      emissionsReduction: "",
      period: "",
      benefitValue: "",
      projectName: "",
      address: "",
      methodology: "",
      blockchainCode: "",
      signature: "",
      projectId: "",
      emissionDate: "",
      creditValue: "",
      creditCategory: "Redução",
    },
  });

  const handleSubmit = (data: CertificateFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  ID do Projeto
                </FormLabel>
                <FormControl>
                  <Input placeholder="Identificador único do projeto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emissionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Data de Emissão
                </FormLabel>
                <FormControl>
                  <Input placeholder="DD/MM/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creditValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Valor do Crédito (R$)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: R$ 1,00" {...field} />
                </FormControl>
                <FormDescription>
                  1 token = 1MSC = 1kgCO2e
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creditCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Categoria do Crédito
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Redução"
                    defaultValue="Redução"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo do beneficiário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpfCnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF ou CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="CPF ou CNPJ do beneficiário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emissionsReduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Redução de Emissões</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 500 tCO₂e" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Período</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 01/2025 a 12/2025" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="benefitValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Benefício a ser transferido</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: R$ 25.000,00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Projeto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do projeto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Textarea placeholder="Endereço completo do projeto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="methodology"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metodologia Aplicada</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Verra VM0015, Gold Standard, etc." {...field} />
                </FormControl>
                <FormDescription>
                  Cite se foi usado padrão próprio, Verra, Gold Standard, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blockchainCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <Hash className="h-4 w-4" />
                  Código de Rastreamento Blockchain
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Hash ou código de rastreamento blockchain" 
                    {...field}
                    className="font-mono text-sm" 
                  />
                </FormControl>
                <FormDescription>
                  Se o projeto for tokenizado ou registrado em blockchain, insira o hash ou identificador único
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assinatura Digital</FormLabel>
                <FormControl>
                  <Input placeholder="Nome e cargo do responsável (ex: João Silva - Diretor)" {...field} />
                </FormControl>
                <FormDescription>
                  Nome do administrador e/ou entidade certificadora
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" /> Gerar Certificado
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CertificateForm;
