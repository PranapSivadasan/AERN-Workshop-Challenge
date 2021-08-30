/**
 * User Routes - Maps the user controller functions with proper endpoints.
 */

const userRouter = require('express').Router();
const userController = require('../controllers/user-controller');

// Endpoint = GET '/api/users/[user]'
userRouter.get('/:user', userController.getUserDetails);

// Endpoint = GET '/api/users/register'
userRouter.post('/register', userController.createUser);

// Endpoint = GET '/api/users/login'
userRouter.post('/login', userController.verifyUser);

module.exports = userRouter;