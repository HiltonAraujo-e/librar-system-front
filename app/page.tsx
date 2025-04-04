/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC, useEffect, useState } from 'react';
import { allBooks, bookImages, featuredBooks } from '@/mockData';
import { useGet } from '@/data/hooks';
import { API_ENDPOINTS } from '@/data/client/endpoints';

const LibraryHomePage: FC = () => {
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

    const { data } = useGet({
        endpoint: API_ENDPOINTS.GET_BOOKS
    })

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <section className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-semibold text-center mb-4">Livros em Destaque</h2>
            </section>

            <section className="container mx-auto px-4 py-2 mb-8">
                <h2 className="text-3xl font-semibold text-center mb-2">Todos os Livros</h2>

            </section>
        </div>
    );
};

export default LibraryHomePage;