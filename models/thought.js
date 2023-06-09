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
        reactions: {
        type: Schema.Types.Array,
        ref: 'reaction'
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;