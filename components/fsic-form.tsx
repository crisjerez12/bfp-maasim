"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Clipboard,
  Building2,
  Users,
  MapPin,
  Phone,
} from "lucide-react";

export default function FsicForm() {
  const [isHighRise, setIsHighRise] = useState<boolean | null>(null);
  const [isInEminentDanger, setIsInEminentDanger] = useState<boolean | null>(
    null
  );
  const [lastIssuanceType, setLastIssuanceType] = useState<string>("");
  const [isLastIssuanceUnknown, setIsLastIssuanceUnknown] =
    useState<boolean>(false);
  const [lastIssuanceDate, setLastIssuanceDate] = useState<Date | undefined>(
    undefined
  );
  const [today] = useState<Date>(new Date());

  const occupancyTypes = [
    "Residential",
    "Commercial",
    "Industrial",
    "Educational",
    "Assembly",
  ];
  const buildingTypes = ["Concrete", "Wood", "Steel", "Mixed", "Prefabricated"];
  const businessNatures = [
    "Retail",
    "Service",
    "Manufacturing",
    "Food and Beverage",
    "Technology",
  ];
  const barangays = [
    "Barangay 1",
    "Barangay 2",
    "Barangay 3",
    "Barangay 4",
    "Barangay 5",
  ];
  const lastIssuanceOptions = [
    "Unknown",
    "Notice of Disapproval (occupancy permit)",
    "Abatement Order",
    "Fire Safety Evaluation Clearance",
    "Fire Safety Inspection Certificate (Business Permit) - New",
    "Stoppage of Operation",
    "Notice of Disapproval (FSEC)",
    "Notice To Comply",
    "Fire Safety Inspection Certificate (Business Permit) - Renewal",
  ];

  return (
    <div className="min-h-screen text-white p-8">
      <form className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="fsicNumber" className="block mb-2 text-lg">
              FSIC Number
            </label>
            <input
              type="number"
              id="fsicNumber"
              minLength={4}
              maxLength={5}
              className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
              placeholder="Enter FSIC Number"
            />
          </div>
          <div>
            <label htmlFor="today" className="block mb-2 text-lg">
              Today
            </label>
            <input
              type="date"
              id="today"
              value={format(today, "yyyy-MM-dd")}
              readOnly
              className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
            />
          </div>
          <div>
            <label htmlFor="lastIssuance" className="block mb-2 text-lg">
              Last Issuance
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-none border-b-2 bg-[#2a2f3e] border-gray-600 text-gray-300 p-6 text-lg",
                    !lastIssuanceDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lastIssuanceDate ? (
                    format(lastIssuanceDate, "PPP")
                  ) : (
                    <span className="py-6">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto " align="start">
                <Calendar
                  mode="single"
                  selected={lastIssuanceDate}
                  onSelect={setLastIssuanceDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#3b82f6] mb-6 flex items-center">
            <Clipboard className="mr-2 h-6 w-6" />
            General Information
          </h2>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Establishment Name"
              className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
            />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <input
                type="text"
                placeholder="Owner"
                className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
              />
              <input
                type="text"
                placeholder="Representative Name"
                className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
              />
              <input
                type="text"
                placeholder="Trade Name"
                className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
              />
              <div className="flex">
                <input
                  type="text"
                  placeholder="Total Build Area"
                  className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
                />
                <span className="bg-transparent border-b-2 border-l-0 border-gray-600  p-3 text-lg">
                  sqm
                </span>
              </div>
            </div>
            <input
              type="number"
              placeholder="Number of Occupant"
              min="0"
              className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <select className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg appearance-none">
                  <option className="bg-[#2a2f3e]" value="">
                    Type of Occupancy
                  </option>
                  {occupancyTypes.map((type, index) => (
                    <option className="bg-[#2a2f3e]" key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              </div>
              <div className="relative">
                <select className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg appearance-none">
                  <option className="bg-[#2a2f3e]" value="">
                    Type of Building
                  </option>
                  {buildingTypes.map((type, index) => (
                    <option className="bg-[#2a2f3e]" key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#3b82f6] mb-6 flex items-center">
            <Building2 className="mr-2 h-6 w-6" />
            Business Information
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative md:col-span-1">
                <select className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg appearance-none">
                  <option className="bg-[#2a2f3e]" value="">
                    Nature of Business
                  </option>
                  {businessNatures.map((nature, index) => (
                    <option className="bg-[#2a2f3e]" key={index} value={nature}>
                      {nature}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              </div>
              <input
                type="text"
                placeholder="Business Identification No."
                className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg md:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Tax Identification No."
                className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
              />
              <input
                type="text"
                placeholder="DTI No."
                className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
              />
              <input
                type="text"
                placeholder="Securities and Exchange Commission No."
                className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#3b82f6] mb-6 flex items-center">
            <Users className="mr-2 h-6 w-6" />
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
                      name="lastIssuance"
                      value={option}
                      checked={lastIssuanceType === option}
                      onChange={(e) => {
                        setLastIssuanceType(e.target.value);
                        setIsLastIssuanceUnknown(option === "Unknown");
                      }}
                    />
                    <span className=" text-base col-span-7 ">{option}</span>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-none  bg-[#2a2f3e] border-gray-600 text-gray-300 p-3 text-lg",
                        !lastIssuanceDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {lastIssuanceDate ? (
                        format(lastIssuanceDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={lastIssuanceDate}
                      onSelect={setLastIssuanceDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#3b82f6] mb-6 flex items-center">
            <MapPin className="mr-2 h-6 w-6" />
            Address Information
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <select className="w-full bg-transparent border-b-2 border-gray-600  p-3 text-lg appearance-none">
                <option className="bg-[#2a2f3e]" value="">
                  Select a barangay
                </option>
                {barangays.map((barangay, index) => (
                  <option className="bg-[#2a2f3e]" key={index} value={barangay}>
                    {barangay}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            </div>
            <input
              type="text"
              placeholder="Blk No./Unit No./Name of Street/Name of Building"
              className="w-full bg-transparent  border-b-2 border-gray-600  p-3 text-lg"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#3b82f6] mb-6 flex items-center">
            <Phone className="mr-2 h-6 w-6" />
            Contact Information
          </h2>
          <div className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent  border-b-2 border-gray-600  p-3 text-lg"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Landline Number"
                className="w-full bg-transparent  border-b-2 border-gray-600  p-3 text-lg"
              />
              <div className="flex">
                <span className="bg-[#3b82f6] text-white border-b-2 border-[#3b82f6]  p-3 text-lg">
                  +63
                </span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full bg-transparent  border-b-2 border-gray-600  p-3 text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3b82f6] text-white  p-4 text-xl hover:bg-blue-600 transition-colors"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}
