import Cover from "@/components/cover";
import DueEstablishmentsWarning from "@/components/due-establishments-warning";
import { AudioProvider } from "@/contexts/AudioContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "A page for analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AudioProvider>
        <DueEstablishmentsWarning />
        <Cover>{children}</Cover>
      </AudioProvider>
    </>
  );
}
