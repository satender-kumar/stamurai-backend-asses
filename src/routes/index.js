const express = require('express');
const taskRoutes = require('../routes/task.routes');
const userRoutes = require('../routes/user.routes');
const { routes } = require('../constants/index');

const router = express.Router({ mergeParams: true });

router.use(routes.USER, userRoutes);
router.use(routes.TASK, taskRoutes);

module.exports = router;
