
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingInputProps {
  initialRating?: number;
  onRatingChange: (rating: number) => void;
  className?: string;
  readOnly?: boolean;
}

export function RatingInput({ 
  initialRating = 0, 
  onRatingChange, 
  className,
  readOnly = false,
}: RatingInputProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (newRating: number) => {
    if (readOnly) return;
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div 
      className={cn("flex items-center", className)}
      onMouseLeave={() => setHoveredRating(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          className={cn(
            "p-1 focus:outline-none transition-colors", 
            readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
          )}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHoveredRating(star)}
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star 
            className={cn(
              "h-6 w-6 transition-colors",
              (hoveredRating >= star || (!hoveredRating && rating >= star))
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}
