"use client";

import { useUser } from "@/contexts/UserContext";
import { LogoutButton } from "@/components/LogoutButton";
import Image from "next/image";
import profileIcon from "@/app/assets/user-icon.png";
interface ProfileCardProps {
  sidebarOpen: boolean;
}

const ProfileCard = ({ sidebarOpen }: ProfileCardProps) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="bg-blue-800 h-12 w-12 rounded"></div>;
  }

  if (!sidebarOpen) {
    return <LogoutButton size="icon" showWords={sidebarOpen} />;
  }

  return (
    <div className="flex flex-col space-y-2 bg-gradient-to-r from-gray-300 to-gray-400 p-2 rounded-md">
      <div className="flex items-center space-x-2">
        <Image
          className="w-12"
          src={profileIcon}
          alt="user"
          width={100}
          height={100}
        />

        <div className="flex flex-col text-gray-950">
          <p className="text-md font-semibold">{user?.Name || "Guest"}</p>
          <p className="text-sm font-medium uppercase">{user?.role || "N/A"}</p>
        </div>
      </div>
      <LogoutButton size="default" showWords={sidebarOpen} />
    </div>
  );
};

export default ProfileCard;
