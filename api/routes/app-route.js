/**
 * App Routes - Base file to route the calls to appropriate files 
 */

const bookRouter = require('./book-route');
const categoryRouter = require('./category-route');
const ratingRouter = require('./rating-route');
const userRouter = require('./user-route');

const router = require('express').Router();

router.use('/api/books', bookRouter);
router.use('/api/categories', categoryRouter);
router.use('/api/ratings', ratingRouter);
router.use('/api/users', userRouter);

module.exports = router;