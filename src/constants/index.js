module.exports.routes = {
    USER: '/user',
    user: {
        LOGIN: '/login',
        CREATE_USER: '/create-user',
        SHOW_ALL_USERS: '/show-all-users',
        ASSIGN_REVIEWER: '/assign-reviewer',
        REMOVE_REVIEWER: '/remove-reviewer',
    },
    TASK: '/task',
    task: {
        CREATE_TASK: '/create-task',
        EDIT_TASK: '/edit-task',
        VIEW_TASK: '/view-task',
        SHOW_USER_TASKS: '/user-tasks',
        SHOW_ALL_TASKS: '/all-tasks',
        SHOW_TASKS_REVIEWER: '/reviewer-tasks',
        // VIEW_USER_DETAILS: '/view-user-details',
        APPROVE_TASK: '/approve-task',
        MARK_DONE: '/mark-done',
    },
};
