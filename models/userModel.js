const mongoose = require('mongoose');
const {contains} = require('validator')

const UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        minLength: [4,"Username must be above 6 character"],
        maxLength: [40,"Username must be less than 40 character"],
        validator:{
          validaor: (val) => !contains(val," "),
          message: "Must contain no space"
        }
      },
      password: {
        type: String,
        required: true,
        minLength: [8, "Must be at least 8 characters long"],
      },
      biography: {
        type:String,
        default:"",
        maxLength: [250,"bio must not exceed 250 character"]
      },
      image:{
        type:String,
        default:''
      },
      conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation'
      }

},{timestamps:true})

module.exports = mongoose.model("User", UserSchema);