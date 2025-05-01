
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Section - Split Layout */}
      <div className="flex flex-grow">
        {/* Left Side - Full Height Image */}
        <div className="hidden md:block w-1/2 relative">
          <img 
            src="/lovable-uploads/7df9c8cd-d9b9-413d-ab21-1002154f464e.png" 
            alt="Sustainable Finance" 
            className="absolute w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12 bg-white">
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
              <h3 className="text-xl font-bold text-[#0e7cb4] mb-4">
                Cadastro de Usuário
              </h3>
            </div>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  NOME COMPLETO:
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1"
                  placeholder="Seu nome completo"
                />
              </div>
              
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
                    placeholder="Crie uma senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#0e7cb4]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#0e7cb4]" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  CONFIRME SUA SENHA:
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pr-10"
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-[#0e7cb4]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#0e7cb4]" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#0e7cb4] hover:bg-[#0a5c87] h-9 px-3 py-1">
                Cadastrar
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Já possui uma conta? {" "}
                  <Link to="/" className="text-[#0e7cb4] hover:underline font-medium">
                    Faça login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/de4cbd17-2564-4706-9233-a15b28b360da.png" 
                alt="Banclima Logo" 
                className="h-auto w-[235px] inline-block" 
              />
              <span className="ml-2 text-sm">Plataforma de gestão</span>
            </div>
            <div className="text-sm">
              © 2025 Banclima. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
