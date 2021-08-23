const bookRouter = require('./book-route');
const categoryRouter = require('./category-route');

const router = require('express').Router();

router.use('/api/books', bookRouter);
router.use('/api/categories', categoryRouter);

module.exports = router;