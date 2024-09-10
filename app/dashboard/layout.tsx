import { Cover } from "@/components/cover";
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
    <html lang="en">
      <body>
        <Cover>{children}</Cover>
      </body>
    </html>
  );
}
