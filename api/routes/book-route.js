/**
 * Book Routes - Maps the book controller functions with proper endpoints.
 */

const bookRouter = require('express').Router();
const bookController = require('../controllers/book-controller');

// Endpoint = GET '/api/books/title-[bookTitle]/category-[categoryId]/author-[authorName]/sortBy-[columnName]-[sortOrder]'
bookRouter.get('/title-:title?/category-:catId?/author-:author?/sortBy-:column?-:order?', bookController.getAllBookDetailsWithFilters);

// Endpoint = GET '/api/books/deatils/bookId'
bookRouter.get('/details/:bookId', bookController.getBookDetailsById);

// Endpoint = GET '/api/books/authors'
bookRouter.get('/authors', bookController.getAuthors);

// Endpoint = POST '/api/books/
bookRouter.post('/', bookController.createBook);

// Endpoint = PUT '/api/books/
bookRouter.put('/', bookController.updateBook);

// Endpoint = DELETE '/api/books/:bookId
bookRouter.delete('/:bookId', bookController.deleteBook);

module.exports = bookRouter;