import { NextRequest, NextResponse } from "next/server";
import { Establishment } from "@/lib/models/establishment";
import connectToMongoDB from "@/lib/connection";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToMongoDB();
    const establishment = await Establishment.findOne({
      _id: id,
      isActive: true,
    });

    if (!establishment) {
      return NextResponse.json(
        {
          success: false,
          error: "Active establishment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: establishment,
    });
  } catch (error) {
    console.error(`Error fetching active FSIC data for ID ${id}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching the active FSIC data",
      },
      { status: 500 }
    );
  }
}
