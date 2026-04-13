import type { Metadata } from "next";
import { poppins } from './ui/fonts';
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "STOCKFLOW",
  description: "Inventory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body className={`${poppins.className} min-h-full flex flex-col`}>
    {children}
  </body>
</html>
  );
}
