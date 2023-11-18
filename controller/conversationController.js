const ConversationModel = require('../models/conversationModel')
const userModel = require('../models/userModel')

async function createConversation(req,res){
    try{
        let updateUser
        async function addFriend(id,idToAdd){
            let user = await userModel.findById(id)
            user.friend.push(idToAdd)
            updateUser = await user.save()
        }

        const {user_id,authUser} = req.body
        addFriend(user_id,authUser._id)
        addFriend(authUser._id,user_id)

        const arrUser=[user_id,authUser._id]
        const conversation = await ConversationModel.create({
            users:arrUser
        })
        for (index in arrUser){
            let user = await userModel.findById(arrUser[index])
            user.conversation.push(conversation._id)
            updateUser = await user.save()
        }
        const toReturn = await ConversationModel.findById(conversation._id).populate({path:'users',select:'-password'})
        res.send({toReturn})
    }catch(err){
        res.send({error:err.stack})
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