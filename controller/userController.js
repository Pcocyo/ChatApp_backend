const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExist = await User.findOne({username:username})
        if (userExist){
            throw new Error('user with the name '+ username +' exist in database')
        }
        let user = await User.create({
          username,
          password
        });
        const toReturn={
            username:user.username,
            _id:user._id,
            biography:user.biography,
            image:user.image,
            conversation:user.conversation,
            token : jwt.sign({username:username,_id:user._id},'123')
        }
      return res.send(toReturn);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
};

const login = async (req,res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username:username})
        .populate(
            {
                path:'conversation',
                populate:{
                    path:'users',
                    select:'username _id image'
                }
            }
        )
        .populate(
            {
                path:'conversation',
                populate:{
                    path:'message',
                    populate:{
                        path:'sender reciever',
                        select:'username'
                    }
                }
            }
        )
        if(!user){
            throw new Error('user with name ' + username +  ' not found')
        }
        let toReturn = {
            username:user.username,
            _id:user._id,
            biography:user.biography,
            image:user.image,
            conversation:user.conversation,
            token : jwt.sign({username:user.username,_id:user._id},'123')
        }
        res.send(toReturn)
    }catch(err){
        res.send({error:err.message})
    }
}

async function findUser(req,res){
    try{
        const {userToFind, userId} = req.body;
        const toExclude = []
        const user = await User.findById(userId)

        //user to exclude
        toExclude.push(String(user._id))
        user.friend.forEach((ele)=>toExclude.push(String(ele)))
        //end of user to exclude

        let userFound = await User.find({username:{$regex:new RegExp(userToFind,'i')}})
        userFound = userFound.filter((user)=> !toExclude.includes(String(user._id))) // return only user relevent
        res.send(userFound)
    }catch(err){
        res.send({error:err.message})
    }
}
module.exports = {register,login,findUser}