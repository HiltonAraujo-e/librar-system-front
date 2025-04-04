import { Book } from "@/app/types/book";
import { BookCard } from "./BookCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, ReactNode } from "react";

interface BookCarouselProps {
  books: Book[];
  title: ReactNode;
  showAuthor?: boolean;
  cardSize?: "small" | "medium" | "large";
}

export function BookCarousel({
  books,
  title,
  showAuthor = true,
  cardSize = "medium"
}: BookCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollTo = direction === "left"
      ? scrollLeft - clientWidth
      : scrollLeft + clientWidth;

    carouselRef.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  if (!books.length) {
    return null;
  }

  return (
    <section className="py-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-heading">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="hidden sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="book-carousel no-scrollbar pl-1 pb-2"
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            showAuthor={showAuthor}
            size={cardSize}
          />
        ))}
      </div>
    </section>
  );
}
