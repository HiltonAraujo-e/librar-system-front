"use client";

import BookDetail from '@/components/bookComp/bookDetails';
import { CommentSection } from '@/components/commentSection/commentSection';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { useGet } from '@/data/hooks';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface PageProps {
    params: { id: string };
}

const BookDetailPage: React.FC<PageProps> = ({ params }) => {
    const navigate = useRouter();
    const { id } = params;

    const { data } = useGet({
        endpoint: id ? API_ENDPOINTS.GET_BOOK_DETAILS(id) : "",
    });

    const bookDetail = data?.data;

    return (
        <div className="container mx-auto px-4 py-12">
            <button
                onClick={() => {
                    navigate.back();
                }}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
                <ChevronLeft className="mr-2" /> Voltar para Lista de Livros
            </button>

            {id && bookDetail ? (
                <>
                    <BookDetail bookDetail={bookDetail} />
                    <CommentSection bookComments={bookDetail.comments} />
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default BookDetailPage;
