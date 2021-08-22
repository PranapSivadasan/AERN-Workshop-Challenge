const bookRouter = require('express').Router();
const bookController = require('../controllers/book-controller');

// Endpoint = '/api/books/title-[bookTitle]/sortBy-[columnName]-[sortOrder]'
bookRouter.get('/title-:title?/sortBy-:column?-:order?', bookController.getBookByTitle);

// Endpoint = '/api/books/sortBy-[columnName]-[sortOrder]'
bookRouter.get('/sortBy-:column?-:order?', bookController.getAllBookDetails);

// Endpoint = '/api/books/deatils/bookId'
bookRouter.get('/details/:bookId', bookController.getBookDetailsById);

module.exports = bookRouter;