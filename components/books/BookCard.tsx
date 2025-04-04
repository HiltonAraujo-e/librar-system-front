import { Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/app/types/book";
import Link from "next/link";

interface BookCardProps {
  book: Book;
  showAuthor?: boolean;
  size?: "small" | "medium" | "large";
}

export function BookCard({ book, showAuthor = true, size = "medium" }: BookCardProps) {
  // const { isAuthenticated } = useAuth();
  const sizeClasses = {
    small: "w-32",
    medium: "w-40",
    large: "w-56",
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

  };

  const handleBorrow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

  };

  return (
    <div className={`book-card ${sizeClasses[size]} snap-start`}>
      <div className="relative">
        <Link href={`/book/${book.id}`}>
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            className="book-cover"
          />

          {/* Status badge */}
          {book.status && (
            <Badge
              className={`absolute bottom-2 left-2 ${book.status === "available" ? "bg-green-500" :
                  book.status === "borrowed" ? "bg-orange-500" :
                    "bg-red-500"
                }`}
            >
              {book.status}
            </Badge>
          )}
        </Link>

        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 rounded-full h-8 w-8"
          onClick={handleToggleFavorite}
        >
          <Heart className={`h-4 w-4 ${book.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>

      <div className="p-3">
        <Link href={`/book/${book.id}`} className="hover:text-primary">
          <h3 className={`font-medium line-clamp-2 ${size === "small" ? "text-sm" : ""}`}>
            {book.title}
          </h3>
        </Link>

        {showAuthor && (
          <Link href={`/author/${book.authorId}`} className="text-sm text-muted-foreground hover:text-primary">
            {book.author}
          </Link>
        )}

        <div className="mt-2 flex items-center">
          <StarRating rating={book.rating} className="mr-2" />
          <span className="text-xs text-muted-foreground">({book.ratingCount})</span>
        </div>

        {book.dueDate && (
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Due: {book.dueDate}</span>
          </div>
        )}

        <div className="mt-3">
          <Button
            variant={book.isAvailable ? "default" : "outline"}
            size="sm"
            className="w-full"
            disabled={!book.isAvailable}
            onClick={handleBorrow}
          >
            {book.isAvailable ? "Borrow" : "Reserve"}
          </Button>
        </div>
      </div>
    </div>
  );
}
