const ratingRouter = require('express').Router();
const ratingController = require('../controllers/rating-controller');

// Endpoint = '/api/ratings'
ratingRouter.get('/', ratingController.getRatings);

// Endpoint = '/api/ratings/[bookId]'
ratingRouter.get('/:bookId', ratingController.getRatingsById);

// Endpoint = POST '/api/ratings'
ratingRouter.post('/', ratingController.postRating);

module.exports = ratingRouter;