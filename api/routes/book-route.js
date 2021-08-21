const bookRouter = require('express').Router();
const bookController = require('../controllers/book-controller');

// Endpoint = '/api/books/deatils'
bookRouter.get('/details', bookController.getAllBookDetails);

// Endpoint = '/api/books/deatils/:bookId'
bookRouter.get('/details/:bookId', bookController.getBookDetailsById);

module.exports = bookRouter;