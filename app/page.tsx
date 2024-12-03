/* eslint-disable @next/next/no-img-element */
"use client";
import FeaturedBooks from '@/components/featuredBooks';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SearchSection from '@/components/searchSection';
import React, { FC, useEffect, useState } from 'react';
import BooksCard from '@/components/books';
import { allBooks, bookImages, featuredBooks } from '@/mockData';
import { useGet } from '@/data/hooks';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { Pagination } from '@/components/pagination';

const LibraryHomePage: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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

        <BooksCard books={data?.data} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>


      <Footer />
    </div>
  );
};

export default LibraryHomePage;