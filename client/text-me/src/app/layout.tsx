import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/provider/AuthContent";
import { SocketProvider } from "@/components/provider/SocketContext";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { JSX } from "react";

const gidole = localFont({
  src: "/fonts/Gidole-Regular.ttf",
  display: "swap",
  variable: "--font-gidole",
});

export const metadata: Metadata = {
  title: "Text-Me",
  description: "",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${gidole.variable} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SocketProvider>{children}</SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
