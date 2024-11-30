import React from 'react';
import { Search } from 'lucide-react';

interface SearchSectionProps {
    searchQuery: string;
    bookImages: string[];
    currentIndex: number;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, setSearchQuery, bookImages, currentIndex }) => {

    return (
        <section className="relative h-[500px] bg-cover bg-center flex items-center">
            <div
                className="absolute inset-0 bg-cover bg-center filter brightness-50"
                style={{
                    backgroundImage: `url(${bookImages[currentIndex]})`,
                    transition: 'background-image 1s ease-in-out',
                }}
            ></div>
            <div className="container mx-auto px-4 z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Descubra Seu Próximo Livro</h1>
                <form className="max-w-xl mx-auto flex">
                    <input
                        type="text"
                        placeholder="Busque por título, autor ou gênero"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SearchSection;

