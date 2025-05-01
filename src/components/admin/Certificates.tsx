
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { 
  QrCode, 
  Check, 
  FileText, 
  Link, 
  Search, 
  Signature, 
  Hash,
  Upload, 
  Calendar, 
  DollarSign, 
  Tag 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CertificateForm from "./CertificateForm";

interface Certificate {
  id: number;
  certificateNumber: string;
  name: string;
  cpfCnpj: string;
  emissionsReduction: string;
  period: string;
  benefitValue: string;
  projectName: string;
  address: string;
  methodology: string;
  blockchainCode?: string;
  qrCodeUrl: string;
  createdAt: string;
  status: "issued" | "revoked" | "pending";
  signature?: string;
  projectId?: string;
  emissionDate?: string;
  creditValue?: string;
  creditCategory?: string;
  certificateFile?: File | null;
}

const Certificates: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      certificateNumber: "CERT-BAN-2025-0001",
      name: "João Silva",
      cpfCnpj: "123.456.789-00",
      emissionsReduction: "500 tCO₂e",
      period: "01/2025 a 12/2025",
      benefitValue: "R$ 25.000,00",
      projectName: "Projeto Reflorestamento Vale Verde",
      projectId: "PROJ-001",
      address: "Estrada Rural, km 5, Vale Verde, SP",
      methodology: "Verra VM0015",
      blockchainCode: "0x7a6f5b9d8c4e3f2a1b0c9d8e7f6a5b4c3d2e1f0",
      qrCodeUrl: "https://banclima.org/cert/CERT-BAN-2025-0001",
      createdAt: "15.01.2025",
      emissionDate: "15/01/2025",
      creditValue: "R$ 1,00",
      creditCategory: "Redução",
      status: "issued",
      signature: "Ana Costa - Diretora Executiva, Banclima"
    },
    {
      id: 2,
      certificateNumber: "CERT-BAN-2025-0002",
      name: "Empresa Sustentável Ltda",
      cpfCnpj: "12.345.678/0001-90",
      emissionsReduction: "1200 tCO₂e",
      period: "02/2025 a 01/2026",
      benefitValue: "R$ 60.000,00",
      projectName: "Energia Solar Sustentável",
      projectId: "PROJ-002",
      address: "Av. da Inovação, 123, São Paulo, SP",
      methodology: "Gold Standard GS-RE",
      blockchainCode: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9",
      qrCodeUrl: "https://banclima.org/cert/CERT-BAN-2025-0002",
      createdAt: "20.01.2025",
      emissionDate: "20/01/2025",
      creditValue: "R$ 1,00",
      creditCategory: "Redução",
      status: "issued",
      signature: "Carlos Mendes - Coordenador de Projetos, Banclima"
    },
  ]);
  const [validationNumber, setValidationNumber] = useState("");
  const [validationResult, setValidationResult] = useState<Certificate | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast("Por favor, insira um termo para buscar");
      return;
    }

    toast(`Buscando por: ${searchTerm}`);
  };

  const handleCertificateCreated = (newCertificate: Omit<Certificate, "id" | "certificateNumber" | "qrCodeUrl" | "createdAt" | "status">) => {
    // Generate certificate number
    const date = new Date();
    const year = date.getFullYear();
    const count = (certificates.length + 1).toString().padStart(4, "0");
    const certificateNumber = `CERT-BAN-${year}-${count}`;
    
    // Generate QR code URL
    const qrCodeUrl = `https://banclima.org/cert/${certificateNumber}`;
    
    // Create new certificate
    const certificate: Certificate = {
      id: certificates.length + 1,
      certificateNumber,
      qrCodeUrl,
      createdAt: new Date().toLocaleDateString("pt-BR").replace(/\//g, "."),
      status: "issued",
      certificateFile,
      ...newCertificate
    };
    
    // Add to certificates list
    setCertificates([...certificates, certificate]);
    
    // Show success message
    toast(`Certificado criado com sucesso. Número do certificado: ${certificateNumber}`);
    
    // Close form
    setShowForm(false);
  };

  const handleValidateCertificate = () => {
    if (!validationNumber.trim()) {
      toast("Por favor, insira um número de certificado para validar");
      return;
    }

    const found = certificates.find(cert => cert.certificateNumber === validationNumber);
    
    if (found) {
      setValidationResult(found);
      toast(`Certificado ${validationNumber} é válido.`);
    } else {
      setValidationResult(null);
      toast(`Certificado ${validationNumber} não encontrado ou inválido.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateFile(e.target.files[0]);
      toast(`Arquivo selecionado: ${e.target.files[0].name}`);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Certificados</h1>

      {/* Certificate Validation Section */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Validação de Certificados</h2>
        <div className="flex gap-2">
          <Input
            value={validationNumber}
            onChange={(e) => setValidationNumber(e.target.value)}
            placeholder="Digite o número do certificado (ex: CERT-BAN-2025-0001)"
            className="max-w-md"
          />
          <Button onClick={handleValidateCertificate}>
            <Search className="h-4 w-4 mr-2" /> Validar
          </Button>
        </div>

        {validationResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-semibold text-green-800">Certificado Válido</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-sm font-semibold">Número do Certificado:</p>
                <p className="text-sm">{validationResult.certificateNumber}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Nome/Empresa:</p>
                <p className="text-sm">{validationResult.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">CPF/CNPJ:</p>
                <p className="text-sm">{validationResult.cpfCnpj}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Projeto:</p>
                <p className="text-sm">{validationResult.projectName}</p>
              </div>
              {validationResult.projectId && (
                <div>
                  <p className="text-sm font-semibold">ID do Projeto:</p>
                  <p className="text-sm">{validationResult.projectId}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold">Redução de Emissões:</p>
                <p className="text-sm">{validationResult.emissionsReduction}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Data de Emissão:</p>
                <p className="text-sm">{validationResult.emissionDate || validationResult.createdAt}</p>
              </div>
              {validationResult.creditValue && (
                <div>
                  <p className="text-sm font-semibold">Valor do Crédito:</p>
                  <p className="text-sm">{validationResult.creditValue}</p>
                </div>
              )}
              {validationResult.creditCategory && (
                <div>
                  <p className="text-sm font-semibold">Categoria do Crédito:</p>
                  <p className="text-sm">{validationResult.creditCategory}</p>
                </div>
              )}
              {validationResult.signature && (
                <div>
                  <p className="text-sm font-semibold">Assinatura Digital:</p>
                  <p className="text-sm">{validationResult.signature}</p>
                </div>
              )}
              {validationResult.blockchainCode && (
                <div className="col-span-1 md:col-span-2">
                  <p className="text-sm font-semibold">Código Blockchain:</p>
                  <p className="text-sm font-mono bg-gray-100 p-1 rounded overflow-auto">
                    {validationResult.blockchainCode}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!showForm ? (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold mb-4">Registro de Certificados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                  ID do Projeto:
                </label>
                <Input id="projectId" placeholder="Informe o ID do projeto" />
              </div>
              <div>
                <label htmlFor="emissionDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Emissão:
                </label>
                <Input id="emissionDate" placeholder="DD/MM/YYYY" />
              </div>
              <div>
                <label htmlFor="cpfCnpj" className="block text-sm font-medium text-gray-700 mb-1">
                  CPF / CNPJ:
                </label>
                <Input id="cpfCnpj" placeholder="000.000.000-00" />
              </div>
              <div>
                <label htmlFor="creditValue" className="block text-sm font-medium text-gray-700 mb-1">
                  Valor do Crédito: R$
                </label>
                <div>
                  <Input id="creditValue" placeholder="0,00" />
                  <p className="text-xs text-gray-500 mt-1">1 token = 1MSC = 1kgCO2e = R$ 1,00</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria do Crédito:
                </label>
                <Input defaultValue="Redução" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Escolher arquivo (PDF)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={triggerFileInput}
                    variant="outline" 
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {certificateFile ? certificateFile.name : "Selecionar arquivo PDF"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button>
                Enviar para validação
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-md">
              <div className="flex gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome, CPF/CNPJ ou número do certificado"
                />
                <Button onClick={handleSearch}>Buscar</Button>
              </div>
            </div>
            <Button onClick={() => setShowForm(true)}>Novo Certificado</Button>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número do Certificado</TableHead>
                  <TableHead>Nome/Empresa</TableHead>
                  <TableHead>CPF/CNPJ</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>ID Projeto</TableHead>
                  <TableHead>Data de Emissão</TableHead>
                  <TableHead>Assinatura</TableHead>
                  <TableHead>Blockchain</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.certificateNumber}</TableCell>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell>{cert.cpfCnpj}</TableCell>
                    <TableCell>{cert.projectName}</TableCell>
                    <TableCell>{cert.projectId}</TableCell>
                    <TableCell>{cert.emissionDate || cert.createdAt}</TableCell>
                    <TableCell>
                      {cert.signature ? (
                        <div className="flex items-center">
                          <Signature className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">Assinado</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Não assinado</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {cert.blockchainCode ? (
                        <div className="flex items-center">
                          <Hash className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-xs text-blue-600">Registrado</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Não registrado</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Ver PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Code
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link className="h-4 w-4 mr-1" />
                          Link
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Novo Certificado</h2>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Voltar
            </Button>
          </div>
          <CertificateForm onSubmit={handleCertificateCreated} />
        </div>
      )}
    </div>
  );
};

export default Certificates;
