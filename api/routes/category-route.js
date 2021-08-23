const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category-controller');

// Endpoint = '/api/categories'
categoryRouter.get('/', categoryController.getCategories);

module.exports = categoryRouter;