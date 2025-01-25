"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Edit } from "lucide-react";
import { AddUserDialog } from "@/components/add-user-dialog";
import { UpdateUserDialog } from "@/components/update-user-dialog";
import { TUser } from "@/lib/type";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function AccountsPage() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();
  if (user?.role !== "ADMIN") {
    router.push("/dashboard");
    toast({
      title: "Access Denied",
      variant: "destructive",
      description: "Admin only page",
    });
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const result = await response.json();
        if (result.success) {
          setUsers(result.data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        setError("An error occurred while fetching users");
      }
    };

    fetchUsers();
  }, []);

  const openUpdateDialog = (user: TUser) => {
    setSelectedUser(user);
    setIsUpdateUserDialogOpen(true);
  };
  if (error)
    return (
      <div className="text-red-500 uppercase text-xl font-bold">{error}</div>
    );

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-white flex items-center">
            <Users className="mr-2 h-8 w-8 text-white" />
            User Accounts
          </h1>
          <button
            onClick={() => setIsAddUserDialogOpen(true)}
            className="bg-[#3b82f6] text-white p-2 rounded-md flex items-center hover:bg-blue-600 transition-colors"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add User
          </button>
        </div>

        <div className="bg-[#1f2937] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#374151] text-left">
                <th className="p-3 text-lg font-semibold">First Name</th>
                <th className="p-3 text-lg font-semibold">Last Name</th>
                <th className="p-3 text-lg font-semibold">Username</th>
                <th className="p-3 text-lg font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username} className="border-b border-gray-700">
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        openUpdateDialog(user);
                      }}
                      className="bg-[#3b82f6] text-white p-2 rounded-md flex items-center hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onClose={() => setIsAddUserDialogOpen(false)}
      />

      <UpdateUserDialog
        isOpen={isUpdateUserDialogOpen}
        onClose={() => setIsUpdateUserDialogOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
