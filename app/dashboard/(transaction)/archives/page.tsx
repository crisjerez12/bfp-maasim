"use client";

import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchIcon, RefreshCwIcon } from "lucide-react";
import { BARANGAY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { restoreEstablishment } from "@/app/actions/establishment-actions";

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
}

export default function EstablishmentRestoreForm() {
  const [highRise, setHighRise] = useState<string>("");
  const [eminentDanger, setEminentDanger] = useState<string>("");
  const [barangay, setBarangay] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rows, setRows] = useState<string>("5");
  const [currentPage, setCurrentPage] = useState(1);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState<
    string | null
  >(null);
  const { toast } = useToast();
  const router = useRouter();

  const fetchEstablishments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fsic/removed/");
      const data = await response.json();
      if (data.success) {
        setEstablishments(data.data);
      } else {
        console.error("Failed to fetch deleted establishments");
      }
    } catch (error) {
      console.error("Error fetching deleted establishments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEstablishments();
  }, []);

  const handleSearch = () => {
    const filteredEstablishments = establishments.filter((establishment) => {
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

      return (
        matchesSearchTerm &&
        matchesHighRise &&
        matchesEminentDanger &&
        matchesBarangay
      );
    });

    setEstablishments(filteredEstablishments);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setHighRise("");
    setEminentDanger("");
    setBarangay("");
    setSearchTerm("");
    fetchEstablishments();
  };

  const handleRestoreClick = (id: string) => {
    setSelectedEstablishmentId(id);
    setIsDialogOpen(true);
  };

  const handleRestoreConfirm = async () => {
    if (selectedEstablishmentId) {
      const result = await restoreEstablishment(selectedEstablishmentId);
      setIsDialogOpen(false);
      if (result.success) {
        toast({
          title: "Success",
          description: "Establishment restored successfully",
          variant: "success",
        });
        fetchEstablishments();
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };

  const itemsPerPage = parseInt(rows);
  const totalPages = Math.ceil(establishments.length / itemsPerPage);
  const paginatedEstablishments = establishments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen text-gray-100 ">
      <div className="bg-gray-800  md:p-6 mb-4 sm:mb-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="highRise"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              High Rise
            </label>
            <select
              id="highRise"
              value={highRise}
              onChange={(e) => setHighRise(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="eminentDanger"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Eminent Danger
            </label>
            <select
              id="eminentDanger"
              value={eminentDanger}
              onChange={(e) => setEminentDanger(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="barangay"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Barangay
            </label>
            <select
              id="barangay"
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
            >
              <option value="">All Barangays</option>
              {BARANGAY.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 items-end mt-4">
          <div className="lg:col-span-2">
            <label
              htmlFor="searchEstablishment"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Search Establishment
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="searchEstablishment"
                type="text"
                placeholder="Search Establishment"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="rows"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Rows per page
            </label>
            <select
              id="rows"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2"
            >
              {[5, 10, 15, 20].map((value) => (
                <option key={value} value={value.toString()}>
                  {value} rows
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded"
            >
              Search
            </button>
            <button
              onClick={handleRefresh}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded flex items-center justify-center"
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Refresh
            </button>
          </div>
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
                Last Issuance
              </th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">Contact</th>
              <th className="bg-gray-700 text-gray-100 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 9 }).map((_, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-2">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
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
                      {new Date(
                        establishment.lastIssuance
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <div>{establishment.mobile}</div>
                      <div>{establishment.email}</div>
                      <div>{establishment.landline}</div>
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        onClick={() => handleRestoreClick(establishment._id)}
                        className="bg-green-600 hover:bg-green-700 text-gray-100"
                      >
                        Restore
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="text-gray-400 mb-2 sm:mb-0 text-center sm:text-left">
          Showing{" "}
          {Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            establishments.length
          )}{" "}
          to {Math.min(currentPage * itemsPerPage, establishments.length)} of{" "}
          {establishments.length} entries
        </div>
        <div className="flex space-x-2 justify-center sm:justify-start w-full sm:w-auto">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-blue-800 border-blue-800">
          <DialogHeader>
            <DialogTitle>Restore Establishment</DialogTitle>
            <DialogDescription className="text-white">
              Are you sure you want to restore this establishment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-slate-950" onClick={handleRestoreConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
