const ConversationModel = require('../models/conversationModel')
const userModel = require('../models/userModel')

async function createConversation(req,res){
    try{
        const {user_id,authUser} = req.body

        const arrUser=[user_id,authUser._id]
        const conversation = await ConversationModel.create({
            users:arrUser
        })
        for (index in arrUser){
            let user = await userModel.findById(arrUser[index])
            user.conversation.push(conversation._id)
            let updateUser = await user.save()
        }
        const toReturn = await ConversationModel.findById(conversation._id).populate({path:'users',select:'-password'})
        res.send({toReturn})
    }catch(err){
        res.send({error:err.message})
    } 
}

async function getConversation(req,res){
    try{
        if (!req.body.authUser){
            throw new Error('user not authorized')
        }
        const {conversation_id} = req.body
        const conversation = await ConversationModel.findById(conversation_id)
        .populate({path:'users',select:'-password'})
        res.send({conversation})

    }catch(err){
        res.send({error:err.message})
    }
}
module.exports = {createConversation,getConversation}