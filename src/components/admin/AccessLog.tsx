
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isSameDay, isWithinInterval, parse, parseISO, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Download, FileText, Search, Calendar as CalendarIcon, User, Filter, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Sample log data
const initialLogs = [
  { id: 1, user: "Admin Usuario", action: "Login", details: "Login bem-sucedido", date: "2025-04-28 09:15:22", ip: "192.168.1.100", device: "Chrome / Windows" },
  { id: 2, user: "Gerente Teste", action: "Cadastro", details: "Criou novo projeto: Reflorestamento Amazônia", date: "2025-04-28 10:30:45", ip: "192.168.1.102", device: "Firefox / MacOS" },
  { id: 3, user: "Compliance Oficial", action: "Aprovação", details: "Aprovou documentação do projeto #CR-2025-0032", date: "2025-04-27 14:20:10", ip: "192.168.1.105", device: "Safari / iOS" },
  { id: 4, user: "Cliente Exemplo", action: "Envio", details: "Enviou documentos para projeto #CR-2025-0045", date: "2025-04-27 11:05:33", ip: "192.168.1.110", device: "Chrome / Android" },
  { id: 5, user: "Admin Usuario", action: "Alteração", details: "Atualizou permissões do usuário 'Gerente Teste'", date: "2025-04-26 16:45:12", ip: "192.168.1.100", device: "Chrome / Windows" },
  { id: 6, user: "Financeiro Banclima", action: "Emissão", details: "Emitiu certificado #CRT-2025-0089 para projeto Reflorestamento Amazônia", date: "2025-04-26 13:22:08", ip: "192.168.1.115", device: "Edge / Windows" },
  { id: 7, user: "Gerente Teste", action: "Logout", details: "Sessão finalizada", date: "2025-04-26 17:30:01", ip: "192.168.1.102", device: "Firefox / MacOS" },
  { id: 8, user: "Admin Usuario", action: "Exclusão", details: "Removeu projeto #CR-2025-0012", date: "2025-04-25 11:10:56", ip: "192.168.1.100", device: "Chrome / Windows" },
  { id: 9, user: "Compliance Oficial", action: "Reprovação", details: "Reprovou documentação do projeto #CR-2025-0029", date: "2025-04-25 09:45:22", ip: "192.168.1.105", device: "Safari / iOS" },
  { id: 10, user: "Cliente Exemplo", action: "Login", details: "Login bem-sucedido", date: "2025-04-25 08:05:30", ip: "192.168.1.110", device: "Chrome / Android" },
  { id: 11, user: "Gerente Teste", action: "Emissão", details: "Emitiu certificado #CRT-2025-0090 para projeto Recuperação Mata Atlântica", date: "2025-04-24 15:22:40", ip: "192.168.1.102", device: "Firefox / MacOS" },
  { id: 12, user: "Admin Usuario", action: "Alteração", details: "Alterou configurações do sistema", date: "2025-04-24 14:05:18", ip: "192.168.1.100", device: "Chrome / Windows" },
  { id: 13, user: "Financeiro Banclima", action: "Cadastro", details: "Cadastrou nova conta bancária para recebimentos", date: "2025-04-23 11:30:25", ip: "192.168.1.115", device: "Edge / Windows" },
  { id: 14, user: "Cliente Exemplo", action: "Envio", details: "Enviou comprovante de pagamento para projeto #CR-2025-0045", date: "2025-04-23 09:12:50", ip: "192.168.1.110", device: "Chrome / Android" },
  { id: 15, user: "Compliance Oficial", action: "Aprovação", details: "Aprovou documentação do projeto #CR-2025-0033", date: "2025-04-22 16:40:05", ip: "192.168.1.105", device: "Safari / iOS" },
];

// List of users for filter
const users = [...new Set(initialLogs.map(log => log.user))];

// Define action types and their corresponding colors
const actionTypes = {
  "Login": { color: "blue" },
  "Logout": { color: "blue" },
  "Cadastro": { color: "blue" },
  "Alteração": { color: "blue" },
  "Exclusão": { color: "blue" },
  "Aprovação": { color: "blue" },
  "Reprovação": { color: "red" },
  "Envio": { color: "blue" },
  "Emissão": { color: "blue" },
};

