"use client";
import Navbar from "@/components/navbar";
import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <main className="flex-1 bg-gray-100 w-full">
                <div className="w-full">{children}</div>
            </main>
        </div>
    );
}