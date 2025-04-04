"use client"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBookById, getBooksByCategory, rateBook } from "@/app/services/bookService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Heart,
    Share2,
    Calendar,
    BookOpen,
    BookMarked,
    Clock,
    ChevronLeft
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import Link from "next/link";

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    //   const { isAuthenticated } = useAuth();
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const { data: book, isLoading, refetch } = useQuery({
        queryKey: ["book", id],
        queryFn: () => getBookById(id || ""),
        enabled: !!id,
    });

    const { data: relatedBooks = [] } = useQuery({
        queryKey: ["relatedBooks", book?.genres[0]],
        queryFn: () => getBooksByCategory(book?.genres[0] || ""),
        enabled: !!book,
    });

    const handleRateBook = async (rating: number) => {

    };

    if (isLoading) {
        return (
            <div className="container py-12 flex justify-center">
                <div className="animate-pulse flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                    <div className="w-full md:w-1/3">
                        <div className="bg-muted aspect-[2/3] rounded-lg"></div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <div className="h-8 bg-muted rounded mb-4"></div>
                        <div className="h-4 bg-muted rounded mb-2 w-1/3"></div>
                        <div className="h-4 bg-muted rounded mb-6 w-1/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-full"></div>
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-medium mb-4">Book not found</h1>
                <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist or has been removed.</p>
                <Button asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        );
    }

    // Filter out the current book from related books
    const filteredRelatedBooks = relatedBooks.filter(
        (relatedBook) => relatedBook.id !== book.id
    ).slice(0, 8);

    return (
        <div className="container">
            {/* Back navigation */}
            <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Home</span>
            </Link>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Book cover and action buttons */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <div>
                        <img
                            src={book.coverUrl}
                            alt={`${book.title} cover`}
                            className="book-cover rounded-lg shadow-md mx-auto md:mx-0"
                            style={{ maxWidth: "300px" }}
                        />
                    </div>

                    <div className="mt-6 space-y-4">
                        <Button className="w-full">
                            {book.isAvailable ? "Borrow Now" : "Reserve Book"}
                        </Button>

                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1">
                                <Heart className="h-4 w-4 mr-2" />
                                Favorite
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Book details */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                    <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>

                    <Link
                        href={`/author/${book.authorId}`}
                        className="text-lg md:text-xl text-muted-foreground hover:text-primary mt-1 inline-block"
                    >
                        by {book.author}
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center mt-4 gap-4">
                        <div className="flex items-center">
                            {/* <StarRating rating={book.rating} className="mr-2" /> */}
                            <span className="text-sm text-muted-foreground">({book.ratingCount} ratings)</span>
                        </div>

                        {/* User rating section */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Your rating:</span>
                            {/* <RatingInput 
                initialRating={userRating}
                onRatingChange={handleRateBook}
              /> */}
                        </div>
                    </div>

                    {/* Availability badge */}
                    <div className="mt-4">
                        {book.isAvailable ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-800">
                                <BookOpen className="h-3 w-3 mr-1" />
                                Available
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-800 border-red-200 dark:border-red-700">
                                <Clock className="h-3 w-3 mr-1" />
                                Currently Unavailable
                            </Badge>
                        )}
                    </div>

                    {/* Genres/categories */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {book.genres.map((genre) => (
                            <Link key={genre} href={`/categories/${genre}`}>
                                <Badge variant="secondary" className="hover:bg-secondary/80">
                                    {genre}
                                </Badge>
                            </Link>
                        ))}
                    </div>

                    <Separator className="my-6" />

                    {/* Book details and metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-medium mb-4">Book Details</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-muted-foreground">Publisher:</span>
                                    <span>{book.publisher}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-muted-foreground">Published Date:</span>
                                    <span>{new Date(book.publishedDate).toLocaleDateString()}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-muted-foreground">Pages:</span>
                                    <span>{book.pageCount}</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-medium mb-4">Borrowing Options</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    <span>eBook available for instant reading</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <BookMarked className="h-4 w-4 text-primary" />
                                    <span>Physical copy at your local library</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>Typical loan period: 14 days</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Book description */}
                    <div>
                        <h3 className="font-medium mb-4">About this book</h3>
                        <p className="text-base leading-relaxed">{book.description}</p>
                    </div>

                    {/* Reviews section */}
                    {book.reviews && book.reviews.length > 0 && (
                        <div className="mt-8">
                            <h3 className="font-medium mb-4">Reviews ({book.reviews.length})</h3>
                            <div className="space-y-4">
                                {book.reviews.map((review) => (
                                    <div key={review.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {review.userAvatar ? (
                                                    <img
                                                        src={review.userAvatar}
                                                        alt={review.userName}
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                                                        {review.userName.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="font-medium">{review.userName}</span>
                                            </div>
                                            <div className="flex items-center">
                                                {/* <StarRating rating={review.rating} size="small" /> */}
                                                <span className="text-xs text-muted-foreground ml-2">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related books */}
            {filteredRelatedBooks.length > 0 && (
                <div className="mt-12">
                    {/* <BookCarousel 
            books={filteredRelatedBooks} 
            title="Related Books" 
          /> */}
                </div>
            )}
        </div>
    );
};

export default BookDetails;