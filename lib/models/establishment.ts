import { z } from "zod";
import mongoose from "mongoose";
import {
  BARANGAY,
  TYPE_OF_OCCUPANCY,
  TYPE_OF_BUILDING,
  NATURE_OF_BUSINESS,
} from "@/lib/constants";

// Zod schema for validation
export const EstablishmentSchema = z.object({
  fsicNumber: z
    .number()
    .int()
    .positive()
    .max(9999999)
    .refine((val) => val !== undefined, {
      message: "This field is required",
    }),
  establishmentName: z.string().min(1, { message: "This field is required" }),
  owner: z.string().min(1, { message: "This field is required" }),
  representativeName: z.string().optional(),
  tradeName: z.string().optional(),
  totalBuildArea: z
    .number()
    .positive()
    .refine((val) => val !== undefined, {
      message: "This field is required",
    }),
  numberOfOccupants: z
    .number()
    .int()
    .nonnegative()
    .refine((val) => val !== undefined, {
      message: "This field is required",
    }),
  typeOfOccupancy: z.string().min(1, { message: "This field is required" }),
  typeOfBuilding: z.string().min(1, { message: "This field is required" }),
  natureOfBusiness: z.string().min(1, { message: "This field is required" }),
  businessIdentificationNo: z.string().optional(),
  taxIdentificationNo: z.string().optional(),
  dtiNo: z.string().optional(),
  secNo: z.string().optional(),
  isHighRise: z.boolean().refine((val) => val !== undefined, {
    message: "This field is required",
  }),
  isInEminentDanger: z.boolean().refine((val) => val !== undefined, {
    message: "This field is required",
  }),
  lastIssuanceType: z.string().optional(),
  lastIssuanceDate: z.date().optional(),
  barangay: z.string().min(1, { message: "This field is required" }),
  address: z.string().min(1, { message: "This field is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((val) => val !== undefined, {
      message: "This field is required",
    }),
  landline: z.string().optional(),
  compliance: z.string().default("Compliant"),
  mobile: z.string().refine((val) => val !== undefined, {
    message: "This field is required",
  }),
  isActive: z.boolean().default(true),
  dueDate: z
    .object({
      month: z.string().optional(),
      day: z.string().optional(),
    })
    .optional(),
  inspectionDate: z.date().optional(),
  remarks: z
    .array(
      z.object({
        date: z.date(),
        message: z.string(),
      })
    )
    .optional(),
});

// Mongoose schema
const establishmentSchema = new mongoose.Schema(
  {
    fsicNumber: { type: Number, required: true, unique: true },
    establishmentName: { type: String, required: true },
    owner: { type: String, required: true },
    representativeName: String,
    tradeName: String,
    totalBuildArea: { type: Number, required: true },
    numberOfOccupants: { type: Number, required: true },
    typeOfOccupancy: { type: String, enum: TYPE_OF_OCCUPANCY, required: true },
    typeOfBuilding: { type: String, enum: TYPE_OF_BUILDING, required: true },
    natureOfBusiness: {
      type: String,
      enum: NATURE_OF_BUSINESS,
      required: true,
    },
    businessIdentificationNo: String,
    taxIdentificationNo: String,
    dtiNo: String,
    secNo: String,
    isHighRise: { type: Boolean, required: true },
    isInEminentDanger: { type: Boolean, required: true },
    lastIssuanceType: {
      type: String,
    },
    lastIssuanceDate: { type: Date },
    barangay: { type: String, enum: BARANGAY, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    landline: String,
    mobile: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    compliance: {
      type: String,
      default: "Compliant",
    },
    dueDate: {
      month: { type: String, default: null },
      day: { type: String, default: null },
    },
    inspectionDate: { type: Date, require: false },
    remarks: [
      {
        date: { type: Date, required: false },
        message: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Mongoose model
const Establishment =
  mongoose.models.Establishment ||
  mongoose.model("Establishment", establishmentSchema);
export default Establishment;
// Type for the Establishment document
export type EstablishmentDocument = mongoose.Document &
  z.infer<typeof EstablishmentSchema>;
