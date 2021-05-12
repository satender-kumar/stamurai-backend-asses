const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        isDone: { type: Boolean, default: false },
        creator: { type: Schema.Types.ObjectId, ref:'user' },
        approvedBy: {type: Schema.Types.ObjectId, ref: 'user'}
    },
    { timestamps: true }
);

module.exports = model('task', TaskSchema);
