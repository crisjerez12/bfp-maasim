"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

interface AudioContextType {
  playSound: () => void;
  isLoading: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audioElement = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_32283e5329.mp3?filename=alarm-clock-90867.mp3"
    );
    audioElement.addEventListener("canplaythrough", () => setIsLoading(false));
    audioElement.addEventListener("error", () => {
      console.error("Error loading audio");
      setIsLoading(false);
    });
    setAudio(audioElement);

    return () => {
      audioElement.removeEventListener("canplaythrough", () =>
        setIsLoading(false)
      );
      audioElement.removeEventListener("error", () => setIsLoading(false));
    };
  }, []);

  const playSound = () => {
    if (audio) {
      audio.currentTime = 0; // Reset to start
      audio.play();
    }
  };

  return (
    <AudioContext.Provider value={{ playSound, isLoading }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
