
import React, { useState } from "react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import SidebarNav from "./SidebarNav";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string>("admin"); // In a real app, this would come from auth context

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="!border-none">
          <SidebarNav userRole={userRole} />
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
