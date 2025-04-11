export const API_ENDPOINTS = {
    LOGIN: "/login",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
    allBooks: "/books",
    GET_BOOKS: "/book",
    GET_ONLINE_USER: "/me",

    // GET PARAMETERS
    GET_BOOK_DETAILS: (id: string) => `/book/${id}`,
}