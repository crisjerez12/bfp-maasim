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
import { validateDates } from "@/lib/functions";
import { useFormState } from "react-dom";
import { createFsicEntry } from "@/app/actions/establishment-actions";

export default function FsicForm() {
  const [isHighRise, setIsHighRise] = useState<boolean>(false);
  const [isInEminentDanger, setIsInEminentDanger] = useState<boolean>(false);
  const [lastIssuanceType, setLastIssuanceType] = useState<string>("Unknown");
  const [isLastIssuanceUnknown, setIsLastIssuanceUnknown] =
    useState<boolean>(true);
  const [lastIssuanceDate, setLastIssuanceDate] = useState<string>("");
  const { toast } = useToast();
  const [state, formAction] = useFormState(createFsicEntry, {
    success: false,
    message: "",
    errors: {},
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dateError = validateDates(formData);
    if (dateError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: dateError,
      });
      return;
    }
    formAction(formData);
  };

  // Display toast based on server action result
  if (state.message) {
    toast({
      variant: state.success ? "success" : "destructive",
      title: state.success ? "Success" : "Error",
      description: state.message,
    });
  }

  return (
    <div className="min-h-screen text-white p-8">
      <form className="max-w-6xl mx-auto space-y-8" onSubmit={handleSubmit}>
        <div className="flex justify-between  gap-6">
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
              value={lastIssuanceDate}
              onChange={(e) => setLastIssuanceDate(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
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
            />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <input
                type="text"
                name="owner"
                placeholder="Owner"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              />
              <input
                type="text"
                name="representativeName"
                placeholder="Representative Name"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              />
              <input
                type="text"
                name="tradeName"
                placeholder="Trade Name"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              />
              <div className="flex">
                <input
                  type="text"
                  name="totalBuildArea"
                  placeholder="Total Build Area"
                  className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
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
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="taxIdentificationNo"
                placeholder="Tax Identification No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              />
              <input
                type="text"
                name="dtiNo"
                placeholder="DTI No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              />
              <input
                type="text"
                name="secNo"
                placeholder="Securities and Exchange Commission No."
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
              />
            </div>
          </div>
        </div>

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
                    checked={isHighRise === true}
                    onChange={() => setIsHighRise(true)}
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    name="highRise"
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
                    name="eminentDanger"
                    value="yes"
                    checked={isInEminentDanger === true}
                    onChange={() => setIsInEminentDanger(true)}
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#3b82f6] h-5 w-5"
                    name="eminentDanger"
                    value="no"
                    checked={isInEminentDanger === false}
                    onChange={() => setIsInEminentDanger(false)}
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
                        checked={lastIssuanceType === option}
                        onChange={(e) => {
                          setLastIssuanceType(e.target.value);
                          setIsLastIssuanceUnknown(option === "Unknown");
                        }}
                      />
                      <span className="text-base col-span-7">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {isLastIssuanceUnknown && (
                <div>
                  <label
                    htmlFor="lastIssuanceDate"
                    className="block mb-2 text-lg"
                  >
                    Date of Last Issuance
                  </label>
                  <input
                    type="date"
                    id="lastIssuanceDate"
                    name="lastIssuanceDate"
                    value={lastIssuanceDate}
                    onChange={(e) => setLastIssuanceDate(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

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
            />
          </div>
        </div>

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
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="landline"
                placeholder="Landline Number"
                className="w-full bg-transparent border-b-2 border-gray-600 p-3 text-lg focus:outline-none focus:border-[#3b82f6] text-white"
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
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3b82f6] text-white p-4 text-xl hover:bg-blue-600 transition-colors"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}
