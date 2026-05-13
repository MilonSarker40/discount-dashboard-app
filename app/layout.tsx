import type { Metadata } from "next";

import { Open_Sans } from "next/font/google";

import "./globals.css";

import ProtectedRoute from "@/components/ProtectedRoute";

const openSans =
  Open_Sans({
    subsets: ["latin"],

    weight: [
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
    ],

    variable:
      "--font-open-sans",
  });

export const metadata: Metadata =
  {
    title:
      "Discount App | Premium Admin Panel",

    description:
      "Admin dashboard for discount management",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          openSans.className
        }
      >
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </body>
    </html>
  );
}