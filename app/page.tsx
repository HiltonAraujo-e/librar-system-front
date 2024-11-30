/* eslint-disable @next/next/no-img-element */
"use client";
import FeaturedBooks from '@/components/featuredBooks';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SearchSection from '@/components/searchSection';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BooksCard from '@/components/books';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  genre?: string;
  publishYear?: number;
  pageCount?: number;
  rating?: number;
}

const LibraryHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
      description: "Uma épica jornada de fantasia que segue Frodo Bolseiro em sua missão de destruir o Um Anel e salvar a Terra-Média da escuridão de Sauron.",
      genre: "Fantasia",
      publishYear: 1954,
      pageCount: 1178,
      rating: 4.8
    },
    {
      id: 3,
      title: "Harry Potter",
      author: "J.K. Rowling",
      image: "https://covers.openlibrary.org/b/id/7945321-L.jpg",
      description: "A primeira aventura do jovem bruxo Harry Potter, revelando um mundo mágico cheio de mistérios e desafios.",
      genre: "Fantasia",
      publishYear: 1997,
      pageCount: 309,
      rating: 4.7
    },
    {
      id: 4,
      title: "A Revolução dos Bichos",
      author: "George Orwell",
      image: "https://m.media-amazon.com/images/I/71RMpuBrIKL._AC_UF1000,1000_QL80_.jpg",
      description: "Uma alegoria política que retrata uma revolução de animais contra seus donos, simbolizando os perigos do totalitarismo.",
      genre: "Sátira Política",
      publishYear: 1945,
      pageCount: 112,
      rating: 4.5
    },
    {
      id: 19,
      title: "Harry Potter",
      author: "J.K. Rowling",
      image: "https://covers.openlibrary.org/b/id/7945321-L.jpg",
      description: "A primeira aventura do jovem bruxo Harry Potter, revelando um mundo mágico cheio de mistérios e desafios.",
      genre: "Fantasia",
      publishYear: 1997,
      pageCount: 309,
      rating: 4.7
    },
    {
      id: 14,
      title: "A Revolução dos Bichos",
      author: "George Orwell",
      image: "https://m.media-amazon.com/images/I/71RMpuBrIKL._AC_UF1000,1000_QL80_.jpg",
      description: "Uma alegoria política que retrata uma revolução de animais contra seus donos, simbolizando os perigos do totalitarismo.",
      genre: "Sátira Política",
      publishYear: 1945,
      pageCount: 112,
      rating: 4.5
    },
    {
      id: 13,
      title: "Harry Potter",
      author: "J.K. Rowling",
      image: "https://covers.openlibrary.org/b/id/7945321-L.jpg",
      description: "A primeira aventura do jovem bruxo Harry Potter, revelando um mundo mágico cheio de mistérios e desafios.",
      genre: "Fantasia",
      publishYear: 1997,
      pageCount: 309,
      rating: 4.7
    },
    {
      id: 10,
      title: "A Revolução dos Bichos",
      author: "George Orwell",
      image: "https://m.media-amazon.com/images/I/71RMpuBrIKL._AC_UF1000,1000_QL80_.jpg",
      description: "Uma alegoria política que retrata uma revolução de animais contra seus donos, simbolizando os perigos do totalitarismo.",
      genre: "Sátira Política",
      publishYear: 1945,
      pageCount: 112,
      rating: 4.5
    }
  ];

  const allBooks: Book[] = [
    {
      id: 1,
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      image: "/images/book1.jpg",
      description: "Uma épica jornada de fantasia que segue Frodo Bolseiro em sua missão de destruir o Um Anel e salvar a Terra-Média da escuridão de Sauron.",
      genre: "Fantasia",
      publishYear: 1954,
      pageCount: 1178,
      rating: 4.8
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
      description: "Um clássico distópico que explora um mundo de vigilância totalitária, controle social e manipulação da verdade.",
      genre: "Ficção Distópica",
      publishYear: 1949,
      pageCount: 328,
      rating: 4.6
    },
    {
      id: 3,
      title: "Harry Potter",
      author: "J.K. Rowling",
      image: "https://covers.openlibrary.org/b/id/7945321-L.jpg",
      description: "A primeira aventura do jovem bruxo Harry Potter, revelando um mundo mágico cheio de mistérios e desafios.",
      genre: "Fantasia",
      publishYear: 1997,
      pageCount: 309,
      rating: 4.7
    },
    {
      id: 4,
      title: "A Revolução dos Bichos",
      author: "George Orwell",
      image: "https://m.media-amazon.com/images/I/71RMpuBrIKL._AC_UF1000,1000_QL80_.jpg",
      description: "Uma alegoria política que retrata uma revolução de animais contra seus donos, simbolizando os perigos do totalitarismo.",
      genre: "Sátira Política",
      publishYear: 1945,
      pageCount: 112,
      rating: 4.5
    },
    {
      id: 5,
      title: "Admirável Mundo Novo",
      author: "Aldous Huxley",
      image: "https://m.media-amazon.com/images/I/81GlIUPw5NL._AC_UF1000,1000_QL80_.jpg",
      description: "Uma distopia futurista que explora um mundo de controle social através da tecnologia e condicionamento.",
      genre: "Ficção Distópica",
      publishYear: 1932,
      pageCount: 288,
      rating: 2.64
    }
  ];

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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const handleBookDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseBookDetails = () => {
    setSelectedBook(null);
  };

  // if (selectedBook) {
  //   const relatedBooks = allBooks.filter(
  //     (book) => book.genre === selectedBook?.genre && book.id !== selectedBook.id
  //   );

  //   return (
  //     <div className="container mx-auto px-4 py-12">
  //       {/* Botão de Voltar */}
  //       <button
  //         onClick={handleCloseBookDetails}
  //         className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
  //       >
  //         <ChevronLeft className="mr-2" /> Voltar para Lista de Livros
  //       </button>

  //       {/* Detalhes do Livro */}
  //       <div className="grid md:grid-cols-2 gap-10">
  //         {/* Imagem do Livro */}
  //         <div className="flex justify-center">
  //           <img
  //             src={selectedBook.image}
  //             alt={selectedBook.title}
  //             className="max-w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg"
  //           />
  //         </div>

  //         {/* Informações do Livro */}
  //         <div>
  //           <h1 className="text-3xl font-bold mb-4">{selectedBook.title}</h1>

  //           <div className="space-y-4 mb-6">
  //             <div className="flex items-center text-gray-700">
  //               <BookOpen className="mr-2 text-indigo-600" />
  //               <span>{selectedBook.author}</span>
  //             </div>
  //           </div>

  //           <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
  //           <p className="text-gray-600 leading-relaxed mb-6">{selectedBook.description}</p>

  //           <div className="flex space-x-4">
  //             <button className="flex-1 bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition">
  //               Comprar Livro
  //             </button>
  //             <button className="flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-full hover:bg-indigo-50 transition">
  //               Adicionar à Wishlist
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Livros Relacionados */}
  //       {relatedBooks.length > 0 && (
  //         <div className="mt-12">
  //           <h2 className="text-2xl font-semibold mb-6">Livros Relacionados</h2>
  //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  //             {relatedBooks.map((book) => (
  //               <div
  //                 key={book.id}
  //                 className="bg-white rounded-lg shadow-md overflow-hidden"
  //               >
  //                 <img
  //                   src={book.image}
  //                   alt={book.title}
  //                   className="w-full h-[200px] object-cover"
  //                 />
  //                 <div className="p-4">
  //                   <h3 className="text-lg font-bold">{book.title}</h3>
  //                   <p className="text-gray-600">{book.author}</p>
  //                   <button
  //                     onClick={() => handleBookDetails(book)}
  //                     className="mt-4 text-indigo-600 hover:text-indigo-800"
  //                   >
  //                     Ver Detalhes
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }



  return (
    <div className="flex flex-col min-h-screen">
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

      {/* Listagem de Livros */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Todos os Livros</h2>

        <BooksCard />

        {/* Paginação */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition"
          >
            <ChevronLeft className="mr-2" /> Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition"
          >
            Próxima <ChevronRight className="ml-2" />
          </button>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default LibraryHomePage;