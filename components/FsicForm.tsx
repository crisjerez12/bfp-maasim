"use client";

import { useState } from "react";
import { Clipboard, Building2, Users, MapPin, Phone } from "lucide-react";
import {
  BARANGAY,
  lastIssuanceOptions,
  NATURE_OF_BUSINESS,
  TYPE_OF_BUILDING,
  TYPE_OF_OCCUPANCY,
} from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EstablishmentSchema } from "@/lib/models/establishment";
import { updateFsicEntry } from "@/app/actions/establishment-actions";
import { useRouter } from "next/navigation";
import type { z } from "zod";

const FormField = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">{children}</div>
);

type FormData = z.infer<typeof EstablishmentSchema>;

export default function FsicForm({ id }: { id: string }) {
  const router = useRouter();
  const [isHighRise, setIsHighRise] = useState<boolean>(false);
  const [isInEminentDanger, setIsInEminentDanger] = useState<boolean>(false);
  const [lastIssuanceType, setLastIssuanceType] = useState<string>("");
  const [lastIssuanceDate, setLastIssuanceDate] = useState<string>("");
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(EstablishmentSchema),
    defaultValues: async () => {
      const res = await fetch(`/api/fsic/${id}`);
      const data = await res.json();
      return data.data;
    },
  });

  const onSubmit = async (data: FormData) => {
    if (isDirty) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      try {
        const res = await updateFsicEntry(formData);
        if (!res.success) {
          toast({
            title: "Error",
            variant: "destructive",
            description: res.message,
          });
        } else {
          toast({
            title: "Success",
            variant: "success",
            description: res.message,
          });
          router.push(`/dashboard/establishments/${id}`);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <form
      className="max-w-6xl mx-auto space-y-8"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="flex justify-between gap-6">
        <FormField>
          <div>
            <input
              type="number"
              id="fsicNumber"
              {...register("fsicNumber", { valueAsNumber: true })}
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              placeholder="Enter FSIC Number"
              disabled={true}
            />
            <div className="text-red-500 text-sm mt-1">
              {errors.fsicNumber && errors.fsicNumber.message}
            </div>
          </div>
        </FormField>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Clipboard className="mr-2 h-6 w-6 text-white" />
          General Information
        </h2>
        <div className="space-y-6">
          <FormField>
            <div>
              <input
                type="text"
                {...register("establishmentName")}
                placeholder="Establishment Name"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.establishmentName && errors.establishmentName.message}
              </div>
            </div>
          </FormField>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <FormField>
              <input
                type="text"
                {...register("owner")}
                placeholder="Owner"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.owner && errors.owner.message}
              </div>
            </FormField>
            <FormField>
              <input
                type="text"
                {...register("representativeName")}
                placeholder="Representative Name"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.representativeName && errors.representativeName.message}
              </div>
            </FormField>
            <FormField>
              <input
                type="text"
                {...register("tradeName")}
                placeholder="Trade Name"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.tradeName && errors.tradeName.message}
              </div>
            </FormField>
            <FormField>
              <div className="flex flex-col">
                <div className="flex">
                  <input
                    type="number"
                    {...register("totalBuildArea", { valueAsNumber: true })}
                    min="0"
                    placeholder="Total Build Area"
                    className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                    disabled={isSubmitting || isLoading}
                  />
                  <span className="bg-transparent border-b-2 border-l-0 border-gray-600 p-3 text-lg text-white">
                    sqm
                  </span>
                </div>
                <div className="text-red-500 text-sm mt-1">
                  {errors.totalBuildArea && errors.totalBuildArea.message}
                </div>
              </div>
            </FormField>
          </div>
          <FormField>
            <input
              type="number"
              {...register("numberOfOccupants", { valueAsNumber: true })}
              min={0}
              placeholder="Number of Occupant"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              disabled={isSubmitting || isLoading}
            />
            <div className="text-red-500 text-sm mt-1">
              {errors.numberOfOccupants && errors.numberOfOccupants.message}
            </div>
          </FormField>
          <FormField>
            <label htmlFor="typeOfOccupancy" className="block mb-2 text-lg">
              Type of Occupancy
            </label>
            <select
              id="typeOfOccupancy"
              {...register("typeOfOccupancy")}
              className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              disabled={isSubmitting || isLoading}
            >
              <option value="">Select Type of Occupancy</option>
              {TYPE_OF_OCCUPANCY.map((type, index) => (
                <option key={index} value={type} className="bg-[#1f2937]">
                  {type}
                </option>
              ))}
            </select>
            <div className="text-red-500 text-sm mt-1">
              {errors.typeOfOccupancy && errors.typeOfOccupancy.message}
            </div>
          </FormField>
          <FormField>
            <label htmlFor="typeOfBuilding" className="block mb-2 text-lg">
              Type of Building
            </label>
            <select
              id="typeOfBuilding"
              {...register("typeOfBuilding")}
              className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              disabled={isSubmitting || isLoading}
            >
              <option value="">Select Type of Building</option>
              {TYPE_OF_BUILDING.map((type, index) => (
                <option key={index} value={type} className="bg-[#1f2937]">
                  {type}
                </option>
              ))}
            </select>
            <div className="text-red-500 text-sm mt-1">
              {errors.typeOfBuilding && errors.typeOfBuilding.message}
            </div>
          </FormField>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Building2 className="mr-2 h-6 w-6 text-white" />
          Business Information
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField>
              <select
                id="natureOfBusiness"
                {...register("natureOfBusiness")}
                className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              >
                <option value="">Select Nature of Business</option>
                {NATURE_OF_BUSINESS.map((nature, index) => (
                  <option key={index} value={nature} className="bg-[#1f2937]">
                    {nature}
                  </option>
                ))}
              </select>
              <div className="text-red-500 text-sm mt-1">
                {errors.natureOfBusiness && errors.natureOfBusiness.message}
              </div>
            </FormField>
            <FormField>
              <input
                type="text"
                {...register("businessIdentificationNo")}
                placeholder="Business Identification No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white md:col-span-3"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.businessIdentificationNo &&
                  errors.businessIdentificationNo.message}
              </div>
            </FormField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField>
              <input
                type="text"
                {...register("taxIdentificationNo")}
                placeholder="Tax Identification No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.taxIdentificationNo &&
                  errors.taxIdentificationNo.message}
              </div>
            </FormField>
            <FormField>
              <input
                type="text"
                {...register("dtiNo")}
                placeholder="DTI No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.dtiNo && errors.dtiNo.message}
              </div>
            </FormField>
            <FormField>
              <input
                type="text"
                {...register("secNo")}
                placeholder="Securities and Exchange Commission No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.secNo && errors.secNo.message}
              </div>
            </FormField>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Users className="mr-2 h-6 w-6 text-white" />
          Additional Information
        </h2>
        <div className="space-y-6">
          <FormField>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <span className="text-lg">High Rise:</span>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    {...register("isHighRise")}
                    value="yes"
                    checked={isHighRise === true}
                    onChange={() => setIsHighRise(true)}
                    disabled={isSubmitting || isLoading}
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    {...register("isHighRise")}
                    value="no"
                    checked={isHighRise === false}
                    onChange={() => setIsHighRise(false)}
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-lg">In Eminent Danger:</span>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    {...register("isInEminentDanger")}
                    value="yes"
                    checked={isInEminentDanger === true}
                    onChange={() => setIsInEminentDanger(true)}
                    disabled={isSubmitting || isLoading}
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    {...register("isInEminentDanger")}
                    value="no"
                    checked={isInEminentDanger === false}
                    onChange={() => setIsInEminentDanger(false)}
                    disabled={isSubmitting || isLoading}
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
            </div>
          </FormField>
        </div>
        <div>
          <h2 className="mt-4 text-2xl font-semibold text-white mb-6 flex items-center">
            Last Issuance
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block mb-3 text-lg">Last Issuance:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lastIssuanceOptions.map((option, index) => (
                  <label
                    key={index}
                    className="grid grid-cols-8 grid-rows-1 space-x-2"
                  >
                    <input
                      type="radio"
                      className="form-radio text-[#3b82f6] h-5 w-5"
                      {...register("lastIssuanceType")}
                      value={option}
                      checked={lastIssuanceType === option}
                      onChange={(e) => {
                        setLastIssuanceType(e.target.value);
                      }}
                      disabled={isSubmitting || isLoading}
                    />
                    <span className="text-base col-span-7">{option}</span>
                  </label>
                ))}
              </div>
              <div className="text-red-500 text-sm mt-1">
                {errors.lastIssuanceType && errors.lastIssuanceType.message}
              </div>
            </div>
            <FormField>
              <label htmlFor="lastIssuanceDate" className="block mb-2 text-lg">
                Date of Last Issuance
              </label>
              <input
                type="date"
                id="lastIssuanceDate"
                {...register("lastIssuanceDate")}
                disabled={lastIssuanceType === "" || isSubmitting || isLoading}
                value={lastIssuanceDate}
                onChange={(e) => setLastIssuanceDate(e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              />
            </FormField>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <MapPin className="mr-2 h-6 w-6 text-white" />
          Address Information
        </h2>
        <div className="space-y-6">
          <FormField>
            <label htmlFor="barangay" className="block mb-2 text-lg">
              Barangay
            </label>
            <select
              id="barangay"
              {...register("barangay")}
              className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              disabled={isSubmitting || isLoading}
            >
              <option value="">Select a barangay</option>
              {BARANGAY.map((barangay, index) => (
                <option key={index} value={barangay} className="bg-[#1f2937]">
                  {barangay}
                </option>
              ))}
            </select>
            <div className="text-red-500 text-sm mt-1">
              {errors.barangay && errors.barangay.message}
            </div>
          </FormField>
          <FormField>
            <input
              type="text"
              {...register("address")}
              placeholder="Blk No./Unit No./Name of Street/Name of Building"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              disabled={isSubmitting || isLoading}
            />
            <div className="text-red-500 text-sm mt-1">
              {errors.address && errors.address.message}
            </div>
          </FormField>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Phone className="mr-2 h-6 w-6 text-white" />
          Contact Information
        </h2>
        <div className="space-y-6">
          <FormField>
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email Address"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.email && errors.email.message}
              </div>
            </div>
          </FormField>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField>
              <input
                type="tel"
                {...register("landline")}
                placeholder="Landline Number"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                disabled={isSubmitting || isLoading}
              />
              <div className="text-red-500 text-sm mt-1">
                {errors.landline && errors.landline.message}
              </div>
            </FormField>
            <FormField>
              <div className="flex flex-col">
                <div className="flex">
                  <span className="bg-[#3b82f6] text-white border-b-2 border-[#3b82f6] p-3 text-lg">
                    +63
                  </span>
                  <input
                    type="tel"
                    {...register("mobile")}
                    placeholder="Mobile Number"
                    className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                    disabled={isSubmitting || isLoading}
                  />
                </div>
                <div className="text-red-500 text-sm mt-1">
                  {errors.mobile && errors.mobile.message}
                </div>
              </div>
            </FormField>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#3b82f6] text-white p-4 text-xl hover:bg-blue-600 transition-colors"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting ? "Saving Entry" : "Save Entry"}
      </button>
    </form>
  );
}
