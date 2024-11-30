import React from 'react';
import { Book, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarLinksProps {
    isMobile: boolean;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ isMobile }) => {
    const navigate = useRouter();

    return (
        <div className={isMobile ? 'flex flex-col p-4 space-y-3' : 'hidden md:flex space-x-6'}>
            <a href="#catalog" className="hover:text-indigo-200 transition flex items-center">
                <Book className="mr-2 w-4 h-4" /> Catálogo
            </a>
            <a href="#about" className="hover:text-indigo-200 transition flex items-center">Sobre</a>
            <a href="#contact" className="hover:text-indigo-200 transition flex items-center">Contato</a>
            <button
                className="bg-white text-indigo-700 px-4 py-2 rounded-full hover:bg-gray-300 transition flex items-center"
                onClick={() => navigate.push('/auth')}
            >
                <User className="mr-2 w-4 h-4" /> Login
            </button>
        </div>
    );
};

export default NavbarLinks;
