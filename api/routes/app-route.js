const bookRouter = require('./book-route');
const categoryRouter = require('./category-route');
const ratingRouter = require('./rating-route');

const router = require('express').Router();

router.use('/api/books', bookRouter);
router.use('/api/categories', categoryRouter);
router.use('/api/ratings', ratingRouter);

module.exports = router;