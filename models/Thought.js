
const { Schema, model } = require('mongoose')
const reactionSchema = require('./Reaction');

const thoughtschema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280,
    },
    createAt: {
        type: Date,
        default: Date.now,
        // get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: false,

    },

    reactions: [
        reactionSchema
    ]




},
    {
        toJSON: {

            getters: true
        },
        id: false

    }
)

thoughtschema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtschema);
module.exports = Thought;