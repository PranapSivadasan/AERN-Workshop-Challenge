const bookRouter = require('express').Router();
const bookController = require('../controllers/book-controller');

// Endpoint = '/api/books/title-[bookTitle]/category-[categoryId]/author-[authorName]/sortBy-[columnName]-[sortOrder]'
bookRouter.get('/title-:title?/category-:catId?/author-:author?/sortBy-:column?-:order?', bookController.getAllBookDetailsWithFilters);

// // Endpoint = '/api/books/sortBy-[columnName]-[sortOrder]'
// bookRouter.get('/sortBy-:column?-:order?', bookController.getAllBookDetails);

// Endpoint = '/api/books/deatils/bookId'
bookRouter.get('/details/:bookId', bookController.getBookDetailsById);

// Endpoint = '/api/books/authors'
bookRouter.get('/authors', bookController.getAuthors);

module.exports = bookRouter;