/**
 * Category Routes - Maps the category controller functions with proper endpoints.
 */

const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category-controller');

// Endpoint = GET '/api/categories'
categoryRouter.get('/', categoryController.getCategories);

// Endpoint = GET '/api/categories/catId'
categoryRouter.get('/:catId', categoryController.getCategoryById);

// Endpoint = GET '/api/categories/count/books'
categoryRouter.get('/count/books', categoryController.getCatBookCount);

module.exports = categoryRouter;