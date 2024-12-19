'use client'
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/authContext";
import Footer from "@/components/footer";
import { useState } from "react";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (

    <QueryClientProvider client={queryClient}>
      <title>Biblioteca</title>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <MantineProvider>
            <AuthProvider>
              <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              {children}
              <Footer />
            </AuthProvider>
          </MantineProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}
