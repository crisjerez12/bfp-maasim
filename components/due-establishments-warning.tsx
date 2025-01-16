"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Loader2, Bell, Volume2, VolumeX } from "lucide-react";

interface Establishment {
  _id: string;
  establishmentName: string;
  dueDate: {
    month: string;
    day: string;
  };
}

export default function DueEstablishmentsWarning() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMainDialog, setShowMainDialog] = useState(false);
  const [dueEstablishments, setDueEstablishments] = useState<Establishment[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchDueEstablishments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/fsic/inspections");
        const data = await response.json();
        if (data.success) {
          setDueEstablishments(data.data);
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
    setIsOpen(false);
    setShowMainDialog(true);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    setShowMainDialog(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (dueEstablishments.length === 0 && !isLoading && !error) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay={false}
        src="/notifications.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px] bg-gradient-to-br from-blue-900 to-blue-700 backdrop-blur-md backdrop-filter border border-blue-300/50 shadow-lg rounded-lg text-blue-50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-yellow-300 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-300" />
              Inspection Alert
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg text-center text-yellow-100">
              You have an Inspection for today
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={handleInitialDialogClose}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none text-lg w-full"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMainDialog} onOpenChange={setShowMainDialog}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] bg-gradient-to-br from-blue-900 to-blue-700 backdrop-blur-md backdrop-filter border border-blue-300/50 shadow-lg rounded-lg text-blue-50">
          <DialogHeader className="border-b border-blue-500/30 pb-4">
            <DialogTitle className="text-3xl font-bold text-yellow-300 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-300" />
              Due Establishments
              <Button
                size="icon"
                variant="ghost"
                className="ml-auto"
                onClick={toggleAudio}
              >
                {isPlaying ? (
                  <Volume2 className="w-6 h-6 text-yellow-300" />
                ) : (
                  <VolumeX className="w-6 h-6 text-yellow-300" />
                )}
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="w-12 h-12 text-yellow-300 animate-spin" />
              </div>
            ) : error ? (
              <p className="text-red-300 text-center text-lg">{error}</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dueEstablishments.map((establishment) => (
                  <Card
                    key={establishment._id}
                    className="bg-yellow-400/20 backdrop-blur-sm border-yellow-400/50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-yellow-300 flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        {establishment.establishmentName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-yellow-100">
                        Due Date:{" "}
                        <span className="font-medium text-yellow-300">
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
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none text-lg"
            >
              Acknowledge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
