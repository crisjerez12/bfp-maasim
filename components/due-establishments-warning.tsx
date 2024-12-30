"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon, Loader2 } from "lucide-react";

interface Establishment {
  _id: string;
  establishmentName: string;
  dueDate: {
    month: string;
    day: string;
  };
}

export default function DueEstablishmentsWarning() {
  const [isOpen, setIsOpen] = useState(true);
  const [dueEstablishments, setDueEstablishments] = useState<Establishment[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDueEstablishments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/fsic/inspections");
        const data = await response.json();
        if (data.success) {
          setDueEstablishments(data.data);
        } else {
          setError("Failed to fetch due establishments");
        }
      } catch (error) {
        setError("An error occurred while fetching due establishments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDueEstablishments();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] bg-blue-800/80 backdrop-blur-md backdrop-filter border border-blue-100/50 shadow-lg rounded-lg text-blue-900">
        <DialogHeader className="border-b border-blue-500/30 pb-4">
          <DialogTitle className="text-2xl font-bold text-blue-50 flex items-center gap-2">
            <AlertTriangleIcon className="w-6 h-6" />
            Due Establishments
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="w-8 h-8 text-blue-100 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-red-300 text-center">{error}</p>
          ) : dueEstablishments.length === 0 ? (
            <p className="text-blue-100 text-center">
              No due inspections for today.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dueEstablishments.map((establishment) => (
                <Card
                  key={establishment._id}
                  className="bg-blue-300/50 backdrop-blur-sm border-blue-400/50 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-blue-100">
                      {establishment.establishmentName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-100">
                      Due Date:{" "}
                      <span className="font-medium">
                        {establishment.dueDate.month}{" "}
                        {establishment.dueDate.day}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleClose}
            className="bg-blue-400 hover:bg-blue-600 text-blue-950 font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none"
          >
            Acknowledge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
