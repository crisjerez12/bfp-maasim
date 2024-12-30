"use client";

import { useState } from "react";
import { Users, Plus, Edit } from "lucide-react";
import { AddUserDialog } from "@/components/add-user-dialog";
import { UpdateUserDialog } from "@/components/update-user-dialog";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export default function AccountsPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, firstName: "John", lastName: "Doe", username: "johndoe" },
    { id: 2, firstName: "Jane", lastName: "Smith", username: "janesmith" },
  ]);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const addUser = (userData: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }) => {
    const newUser: User = {
      id: users.length + 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (
    userId: number,
    userData: {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
    }
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              firstName: userData.firstName,
              lastName: userData.lastName,
              username: userData.username,
            }
          : user
      )
    );
  };

  const openUpdateDialog = (user: User) => {
    setSelectedUser(user);
    setIsUpdateUserDialogOpen(true);
  };

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
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">
                    <button
                      onClick={() => openUpdateDialog(user)}
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
        onAddUser={addUser}
      />

      <UpdateUserDialog
        isOpen={isUpdateUserDialogOpen}
        onClose={() => setIsUpdateUserDialogOpen(false)}
        onUpdateUser={updateUser}
        user={selectedUser}
      />
    </div>
  );
}
