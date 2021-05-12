const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.authenticateUser = async (req, res, next) => {
    const token = req.get('authorization');
    const decode = jwt.verify(token, 'secret');
    const { email, _id } = decode;
    try {
        const user = await UserModel.findOne(
            {
                _id, email
            }
        );
        if (user) {
            req.currentUser = user;
            next();
        } else {
            return res.status(401).json({
                message: 'User not found.'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Something went wrong, try again later.',
            error
        });
    }
};

module.exports.authenticateAdmin = async (req, res, next) => {
    const { role } = req.currentUser;
    if(role !== "admin"){
        return res.status(403).json({
            message: 'You are not allowed to perform this action.'
        });
    }
    next();
};
