"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookGrid } from "@/components/books/BookGrid";
import { getBooks } from "@/app/services/bookService";

export default function CategoriesPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setIsLoading(true);
                const allBooks = await getBooks();
                setBooks(allBooks);
            } catch (error) {
                console.error('Error loading books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, []);

    // Extract all unique genres from the books
    const allGenres = books.reduce((genres, book) => {
        book.genres.forEach((genre: any) => {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });
        return genres;
    }, [] as string[]).sort();

    // Filter books based on selected category and search term
    const filteredBooks = books.filter(book => {
        const matchesCategory = selectedCategory ? book.genres.includes(selectedCategory) : true;
        const matchesSearch = searchTerm.trim() === '' ? true :
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Count books in each category
    const categoryCounts = allGenres.reduce((counts: any, genre: any) => {
        counts[genre] = books.filter(book => book.genres.includes(genre)).length;
        return counts;
    }, {} as Record<string, number>);

    return (
        <div className="container py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Categories</h1>
                <p className="text-muted-foreground">
                    Browse our collection by genre. Select a category to see all books in that genre.
                </p>
            </header>

            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search within categories..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setSelectedCategory(null);
                        setSearchTerm("");
                    }}
                >
                    <Filter className="h-4 w-4" />
                    Reset Filters
                </Button>
            </div>

            {isLoading ? (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">Loading categories...</p>
                </div>
            ) : (
                <>
                    {/* Categories grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                        {allGenres.map((genre: any) => (
                            <Card
                                key={genre}
                                className={`cursor-pointer transition-all ${selectedCategory === genre ? 'ring-2 ring-primary' : ''}`}
                                onClick={() => setSelectedCategory(selectedCategory === genre ? null : genre)}
                            >
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg capitalize">{genre.replace('-', ' ')}</CardTitle>
                                    <CardDescription>{categoryCounts[genre]} books</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="h-16 flex items-center justify-center">
                                        <BookOpen className="h-12 w-12 text-muted-foreground opacity-20" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Badge variant={selectedCategory === genre ? "default" : "outline"} className="w-full justify-center">
                                        {selectedCategory === genre ? 'Selected' : 'Select Category'}
                                    </Badge>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Display books for selected category */}
                    {selectedCategory && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 capitalize">{selectedCategory.replace('-', ' ')} Books</h2>
                            <BookGrid
                                books={filteredBooks}
                                showAuthor={true}
                            />
                        </div>
                    )}

                    {/* If no category is selected but there's a search term */}
                    {!selectedCategory && searchTerm.trim() !== '' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                            {filteredBooks.length > 0 ? (
                                <BookGrid
                                    books={filteredBooks}
                                    showAuthor={true}
                                />
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-muted-foreground">No books found matching your search.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* If no category is selected and no search term */}
                    {!selectedCategory && searchTerm.trim() === '' && (
                        <div className="py-12 text-center bg-muted/50 rounded-lg">
                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Select a Category</h2>
                            <p className="text-muted-foreground">
                                Choose a category from above to browse books in that genre.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
