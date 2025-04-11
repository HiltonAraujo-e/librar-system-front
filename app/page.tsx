"use client"
import { useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookIcon, Sparkles, Trophy, TrendingUp, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Book } from "./types/book";
import {
    getBooks,
    getNewReleases,
    getTopRated,
    getBooksByCategory
} from "./services/bookService";
import Link from "next/link";
import { BookCarousel } from "@/components/books/BookCarousel";
import { FeaturedBanner } from "@/components/home/featuredBanner";

const Index = () => {
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("fiction");

    const { data: allBooks = [] } = useQuery({
        queryKey: ["books"],
        queryFn: getBooks
    });

    const { data: newReleases = [] } = useQuery({
        queryKey: ["newReleases"],
        queryFn: getNewReleases
    });

    const { data: topRatedBooks = [] } = useQuery({
        queryKey: ["topRated"],
        queryFn: getTopRated
    });

    const { data: categoryBooks = [] } = useQuery({
        queryKey: ["category", selectedCategory],
        queryFn: () => getBooksByCategory(selectedCategory)
    });

    useEffect(() => {
        if (allBooks.length > 0) {
            const featured = [...allBooks]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5);
            setFeaturedBooks(featured);
        }
    }, [allBooks]);

    const categories = [
        { id: "fiction", label: "Fiction", icon: BookIcon },
        { id: "non-fiction", label: "Non-Fiction", icon: BookCheck },
        { id: "mystery", label: "Mystery", icon: Sparkles },
        { id: "sci-fi", label: "Sci-Fi", icon: TrendingUp },
    ];

    const newReleasesTitle: ReactNode = (
        <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>New Releases</span>
        </div>
    );

    const topRatedTitle: ReactNode = (
        <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>Top Rated Books</span>
        </div>
    );

    return (
        <div className="space-y-6">
            {featuredBooks.length > 0 && (
                <FeaturedBanner books={featuredBooks} />
            )}

            <div className="space-y-6">
                <BookCarousel
                    books={newReleases}
                    title={newReleasesTitle}
                />

                <BookCarousel
                    books={topRatedBooks}
                    title={topRatedTitle}
                />

                <section>
                    <h2 className="section-heading mb-3">Browse by Category</h2>

                    <Tabs defaultValue="fiction" value={selectedCategory} onValueChange={setSelectedCategory}>
                        <TabsList className="mb-4">
                            {categories.map((category) => (
                                <TabsTrigger key={category.id} value={category.id}>
                                    <div className="flex items-center gap-2">
                                        <category.icon className="h-4 w-4" />
                                        <span>{category.label}</span>
                                    </div>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {categories.map((category) => (
                            <TabsContent key={category.id} value={category.id}>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                    {categoryBooks.map((book) => (
                                        <div key={book.id} className="book-card">
                                            <div className="relative">
                                                <Link href={`/library/book/${book.id}`}>
                                                    <img
                                                        src={book.coverUrl}
                                                        alt={`${book.title} cover`}
                                                        className="book-cover"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="p-2">
                                                <Link href={`/library/book/${book.id}`} className="hover:text-primary">
                                                    <h3 className="font-medium line-clamp-2 text-sm">{book.title}</h3>
                                                </Link>
                                                <Link href={`/author/${book.authorId}`} className="text-xs text-muted-foreground hover:text-primary">
                                                    {book.author}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <Button variant="outline" asChild size="sm">
                                        <Link href={`/categories/${category.id}`}>View All {category.label} Books</Link>
                                    </Button>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </section>
            </div>
        </div>
    );
};

export default Index;
