const ratingRouter = require('express').Router();
const ratingController = require('../controllers/rating-controller');

// Endpoint = '/api/ratings/[bookId]'
ratingRouter.get('/:bookId?', ratingController.getRatings);

module.exports = ratingRouter;