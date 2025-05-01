
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e7cb4] text-white w-full py-4 px-6">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/f39d7417-003f-492e-a50c-3da391f017a6.png" 
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
