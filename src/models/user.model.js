const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        role: { type: String, default: 'user', enum: ['admin', 'user'] },
        reviewers: [{ type: String }],
        assignees: [{ type: String }]
    },
    {
        timestamps: true
    }
);

module.exports = model('user', UserSchema);
