
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import UserProfile from "@/components/profile/UserProfile";

const Profile: React.FC = () => {
  return (
    <MainLayout>
      <UserProfile />
    </MainLayout>
  );
};

export default Profile;
