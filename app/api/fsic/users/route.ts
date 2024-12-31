import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/connection";
import UserModel from "@/lib/models/user";

export async function GET() {
  try {
    await connectToMongoDB();

    const users = await UserModel.find({});

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while users data",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
