/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { renderStars } from '@/util/renderStars';
import { Book } from '@/model/book';

interface Props {
    books: Book[];
}

const BooksCard: React.FC<Props> = ({ books }) => {
    const navigate = useRouter();

    const handleBookDetails = (book: Book) => {
        navigate.push(`/library/book/${book.id}`);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {books?.map((book: Book) => (
                    <div
                        key={book.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer"
                        onClick={() => handleBookDetails(book)}
                    >
                        <img
                            src={book.image}
                            alt={book.title}
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
                                <span className="ml-2 text-sm text-gray-500">
                                    ({book.rating})
                                </span>
                            </div>
                            <button onClick={() => handleBookDetails(book)} className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                                Ver Detalhes
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksCard;
