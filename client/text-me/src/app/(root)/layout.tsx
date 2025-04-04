import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { JSX } from "react";

export const metadata: Metadata = {
  title: "Text-Me",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
