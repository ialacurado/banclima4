
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, MoreVertical, Edit, Lock, UserX, UserCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample user data
const initialUsers = [
  { id: 1, name: "Admin Usuario", email: "admin@banclima.org", role: "Administrador", status: "Ativo" },
  { id: 2, name: "Gerente Teste", email: "gerente@banclima.org", role: "Gerente", status: "Ativo" },
  { id: 3, name: "Cliente Exemplo", email: "cliente@email.com", role: "Cliente", status: "Ativo" },
  { id: 4, name: "Compliance Oficial", email: "compliance@banclima.org", role: "Compliance", status: "Ativo" },
  { id: 5, name: "Financeiro Banclima", email: "financeiro@banclima.org", role: "Financeiro", status: "Inativo" },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddUser, setOpenAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Cliente" });
  const [selectedUser, setSelectedUser] = useState<null | typeof initialUsers[0]>(null);
  const [openEditPermissions, setOpenEditPermissions] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    // Here you would normally make an API call
    const newId = Math.max(...users.map((user) => user.id)) + 1;
    setUsers([...users, { ...newUser, id: newId, status: "Ativo" }]);
    setNewUser({ name: "", email: "", role: "Cliente" });
    setOpenAddUser(false);
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === "Ativo" ? "Inativo" : "Ativo",
          };
        }
        return user;
      })
    );
  };

  const updateUserRole = (userId: number, newRole: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      })
    );
    setOpenEditPermissions(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
        <Dialog open={openAddUser} onOpenChange={setOpenAddUser}>
          <DialogTrigger asChild>
            <Button className="bg-[#0e7cb4] hover:bg-[#0a5a83]">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Função
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecionar função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Gerente">Gerente</SelectItem>
                    <SelectItem value="Cliente">Cliente</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="Visitante">Visitante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2" onClick={() => setOpenAddUser(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddUser} className="bg-[#0e7cb4] hover:bg-[#0a5a83]">
                Adicionar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "Ativo"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenEditPermissions(true);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar Permissões</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenResetPassword(true);
                        }}
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Resetar Senha</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                        {user.status === "Ativo" ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Desativar Conta</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Ativar Conta</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Permissions Dialog */}
      <Dialog open={openEditPermissions} onOpenChange={setOpenEditPermissions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Permissões</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <p className="text-sm text-gray-500">
                Editando permissões para {selectedUser.name}
              </p>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editRole" className="text-right">
                  Função
                </Label>
                <Select
                  defaultValue={selectedUser.role}
                  onValueChange={(value) => updateUserRole(selectedUser.id, value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecionar função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Gerente">Gerente</SelectItem>
                    <SelectItem value="Cliente">Cliente</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="Visitante">Visitante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" className="mr-2" onClick={() => setOpenEditPermissions(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#0e7cb4] hover:bg-[#0a5a83]" onClick={() => setOpenEditPermissions(false)}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={openResetPassword} onOpenChange={setOpenResetPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resetar Senha</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">
                Você tem certeza que deseja resetar a senha para {selectedUser.name}?
              </p>
              <p className="text-sm font-medium">
                Uma nova senha temporária será enviada para {selectedUser.email}.
              </p>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" className="mr-2" onClick={() => setOpenResetPassword(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-[#0e7cb4] hover:bg-[#0a5a83]" 
              onClick={() => setOpenResetPassword(false)}
            >
              Resetar Senha
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
