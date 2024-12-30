"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, AlertCircle, User, Building, Phone } from "lucide-react";

interface DueData {
  id: string;
  establishmentName: string;
  dueDate: { day: string };
  address: string;
  owner: string;
  typeOfOccupancy: string;
  mobile: string;
}

export default function DuesPage() {
  const [duesData, setDuesData] = useState<DueData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDuesData = async () => {
      try {
        const response = await fetch("/api/fsic/due");
        const data = await response.json();
        if (data.success) {
          setDuesData(data.data);
        } else {
          console.error("Failed to fetch dues data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching dues data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDuesData();
  }, []);

  const SkeletonCard = () => (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
      <CardHeader className="border-b border-gray-600 pb-4">
        <Skeleton className="h-6 w-3/4 bg-gray-600" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center mb-2">
          <Skeleton className="h-5 w-5 rounded-full mr-2 bg-gray-600" />
          <Skeleton className="h-4 w-1/4 bg-gray-600" />
        </div>
        <div className="flex items-start">
          <Skeleton className="h-4 w-full bg-gray-600" />
        </div>
      </CardContent>
    </Card>
  );

  const NoRecordsFound = () => (
    <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600 rounded-lg shadow-lg text-white">
      <AlertCircle className="w-16 h-16 text-yellow-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">No Dues Records Found</h2>
      <p className="text-gray-300 text-center">
        There are currently no due records to display for this month. New
        records will appear here when they become available.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Establishment Dues for{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          ) : duesData.length > 0 ? (
            duesData.map((due) => (
              <Card
                key={due.id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white"
              >
                <CardHeader className="border-b border-gray-600 pb-4">
                  <CardTitle className="text-xl font-semibold">
                    {due.establishmentName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                    <span className="font-semibold">Due Date:</span>
                    <span className="ml-2">
                      {due.dueDate?.day || "Not Set"}
                    </span>
                  </div>
                  <div className="flex items-start mb-2">
                    <User className="mr-2 h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="font-semibold mr-2">Owner:</span>
                    <span className="flex-1">{due.owner}</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <Building className="mr-2 h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span className="font-semibold mr-2">Type:</span>
                    <span className="flex-1">{due.typeOfOccupancy}</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <Phone className="mr-2 h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="font-semibold mr-2">Contact:</span>
                    <span className="flex-1">{due.mobile}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-semibold mr-2">Address:</span>
                    <span className="flex-1">{due.address}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <NoRecordsFound />
          )}
        </div>
      </div>
    </div>
  );
}