const AccessLog: React.FC = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [period, setPeriod] = useState("all");
  const [currentTab, setCurrentTab] = useState("all");

  // Handle predefined date periods
  const handlePeriodChange = (selectedPeriod: string) => {
    setPeriod(selectedPeriod);
    
    if (selectedPeriod === "today") {
      const today = new Date();
      setDateFrom(today);
      setDateTo(today);
    } else if (selectedPeriod === "yesterday") {
      const yesterday = subDays(new Date(), 1);
      setDateFrom(yesterday);
      setDateTo(yesterday);
    } else if (selectedPeriod === "last7days") {
      setDateFrom(subDays(new Date(), 7));
      setDateTo(new Date());
    } else if (selectedPeriod === "last30days") {
      setDateFrom(subDays(new Date(), 30));
      setDateTo(new Date());
    } else if (selectedPeriod === "all") {
      setDateFrom(undefined);
      setDateTo(undefined);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setUserFilter("");
    setActionFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
    setPeriod("all");
    setCurrentTab("all");
  };

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter((log) => {
    // Tab filter
    if (currentTab !== "all") {
      if (currentTab === "login" && log.action !== "Login" && log.action !== "Logout") {
        return false;
      }
      if (currentTab === "projects" && !log.details.toLowerCase().includes("projeto")) {
        return false;
      }
      if (currentTab === "users" && !log.details.toLowerCase().includes("usuário")) {
        return false;
      }
      if (currentTab === "documents" && !log.details.toLowerCase().includes("document")) {
        return false;
      }
      if (currentTab === "certificates" && !log.details.toLowerCase().includes("certificad")) {
        return false;
      }
    }

    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.device.toLowerCase().includes(searchTerm.toLowerCase());

    // User filter
    const matchesUser = userFilter === "" || log.user === userFilter;

    // Action type filter
    const matchesAction = actionFilter === "" || log.action === actionFilter;

    // Date range filter
    let matchesDateRange = true;
    
    if (dateFrom && dateTo) {
      try {
        const logDate = parseISO(log.date.replace(" ", "T"));
        const startDate = new Date(dateFrom);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        
        matchesDateRange = isWithinInterval(logDate, { 
          start: startDate, 
          end: endDate 
        });
      } catch (error) {
        console.error("Date parsing error:", error);
        matchesDateRange = false;
      }
    }

    return matchesSearch && matchesUser && matchesAction && matchesDateRange;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    try {
      const date = parseISO(dateString.replace(" ", "T"));
      return format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Handle exporting functionality
  const handleExport = (type: "pdf" | "excel") => {
    // In a real app, this would generate and download a file
    toast.success(`Exportando ${type === "pdf" ? "PDF" : "Excel"} com ${filteredLogs.length} registros`, {
      description: `Os registros filtrados foram exportados com sucesso.`,
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Log de Acesso</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <FileText className="mr-2 h-4 w-4" />
                Exportar Relatório
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exportar Relatório de Logs</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Selecione o formato de exportação. Serão exportados {filteredLogs.length} registros com os filtros atuais aplicados.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Button 
                    className="flex flex-col gap-2 h-auto py-4"
                    variant="outline"
                    onClick={() => handleExport("pdf")}
                  >
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">PDF</p>
                      <p className="text-xs text-muted-foreground">Exportar como documento PDF</p>
                    </div>
                  </Button>
                  <Button
                    className="flex flex-col gap-2 h-auto py-4"
                    variant="outline"
                    onClick={() => handleExport("excel")}
                  >
                    <Download className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">Excel</p>
                      <p className="text-xs text-muted-foreground">Exportar como planilha Excel</p>
                    </div>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardContent className="p-4">
            <Tabs 
              defaultValue="all" 
              value={currentTab}
              onValueChange={(value) => setCurrentTab(value)} 
              className="mb-6"
            >
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto">
                <TabsTrigger value="all" className="text-xs lg:text-sm py-2">Todos</TabsTrigger>
                <TabsTrigger value="login" className="text-xs lg:text-sm py-2">Login/Logout</TabsTrigger>
                <TabsTrigger value="projects" className="text-xs lg:text-sm py-2">Projetos</TabsTrigger>
                <TabsTrigger value="users" className="text-xs lg:text-sm py-2">Usuários</TabsTrigger>
                <TabsTrigger value="documents" className="text-xs lg:text-sm py-2">Documentação</TabsTrigger>
                <TabsTrigger value="certificates" className="text-xs lg:text-sm py-2">Certificados</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-primary" />
                  <Input
                    placeholder="Buscar no log..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>

                {/* User filter */}
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-primary" />
                      <SelectValue placeholder="Usuário" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Usuários</SelectItem>
                    {users.map(user => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Action type filter */}
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-primary" />
                      <SelectValue placeholder="Tipo de Ação" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Ações</SelectItem>
                    {Object.keys(actionTypes).map(action => (
                      <SelectItem key={action} value={action}>{action}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date filter */}
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal w-full"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {dateFrom && dateTo
                        ? `${format(dateFrom, "dd/MM/yyyy")} - ${format(dateTo, "dd/MM/yyyy")}`
                        : "Filtrar por data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 border-b">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Período</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={period === "today" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePeriodChange("today")}
                          >
                            Hoje
                          </Button>
                          <Button
                            variant={period === "yesterday" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePeriodChange("yesterday")}
                          >
                            Ontem
                          </Button>
                          <Button
                            variant={period === "last7days" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePeriodChange("last7days")}
                          >
                            7 dias
                          </Button>
                          <Button
                            variant={period === "last30days" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePeriodChange("last30days")}
                          >
                            30 dias
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b">
                      <h4 className="font-medium text-sm mb-2">Período personalizado</h4>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <h5 className="text-xs mb-1">Data inicial</h5>
                            <Calendar
                              mode="single"
                              selected={dateFrom}
                              onSelect={setDateFrom}
                              disabled={(date) => dateTo ? date > dateTo : false}
                              initialFocus
                              className="rounded-md border w-full"
                            />
                          </div>
                          <div>
                            <h5 className="text-xs mb-1">Data final</h5>
                            <Calendar
                              mode="single"
                              selected={dateTo}
                              onSelect={setDateTo}
                              disabled={(date) => dateFrom ? date < dateFrom : false}
                              initialFocus
                              className="rounded-md border w-full"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setDateFrom(undefined);
                              setDateTo(undefined);
                              setPeriod("all");
                              setIsCalendarOpen(false);
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setIsCalendarOpen(false)}
                          >
                            Aplicar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Active filters */}
              {(searchTerm || userFilter || actionFilter || dateFrom || dateTo) && (
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  <span className="text-sm font-medium">Filtros ativos:</span>
                  {searchTerm && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span>Busca: {searchTerm}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                    </Badge>
                  )}
                  {userFilter && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span>Usuário: {userFilter}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setUserFilter("")} />
                    </Badge>
                  )}
                  {actionFilter && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span>Ação: {actionFilter}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setActionFilter("")} />
                    </Badge>
                  )}
                  {dateFrom && dateTo && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span>
                        Período: {format(dateFrom, "dd/MM/yyyy")} - {format(dateTo, "dd/MM/yyyy")}
                      </span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => {
                          setDateFrom(undefined);
                          setDateTo(undefined);
                          setPeriod("all");
                        }} 
                      />
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar todos
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Data e Hora</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Tipo de Ação</TableHead>
                <TableHead className="hidden md:table-cell">Detalhes</TableHead>
                <TableHead className="hidden lg:table-cell">IP / Dispositivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {formatDisplayDate(log.date)}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`
                          bg-${actionTypes[log.action as keyof typeof actionTypes]?.color}-100
                          text-${actionTypes[log.action as keyof typeof actionTypes]?.color}-800
                        `}
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{log.details}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-sm">
                        <div>{log.ip}</div>
                        <div className="text-xs text-muted-foreground">{log.device}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Nenhum registro encontrado para os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Exibindo {filteredLogs.length > 0 ? indexOfFirstItem + 1 : 0}-
              {Math.min(indexOfLastItem, filteredLogs.length)} de {filteredLogs.length} registros
            </div>
            <div className="text-sm">
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder={itemsPerPage.toString()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                    let pageNumber = currentPage;
                    
                    if (totalPages <= 5) {
                      // If total pages is less than 5, show all pages
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      // If current page is near the start, show first 5 pages
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // If current page is near the end, show last 5 pages
                      pageNumber = totalPages - 4 + index;
                    } else {
                      // Otherwise show current page in the middle
                      pageNumber = currentPage - 2 + index;
                    }
                    
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          isActive={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessLog;
