import { NextResponse } from "next/server";
import Establishment from "@/lib/models/establishment";
import connectToMongoDB from "@/lib/connection";

export async function GET() {
  try {
    await connectToMongoDB();

    // Get the current date and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
    const currentYear = currentDate.getFullYear();

    // Find establishments with due date in the current month and created before the current year
    const establishments = await Establishment.find({
      "dueDate.month": {
        $in: [
          currentDate.toLocaleString("default", { month: "long" }),
          currentMonth.toString(),
        ],
      },
      isActive: true,
      lastIssuanceDate: { $lt: new Date(currentYear, 0, 1) },
    });

    // Format the response
    const formattedEstablishments = establishments.map((est) => ({
      dueDate: {
        month: est.dueDate.month,
        day: est.dueDate.day,
      },
      _id: est._id,
      fsicNumber: est.fsicNumber,
      establishmentName: est.establishmentName,
      owner: est.owner,
      representativeName: est.representativeName,
      tradeName: est.tradeName,
      totalBuildArea: est.totalBuildArea,
      numberOfOccupants: est.numberOfOccupants,
      typeOfOccupancy: est.typeOfOccupancy,
      typeOfBuilding: est.typeOfBuilding,
      natureOfBusiness: est.natureOfBusiness,
      businessIdentificationNo: est.businessIdentificationNo,
      taxIdentificationNo: est.taxIdentificationNo,
      dtiNo: est.dtiNo,
      secNo: est.secNo,
      isHighRise: est.isHighRise,
      isInEminentDanger: est.isInEminentDanger,
      lastIssuanceType: est.lastIssuanceType,
      barangay: est.barangay,
      address: est.address,
      email: est.email,
      landline: est.landline,
      mobile: est.mobile,
      isActive: est.isActive,
      establishmentStatus: est.establishmentStatus,
      createdAt: est.createdAt,
      updatedAt: est.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: formattedEstablishments,
    });
  } catch (error) {
    console.error("Error fetching due data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching due data",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
