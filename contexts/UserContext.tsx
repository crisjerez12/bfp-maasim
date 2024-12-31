"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthenticatedUser } from "@/app/actions/auth";
import { logout as logoutAction } from "@/app/actions/auth";

interface User {
  Name: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getAuthenticatedUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
