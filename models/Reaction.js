const {Schema, Types} = require('mongoose')
const moment = require('moment')

const reactionsschema = new Schema({
    reactionid:{
        type: Schema.Types.ObjectId,
        default: ()=>new Types.ObjectId()
        
    },
      reactionBody:{
       type: String,
        required: true,
        maxlength: 200,

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
        getters: true
    },
     id: false

}
);
module.exports = reactionsschema;