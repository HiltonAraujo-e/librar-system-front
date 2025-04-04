'use client'
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/authContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider, SidebarRail, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";

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
    const isMobile = useIsMobile();

    return (
        <QueryClientProvider client={queryClient}>
            <title>Biblioteca</title>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <MantineProvider>
                        <AuthProvider>
                            <SidebarProvider defaultOpen={!isMobile}>
                                <div className="flex h-screen w-full bg-muted/20">
                                    <AppSidebar />
                                    <div className="flex flex-col flex-1">
                                        <div className="sticky top-0 z-50 w-full p-2 bg-background/80 backdrop-blur border-b">
                                            <div className="flex items-center">
                                                <SidebarTrigger className="ml-2" />
                                                <div className="flex-1">
                                                    {/* <Header /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-1">
                                            <SidebarRail />
                                            <SidebarInset className="flex-1 bg-white overflow-auto">
                                                <main className="container mx-auto py-4 px-4 min-h-[calc(100vh-140px)]">
                                                    {children}
                                                </main>
                                                {isMobile && <div className="h-16" />}
                                            </SidebarInset>
                                        </div>
                                    </div>
                                </div>
                            </SidebarProvider>
                        </AuthProvider>
                    </MantineProvider>
                </body>
            </html>
        </QueryClientProvider>
    );
}