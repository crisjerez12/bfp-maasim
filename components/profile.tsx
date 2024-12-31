"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";
import { LogoutButton } from "@/components/LogoutButton";

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
        <Avatar className="w-12 ">
          <AvatarImage src="/user-icon.png" alt="user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
