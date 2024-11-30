/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import { Book, Search, User, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LibraryHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useRouter();

  const bookImages = [
    'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    'https://covers.openlibrary.org/b/id/8225260-L.jpg',
    'https://covers.openlibrary.org/b/id/7598816-L.jpg',
    'https://covers.openlibrary.org/b/id/7945321-L.jpg',
  ];

  const featuredBooks = [
    {
      id: 1,
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      image: "/images/book1.jpg",
      description: "Uma épica jornada de fantasia"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
      description: "Um clássico distópico sobre controle social"
    },
    {
      id: 3,
      title: "Harry Potter",
      author: "J.K. Rowling",
      image: "https://covers.openlibrary.org/b/id/7945321-L.jpg",
      description: "A magia da juventude e amizade"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bookImages.length);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Responsive Navigation */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8" />
            <span className="text-2xl font-bold">Biblioteca</span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#catalog" className="hover:text-indigo-200 transition flex items-center">
              <Book className="mr-2 w-4 h-4" /> Catálogo
            </a>
            <a href="#about" className="hover:text-indigo-200 transition flex items-center">
              Sobre
            </a>
            <a href="#contact" className="hover:text-indigo-200 transition flex items-center">
              Contato
            </a>
            <button className="bg-white text-indigo-700 px-4 py-2 rounded-full hover:bg-gray-300 transition flex items-center"
              onClick={() => navigate.push('/auth/login')}
            >
              <User className="mr-2 w-4 h-4" /> Login
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-700 absolute w-full">
            <nav className="flex flex-col p-4 space-y-3">
              <a href="#catalog" className="py-2 border-b border-indigo-600">Catálogo</a>
              <a href="#about" className="py-2 border-b border-indigo-600">Sobre</a>
              <a href="#contact" className="py-2 border-b border-indigo-600">Contato</a>
              <button className="bg-white text-indigo-700 px-4 py-2 rounded-full text-center hover:bg-gray-300 transition flex items-center"
                onClick={() => navigate.push('/auth/login')}
              >
                <User className="mr-2 w-4 h-4" /> Login
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section with Search */}
      <section className="relative h-[500px] bg-cover bg-center flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50"
          style={{
            backgroundImage: `url(${bookImages[currentIndex]})`,
            transition: 'background-image 1s ease-in-out',
          }}
        ></div>

        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Descubra Seu Próximo Livro
          </h1>

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

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Livros em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.author}</p>
                <p className="text-sm text-gray-500">{book.description}</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
                  Detalhes do Livro
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default LibraryHomePage;