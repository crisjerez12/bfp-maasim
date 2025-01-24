import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/connection";
import Establishment from "@/lib/models/establishment";

export async function GET() {
  try {
    await connectToMongoDB();
    const establishments = await Establishment.find({ isActive: false });

    return NextResponse.json({
      success: true,
      data: establishments,
    });
  } catch (error) {
    console.error("Error fetching active FSIC data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching active FSIC data",
      },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
