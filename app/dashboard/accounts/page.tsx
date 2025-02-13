"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Edit, Trash2 } from "lucide-react";
import { AddUserDialog } from "@/components/add-user-dialog";
import { UpdateUserDialog } from "@/components/update-user-dialog";
import { TUser } from "@/lib/type";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/app/actions/auth";

export default function AccountsPage() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [error, setError] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<TUser | null>(null);
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

  const openDeleteConfirm = (user: TUser) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      const result = await deleteUser(userToDelete._id);
      if (result.success) {
        toast({
          title: "Success",
          variant: "success",
          description: "User deleted successfully",
        });
        setUsers(users.filter((u) => u._id !== userToDelete._id));
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
      setIsDeleteConfirmOpen(false);
    }
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
                <th className="p-3 text-lg font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username} className="border-b border-gray-700">
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => openUpdateDialog(user)}
                      className="bg-[#3b82f6] text-white p-2 rounded-md inline-flex items-center hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Update
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(user)}
                      className="bg-red-600 text-white p-2 rounded-md inline-flex items-center hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
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

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1f2937] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
