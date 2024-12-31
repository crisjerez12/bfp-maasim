"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { updateUser } from "@/app/actions/auth";
import { TUser } from "@/lib/type";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface UpdateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: TUser | null;
}

export function UpdateUserDialog({
  isOpen,
  onClose,
  user,
}: UpdateUserDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUser>();

  useEffect(() => {
    if (user) {
      reset({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: TUser) => {
    const res = await updateUser(data);
    if (!res.success) {
      toast({
        title: "Unsuccessful",
        variant: "destructive",
        description: res?.message || "Failed to update the account",
      });
      return;
    }
    toast({
      title: "Update Success",
      variant: "success",
      description: "User Account Updated Successfully",
    });
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f2937] p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Update User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("_id")} type="hidden" />
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="New Password (leave blank to keep current)"
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
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
