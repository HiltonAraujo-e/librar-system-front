
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  className?: string;
  size?: "small" | "medium";
}

export function StarRating({ rating, className = "", size = "medium" }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const starClass = size === "small" ? "h-3 w-3" : "h-4 w-4";
  
  return (
    <div className={`flex ${className}`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className={`${starClass} fill-highlight text-highlight`} />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className={`${starClass} text-muted`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${starClass} fill-highlight text-highlight`} />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className={`${starClass} text-muted`} />
      ))}
    </div>
  );
}
