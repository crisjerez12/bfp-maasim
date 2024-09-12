"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function FsicForm() {
  const [today, setToday] = useState("");
  // const [lastIssuance, setLastIssuance] = useState("Unknown");
  const [fsicNumber, setFsicNumber] = useState(Array(8).fill(""));
  const fsicInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const now = new Date();
    setToday(now.toISOString().split("T")[0]);
  }, []);
  const handleFsicChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newFsicNumber = [...fsicNumber];
    newFsicNumber[index] = value;
    setFsicNumber(newFsicNumber);

    // Automatically move to the next input if value is filled
    if (value && index < fsicInputs.current.length - 1) {
      fsicInputs.current[index + 1]?.focus();
    }
  };

  const handleFsicKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !fsicNumber[index] && index > 0) {
      fsicInputs.current[index - 1]?.focus();
    }
  };

  return (
    <form className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fsic-number">FSIC Number</Label>
          <div className="flex ">
            {fsicNumber.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  fsicInputs.current[index] = el; // No return statement here
                }}
                value={digit}
                onChange={(e) => handleFsicChange(index, e.target.value)}
                onKeyDown={(e) => handleFsicKeyDown(index, e)}
                className="w-10 h-10 text-center border-gray-600 bg-transparent rounded-none"
                maxLength={1}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="today">Today</Label>
          <Input
            id="today"
            value={today}
            readOnly
            className="border-b border-gray-600 bg-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-issuance">Last Issuance</Label>
          <Input
            id="last-issuance"
            type="date"
            className="border-b border-gray-600 bg-transparent"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">
          General Information
        </h2>
        <div className="space-y-2">
          <Label htmlFor="establishment-name">Establishment Name</Label>
          <Input
            id="establishment-name"
            placeholder="N/A"
            className="border-b border-gray-600 bg-transparent"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Owner"
            className="border-b border-gray-600 bg-transparent"
          />
          <Input
            placeholder="Representative Name"
            className="border-b border-gray-600 bg-transparent"
          />
          <Input
            placeholder="Trade Name"
            className="border-b border-gray-600 bg-transparent"
          />
          <div className="flex items-center">
            <Input
              placeholder="Total Build Area"
              type="number"
              className="border-b border-gray-600 bg-transparent no-spinner flex-grow"
            />
            <span className="ml-2">sqm</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            type="number"
            placeholder="Number of Occupant"
            className="border-b border-gray-600 bg-transparent no-spinner"
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type of Occupancy" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type of Building" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concrete">Concrete</SelectItem>
              <SelectItem value="wood">Wood</SelectItem>
              <SelectItem value="steel">Steel</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">
          Business Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nature of Business" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="food">Food and Beverage</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Business Identification No."
            className="border-b border-gray-600 bg-transparent no-spinner"
          />
          <Input
            type="number"
            placeholder="Tax Identification No."
            className="border-b border-gray-600 bg-transparent no-spinner"
          />
          <Input
            type="number"
            placeholder="DTI No."
            className="border-b border-gray-600 bg-transparent no-spinner"
          />
        </div>
        <Input
          type="number"
          placeholder="Securities and Exchange Commission No."
          className="border-b border-gray-600 bg-transparent no-spinner"
        />
      </div>

      {/* <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">
          Other Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>High Rise</Label>
            <RadioGroup defaultValue="no" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="high-rise-yes"
                  className="text-white"
                />
                <Label htmlFor="high-rise-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="high-rise-no"
                  className="text-white"
                />
                <Label htmlFor="high-rise-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>In Eminent Danger</Label>
            <RadioGroup defaultValue="no" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="danger-yes"
                  className="text-white"
                />
                <Label htmlFor="danger-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="danger-no"
                  className="text-white"
                />
                <Label htmlFor="danger-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div>
          <Label>Last Issuance</Label>
          <RadioGroup
            defaultValue="Unknown"
            onValueChange={setLastIssuance}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {[
              "Unknown",
              "Notice of Disapproval (occupancy permit)",
              "Abatement Order",
              "Fire Safety Evaluation Clearance",
              "Fire Safety Inspection Certificate (Business Permit) - New",
              "Stoppage of Operation",
              "Notice of Disapproval (FSEC)",
              "Notice To Comply",
              "Fire Safety Inspection Certificate (Business Permit) - Renewal",
            ].map((SelectItem) => (
              <div key={SelectItem} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={SelectItem}
                  id={SelectItem}
                  className="text-white"
                />
                <Label htmlFor={SelectItem}>{SelectItem}</Label>
              </div>
            ))}
          </RadioGroup> 
        </div>
        {lastIssuance !== "Unknown" && (
          <Input
            type="date"
            placeholder="Date Last Issued"
            className="border-b border-gray-600  bg-transparent"
          />
        )}
      </div> */}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">
          Address Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a barangay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="barangay1">Barangay 1</SelectItem>
              <SelectItem value="barangay2">Barangay 2</SelectItem>
              <SelectItem value="barangay3">Barangay 3</SelectItem>
              <SelectItem value="barangay4">Barangay 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            placeholder="Blk No/Unit No/Name of Street/Name of Building"
            className="border-b border-gray-600 bg-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-400">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            type="email"
            placeholder="Email Address"
            className="border-b border-gray-600 bg-transparent"
          />
          <Input
            type="number"
            placeholder="Landline Number"
            className="border-b border-gray-600 bg-transparent no-spinner"
          />
          <div className="flex">
            <span className=" self-center px-2 py-1 bg-blue-600 rounded-l-md">
              +63
            </span>
            <Input
              type="number"
              placeholder="Mobile Number"
              className="border-b border-gray-600 bg-transparent no-spinner rounded-l-none"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Save Entry
      </Button>
    </form>
  );
}
