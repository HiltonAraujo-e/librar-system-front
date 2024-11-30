import React, { useState } from 'react';
import { Book, Users, BarChart2, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div
                className={`
                    ${isMobileMenuOpen ? 'block' : 'hidden'} md:block
                    w-64 bg-white shadow-lg fixed md:relative z-40 h-full
                `}
            >
                <div className="p-6 border-b flex items-center justify-center">
                    <Book className="w-8 h-8 text-indigo-600 mr-2" />
                    <h1 className="text-2xl font-bold">Biblioteca</h1>
                </div>
                <nav className="p-4">
                    <div className="space-y-4">
                        <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                            <BarChart2 className="w-6 h-6" />
                            <span>Dashboard</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                            <Book className="w-6 h-6" />
                            <span>Livros</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                            <Users className="w-6 h-6" />
                            <span>Usuários</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                            <Settings className="w-6 h-6" />
                            <span>Configurações</span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
