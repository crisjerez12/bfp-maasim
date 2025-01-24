import { NextResponse } from "next/server";
import Establishment from "@/lib/models/establishment";
import connectToMongoDB from "@/lib/connection";

export async function GET() {
  try {
    await connectToMongoDB();

    // Get total count of establishments
    const totalRecordedEstablishments = await Establishment.countDocuments();

    // Get count of active establishments
    const totalActive = await Establishment.countDocuments({ isActive: true });

    // Get count of establishments due this month
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    const dueThisMonth = await Establishment.countDocuments({
      "dueDate.month": currentMonth,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalRecordedEstablishments,
        totalActive,
        dueThisMonth,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching analytics data",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
