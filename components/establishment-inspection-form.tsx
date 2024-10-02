"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarIcon,
  SearchIcon,
  RefreshCwIcon,
  FileTextIcon,
} from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

const barangays = [
  "Amsipit",
  "Colon",
  "Kablacan",
  "Kamanga",
  "Kanalo",
  "Lumasal",
  "Lumatil",
  "Malbang",
  "Nomoh",
  "Old Poblacion",
  "Pag-asa",
  "Poblacion",
  "Tinoto",
];

interface Establishment {
  name: string;
  address: string;
  buildingType: string;
  highRise: boolean;
  eminentDanger: boolean;
  contact: {
    mobile: string;
    email: string;
    landline: string;
  };
}

const mockEstablishments: Establishment[] = [
  {
    name: "Maasim Palengke",
    address: "Poblacion, Maasim, Sarangani",
    buildingType: "Commercial",
    highRise: false,
    eminentDanger: false,
    contact: {
      mobile: "09123456789",
      email: "maasim.palengke@example.com",
      landline: "(083) 123-4567",
    },
  },
  {
    name: "Barangay Kamanga Health Center",
    address: "Kamanga, Maasim, Sarangani",
    buildingType: "Government",
    highRise: false,
    eminentDanger: false,
    contact: {
      mobile: "09187654321",
      email: "kamanga.health@example.com",
      landline: "(083) 765-4321",
    },
  },
  {
    name: "Tinoto Elementary School",
    address: "Tinoto, Maasim, Sarangani",
    buildingType: "Educational",
    highRise: false,
    eminentDanger: false,
    contact: {
      mobile: "09198765432",
      email: "tinoto.elementary@example.com",
      landline: "(083) 987-6543",
    },
  },
];

export default function EstablishmentInspectionForm() {
  const [highRise, setHighRise] = useState<string>("");
  const [eminentDanger, setEminentDanger] = useState<string>("");
  const [occupancy, setOccupancy] = useState<string>("");
  const [tagged, setTagged] = useState<string>("not-tagged");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rows, setRows] = useState<string>("5");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    console.log("Searching...");
  };

  const handleReload = () => {
    console.log("Reloading...");
  };

  const handleReport = () => {
    console.log("Generating report...");
  };

  const itemsPerPage = parseInt(rows);
  const totalPages = Math.ceil(mockEstablishments.length / itemsPerPage);
  const paginatedEstablishments = mockEstablishments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen text-gray-100 ">
      <div className="bg-gray-800 p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <Select value={highRise} onValueChange={setHighRise}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="High Rise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>

          <Select value={eminentDanger} onValueChange={setEminentDanger}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Eminent Danger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>

          <Select value={occupancy} onValueChange={setOccupancy}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Occupancy" />
            </SelectTrigger>
            <SelectContent>
              {barangays.map((barangay) => (
                <SelectItem key={barangay} value={barangay}>
                  {barangay}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <RadioGroup
            value={tagged}
            onValueChange={setTagged}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="bg-white" value="tagged" id="tagged" />
              <Label htmlFor="tagged">Tagged</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="bg-white"
                value="not-tagged"
                id="not-tagged"
              />
              <Label htmlFor="not-tagged">Not Tagged</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Establishment"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Select value={rows} onValueChange={setRows}>
            <SelectTrigger className="w-full lg:w-32">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full lg:w-[300px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="bg-gray-800 text-gray-100   border-gray-700"
                classNames={{
                  months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-gray-500 rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-700 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                  day_selected:
                    "bg-blue-500 text-gray-100 hover:bg-blue-600 focus:bg-blue-600 focus:text-gray-100",
                  day_today: "bg-gray-700 text-gray-100",
                  day_outside: "text-gray-500 opacity-50",
                  day_disabled: "text-gray-500 opacity-50",
                  day_range_middle:
                    "aria-selected:bg-gray-700 aria-selected:text-gray-100",
                  day_hidden: "invisible",
                }}
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-gray-100"
          >
            Search
          </Button>
          <Button
            onClick={handleReload}
            variant="outline"
            className="text-gray-100 border-gray-600"
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Reload
          </Button>
          <Button
            onClick={handleReport}
            variant="outline"
            className="text-gray-100 border-gray-600"
          >
            <FileTextIcon className="mr-2 h-4 w-4" />
            Report
          </Button>
        </div>
      </div>

      <div className="bg-gray-800 shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-700 text-gray-100">
                Establishment Name
              </TableHead>
              <TableHead className="bg-gray-700 text-gray-100">
                Address
              </TableHead>
              <TableHead className="bg-gray-700 text-gray-100">
                Type of Building
              </TableHead>
              <TableHead className="bg-gray-700 text-gray-100">
                High Rise
              </TableHead>
              <TableHead className="bg-gray-700 text-gray-100">
                Eminent Danger
              </TableHead>
              <TableHead className="bg-gray-700 text-gray-100">
                Contact
              </TableHead>
              <TableHead className="bg-gray-700 text-gray-100">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEstablishments.map((establishment, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
              >
                <TableCell>{establishment.name}</TableCell>
                <TableCell>{establishment.address}</TableCell>
                <TableCell>{establishment.buildingType}</TableCell>
                <TableCell>{establishment.highRise ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {establishment.eminentDanger ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <div>{establishment.contact.mobile}</div>
                  <div>{establishment.contact.email}</div>
                  <div>{establishment.contact.landline}</div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="text-gray-100 border-gray-600"
                  >
                    See Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="text-sm text-gray-400 mb-2 lg:mb-0">
          Showing{" "}
          {Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            mockEstablishments.length
          )}{" "}
          to {Math.min(currentPage * itemsPerPage, mockEstablishments.length)}{" "}
          of {mockEstablishments.length} entries
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            className="text-gray-100 border-gray-600"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            variant="outline"
            className="text-gray-100 border-gray-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
