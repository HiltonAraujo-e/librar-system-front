"use client"
import { useState, useEffect } from "react";
import { BookGrid } from "@/components/books/BookGrid";
import { format, isAfter, subMonths } from "date-fns";
import { CalendarDays } from "lucide-react";
import { getNewReleases } from "@/app/services/bookService";

export default function NewReleasesPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadNewReleases = async () => {
            try {
                setIsLoading(true);
                const data = await getNewReleases();
                setBooks(data);
            } catch (error) {
                console.error('Error loading new releases:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadNewReleases();
    }, []);

    // Group books by release month
    const groupedBooks = books.reduce((groups, book) => {
        const publishedDate = new Date(book.publishedDate);
        const monthYear = format(publishedDate, 'MMMM yyyy');

        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }

        groups[monthYear].push(book);
        return groups;
    }, {} as Record<string, any[]>);

    // Sort months chronologically (newest first)
    const sortedMonths = Object.keys(groupedBooks).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="container py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">New Releases</h1>
                <p className="text-muted-foreground">
                    Discover the latest additions to our library. New books are added regularly.
                </p>
            </header>

            {isLoading ? (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">Loading new releases...</p>
                </div>
            ) : books.length > 0 ? (
                <div className="space-y-12">
                    {sortedMonths.map(month => (
                        <section key={month}>
                            <div className="flex items-center mb-4">
                                <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                                <h2 className="text-2xl font-bold">{month}</h2>
                            </div>
                            <BookGrid
                                books={groupedBooks[month]}
                                showAuthor={true}
                            />
                        </section>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">No new releases found.</p>
                </div>
            )}
        </div>
    );
}
