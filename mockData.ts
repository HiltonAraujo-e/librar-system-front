export interface Book {
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

export const bookImages = [
    'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    'https://covers.openlibrary.org/b/id/8225260-L.jpg',
    'https://covers.openlibrary.org/b/id/7598816-L.jpg',
    'https://covers.openlibrary.org/b/id/7945321-L.jpg',
];

export const featuredBooks = [
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

export const allBooks: Book[] = [
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