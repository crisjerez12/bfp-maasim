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
import { AlertTriangle, Loader2, Bell } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

interface Establishment {
  _id: string;
  establishmentName: string;
  address: string;
}

export default function DueEstablishmentsWarning() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMainDialog, setShowMainDialog] = useState(false);
  const [inspectionsToday, setInspectionsToday] = useState<Establishment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { playSound } = useAudio();
  useEffect(() => {
    const fetchDueEstablishments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/fsic/inspections");
        const data = await response.json();
        if (data.success) {
          setInspectionsToday(data.data);
          if (data.data.length > 0) {
            setIsOpen(true);
          }
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

  const handleInitialDialogClose = () => {
    playSound();
    setIsOpen(false);
    setShowMainDialog(true);
  };

  const handleClose = () => {
    setShowMainDialog(false);
  };

  if (inspectionsToday.length === 0 && !isLoading && !error) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white shadow-lg rounded-lg text-blue-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-blue-900" />
              Inspection Alert
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg text-center text-blue-900">
              You have an Inspection for today
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={handleInitialDialogClose}
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none text-lg w-full"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showMainDialog}
        onOpenChange={(open) => {
          setShowMainDialog(open);
        }}
      >
        <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] bg-white shadow-lg rounded-lg text-blue-900">
          <DialogHeader className="border-b border-blue-500/30 pb-4">
            <DialogTitle className="text-3xl font-bold text-blue-900 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-blue-900" />
              Inspections for today
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-blue-900 animate-spin" />
              </div>
            ) : error ? (
              <p className="text-red-500 text-center text-lg">{error}</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {inspectionsToday.map((establishment: Establishment) => (
                  <Card
                    key={establishment._id}
                    className="bg-white border border-blue-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-blue-900" />
                        {establishment.establishmentName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-blue-900">
                        Address: {establishment.address}
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
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none text-lg"
            >
              Acknowledge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
