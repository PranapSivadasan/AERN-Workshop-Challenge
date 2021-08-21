const bookRouter = require('./book-route');

const router = require('express').Router();

router.use('/api/books', bookRouter);

module.exports = router;