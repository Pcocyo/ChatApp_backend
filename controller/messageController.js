const messageModel = require('../models/MessageModel')
const conversationModel= require('../models/conversationModel')
async function createMessage(req,res){
    try{    
        const {conversation_id,content,reciever} = req.body
        console.log(req.body)
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
        //.populate({path:'message',populate:{path:'sender reciever',select:'username'}})
        //updateConversation = await updateConversation//.populate({path:'users message',select:'-password'})
        const to_return = await conversationModel.findById(updateConversation._id).populate({path:'users message',select:'-password'}).populate({path:'message',populate:{path:'sender reciever',select:'username'}})
        console.log(to_return)
        res.send(to_return)
    }catch(err){
        res.send({error:err.message})
    }
}

module.exports = createMessage