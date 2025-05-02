import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Credenciais pré-definidas para acesso direto ao painel
  const userCredentials = [
    { email: "admin@banclima.com", password: "senha123", redirectTo: "/admin" },
    { email: "usuario@banclima.com", password: "senha123", redirectTo: "/panel" },
    { email: "cliente@banclima.com", password: "senha123", redirectTo: "/panel" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação simples
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      // Verifica as credenciais
      const user = userCredentials.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        toast.success("Login realizado com sucesso!");
        // Redireciona para a página adequada com base na credencial
        navigate(user.redirectTo);
      } else {
        toast.error("Email ou senha incorretos");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Full Height Image */}
      <div className="hidden md:block w-1/2 relative">
        <img 
          src="/lovable-uploads/7df9c8cd-d9b9-413d-ab21-1002154f464e.png" 
          alt="Sustainable Finance" 
          className="absolute w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form and Footer */}
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col items-center">
              <h2 className="text-center text-xl font-bold text-black mb-6">
                PLATAFORMA DE GESTÃO
              </h2>
              <img 
                src="/lovable-uploads/07427772-7049-41cb-996b-2d1ad53f5d8e.png" 
                alt="Banclima Logo" 
                className="h-16 mb-8" 
              />
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  EMAIL:
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  SENHA:
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pr-10"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#0e7cb4]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#0e7cb4]" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs text-[#0e7cb4] hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#0e7cb4] hover:bg-[#0a5c87] h-9 px-3 py-1"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              <p>Credenciais para teste:</p>
              <p>Email: usuario@banclima.com</p>
              <p>Senha: senha123</p>
            </div>
          </div>
        </div>

        {/* Footer - Only on right side */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
