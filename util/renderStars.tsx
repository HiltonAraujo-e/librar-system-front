import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export const renderStars = (rating?: number) => {
    if (typeof rating !== 'number' || rating < 0) return null;

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
        <div className="flex">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="text-yellow-500 fill-current" />
            ))}
            {halfStar && (
                <StarHalf key="half" className="text-yellow-500 fill-current" />
            )}
        </div>
    );
};
