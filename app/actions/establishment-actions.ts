"use server";

import { z } from "zod";

const FormSchema = z.object({
  fsicNumber: z.string().min(4).max(5),
  lastIssuance: z.string(),
  establishmentName: z.string().min(1, "Establishment name is required"),
  owner: z.string().min(1, "Owner name is required"),
  representativeName: z.string().optional(),
  tradeName: z.string().optional(),
  totalBuildArea: z
    .number()
    .min(0, "Total build area must be a positive number"),
  numberOfOccupants: z
    .number()
    .int()
    .min(0, "Number of occupants must be a positive integer"),
  typeOfOccupancy: z.string().min(1, "Type of occupancy is required"),
  typeOfBuilding: z.string().min(1, "Type of building is required"),
  natureOfBusiness: z.string().min(1, "Nature of business is required"),
  businessIdentificationNo: z.string().optional(),
  taxIdentificationNo: z.string().optional(),
  dtiNo: z.string().optional(),
  secNo: z.string().optional(),
  highRise: z.boolean(),
  eminentDanger: z.boolean(),
  lastIssuanceType: z.string(),
  lastIssuanceDate: z.string().optional(),
  barangay: z.string().min(1, "Barangay is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  landline: z.string().optional(),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
});

export async function createFsicEntry(prevState: any, formData: FormData) {
  console.log(formData);
  // try {
  //   const parsedFields = Object.fromEntries(formData);
  //   const validatedFields = FormSchema.safeParse(parsedFields);
  //   if (!validatedFields.success) {
  //     return {
  //       success: false,
  //       message: "Validation failed",
  //       errors: validatedFields.error.flatten().fieldErrors,
  //     };
  //   }
  //   // Here you would typically save the data to your database
  //   // For this example, we'll just simulate a successful save
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   return {
  //     success: true,
  //     message: "FSIC entry created successfully",
  //   };
  // } catch (error) {
  //   return {
  //     success: false,
  //     message: "An unexpected error occurred",
  //   };
  // }
}
