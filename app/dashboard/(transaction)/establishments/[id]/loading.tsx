import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  const SkeletonCard = () => (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg">
      <CardHeader className="border-b border-gray-600 pb-4">
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-1/4" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
