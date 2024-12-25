"use server";

import {
  EstablishmentSchema,
  Establishment,
  EstablishmentDocument,
} from "@/lib/models/establishment";
import connectToMongoDB from "@/lib/connection";

export async function createFsicEntry(formData: FormData) {
  await connectToMongoDB();
  const rawFormData = Object.fromEntries(formData);
  const parsedData = {
    ...rawFormData,
    fsicNumber: Number(rawFormData.fsicNumber),
    totalBuildArea: Number(rawFormData.totalBuildArea),
    numberOfOccupants: Number(rawFormData.numberOfOccupants),
    isHighRise: rawFormData.highRise === "yes",
    isInEminentDanger: rawFormData.eminentDanger === "yes",
    lastIssuanceDate: rawFormData.lastIssuanceDate
      ? new Date(rawFormData.lastIssuanceDate as string)
      : undefined,
  };

  const result = EstablishmentSchema.safeParse(parsedData);
  if (!result.success) {
    const errorMessages = result.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return { success: false, errorMessages };
  }

  try {
    const existingEstablishment = await Establishment.findOne({
      fsicNumber: result.data.fsicNumber,
    });
    if (existingEstablishment) {
      return {
        success: false,
        message: `An establishment with FSIC number ${result.data.fsicNumber} already exists.`,
      };
    }

    const newEstablishment = new Establishment(result.data);
    await newEstablishment.save();

    return { success: true, message: "FSIC entry created successfully" };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "An error occurred while creating the FSIC entry",
    };
  }
}

export async function updateFsicEntry(formData: FormData) {
  await connectToMongoDB();
  const rawFormData = Object.fromEntries(formData.entries());

  const id = rawFormData.id as string;
  delete rawFormData.id;

  const parsedData = {
    ...rawFormData,
    fsicNumber: Number(rawFormData.fsicNumber),
    lastIssuance: new Date(rawFormData.lastIssuance as string),
    totalBuildArea: Number(rawFormData.totalBuildArea),
    numberOfOccupants: Number(rawFormData.numberOfOccupants),
    isHighRise: rawFormData.highRise === "yes",
    isInEminentDanger: rawFormData.eminentDanger === "yes",
    mobile: rawFormData.mobile as string,
    lastIssuanceDate: rawFormData.lastIssuanceDate
      ? new Date(rawFormData.lastIssuanceDate as string)
      : undefined,
  };

  if (typeof parsedData.mobile === "string") {
    parsedData.mobile = parsedData.mobile.startsWith("9")
      ? `+63${parsedData.mobile}`
      : parsedData.mobile;
  }

  const mobileRegex = /^(\+639|9)\d{9}$/;
  if (parsedData.mobile && !mobileRegex.test(parsedData.mobile)) {
    return {
      success: false,
      message:
        "Invalid mobile number format. It should start with '+639' or '9' followed by 9 digits.",
    };
  }

  try {
    const existingEstablishment = await Establishment.findById(id);
    if (!existingEstablishment) {
      return {
        success: false,
        message: `Establishment with ID ${id} not found.`,
      };
    }

    const validationResult = EstablishmentSchema.safeParse(parsedData);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return {
        success: false,
        message: `Validation failed: ${errors.join(", ")}`,
      };
    }

    const updatedEstablishment = (await Establishment.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true, runValidators: true }
    )) as EstablishmentDocument | null;

    if (!updatedEstablishment) {
      return {
        success: false,
        message: "Failed to update the establishment.",
      };
    }

    return {
      success: true,
      message: "FSIC entry updated successfully",
      data: updatedEstablishment,
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      message: "An error occurred while updating the FSIC entry",
    };
  }
}

export async function restoreEstablishment(id: string) {
  await connectToMongoDB();

  try {
    const establishment = await Establishment.findById(id);

    if (!establishment) {
      return { success: false, message: "Establishment not found" };
    }

    establishment.isActive = true;
    await establishment.save();

    return { success: true, message: "Establishment restored successfully" };
  } catch (error) {
    console.error("Error restoring establishment:", error);
    return {
      success: false,
      message: "An error occurred while restoring the establishment",
    };
  }
}

export async function deleteEstablishment(id: string) {
  await connectToMongoDB();

  try {
    const establishment = await Establishment.findById(id);

    if (!establishment) {
      return { success: false, message: "Establishment not found" };
    }

    establishment.isActive = false;
    await establishment.save();

    return { success: true, message: "Establishment deleted successfully" };
  } catch (error) {
    console.error("Error deleting establishment:", error);
    return {
      success: false,
      message: "An error occurred while deleting the establishment",
    };
  }
}
