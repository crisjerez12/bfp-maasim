import { z } from "zod";
import mongoose from "mongoose";
import {
  BARANGAY,
  TYPE_OF_OCCUPANCY,
  TYPE_OF_BUILDING,
  NATURE_OF_BUSINESS,
  lastIssuanceOptions,
} from "@/lib/constants";

// Helper function to create a Zod enum from a string array
const createZodEnum = <T extends string>(values: readonly T[]) => {
  return z.enum(values as [T, ...T[]]);
};

// Zod schema for validation
export const EstablishmentSchema = z.object({
  fsicNumber: z.number().int().positive().max(999999),
  lastIssuance: z.date(),
  establishmentName: z.string().min(1),
  owner: z.string().min(1),
  representativeName: z.string().optional(),
  tradeName: z.string().optional(),
  totalBuildArea: z.number().positive(),
  numberOfOccupants: z.number().int().nonnegative(),
  typeOfOccupancy: createZodEnum(TYPE_OF_OCCUPANCY),
  typeOfBuilding: createZodEnum(TYPE_OF_BUILDING),
  natureOfBusiness: createZodEnum(NATURE_OF_BUSINESS),
  businessIdentificationNo: z.string().optional(),
  taxIdentificationNo: z.string().optional(),
  dtiNo: z.string().optional(),
  secNo: z.string().optional(),
  isHighRise: z.boolean(),
  isInEminentDanger: z.boolean(),
  lastIssuanceType: createZodEnum(lastIssuanceOptions),
  lastIssuanceDate: z.date().optional(),
  barangay: createZodEnum(BARANGAY),
  address: z.string().min(1),
  email: z.string().email(),
  landline: z.string().optional(),
  mobile: z.string().regex(/^(\+63|0)9\d{9}$/),
  isActive: z.boolean().default(true),
});

// Mongoose schema
const establishmentSchema = new mongoose.Schema({
  fsicNumber: { type: Number, required: true, unique: true },
  lastIssuance: { type: Date, required: true },
  establishmentName: { type: String, required: true },
  owner: { type: String, required: true },
  representativeName: String,
  tradeName: String,
  totalBuildArea: { type: Number, required: true },
  numberOfOccupants: { type: Number, required: true },
  typeOfOccupancy: { type: String, enum: TYPE_OF_OCCUPANCY, required: true },
  typeOfBuilding: { type: String, enum: TYPE_OF_BUILDING, required: true },
  natureOfBusiness: { type: String, enum: NATURE_OF_BUSINESS, required: true },
  businessIdentificationNo: String,
  taxIdentificationNo: String,
  dtiNo: String,
  secNo: String,
  isHighRise: { type: Boolean, required: true },
  isInEminentDanger: { type: Boolean, required: true },
  lastIssuanceType: { type: String, enum: lastIssuanceOptions, required: true },
  lastIssuanceDate: Date,
  barangay: { type: String, enum: BARANGAY, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  landline: String,
  mobile: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

// Mongoose model
export const Establishment =
  mongoose.models.Establishment ||
  mongoose.model("Establishment", establishmentSchema);

// Type for the Establishment document
export type EstablishmentDocument = mongoose.Document &
  z.infer<typeof EstablishmentSchema>;
