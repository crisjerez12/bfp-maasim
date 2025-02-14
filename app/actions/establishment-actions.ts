"use server";

import Establishment, { EstablishmentSchema } from "@/lib/models/establishment";
import connectToMongoDB from "@/lib/connection";
import { getCurrentMonthAndDay } from "@/lib/constants";
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
  const dueDateAdded = {
    dueDate: getCurrentMonthAndDay(parsedData.lastIssuanceDate),
    ...parsedData,
  };
  const result = EstablishmentSchema.safeParse(dueDateAdded);
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
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData._id as string;
  delete rawFormData._id;
  delete rawFormData.remarks;
  delete rawFormData.dueDate;
  delete rawFormData.inspectionDate;

  // Parse necessary fields
  const parsedData = {
    ...rawFormData,
    fsicNumber: Number(rawFormData.fsicNumber),
    totalBuildArea: Number(rawFormData.totalBuildArea),
    numberOfOccupants: Number(rawFormData.numberOfOccupants),
    isHighRise: rawFormData.isHighRise === "yes",
    isInEminentDanger: rawFormData.isInEminentDanger === "yes",
    mobile: rawFormData.mobile as string,
    isActive: rawFormData.isActive === "true",
    lastIssuanceDate: rawFormData.lastIssuanceDate
      ? new Date(rawFormData.lastIssuanceDate as string)
      : undefined,
  };

  // Normalize mobile number
  if (typeof parsedData.mobile === "string") {
    parsedData.mobile = parsedData.mobile.replace(/^(\+639|9)/, "9");
  }

  // Prepare final form with computed due date
  const finalForm = {
    ...parsedData,
    dueDate: getCurrentMonthAndDay(parsedData.lastIssuanceDate),
  };

  try {
    // Validate data
    const choice = parsedData.lastIssuanceDate ? finalForm : parsedData;
    const validationResult = EstablishmentSchema.safeParse(choice);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return {
        success: false,
        message: `Validation failed: ${errors.join(", ")}`,
      };
    }

    // Update establishment
    const updatedEstablishment = await Establishment.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true, runValidators: true }
    );

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
export async function setInspectionDate(
  id: string,
  data: {
    inspectionDate: Date | undefined;
  }
) {
  await connectToMongoDB();
  try {
    const establishment = await Establishment.findById(id);

    if (!establishment) {
      return { success: false, message: "Establishment not found" };
    }

    // Add one day to the input date
    if (data.inspectionDate) {
      data.inspectionDate = new Date(data.inspectionDate);
      data.inspectionDate.setDate(data.inspectionDate.getDate() + 1);
    }

    establishment.inspectionDate = data.inspectionDate;
    const validationResult = EstablishmentSchema.safeParse(
      establishment.toObject()
    );
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return {
        success: false,
        message: `Validation failed: ${errors.join(", ")}`,
      };
    }

    await establishment.save();

    return {
      success: true,
      message: "Inspection date updated successfully",
      data: establishment,
    };
  } catch (error) {
    console.error("Error updating inspection date:", error);
    return {
      success: false,
      message: "An error occurred while updating the inspection date",
    };
  }
}
export async function updateCompliance(id: string) {
  try {
    const establishment = await Establishment.findById(id);

    if (!establishment) {
      return { success: false, message: "Establishment not found" };
    }

    establishment.compliance =
      establishment.compliance === "Compliant" ? "Non-Compliant" : "Compliant";

    await establishment.save();

    return {
      success: true,
      message: `Set to ${establishment.compliance}`,
    };
  } catch (error) {
    console.error("Error updating compliance:", error);
    return {
      success: false,
      message: "An error occurred while updating compliance",
    };
  }
}

export async function addRemark(id: string, message: string) {
  try {
    const establishment = await Establishment.findById(id);
    if (!establishment) {
      return { success: false, message: "Establishment not found" };
    }

    establishment.remarks = establishment.remarks || [];
    establishment.remarks.push({ date: new Date(), message });
    await establishment.save();

    return { success: true, message: "Remark added successfully" };
  } catch (error) {
    console.error("Error adding remark:", error);
    return { success: false, message: "Failed to add remark" };
  }
}
