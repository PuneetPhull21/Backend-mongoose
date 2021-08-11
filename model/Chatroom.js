const mongoose = require('mongoose');

var ChatRoom = new mongoose.Schema({
    chatroom_name:{
        type:String,
        require:true
    },
})


module.exports =  mongoose.model('chatroom',ChatRoom);