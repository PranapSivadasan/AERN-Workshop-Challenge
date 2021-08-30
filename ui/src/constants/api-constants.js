const API_HOST = 'https://project-night-owl.herokuapp.com';
// const API_HOST = 'http://localhost:8000';
const API_PREFIX = API_HOST + '/api';
const BOOK_LIST = API_PREFIX + '/books/title-[bookTitle]/category-[categoryId]/author-[authorName]/sortBy-[columnName]-[sortOrder]';
const BOOK_DETAILS = API_PREFIX + '/books/details/[bookId]';
const AUTHOR_LIST = API_PREFIX + '/books/authors';
const CATEGORY_BY_ID = API_PREFIX + '/categories/[catId]';
const CATEGORY = API_PREFIX + '/categories';
const RATINGS_BY_ID = API_PREFIX + '/ratings/[bookId]';
const REGISTER = API_PREFIX + '/users/register';
const LOGIN = API_PREFIX + '/users/login';
const BOOKS = API_PREFIX + '/books';
const USER_DETAILS = API_PREFIX + '/users/[user]';
const USER_COUNT = API_PREFIX + '/users/total/count';
const BOOK_COUNT_BY_CATEGORY = API_PREFIX + '/categories/count/books';

export {
    BOOK_LIST,
    BOOK_DETAILS,
    AUTHOR_LIST,
    CATEGORY_BY_ID,
    CATEGORY,
    RATINGS_BY_ID,
    REGISTER,
    LOGIN,
    BOOKS,
    USER_DETAILS,
    BOOK_COUNT_BY_CATEGORY,
    USER_COUNT
}