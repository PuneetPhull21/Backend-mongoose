const mongoose = require('mongoose');

const Chatroom = mongoose.Schema({
    name:{
        type:String,
         required:"Chat room is required"
    }
 })
 
module.exports =  mongoose.model('chat',Chatroom);