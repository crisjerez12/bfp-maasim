import Cover from "@/components/cover";
import DueEstablishmentsWarning from "@/components/due-establishments-warning";
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
      <DueEstablishmentsWarning />
      <Cover>{children}</Cover>
    </>
  );
}
