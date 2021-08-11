const mongoose = require('mongoose');


var message = new mongoose.Schema({
    chatroom:{
        type:mongoose.Schema.Types.ObjectId,
        required:"chatroom is required",
        ref:"chatroom"
    },
    user:{
        type:String,
        required:"user is required",
        ref:'user'
    },
    msg:{
        type:String,
        required:true
    }
}) 

module.exports = mongoose.model('message',message);