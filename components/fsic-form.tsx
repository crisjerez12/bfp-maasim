"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FsicForm() {
  const [fsicNumber, setFsicNumber] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen text-gray-300 p-6">
      <form className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fsicNumber" className="block mb-1">
              FSIC Number
            </label>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(7)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-full bg-transparent border border-gray-600  p-2 text-center"
                  value={fsicNumber[index] || ""}
                  onChange={(e) => {
                    const newValue = fsicNumber.split("");
                    newValue[index] = e.target.value;
                    setFsicNumber(newValue.join(""));
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="today" className="block mb-1">
              Today
            </label>
            <input
              type="date"
              id="today"
              value={today}
              readOnly
              className="w-full bg-transparent border border-gray-600 border-b  p-2"
            />
          </div>
          <div>
            <label htmlFor="lastIssuance" className="block mb-1">
              Last Issuance
            </label>
            <input
              type="date"
              id="lastIssuance"
              className="w-full bg-transparent border border-gray-600 border-b  p-2 "
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#3b82f6] mb-4">
            General Information
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Establishment Name"
              className="w-full bg-transparent border border-gray-600 border-b  p-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Owner"
                className="w-full bg-transparent border border-gray-600 border-b  p-2"
              />
              <input
                type="text"
                placeholder="Representative Name"
                className="w-full bg-transparent border border-gray-600 border-b  p-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Trade Name"
                className="w-full bg-transparent border border-gray-600 border-b  p-2"
              />
              <div className="flex">
                <input
                  type="text"
                  placeholder="Total Build Area"
                  className="w-full bg-transparent border border-gray-600 border-b p-2"
                />
                <span className="  bg-blue-600   p-2">sqm</span>
              </div>
            </div>
            <input
              type="number"
              placeholder="Number of Occupant"
              min={0}
              className="w-full bg-transparent border border-gray-600 border-b  p-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <select className="w-full bg-transparent border border-gray-600 border-b  p-2 appearance-none">
                  <option value="">Type of Occupancy</option>
                  {/* Add options here */}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <select className="w-full bg-transparent border border-gray-600 border-b  p-2 appearance-none">
                  <option value="">Type of Building</option>

                  {/* Add options here */}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#3b82f6] mb-4">
            Business Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-1">
                <select className="w-full bg-transparent border border-gray-600 border-b  p-2 appearance-none">
                  <option value="">Nature of Business</option>
                  {/* Add options here */}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Business Identification No."
                className="w-full bg-transparent border border-gray-600 border-b  p-2 md:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Tax Identification No."
                className="w-full bg-transparent border border-gray-600 border-b  p-2"
              />
              <input
                type="text"
                placeholder="DTI No."
                className="w-full bg-transparent border border-gray-600 border-b  p-2"
              />
              <input
                type="text"
                placeholder="Securities and Exchange Commission No."
                className="w-full bg-transparent border border-gray-600 border-b  p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#3b82f6] mb-4">
            Address Information
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <select className="w-full bg-transparent border border-gray-600 border-b  p-2 appearance-none">
                <option value="">Select a barangay</option>
                {/* Add barangay options here */}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Blk No./Unit No./Name of Street/Name of Building"
              className="w-full bg-transparent border border-gray-600 border-b  p-2"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#3b82f6] mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border border-gray-600 border-b  p-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Landline Number"
                className="w-full bg-transparent border border-gray-600 border-b  p-2"
              />
              <div className="flex">
                <span className="bg-[#3b82f6] text-white border border-[#3b82f6] -l p-2">
                  +63
                </span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full bg-transparent border border-gray-600 border-b p-2"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3b82f6] text-white  p-3 hover:bg-blue-600 transition-colors"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}
