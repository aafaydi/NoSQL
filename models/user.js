const {Schema, model} = require('mongoose')

const userschema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email:{

        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Enter a Valid Email"]

    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "thought"
        }

    ],
     friends: [
         {
             type: Schema.Types.ObjectId,
             ref: "user"
         }
     ]


},
{
    toJSON: {
        virtuals: true
    },
     id: false

}
)

userschema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const user = model("user", userschema)
module.exports = user