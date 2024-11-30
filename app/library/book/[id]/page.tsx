"use client";
import { allBooks, Book } from '@/mockData';
import { BookOpen, ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';

interface pageProps {
    params: { id: string }
};

const BookDetail: React.FC<pageProps> = ({ params }) => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const { id } = params || {};
    console.log('ID:', id);


    const getRecommendedBooks = (book: Book) => {
        return allBooks.filter(b =>
            b.genre === book.genre && b.id !== book.id
        );
    };


    const recommendedBooks = getRecommendedBooks(selectedBook ? selectedBook : {} as Book);

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
                ★
            </span>
        ));
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <button
                onClick={() => { }}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
                <ChevronLeft className="mr-2" /> Voltar para Lista de Livros
            </button>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="flex justify-center">
                    <img
                        src={selectedBook?.image}
                        alt={selectedBook?.title}
                        className="max-w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{selectedBook?.title}</h1>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center text-gray-700">
                            <BookOpen className="mr-2 text-indigo-600" />
                            <span>{selectedBook?.author}</span>
                        </div>
                        <div className="flex items-center">
                            {renderStars(selectedBook?.rating)}
                            <span className="ml-2 text-gray-600">
                                {selectedBook?.rating} / 5
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                        <div>
                            <p className="font-semibold">Gênero</p>
                            <p className="text-gray-600">{selectedBook?.genre}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Ano</p>
                            <p className="text-gray-600">{selectedBook?.publishYear}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Páginas</p>
                            <p className="text-gray-600">{selectedBook?.pageCount}</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{selectedBook?.description}</p>

                    <div className="flex space-x-4">
                        <button className="flex-1 bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition">
                            Comprar Livro
                        </button>
                        <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-full hover:bg-indigo-50 transition">
                            Adicionar à Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {recommendedBooks.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold mb-8 text-center">
                        Livros Semelhantes em {selectedBook?.genre}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recommendedBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer"
                            >
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-sm px-2 py-1 rounded">
                                    {selectedBook?.genre || "Gênero não especificado"}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-2 truncate">{book.title}</h3>
                                    <p className="text-gray-600 mb-2 truncate">{book.author}</p>
                                    <div className="flex items-center mb-2">
                                        {renderStars(book?.rating)}
                                        <span className="ml-2 text-sm text-gray-500">
                                            {book.rating}
                                        </span>
                                    </div>
                                    <button className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookDetail;
