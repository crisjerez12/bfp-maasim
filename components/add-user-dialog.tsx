"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";

interface AddUserFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: AddUserFormData) => void;
}

export function AddUserDialog({
  isOpen,
  onClose,
  onAddUser,
}: AddUserDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserFormData>();

  const onSubmit = (data: AddUserFormData) => {
    onAddUser(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f2937] p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Add New User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last Name"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#3b82f6] text-white p-4 text-xl hover:bg-blue-600 transition-colors rounded-md"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
