
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookGrid } from "@/components/books/BookGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search as SearchIcon,
    Filter,
    SlidersHorizontal,
    BookOpen,
    X
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "next/navigation";
import { searchBooks } from "@/app/services/bookService";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get("q") || "";
    const categoryParam = searchParams.get("category") || "";
    const availableOnlyParam = searchParams.get("available") === "true";
    const sortParam = searchParams.get("sort") || "relevance";

    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [category, setCategory] = useState(categoryParam);
    const [availableOnly, setAvailableOnly] = useState(availableOnlyParam);
    const [sortBy, setSortBy] = useState(sortParam);

    const isMobile = useIsMobile();

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (queryParam) params.set("q", queryParam);
        if (category) params.set("category", category);
        if (availableOnly) params.set("available", "true");
        if (sortBy !== "relevance") params.set("sort", sortBy);

        const url = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", url);
    }, [category, availableOnly, sortBy, queryParam]);

    const { data: searchResults = [], isLoading } = useQuery({
        queryKey: ["search", queryParam, category, availableOnly, sortBy],
        queryFn: () => searchBooks(queryParam),
        enabled: queryParam.length > 0,
    });

    // Apply client-side filters
    let filteredResults = [...searchResults];

    if (category) {
        filteredResults = filteredResults.filter(book =>
            book.genres.includes(category)
        );
    }

    if (availableOnly) {
        filteredResults = filteredResults.filter(book => book.isAvailable);
    }

    // Apply sorting
    if (sortBy === "rating") {
        filteredResults.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
        filteredResults.sort((a, b) =>
            new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.set("q", searchQuery);
        // setSearchParams(params);
    };

    const clearFilters = () => {
        setCategory("");
        setAvailableOnly(false);
        setSortBy("relevance");
    };

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">
                <div className="flex items-center gap-2">
                    <SearchIcon className="h-7 w-7 text-primary" />
                    <span>Search Books</span>
                </div>
            </h1>

            {/* Search form */}
            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by title, author, or ISBN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button type="submit">Search</Button>
                </div>
            </form>

            {/* Filters and results section */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters sidebar - desktop */}
                {!isMobile && (
                    <aside className="w-full lg:w-1/4 xl:w-1/5">
                        <div className="border rounded-lg p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-medium">Filters</h2>
                                {(category || availableOnly || sortBy !== "relevance") && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="h-8 text-xs"
                                    >
                                        <X className="h-3 w-3 mr-1" />
                                        Clear
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Category
                                    </label>
                                    {/* <CategoryFilter 
                    value={category} 
                    onChange={setCategory}
                  /> */}
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Sort By
                                    </label>
                                    <Select
                                        value={sortBy}
                                        onValueChange={setSortBy}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select order" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="relevance">Relevance</SelectItem>
                                            <SelectItem value="rating">Rating (High to Low)</SelectItem>
                                            <SelectItem value="newest">Newest First</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="available"
                                        checked={availableOnly}
                                        onCheckedChange={(checked: any) =>
                                            setAvailableOnly(checked as boolean)
                                        }
                                    />
                                    <label
                                        htmlFor="available"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Show available books only
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Mobile filters */}
                {isMobile && (
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Filters</span>
                        </div>

                        <div className="flex gap-2">
                            {(category || availableOnly || sortBy !== "relevance") && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="h-8"
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Clear
                                </Button>
                            )}

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8">
                                        <SlidersHorizontal className="h-4 w-4 mr-1" />
                                        Filter
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <Separator className="my-4" />
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Category
                                            </label>
                                            {/* <CategoryFilter 
                        value={category} 
                        onChange={setCategory}
                      /> */}
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">
                                                Sort By
                                            </label>
                                            <Select
                                                value={sortBy}
                                                onValueChange={setSortBy}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select order" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="relevance">Relevance</SelectItem>
                                                    <SelectItem value="rating">Rating (High to Low)</SelectItem>
                                                    <SelectItem value="newest">Newest First</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="available-mobile"
                                                checked={availableOnly}
                                                onCheckedChange={(checked: any) =>
                                                    setAvailableOnly(checked as boolean)
                                                }
                                            />
                                            <label
                                                htmlFor="available-mobile"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Show available books only
                                            </label>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                )}

                {/* Search results */}
                <div className="flex-1">
                    {queryParam ? (
                        <>
                            <h2 className="text-xl font-medium mb-6">
                                {isLoading ? (
                                    "Searching..."
                                ) : (
                                    `Found ${filteredResults.length} results for "${queryParam}"`
                                )}
                            </h2>

                            {isLoading ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="aspect-[2/3] bg-muted rounded-lg mb-3"></div>
                                            <div className="h-4 bg-muted rounded mb-2"></div>
                                            <div className="h-3 bg-muted rounded w-2/3"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredResults.length > 0 ? (
                                <BookGrid books={filteredResults} />
                            ) : (
                                <div className="text-center py-12 border rounded-lg">
                                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Try adjusting your search or filters to find what you're looking for.
                                    </p>
                                    <Button onClick={clearFilters}>Clear Filters</Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12 border rounded-lg">
                            <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">Start searching</h3>
                            <p className="text-muted-foreground mb-6">
                                Enter a search term to find books by title, author, or genre.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
