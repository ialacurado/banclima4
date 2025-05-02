import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 w-full py-4 px-6">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/07427772-7049-41cb-996b-2d1ad53f5d8e.png" 
            alt="Banclima Logo" 
            className="h-8 mr-3"  
          />
          <span className="text-sm">&copy; 2025 Banclima. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
