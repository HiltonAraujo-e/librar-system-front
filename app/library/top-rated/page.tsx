"use client"
import { useState, useEffect } from "react";
import { BookGrid } from "@/components/books/BookGrid";
import { Award, Star } from "lucide-react";
import { getTopRated } from "@/app/services/bookService";

export default function TopRatedPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTopRated = async () => {
            try {
                setIsLoading(true);
                const data = await getTopRated();
                setBooks(data);
            } catch (error) {
                console.error('Error loading top rated books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTopRated();
    }, []);

    // Group books by rating (5 stars, 4.5+ stars, etc.)
    const ratingGroups = {
        "5 Stars": books.filter(book => book.rating === 5),
        "4.5+ Stars": books.filter(book => book.rating >= 4.5 && book.rating < 5),
        "4+ Stars": books.filter(book => book.rating >= 4 && book.rating < 4.5),
    };

    return (
        <div className="container py-8">
            <header className="mb-8 flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold mb-2">Top Rated Books</h1>
                    <p className="text-muted-foreground">
                        The highest rated books in our library, as voted by our readers.
                    </p>
                </div>
            </header>

            {isLoading ? (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">Loading top rated books...</p>
                </div>
            ) : books.length > 0 ? (
                <div className="space-y-12">
                    {Object.entries(ratingGroups).map(([rating, books]) =>
                        books.length > 0 ? (
                            <section key={rating} className="section-bg">
                                <div className="flex items-center mb-4">
                                    <Star className="h-5 w-5 mr-2 text-warning fill-warning" />
                                    <h2 className="text-2xl font-bold">{rating}</h2>
                                </div>
                                <BookGrid
                                    books={books}
                                    showAuthor={true}
                                />
                            </section>
                        ) : null
                    )}

                    {/* Most popular books section (by number of ratings) */}
                    <section>
                        <div className="flex items-center mb-4">
                            <Star className="h-5 w-5 mr-2 text-primary" />
                            <h2 className="text-2xl font-bold">Most Reviewed</h2>
                        </div>
                        <BookGrid
                            books={[...books].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 6)}
                            showAuthor={true}
                        />
                    </section>
                </div>
            ) : (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">No top rated books found.</p>
                </div>
            )}
        </div>
    );
}
