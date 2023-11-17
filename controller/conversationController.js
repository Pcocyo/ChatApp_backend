const conversationModel = require('../models/conversationModel')
const ConversationModel = require('../models/conversationModel')

async function createConversation(req,res){
    try{
        const {user_id,authUser} = req.body

        const arrUser=[user_id,authUser._id]

        const conversation = await ConversationModel.create({
            users:arrUser
        })
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
        const conversation = await conversationModel.findById(conversation_id)
        .populate({path:'users',select:'-password'})
        res.send({conversation})

    }catch(err){
        res.send({error:err.message})
    }
}
module.exports = {createConversation,getConversation}