const API_HOST = 'https://project-night-owl.herokuapp.com';
const API_PREFIX = API_HOST + '/api';
const BOOK_LIST = API_PREFIX + '/books/title-[bookTitle]/category-[categoryId]/author-[authorName]/sortBy-[columnName]-[sortOrder]';
const BOOK_DETAILS = API_PREFIX + '/books/details/[bookId]';
const AUTHOR_LIST = API_PREFIX + '/books/authors';
const CATEGORY_BY_ID = API_PREFIX + '/categories/[catId]';
const RATINGS_BY_ID = API_PREFIX + '/ratings/[bookId]';

export {
    BOOK_LIST,
    BOOK_DETAILS,
    AUTHOR_LIST,
    CATEGORY_BY_ID,
    RATINGS_BY_ID
}