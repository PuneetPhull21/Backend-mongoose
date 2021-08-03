const mongoose = require('mongoose');

const Chatroom =  new mongoose.Schema({
    chatroom_name:{
        type:String,
        require:true
    }

 })
 
module.exports =  mongoose.model('chat',Chatroom);  