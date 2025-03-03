"use server";

import connectToMongoDB from "@/lib/connection";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/lib/encryption";
import type { TUser } from "@/lib/type";
import UserModel from "@/lib/models/user";

export async function authenticate(formData: FormData) {
  try {
    await connectToMongoDB();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (!username || !password) {
      return { error: "Username and password are required." };
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return { error: "Invalid username or password." };
    }
    // Use bcryptjs to compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Invalid username or password." };
    }
    const cookieData = {
      Name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      role: user.role,
    };
    const encryptedCookie = await encrypt(JSON.stringify(cookieData));
    // Set the cookie
    cookies().set("authToken", encryptedCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 1 week
    });

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Authentication error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function createUser(formData: FormData) {
  try {
    // Connect to the database
    await connectToMongoDB();

    // Count existing users
    const userCount = await UserModel.countDocuments();

    // Determine the role based on user count
    const role = userCount === 0 ? "ADMIN" : "STAFF";

    // Extract user data from formData
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Encrypt the password
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Error creating user" };
  }
}

export async function updateUser(data: TUser) {
  try {
    await connectToMongoDB();
    const { _id, username, password, firstName, lastName } = data;

    if (!_id)
      // Check if _id is missing
      throw new Error("User ID is missing");

    // Validate if the user exists
    const user = await UserModel.findById(_id);
    if (!user) throw new Error("The User ID is invalid");

    // Check for duplicate username
    const duplicate = await UserModel.findOne({ username });
    if (duplicate && duplicate._id.toString() !== _id) {
      throw new Error("The username is already taken");
    }

    // Prepare updated credentials
    const updatedCredentials: Partial<TUser> = {
      username,
      firstName,
      lastName,
    };
    if (password) {
      updatedCredentials.password = await bcryptjs.hash(password, 10);
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      updatedCredentials,
      {
        new: true,
      }
    );

    if (!updatedUser) throw new Error("Failed to update the user");

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack); // Logs stack trace if available
      return { success: false, message: error.message };
    }
    // Fallback for unexpected error types
    console.error("Unknown error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getAuthenticatedUser() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) {
    return null;
  }

  try {
    const decryptedData = await decrypt(authToken.value);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error decrypting auth token:", error);
    return null;
  }
}
export async function logout() {
  cookies().delete("authToken");
}

export async function deleteUser(userId: string) {
  try {
    await connectToMongoDB();

    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Check if the user is an ADMIN
    if (user.role === "ADMIN") {
      return { success: false, message: "Cannot delete an ADMIN account" };
    }

    // Proceed with deletion if the user is STAFF
    await UserModel.findByIdAndDelete(userId);

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "An error occurred while deleting the user",
    };
  }
}
