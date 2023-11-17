const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema(
    {
        content:{
            type:String
        },
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        reciever:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        conversation_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Conversation'
        }
    }
)
module.exports = mongoose.model('Message',MessageSchema)