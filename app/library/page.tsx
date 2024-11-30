/* eslint-disable @next/next/no-img-element */
"use client";
import FeaturedBooks from '@/components/featuredBooks';
import Footer from '@/components/footer';
import SearchSection from '@/components/searchSection';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BooksCard from '@/components/books';
import { allBooks, bookImages, featuredBooks } from '@/mockData';


const LibraryHomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [currentIndex, setCurrentIndex] = useState(0);

    const booksPerPage = 10;
    const totalPages = Math.ceil(allBooks.length / booksPerPage);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bookImages.length);
        }, 5000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SearchSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                bookImages={bookImages}
                currentIndex={currentIndex}
            />
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-semibold text-center mb-8">Livros em Destaque</h2>
                <FeaturedBooks featuredBooks={featuredBooks} />
            </section>

            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-semibold text-center mb-8">Todos os Livros</h2>

                <BooksCard />

                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition"
                    >
                        <ChevronLeft className="mr-2" /> Anterior
                    </button>
                    <span className="text-gray-700">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition"
                    >
                        Próxima <ChevronRight className="ml-2" />
                    </button>
                </div>
            </section>


            <Footer />
        </div>
    );
};

export default LibraryHomePage;