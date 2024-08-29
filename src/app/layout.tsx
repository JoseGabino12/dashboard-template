import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard template",
  icons: {
    icon: "/graph.svg"
  }
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/graph.svg" type="image/svg+xml" />
      </head>
      <body
        className={ cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        ) }
      >
        <Toaster />
        <AuthProvider>
          { children }
        </AuthProvider>
      </body>
    </html>
  );
}
