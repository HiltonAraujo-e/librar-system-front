import { Book } from "../types/book";

// Mock book data
const BOOKS: Book[] = [
    {
        id: "1",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        authorId: "auth1",
        description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
        ratingCount: 2543,
        pageCount: 336,
        publishedDate: "2019-02-05",
        publisher: "Celadon Books",
        genres: ["fiction", "thriller", "mystery"],
        isFavorite: true,
        isAvailable: true
    },
    {
        id: "2",
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        authorId: "auth2",
        description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand.",
        coverUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
        ratingCount: 3876,
        pageCount: 384,
        publishedDate: "2018-08-14",
        publisher: "G.P. Putnam's Sons",
        genres: ["fiction", "mystery", "romance"],
        isFavorite: false,
        isAvailable: true
    },
    {
        id: "3",
        title: "Atomic Habits",
        author: "James Clear",
        authorId: "auth3",
        description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        ratingCount: 5438,
        pageCount: 320,
        publishedDate: "2018-10-16",
        publisher: "Avery",
        genres: ["non-fiction", "self-help", "psychology"],
        isFavorite: true,
        isAvailable: true
    },
    {
        id: "4",
        title: "The Midnight Library",
        author: "Matt Haig",
        authorId: "auth4",
        description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
        coverUrl: "https://images.unsplash.com/photo-1551029506-0807df4e2031?q=80&w=800&auto=format&fit=crop",
        rating: 4.3,
        ratingCount: 1987,
        pageCount: 304,
        publishedDate: "2020-09-29",
        publisher: "Viking",
        genres: ["fiction", "fantasy", "sci-fi"],
        isFavorite: false,
        isAvailable: true
    },
    {
        id: "5",
        title: "Educated",
        author: "Tara Westover",
        authorId: "auth5",
        description: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent.",
        coverUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
        ratingCount: 3241,
        pageCount: 352,
        publishedDate: "2018-02-20",
        publisher: "Random House",
        genres: ["non-fiction", "biography", "memoir"],
        isFavorite: false,
        isAvailable: false
    },
    {
        id: "6",
        title: "The Dutch House",
        author: "Ann Patchett",
        authorId: "auth6",
        description: "At the end of the Second World War, Cyril Conroy combines luck and a single canny investment to begin an enormous real estate empire, propelling his family from poverty to enormous wealth. His first order of business is to buy the Dutch House, a lavish estate in the suburbs outside of Philadelphia.",
        coverUrl: "https://images.unsplash.com/photo-1580130946228-1a1cf65c8945?q=80&w=800&auto=format&fit=crop",
        rating: 4.1,
        ratingCount: 1432,
        pageCount: 352,
        publishedDate: "2019-09-24",
        publisher: "Harper",
        genres: ["fiction", "historical-fiction"],
        isFavorite: true,
        isAvailable: true
    },
    {
        id: "7",
        title: "The Vanishing Half",
        author: "Brit Bennett",
        authorId: "auth7",
        description: "The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities.",
        coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop",
        rating: 4.4,
        ratingCount: 2876,
        pageCount: 352,
        publishedDate: "2020-06-02",
        publisher: "Riverhead Books",
        genres: ["fiction", "historical-fiction"],
        isFavorite: false,
        isAvailable: true
    },
    {
        id: "8",
        title: "Becoming",
        author: "Michelle Obama",
        authorId: "auth8",
        description: "In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era. As First Lady of the United States of America—the first African American to serve in that role—she helped create the most welcoming and inclusive White House in history.",
        coverUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        ratingCount: 7654,
        pageCount: 448,
        publishedDate: "2018-11-13",
        publisher: "Crown",
        genres: ["non-fiction", "biography", "memoir"],
        isFavorite: true,
        isAvailable: false
    },
    {
        id: "9",
        title: "Project Hail Mary",
        author: "Andy Weir",
        authorId: "auth9",
        description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
        coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
        ratingCount: 3210,
        pageCount: 496,
        publishedDate: "2021-05-04",
        publisher: "Ballantine Books",
        genres: ["fiction", "sci-fi"],
        isFavorite: false,
        isAvailable: true
    },
    {
        id: "10",
        title: "The Four Winds",
        author: "Kristin Hannah",
        authorId: "auth10",
        description: "Texas, 1934. Millions are out of work and a drought has broken the Great Plains. Farmers are fighting to keep their land and their livelihoods as the crops are failing, the water is drying up, and dust threatens to bury them all. One of the darkest periods of the Great Depression, the Dust Bowl era, has arrived with a vengeance.",
        coverUrl: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
        ratingCount: 2564,
        pageCount: 464,
        publishedDate: "2021-02-02",
        publisher: "St. Martin's Press",
        genres: ["fiction", "historical-fiction"],
        isFavorite: false,
        isAvailable: true
    },
    {
        id: "11",
        title: "The Song of Achilles",
        author: "Madeline Miller",
        authorId: "auth11",
        description: "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. By all rights their paths should never cross, but Achilles takes the shamed prince as his friend, and as they grow into young men skilled in the arts of war and medicine, their bond blossoms into something deeper.",
        coverUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
        ratingCount: 3456,
        pageCount: 416,
        publishedDate: "2012-03-06",
        publisher: "Ecco",
        genres: ["fiction", "fantasy", "historical-fiction"],
        isFavorite: true,
        isAvailable: true
    },
    {
        id: "12",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        authorId: "auth12",
        description: "From her place in the store, Klara, an Artificial Friend with outstanding observational qualities, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside. She remains hopeful that a customer will soon choose her, but when the possibility emerges that her circumstances may change forever, Klara is warned not to invest too much in the promises of humans.",
        coverUrl: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?q=80&w=800&auto=format&fit=crop",
        rating: 4.2,
        ratingCount: 1876,
        pageCount: 320,
        publishedDate: "2021-03-02",
        publisher: "Knopf",
        genres: ["fiction", "sci-fi"],
        isFavorite: false,
        isAvailable: false
    }
];

