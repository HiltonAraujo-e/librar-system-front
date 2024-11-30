"use client";
import * as React from "react";
import Navbar from "./components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="flex h-screen">
                <Navbar />
                <main className="flex-1 p-4 bg-gray-100">
                    <div className="w-full">{children}</div>
                </main>
            </div>
        </>
    );
}
