
const {Schema, model,Types} = require('mongoose')

const reactionsschema = new Schema({
    reactionbody:{
        type: String,
        required: true,
        maxlength: 200,

    },
    reactionid:{
        type: Schema.Types.ObjectId,
        default: ()=>new Types.ObjectId(),
        
    },

    username: {
        type: String,
        required: true,
        
    },

    createAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
},
{
    toJSON: {
        virtuals: true
    },
     id: false

}
)


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

const thoughts = model("thoughts", thoughtsschema)
module.exports = thoughts