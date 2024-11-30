"use client";
import React from 'react';
import { Book, Menu, X } from 'lucide-react';
import NavbarLinks from './navbar-links';

interface NavbarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <Book className="w-8 h-8" />
                    <span className="text-2xl font-bold">Biblioteca</span>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                <NavbarLinks isMobile={false} />
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-indigo-700 absolute w-full">
                    <NavbarLinks isMobile={true} />
                </div>
            )}
        </header>
    );
};

export default Navbar;
