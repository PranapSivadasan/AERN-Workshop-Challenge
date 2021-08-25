const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category-controller');

// Endpoint = '/api/categories'
categoryRouter.get('/', categoryController.getCategories);

// Endpoint = '/api/categories/catId'
categoryRouter.get('/:catId', categoryController.getCategoryById);

module.exports = categoryRouter;