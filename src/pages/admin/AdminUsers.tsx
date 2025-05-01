
import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import UserManagement from "../../components/admin/UserManagement";

const AdminUsers: React.FC = () => {
  return (
    <MainLayout>
      <UserManagement />
    </MainLayout>
  );
};

export default AdminUsers;
