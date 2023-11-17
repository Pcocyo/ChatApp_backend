const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema(
    {
        Content:{
            type:String
        },
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        reciever:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }
)
module.exports = mongoose.model('Message',MessageSchema)