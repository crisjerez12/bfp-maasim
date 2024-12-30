import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Button className="mb-6 bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Establishments
        </Button>

        <h1 className="text-3xl font-bold mb-6">FSIC Details</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-24 bg-gray-700" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg text-white"
            >
              <CardHeader className="border-b border-gray-600 pb-4">
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Skeleton className="h-5 w-5 mr-2 bg-gray-600" />
                  <Skeleton className="h-6 w-40 bg-gray-600" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex justify-between">
                      <Skeleton className="h-4 w-24 bg-gray-600" />
                      <Skeleton className="h-4 w-32 bg-gray-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
