const express = require('express');
const userController = require('../controllers/user.controller');
const { routes } = require('../constants/index');
const { authenticateUser, authenticateAdmin } = require('../middleware/auth.middleware');

const userRouter = express.Router({ mergeParams: true });

userRouter.post(routes.user.LOGIN, userController.userLogin);
userRouter.post(routes.user.CREATE_USER, authenticateUser, authenticateAdmin, userController.createUser);
userRouter.get(routes.user.SHOW_ALL_USERS, authenticateUser, authenticateAdmin, userController.getAllUsers);
userRouter.put(routes.user.ASSIGN_REVIEWER, authenticateUser, authenticateAdmin, userController.assignReviewer);
userRouter.put(routes.user.REMOVE_REVIEWER, authenticateUser, authenticateAdmin, userController.removeReviewer);

module.exports = userRouter;
