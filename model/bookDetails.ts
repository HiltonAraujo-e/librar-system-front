export interface BookDetails {
    id: string;
    title: string;
    author: string;
    image: string;
    description: string;
    genre: string;
    publishYear: number;
    pageCount: number;
    rating: number;
    comments: Comment[]
}

export interface Comment {
    id: string,
    author: string,
    text: string,
    timestamp: string,
    replies: Replies[]
}

export interface Replies {
    id: string,
    author: string,
    text: string,
    timestamp: string
}