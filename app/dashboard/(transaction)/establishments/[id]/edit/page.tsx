"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clipboard, Building2, Users, MapPin, Phone } from "lucide-react";
import {
  BARANGAY,
  lastIssuanceOptions,
  NATURE_OF_BUSINESS,
  TYPE_OF_BUILDING,
  TYPE_OF_OCCUPANCY,
} from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { validateDates } from "@/lib/functions";
import { updateFsicEntry } from "@/app/actions/establishment-actions";
import { Skeleton } from "@/components/ui/skeleton";

interface FSICData {
  fsicNumber: number;
  lastIssuance: string;
  establishmentName: string;
  owner: string;
  representativeName: string;
  tradeName: string;
  totalBuildArea: number;
  numberOfOccupants: number;
  typeOfOccupancy: string;
  typeOfBuilding: string;
  natureOfBusiness: string;
  businessIdentificationNo: string;
  taxIdentificationNo: string;
  dtiNo: string;
  secNo: string;
  isHighRise: boolean;
  isInEminentDanger: boolean;
  lastIssuanceType: string;
  barangay: string;
  address: string;
  email: string;
  landline: string;
  mobile: string;
}

export default function FsicFormEdit() {
  const [fsicData, setFsicData] = useState<FSICData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fsic/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setFsicData(data.data);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch FSIC data",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred while fetching data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.append("id", params.id as string);

    const dateError = validateDates(formData);
    if (dateError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: dateError,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await updateFsicEntry(formData);
      if (response.success) {
        toast({
          title: "Success",
          variant: "success",
          description: response.message,
        });
        router.push(`/dashboard/establishments/${params.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return <SkeletonForm />;
  }

  if (!fsicData) {
    return <div className="text-white">Failed to load FSIC data.</div>;
  }

  return (
    <div className="min-h-screen text-white p-8">
      <form className="max-w-6xl mx-auto space-y-8" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-6">
          <div>
            <label htmlFor="fsicNumber" className="block mb-2 text-lg">
              FSIC Number
            </label>
            <input
              type="number"
              id="fsicNumber"
              name="fsicNumber"
              max={999999}
              min={0}
              minLength={4}
              maxLength={5}
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              placeholder="Enter FSIC Number"
              defaultValue={fsicData.fsicNumber}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="lastIssuance" className="block mb-2 text-lg">
              Last Issuance
            </label>
            <input
              type="date"
              id="lastIssuance"
              name="lastIssuance"
              defaultValue={fsicData.lastIssuance.split("T")[0]}
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Clipboard className="mr-2 h-6 w-6 text-white" />
            General Information
          </h2>
          <div className="space-y-6">
            <input
              type="text"
              name="establishmentName"
              placeholder="Establishment Name"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              defaultValue={fsicData.establishmentName}
              disabled={isSubmitting}
            />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <input
                type="text"
                name="owner"
                placeholder="Owner"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.owner}
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="representativeName"
                placeholder="Representative Name"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.representativeName}
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="tradeName"
                placeholder="Trade Name"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.tradeName}
                disabled={isSubmitting}
              />
              <div className="flex">
                <input
                  type="text"
                  name="totalBuildArea"
                  placeholder="Total Build Area"
                  className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                  defaultValue={fsicData.totalBuildArea}
                  disabled={isSubmitting}
                />
                <span className="bg-transparent border-b-2 border-l-0 border-gray-600 p-3 text-lg text-white">
                  sqm
                </span>
              </div>
            </div>
            <input
              type="number"
              name="numberOfOccupants"
              placeholder="Number of Occupant"
              min="0"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              defaultValue={fsicData.numberOfOccupants}
              disabled={isSubmitting}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="typeOfOccupancy" className="block mb-2 text-lg">
                  Type of Occupancy
                </label>
                <select
                  id="typeOfOccupancy"
                  name="typeOfOccupancy"
                  className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                  defaultValue={fsicData.typeOfOccupancy}
                  disabled={isSubmitting}
                >
                  <option value="">Select Type of Occupancy</option>
                  {TYPE_OF_OCCUPANCY.map((type, index) => (
                    <option key={index} value={type} className="bg-[#1f2937]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="typeOfBuilding" className="block mb-2 text-lg">
                  Type of Building
                </label>
                <select
                  id="typeOfBuilding"
                  name="typeOfBuilding"
                  className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                  defaultValue={fsicData.typeOfBuilding}
                  disabled={isSubmitting}
                >
                  <option value="">Select Type of Building</option>
                  {TYPE_OF_BUILDING.map((type, index) => (
                    <option key={index} value={type} className="bg-[#1f2937]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Building2 className="mr-2 h-6 w-6 text-white" />
            Business Information
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label
                  htmlFor="natureOfBusiness"
                  className="block mb-2 text-lg"
                >
                  Nature of Business
                </label>
                <select
                  id="natureOfBusiness"
                  name="natureOfBusiness"
                  className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                  defaultValue={fsicData.natureOfBusiness}
                  disabled={isSubmitting}
                >
                  <option value="">Select Nature of Business</option>
                  {NATURE_OF_BUSINESS.map((nature, index) => (
                    <option key={index} value={nature} className="bg-[#1f2937]">
                      {nature}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="businessIdentificationNo"
                placeholder="Business Identification No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white md:col-span-3"
                defaultValue={fsicData.businessIdentificationNo}
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="taxIdentificationNo"
                placeholder="Tax Identification No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.taxIdentificationNo}
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="dtiNo"
                placeholder="DTI No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.dtiNo}
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="secNo"
                placeholder="Securities and Exchange Commission No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.secNo}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Users className="mr-2 h-6 w-6 text-white" />
            Additional Information
          </h2>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <span className="text-lg">High Rise:</span>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    name="highRise"
                    value="yes"
                    defaultChecked={fsicData.isHighRise}
                    disabled={isSubmitting}
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    name="highRise"
                    value="no"
                    defaultChecked={!fsicData.isHighRise}
                    disabled={isSubmitting}
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
                    name="eminentDanger"
                    value="yes"
                    defaultChecked={fsicData.isInEminentDanger}
                    disabled={isSubmitting}
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    name="eminentDanger"
                    value="no"
                    defaultChecked={!fsicData.isInEminentDanger}
                    disabled={isSubmitting}
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
            </div>
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
                        name="lastIssuanceType"
                        value={option}
                        defaultChecked={fsicData.lastIssuanceType === option}
                        disabled={isSubmitting}
                      />
                      <span className="text-base col-span-7">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <MapPin className="mr-2 h-6 w-6 text-white" />
            Address Information
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="barangay" className="block mb-2 text-lg">
                Barangay
              </label>
              <select
                id="barangay"
                name="barangay"
                className="w-full bg-[#1f2937] border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.barangay}
                disabled={isSubmitting}
              >
                <option value="">Select a barangay</option>
                {BARANGAY.map((barangay, index) => (
                  <option key={index} value={barangay} className="bg-[#1f2937]">
                    {barangay}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="address"
              placeholder="Blk No./Unit No./Name of Street/Name of Building"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              defaultValue={fsicData.address}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Phone className="mr-2 h-6 w-6 text-white" />
            Contact Information
          </h2>
          <div className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              defaultValue={fsicData.email}
              disabled={isSubmitting}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="landline"
                placeholder="Landline Number"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                defaultValue={fsicData.landline}
                disabled={isSubmitting}
              />
              <div className="flex">
                <span className="bg-[#3b82f6] text-white border-b-2 border-[#3b82f6] p-3 text-lg">
                  +63
                </span>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                  defaultValue={fsicData.mobile.replace("+63", "")}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3b82f6] text-white p-4 text-xl hover:bg-blue-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating Entry..." : "Update Entry"}
        </button>
      </form>
    </div>
  );
}

function SkeletonForm() {
  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between gap-6">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-12 w-1/2" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-6">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        ))}
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}
