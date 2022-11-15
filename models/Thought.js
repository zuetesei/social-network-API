const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        require: true
    },
    reactions: // Array of nested documents created with the reactionSchema
        [ReactionSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of reaction
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the thought model using the ThoughtSchema 
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 