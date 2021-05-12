const TaskModel = require('../models/task.model');
const UserModel = require('../models/user.model');

module.exports.createTask = async (req, res) => {
    const { _id: userId } = req.currentUser
    const { title, description } = req.body;
    const newTaskObj = { title, description, creator: userId };
    try {
        const newTask = new TaskModel(newTaskObj);
        await newTask.save();
        return res.status(200).json({
            message: 'Task created successfully.',
            data: newTask
        });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while creating the task, please try again later.',
            error
        });
    }
};

module.exports.viewTask = async (req, res) => {
    const { taskId } = req.query;
    try {
        const task = await TaskModel.findOne({ _id: taskId });
        if (!task.length) {
            return res.status(200).json({
                message: 'Task fetched successfully.',
                data: task
            });
        } else {
            return res.status(400).json({
                message: 'Coudld not fetch task, please try agian later.'
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred, please try again later.'
        });
    }
};

module.exports.editTask = async (req, res) => {
    const { taskId } = req.query;
    const { newDescription } = req.body;
    try {
        const updatedTask = await TaskModel.findOneAndUpdate(
            {
                _id: taskId
            },
            {
                $set: {
                    description: newDescription
                }
            },
            {
                new: true
            }
        );
        if (updatedTask) {
            return res.status(200).json({
                message: 'Task updated successfully.',
                data: updatedTask
            });
        } else {
            return res.status(400).json({
                message: 'Could not update task, please try again later.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'An error occurred while updating the Task, please try again later.',
            error
        })
    }
};

module.exports.showAllTasksToUser = async (req, res) => {
    const { _id: userId } = req.currentUser;
    try {
        const allTasks = await TaskModel.find({ creator: userId });
        return res.status(200).json({
            message: 'All tasks fetched successfully.',
            data: allTasks
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'An error occurred, please try again.',
            error
        });
    }
};

module.exports.showTasksToAdmin = async (req, res) => {
    const { creatorId } = req.query;
    try {
        const allTasks = await TaskModel.find(
            { creator: creatorId },
            // { creator: 1 }
        ).populate(
            {
                path: 'creator',
                select: {
                    name: 1,
                    email: 1
                }
            }
        );
        return res.status(200).json({
            message: 'All tasks fetched successfully.',
            data: allTasks
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'An error occurred, please try again.',
            error
        });
    }
};

module.exports.showTasksToReviewer = async (req, res) => {
    const { _id, assignees } = req.currentUser;
    const { assigneeId } = req.query;
    try {
        if (assignees.includes(assigneeId)) {
            const allTasks = await TaskModel.find({ creator: assigneeId });
            return res.status(200).json({
                message: 'All tasks fetched successfully.',
                data: allTasks
            });
        } else {
            return res.status(400).json({
                message: 'You are not a reviewer for this user.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'An error occurred, please try again.',
            error
        });
    }
};


// module.exports.viewUserDetails = async (req, res) => {
//     const { taskId } = req.query;
//     try {
//         const taskDetails = await TaskModel.findById(taskId);
//         const taskCreator = taskDetails.creator;
//         const creatorDetails = await UserModel.findById(taskCreator);
//         if (!creatorDetails) {
//             return res.status(400).json({
//                 message: 'Task Creator does not exist.'
//             });
//         }
//         return res.status(200).json({
//             message: 'Task creator details fetched successfully.',
//             data: creatorDetails
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             message: 'An error occurred, please try again.',
//             error
//         });
//     }
// };

module.exports.approveTask = async (req, res) => {
    const { taskId } = req.query;
    const { _id } = req.currentUser;
    try {
        const updatedTaskDetails = await TaskModel.findOneAndUpdate(
            { _id: taskId },
            {
                $addToSet: { approvedBy: _id }
            },
            { new: true }
        );
        if (!updatedTaskDetails) {
            return res.status(400).json({
                message: 'Could not approve Task.'
            });
        }
        return res.status(200).json({
            message: 'Task approved scuccessfully.',
            data: updatedTaskDetails
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'An error occurred, please try again.',
            error
        });
    }
};

module.exports.markDone = async (req, res) => {
    const { taskId } = req.query;
    // const { _id } = req.currentUser;
    try {
        const taskDetails = await TaskModel.findById(taskId);
        const { creator, approvedBy } = taskDetails;
        const creatorDetails = await UserModel.findById(creator);
        const { reviewers } = creatorDetails;
        if (approvedBy.length === reviewers.length) {
            const markTaskDone = await TaskModel.findOneAndUpdate(
                { _id: taskId },
                { $set: { isDone: true } },
                { new: true }
            );
            return res.status(200).json({
                message: 'Task marked Done successfully.',
                data: markTaskDone
            });
        } else {
            return res.status(400).json({
                message: 'Task is not reviewed by all reviewers.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'An error occurred, please try again.',
            error
        });
    }
};
