"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const MyLibraryPage = () => {
    const navigate = useRouter();
    const [showAuthAlert, setShowAuthAlert] = useState(false);
    const isAuthenticated = false; // Replace with actual authentication check
    //   useEffect(() => {
    //     if (!isAuthenticated) {
    //       setShowAuthAlert(true);
    //       toast.error("Please log in to access your library");
    //     }
    //   }, [isAuthenticated]);

    const handleLoginRedirect = () => {
        navigate.push("/profile");
    };

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">My Library</h1>

            {!isAuthenticated ? (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Authentication Required</AlertTitle>
                    <AlertDescription>
                        <p className="mb-4">You need to be logged in to view your library and manage your books.</p>
                        <Button onClick={handleLoginRedirect}>
                            Log in or Sign up
                        </Button>
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="grid gap-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Currently Reading</h2>
                        <div className="bg-muted/50 p-8 rounded-lg text-center">
                            <p className="text-muted-foreground mb-4">You don't have any books in your library yet.</p>
                            <Button asChild>
                                <a href="/">Browse Books</a>
                            </Button>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Read History</h2>
                        <div className="bg-muted/50 p-8 rounded-lg text-center">
                            <p className="text-muted-foreground">Your reading history will appear here.</p>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default MyLibraryPage;
