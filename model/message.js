const mongoose = require('mongoose');


const message = new mongoose.Schema({
    chatroom:{
        type:mongoose.Schema.Types.ObjectId,
        required:"chatroom is required",
        ref:"chat"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:"user is required",
        ref:'user'
    },
    message:{
        type:String,
        required:true
    }
}) 

module.exports = mongoose.model('message',message);