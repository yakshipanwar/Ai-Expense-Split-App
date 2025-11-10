import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ConvexClientProvider } from "@/components/convexClientProvider";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";

const inter = Inter({subsets:["latin"],});


export const metadata: Metadata = {
  title: "Money Divvy",
  description: "Expense Splitting App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
      <ClerkProvider>
        <ConvexClientProvider>
        <Header/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1.5 py-2">{children}
          <Toaster richColors></Toaster>
        </main>
        </ConvexClientProvider>
      </ClerkProvider>
      </body>
    </html>
  );
}
