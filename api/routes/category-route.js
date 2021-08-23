const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category-controller');

categoryRouter.get('/', categoryController.getCategories);

module.exports = categoryRouter;