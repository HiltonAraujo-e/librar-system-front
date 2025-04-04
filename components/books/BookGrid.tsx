
import { Book } from "@/app/types/book";
import { BookCard } from "./BookCard";
import { ReactNode } from "react";

interface BookGridProps {
  books: Book[];
  title?: ReactNode;
  showAuthor?: boolean;
  cardSize?: "small" | "medium" | "large";
}

export function BookGrid({ books, title, showAuthor = true, cardSize = "medium" }: BookGridProps) {
  if (!books.length) {
    return (
      <div className="py-6 text-center">
        <p className="text-muted-foreground">No books found</p>
      </div>
    );
  }

  return (
    <section className="py-4">
      {title && <h2 className="section-heading mb-3">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
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
