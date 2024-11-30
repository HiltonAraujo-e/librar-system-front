/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { BookOpen, ChevronLeft, Star, StarHalf } from 'lucide-react';

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

const BooksCard = () => {
    const allBooks: Book[] = [
        {
            id: 1,
            title: "O Senhor dos Anéis",
            author: "J.R.R. Tolkien",
            image: "/images/book1.jpg",
            description: "Uma épica jornada de fantasia que segue Frodo Bolseiro em sua missão de destruir o Um Anel e salvar a Terra-Média da escuridão de Sauron.",
            genre: "Fantasia",
            publishYear: 1954,
            pageCount: 1178,
            rating: 4.8
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
            description: "Um clássico distópico que explora um mundo de vigilância totalitária, controle social e manipulação da verdade.",
            genre: "Ficção Distópica",
            publishYear: 1949,
            pageCount: 328,
            rating: 4.6
        },
        {
            id: 3,
            title: "Harry Potter",
            author: "J.K. Rowling",
            image: "https://covers.openlibrary.org/b/id/7945321-L.jpg",
            description: "A primeira aventura do jovem bruxo Harry Potter, revelando um mundo mágico cheio de mistérios e desafios.",
            genre: "Fantasia",
            publishYear: 1997,
            pageCount: 309,
            rating: 4.7
        },
        {
            id: 4,
            title: "A Revolução dos Bichos",
            author: "George Orwell",
            image: "https://m.media-amazon.com/images/I/71RMpuBrIKL._AC_UF1000,1000_QL80_.jpg",
            description: "Uma alegoria política que retrata uma revolução de animais contra seus donos, simbolizando os perigos do totalitarismo.",
            genre: "Sátira Política",
            publishYear: 1945,
            pageCount: 112,
            rating: 4.5
        },
        {
            id: 5,
            title: "Admirável Mundo Novo",
            author: "Aldous Huxley",
            image: "https://m.media-amazon.com/images/I/81GlIUPw5NL._AC_UF1000,1000_QL80_.jpg",
            description: "Uma distopia futurista que explora um mundo de controle social através da tecnologia e condicionamento.",
            genre: "Ficção Distópica",
            publishYear: 1932,
            pageCount: 288,
            rating: 2.64
        }
    ];

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleBookDetails = (book: Book) => {
        setSelectedBook(book);
    };

    const handleCloseBookDetails = () => {
        setSelectedBook(null);
    };

    const getRecommendedBooks = (book: Book) => {
        return allBooks.filter(b =>
            b.genre === book.genre && b.id !== book.id
        );
    };

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

    if (selectedBook) {
        const recommendedBooks = getRecommendedBooks(selectedBook);

        return (
            <div className="container mx-auto px-4 py-12">
                <button
                    onClick={handleCloseBookDetails}
                    className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ChevronLeft className="mr-2" /> Voltar para Lista de Livros
                </button>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex justify-center">
                        <img
                            src={selectedBook.image}
                            alt={selectedBook.title}
                            className="max-w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4">{selectedBook.title}</h1>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center text-gray-700">
                                <BookOpen className="mr-2 text-indigo-600" />
                                <span>{selectedBook.author}</span>
                            </div>
                            <div className="flex items-center">
                                {renderStars(selectedBook.rating)}
                                <span className="ml-2 text-gray-600">
                                    {selectedBook.rating} / 5
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                            <div>
                                <p className="font-semibold">Gênero</p>
                                <p className="text-gray-600">{selectedBook.genre}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Ano</p>
                                <p className="text-gray-600">{selectedBook.publishYear}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Páginas</p>
                                <p className="text-gray-600">{selectedBook.pageCount}</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">{selectedBook.description}</p>

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

                {/* Recommended Books Section */}
                {recommendedBooks.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold mb-8 text-center">
                            Livros Semelhantes em {selectedBook.genre}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recommendedBooks.map((book) => (
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
                                        {selectedBook.genre || "Gênero não especificado"}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2 truncate">{book.title}</h3>
                                        <p className="text-gray-600 mb-2 truncate">{book.author}</p>
                                        <div className="flex items-center mb-2">
                                            {renderStars(book.rating)}
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

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {allBooks.map((book) => (
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
                            <button className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
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
