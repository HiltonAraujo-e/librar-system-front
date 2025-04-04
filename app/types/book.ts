
export interface Book {
    id: string;
    title: string;
    author: string;
    authorId: string;
    description: string;
    coverUrl: string;
    rating: number;
    ratingCount: number;
    pageCount: number;
    publishedDate: string;
    publisher: string;
    genres: string[];
    isFavorite: boolean;
    isAvailable: boolean;
    status?: "available" | "borrowed" | "reserved";
    dueDate?: string;
    isbn?: string;
    language?: string;
    popularity?: number;
    reviews?: Review[];
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
}

export interface BookList {
    id: string;
    name: string;
    description?: string;
    books: Book[];
    isPublic?: boolean;
}  