"use client";

import React, { useState, useEffect } from "react";
import { SearchIcon, RefreshCwIcon } from "lucide-react";
import { BARANGAY } from "@/lib/constants";
import Link from "next/link";

interface Establishment {
  _id: string;
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
  updatedAt: string;
}

export default function EstablishmentInspectionForm() {
  const [highRise, setHighRise] = useState<string>("");
  const [eminentDanger, setEminentDanger] = useState<string>("");
  const [barangay, setBarangay] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rows, setRows] = useState<string>("5");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allEstablishments, setAllEstablishments] = useState<Establishment[]>(
    []
  );
  const [filteredEstablishments, setFilteredEstablishments] = useState<
    Establishment[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchEstablishments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fsic");
      const data = await response.json();
      if (data.success) {
        setAllEstablishments(data.data);
        setFilteredEstablishments(data.data);
      } else {
        console.error("Failed to fetch establishments");
      }
    } catch (error) {
      console.error("Error fetching establishments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEstablishments();
  }, []);

  const handleSearch = () => {
    const filtered = allEstablishments.filter((establishment) => {
      const matchesSearchTerm = establishment.establishmentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesHighRise =
        highRise === "" || establishment.isHighRise.toString() === highRise;
      const matchesEminentDanger =
        eminentDanger === "" ||
        establishment.isInEminentDanger.toString() === eminentDanger;
      const matchesBarangay =
        barangay === "" || establishment.barangay === barangay;
      const matchesDateRange =
        (!startDate || establishment.updatedAt >= startDate) &&
        (!endDate || establishment.updatedAt <= endDate);

      return (
        matchesSearchTerm &&
        matchesHighRise &&
        matchesEminentDanger &&
        matchesBarangay &&
        matchesDateRange
      );
    });

    setFilteredEstablishments(filtered);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setHighRise("");
    setEminentDanger("");
    setBarangay("");
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setFilteredEstablishments(allEstablishments);
    setCurrentPage(1);
  };

  const itemsPerPage = parseInt(rows);
  const totalPages = Math.ceil(filteredEstablishments.length / itemsPerPage);
  const paginatedEstablishments = filteredEstablishments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen text-gray-100">
      <div className="bg-gray-800 p-4 md:p-6 mb-6 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            value={highRise}
            onChange={(e) => setHighRise(e.target.value)}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
          >
            <option value="">High Rise</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <select
            value={eminentDanger}
            onChange={(e) => setEminentDanger(e.target.value)}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
          >
            <option value="">Eminent Danger</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <select
            value={barangay}
            onChange={(e) => setBarangay(e.target.value)}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
          >
            <option value="">Barangay</option>
            {BARANGAY.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2 flex-grow">
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-end">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Establishment"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
          >
            {[5, 10, 15, 20].map((value) => (
              <option key={value} value={value.toString()}>
                {value} rows
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded"
          >
            Search
          </button>
          <button
            onClick={handleRefresh}
            className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded flex items-center justify-center"
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">
                Establishment Name
              </th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">Address</th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">Barangay</th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">
                Type of Occupancy
              </th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">High Rise</th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">
                Eminent Danger
              </th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">
                Last Update
              </th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">Contact</th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-500 rounded w-1/3"></div>
                    </td>
                  </tr>
                ))
              : paginatedEstablishments.map((establishment, index) => (
                  <tr
                    key={establishment._id}
                    className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                  >
                    <td className="px-4 py-2">
                      {establishment.establishmentName}
                    </td>
                    <td className="px-4 py-2">{establishment.address}</td>
                    <td className="px-4 py-2">{establishment.barangay}</td>
                    <td className="px-4 py-2">
                      {establishment.typeOfOccupancy}
                    </td>
                    <td className="px-4 py-2">
                      {establishment.isHighRise ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2">
                      {establishment.isInEminentDanger ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(establishment.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <div>{establishment.mobile}</div>
                      <div>{establishment.email}</div>
                      <div>{establishment.landline}</div>
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        href={"/dashboard/establishments/" + establishment._id}
                      >
                        <button className="bg-blue-600 hover:bg-blue-700 text-gray-100 px-3 py-1 rounded">
                          See Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-400 mb-2 sm:mb-0">
          Showing{" "}
          {Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            filteredEstablishments.length
          )}{" "}
          to{" "}
          {Math.min(currentPage * itemsPerPage, filteredEstablishments.length)}{" "}
          of {filteredEstablishments.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
