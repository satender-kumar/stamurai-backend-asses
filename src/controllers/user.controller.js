const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.createUser = async (req, res) => {
    const { name, email, role } = req.body;
    let newUserObj = { name, email, role };
    try {
        const newUser = new UserModel(newUserObj);
        await newUser.save();
        return res.status(200).json({
            message: 'User created successfully.',
            data: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Some error occurred while creating user, please try again later.',
            error
        });
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json({
            message: 'All users fetched successfully.',
            data: users
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Some error occurred fetching the users, please try again later.',
            error
        });
    }
};

module.exports.assignReviewer = async (req, res) => {
    const { userId } = req.query;
    const { reviewerId } = req.body
    try {
        const updateReviewer = await UserModel.findOneAndUpdate(
            {
                _id: reviewerId
            },
            {
                $addToSet: {
                    assignees: userId
                }
            },
            {
                new: true
            }
        );
        if (updateReviewer) {
            const addReviewer = await UserModel.findOneAndUpdate(
                {
                    _id: userId
                },
                {
                    $addToSet: {
                        reviewers: reviewerId
                    }
                },
                {
                    new: true
                }
            );
            if (addReviewer) {
                return res.status(200).json({
                    message: 'Reviewer added successfully for the User.',
                    data: addReviewer
                });
            } else {
                return res.status(400).json({
                    message: 'Could not add Reviewer for the user, please try again later.'
                });
            }
        } else {
            return res.status(400).json({
                message: 'Could not add Reviewer for the user, please try again later.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred, please try again later.',
            error
        });
    }
};

module.exports.removeReviewer = async (req, res) => {
    const { _id: userId } = req.query;
    const { reviewerId } = req.body;
    try {
        const updateReviewers = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { reviewers: reviewerId } },
            { new: true }
        );
        if (updateReviewers) {
            const updateAssignees = await UserModel.findOneAndUpdate(
                { _id: reviewerId },
                { $pull: { assignees: userId } },
                { new: true }
            );
            if (!updateAssignees) {
                return res.status(400).json({
                    message: 'Assignee could not be removed.'
                });
            }
            return res.status(200).json({
                message: 'Reviewer removed successfully.',
                data: updateReviewers
            });
        } else {
            return res.status(400).json({
                message: 'Reviewer could not be removed.'
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'An error occurred, please try again later.',
            error
        });
    }
};

module.exports.userLogin = async (req, res) => {
    const { email } = req.body;
    try {
        const loginUser = await UserModel.findOne(
            {
                email
            }
        );
        if (loginUser) {
            const { email, _id, role } = loginUser
            let token = jwt.sign({ email, _id, role }, 'secret');
            return res.status(200).json({
                message: 'Logged in successfully.',
                data: loginUser,
                token
            });
        } else {
            return res.status(400).json({
                message: 'User does not exist.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Error logging in, try again later.',
            error
        });
    }
};
