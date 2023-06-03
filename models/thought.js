const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // get: (date) => timeSince(date)
        },
        username: {
            type: String,
            required: true,
            ref: 'user',
        },
        // reactions: {
        // Todo: "Array of nested documents created with the reactionSchema"
        // }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Todo: "Created a virtual called 'reactionCount' the retrieves the length of the thought's reactions array field on query"

const Thought = model('thought', thoughtSchema);

module.exports = Thought;