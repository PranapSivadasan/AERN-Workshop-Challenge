const API_HOST = 'https://project-night-owl.herokuapp.com';
const API_PREFIX = API_HOST + '/api';
const BOOK_LIST = API_PREFIX + '/books/title-[bookTitle]/category-[categoryId]/author-[authorName]/sortBy-[columnName]-[sortOrder]';
const BOOK_DETAILS = API_PREFIX + '/books/deatils/[bookId]';
const AUTHOR_LIST = API_PREFIX + '/books/authors';

export {
    BOOK_LIST,
    BOOK_DETAILS,
    AUTHOR_LIST
}