export const getBooks = (): Promise<Book[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(BOOKS);
        }, 300);
    });
};

export const getBookById = (id: string): Promise<Book | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(BOOKS.find((book) => book.id === id));
        }, 300);
    });
};

export const getBooksByCategory = (category: string): Promise<Book[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(BOOKS.filter((book) => book.genres.includes(category)));
        }, 300);
    });
};

export const getNewReleases = (): Promise<Book[]> => {
    return new Promise((resolve) => {
        // Sort by published date (newest first) and take first 8
        const newReleases = [...BOOKS]
            .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
            .slice(0, 8);

        setTimeout(() => {
            resolve(newReleases);
        }, 300);
    });
};

export const getTopRated = (): Promise<Book[]> => {
    return new Promise((resolve) => {
        // Sort by rating and take first 8
        const topRated = [...BOOKS]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8);

        setTimeout(() => {
            resolve(topRated);
        }, 300);
    });
};

export const getUserFavorites = (): Promise<Book[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(BOOKS.filter((book) => book.isFavorite));
        }, 300);
    });
};

export const searchBooks = (query: string): Promise<Book[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const results = BOOKS.filter(
                (book) =>
                    book.title.toLowerCase().includes(query.toLowerCase()) ||
                    book.author.toLowerCase().includes(query.toLowerCase())
            );
            resolve(results);
        }, 300);
    });
};

// New function to handle book rating
export const rateBook = (bookId: string, rating: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const bookIndex = BOOKS.findIndex((book) => book.id === bookId);
            if (bookIndex !== -1) {
                // In a real application, this would send the rating to a server
                // For now, we'll just update the book's rating in our mock data
                const book = BOOKS[bookIndex];
                const newRatingCount = book.ratingCount + 1;
                // Calculate new average rating
                const totalRatingPoints = book.rating * book.ratingCount + rating;
                const newRating = totalRatingPoints / newRatingCount;

                // Update the book with new rating data
                BOOKS[bookIndex] = {
                    ...book,
                    rating: parseFloat(newRating.toFixed(1)),
                    ratingCount: newRatingCount
                };
            }
            resolve();
        }, 300);
    });
};