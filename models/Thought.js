
const {Schema, model} = require('mongoose')

const thoughtsschema = new Schema({
    thoughtText:{
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
        reactionsschema
    ]
        
    


},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
     id: false

}
)

thoughtsschema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtsschema);
module.exports = Thought;