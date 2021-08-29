const userRouter = require('express').Router();
const userController = require('../controllers/user-controller');

userRouter.get('/:user', userController.getUserDetails);

userRouter.post('/register', userController.createUser);

userRouter.post('/login', userController.verifyUser);

module.exports = userRouter;