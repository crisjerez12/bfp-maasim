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
import { AlertTriangleIcon } from "lucide-react";

// Mock data for due establishments
const dueEstablishments = [
  { id: 1, name: "Sunset Cafe", dueDate: "2023-05-15" },
  { id: 2, name: "Mountain View Hotel", dueDate: "2023-05-18" },
  { id: 3, name: "City Center Mall", dueDate: "2023-05-20" },
];

export default function DueEstablishmentsWarning() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
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
        <div className="grid gap-4 py-6 md:grid-cols-2 lg:grid-cols-3">
          {dueEstablishments.map((establishment) => (
            <Card
              key={establishment.id}
              className="bg-blue-300/50 backdrop-blur-sm border-blue-400/50 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-100">
                  {establishment.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-100">
                  Due Date:{" "}
                  <span className="font-medium">{establishment.dueDate}</span>
                </p>
              </CardContent>
            </Card>
          ))}
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
