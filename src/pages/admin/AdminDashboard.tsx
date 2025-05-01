
import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import Dashboard from "../../components/admin/Dashboard";

const AdminDashboard: React.FC = () => {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
};

export default AdminDashboard;
