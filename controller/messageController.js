const messageModel = require('../models/MessageModel')
const conversationModel= require('../models/conversationModel')
async function createMessage(req,res){
    try{    
        const {conversation_id,content,reciever} = req.body
        const message = await messageModel.create({
            content:content,
            sender:req.body.authUser._id,
            reciever: reciever,
            conversation_id: conversation_id
        })
        console.log(message)
        const conversation = await conversationModel.findById(conversation_id)
        conversation.message.push(message._id)
        let updateConversation = await conversation.save()
        updateConversation = await updateConversation.populate({path:'users message',select:'-password'})
        console.log(updateConversation)
        res.send(updateConversation)
    }catch(err){
        res.send({error:err.message})
    }
}

module.exports = createMessage