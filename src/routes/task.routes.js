const express = require('express');
const taskController = require('../controllers/task.controller');
const { routes } = require('../constants/index');
const { authenticateUser, authenticateAdmin } = require('../middleware/auth.middleware');

const taskRouter = express.Router({ mergeParams: true });

taskRouter.post(routes.task.CREATE_TASK, authenticateUser, taskController.createTask);
taskRouter.put(routes.task.EDIT_TASK, authenticateUser, taskController.editTask);
taskRouter.get(routes.task.VIEW_TASK, authenticateUser, authenticateAdmin, taskController.viewTask);
taskRouter.get(routes.task.SHOW_USER_TASKS, authenticateUser, taskController.showAllTasksToUser);
taskRouter.get(routes.task.SHOW_ALL_TASKS, authenticateUser, authenticateAdmin, taskController.showTasksToAdmin);
taskRouter.get(routes.task.SHOW_TASKS_REVIEWER, authenticateUser, taskController.showTasksToReviewer);
// taskRouter.get(routes.task.VIEW_USER_DETAILS, authenticateUser, authenticateAdmin, taskController.viewUserDetails);
taskRouter.put(routes.task.APPROVE_TASK, authenticateUser, taskController.approveTask);
taskRouter.put(routes.task.MARK_DONE, authenticateUser, taskController.markDone);

module.exports = taskRouter;
