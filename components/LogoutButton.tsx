"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";

interface LogoutButtonProps {
  size?: "default" | "sm" | "lg" | "icon";
  showWords?: boolean;
}

export function LogoutButton({
  size = "default",
  showWords = true,
}: LogoutButtonProps) {
  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logging out",
        variant: "success",
        description: "Going back to Log in Page",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        variant: "destructive",
        description: "Failed to logout",
      });
    }
  };

  return (
    <Button
      className="bg-blue-800 hover:bg-blue-900"
      size={size}
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5 mr-2" />
      {showWords && "Logout"}
    </Button>
  );
}
