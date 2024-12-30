"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, Users, Calendar } from "lucide-react";

interface AnalyticsData {
  totalRecordedEstablishments: number;
  totalActive: number;
  dueThisMonth: number;
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("/api/fsic/analytics");
        const data = await response.json();
        if (data.success) {
          setAnalyticsData(data.data);
        } else {
          console.error("Failed to fetch analytics data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const AnimatedNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const duration = 750;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current > value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [value]);

    return <span>{displayValue}</span>;
  };

  const SkeletonCard = () => (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
      <CardHeader className="border-b border-gray-600 pb-4">
        <Skeleton className="h-6 w-3/4 bg-gray-600" />
      </CardHeader>
      <CardContent className="pt-4">
        <Skeleton className="h-12 w-1/2 bg-gray-600" />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          ) : analyticsData ? (
            <>
              <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
                <CardHeader className="border-b border-gray-600 pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Building className="mr-2 h-5 w-5 text-blue-400" />
                    Total Establishments
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-4xl font-bold">
                    <AnimatedNumber
                      value={analyticsData.totalRecordedEstablishments}
                    />
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
                <CardHeader className="border-b border-gray-600 pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-400" />
                    Active Establishments
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-4xl font-bold">
                    <AnimatedNumber value={analyticsData.totalActive} />
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white">
                <CardHeader className="border-b border-gray-600 pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-yellow-400" />
                    Due This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-4xl font-bold">
                    <AnimatedNumber value={analyticsData.dueThisMonth} />
                  </p>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="col-span-full text-center">
              <p className="text-xl">
                Failed to load analytics data. Please try again later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
