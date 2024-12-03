import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center items-center mt-8 space-x-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition"
            >
                <ChevronLeft className="mr-2" /> Anterior
            </button>
            <span className="text-gray-700">
                Página {currentPage} de {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition"
            >
                Próxima <ChevronRight className="ml-2" />
            </button>
        </div>
    );
};
