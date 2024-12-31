"use server";

import connectToMongoDB from "@/lib/connection";
import User from "@/lib/models/user";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/lib/encryption";

export async function authenticate(formData: FormData) {
  try {
    await connectToMongoDB();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (!username || !password) {
      return { error: "Username and password are required." };
    }

    const user = await User.findOne({ username });
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
    const userCount = await User.countDocuments();

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
    const newUser = new User({
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
