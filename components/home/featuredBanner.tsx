"use client"
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "../types/book";
import Link from "next/link";
import { StarRating } from "@/components/books/StarRating";

interface FeaturedBannerProps {
    books: Book[];
}

export function FeaturedBanner({ books }: FeaturedBannerProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const currentBook = books[activeIndex];
    const timerRef = useRef<number | null>(null);

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % books.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
    };

    // Start/reset auto-rotation timer
    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = window.setInterval(() => {
            nextSlide();
        }, 6000);
    };

    // Start timer on component mount
    useState(() => {
        startTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    });

    if (!books.length) return null;

    return (
        <div className="relative overflow-hidden rounded-lg">
            {/* Featured book details */}
            <div className="relative bg-gradient-to-r from-primary/10 to-background">
                <div className="container py-8 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    {/* Book cover */}
                    <div className="shrink-0 w-40 md:w-64">
                        <img
                            src={currentBook.coverUrl}
                            alt={`${currentBook.title} cover`}
                            className="book-cover rounded-md shadow-lg"
                        />
                    </div>

                    {/* Book details */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="font-heading font-bold text-2xl md:text-4xl mb-2">{currentBook.title}</h1>
                        <Link href={`/author/${currentBook.authorId}`} className="text-lg md:text-xl text-muted-foreground hover:text-primary">
                            {currentBook.author}
                        </Link>

                        <div className="flex items-center my-4 justify-center md:justify-start">
                            <StarRating rating={currentBook.rating} className="mr-2" />
                            <span className="text-sm text-muted-foreground">({currentBook.ratingCount} ratings)</span>
                        </div>

                        <p className="mb-6 max-w-2xl line-clamp-3 md:line-clamp-4">{currentBook.description}</p>

                        <div className="flex gap-4 justify-center md:justify-start">
                            <Button asChild>
                                <Link href={`/book/${currentBook.id}`}>Read Now</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href={`/book/${currentBook.id}`}>Details</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel controls */}
            <div className="absolute inset-y-0 left-4 flex items-center">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full bg-background/50 hover:bg-background/80"
                    onClick={prevSlide}
                >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous</span>
                </Button>
            </div>

            <div className="absolute inset-y-0 right-4 flex items-center">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full bg-background/50 hover:bg-background/80"
                    onClick={nextSlide}
                >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next</span>
                </Button>
            </div>

            {/* Carousel indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {books.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all ${index === activeIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/50"
                            }`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <span className="sr-only">Go to slide {index + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}