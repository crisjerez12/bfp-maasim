import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/connection";
import Establishment from "@/lib/models/establishment";

export async function GET() {
  try {
    await connectToMongoDB();

    // Get the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // Find establishments with inspection date matching the current date
    const establishments = await Establishment.find({
      inspectionDate: {
        $gte: currentDate,
        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
      },
      isActive: true,
    });
    // Format the response
    const formattedEstablishments = establishments.map((est) => ({
      dueDate: {
        month: est.inspectionDate.toLocaleString("default", { month: "long" }),
        day: est.inspectionDate.getDate().toString(),
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
      __v: est.__v,
      inspectionDate: est.inspectionDate,
    }));

    return NextResponse.json({
      success: true,
      data: formattedEstablishments,
    });
  } catch (error) {
    console.error("Error fetching inspection data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching inspection data",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
