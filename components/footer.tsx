import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
            <p className="mb-4">&copy; 2024 Biblioteca - Todos os direitos reservados</p>
            <div className="flex justify-center space-x-6">
                <a href="#facebook" className="hover:text-indigo-300 transition">Facebook</a>
                <a href="#twitter" className="hover:text-indigo-300 transition">Twitter</a>
                <a href="#instagram" className="hover:text-indigo-300 transition">Instagram</a>
            </div>
        </div>
    </footer>
);

export default Footer;
