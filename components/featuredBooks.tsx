/* eslint-disable @next/next/no-img-element */
"use client";
import { Star, StarHalf } from 'lucide-react';
import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  genre?: string;
  publishYear?: number;
  pageCount?: number;
  rating?: number;
}

interface FeaturedBooksProps {
  featuredBooks: Book[];
}

const renderStars = (rating?: number) => {
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

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ featuredBooks }) => (
  <div className="container mx-auto px-4 py-12">
    <div className="flex overflow-x-auto gap-8 justify-start pb-4 scroll-smooth hover:scroll-auto">
      {featuredBooks.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer w-80 flex-shrink-0"
        >
          <img
            src={book.image}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-sm px-2 py-1 rounded">
            {book.genre || "Gênero não especificado"}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 truncate">{book.title}</h3>
            <p className="text-gray-600 mb-2 truncate">{book.author}</p>
            <div className="flex items-center mb-2">
              {renderStars(book.rating)}
              {book.rating !== undefined && (
                <span className="ml-2 text-sm text-gray-500">
                  ({book.rating.toFixed(1)})
                </span>
              )}
            </div>
            <div className='w-full flex justify-between gap-4'>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                Ver Detalhes
              </button>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedBooks;
