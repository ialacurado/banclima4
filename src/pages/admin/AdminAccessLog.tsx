
import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import AccessLog from "../../components/admin/AccessLog";

const AdminAccessLog: React.FC = () => {
  return (
    <MainLayout>
      <AccessLog />
    </MainLayout>
  );
};

export default AdminAccessLog;
