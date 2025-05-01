import React from "react";
import { Link, useLocation } from "react-router-dom";

const UserNavMenu: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Projetos", path: "/panel" },
    { label: "Moeda Social Carbono", path: "/carbon-currency" },
    { label: "Emissão", path: "/emission" },
    { label: "Rastreabilidade", path: "/traceability" },
    { label: "Certificados", path: "/certificates" },
    { label: "Compra e Venda", path: "/marketplace" },
    { label: "Compliance", path: "/compliance" },
    { label: "Aposentadoria", path: "/retirement" },
    { label: "Espaço Educativo", path: "/educational" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max border-b">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              currentPath === item.path
                ? "border-b-2 border-[#0e7cb4] text-[#0e7cb4]"
                : "text-gray-700 hover:text-[#0e7cb4] hover:border-b-2 hover:border-[#0e7cb4] transition-colors"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserNavMenu;
