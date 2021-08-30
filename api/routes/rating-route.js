/**
 * Rating Routes - Maps the rating controller functions with proper endpoints.
 */

const ratingRouter = require('express').Router();
const ratingController = require('../controllers/rating-controller');

// Endpoint = GET '/api/ratings'
ratingRouter.get('/', ratingController.getRatings);

// Endpoint = GET '/api/ratings/[bookId]'
ratingRouter.get('/:bookId', ratingController.getRatingsById);

// Endpoint = POST '/api/ratings'
ratingRouter.post('/', ratingController.postRating);

module.exports = ratingRouter;