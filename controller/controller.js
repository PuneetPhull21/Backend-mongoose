require("../config/databaseconfig");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var User = mongoose.model("user");
const Chatroom = mongoose.model("chat");
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/Passport');

module.exports.newuser = async (req, res) => {
  const password = req.body.password;
  const epassword = await bcrypt.hash(password, 12);
  var adduser = new User({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    password: epassword,
  });
  adduser
    .save()
    .then((data) => {
      return res.status(200).send({
        status: 200,
        success: true,
        data: data,
        message: "user is inserted",
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: 400,
        success: false,
        err: err,
      });
    });
};

// fetch the user details from the database

module.exports.fetchuser = (req, res) => {
  User.find()
    .then((data) => {
      return res.status(200).json({
        status: 200,
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: 400,
        success: false,
        err: err,
      });
    });
};

// fetch by id

module.exports.fetchsingleuser = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((data) => {
      return res.status(200).send({
        status: 200,
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: 400,
        success: false,
        err: err,
      });
    });
};

module.exports.updatesingleuser = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      return res.status(200).send({
        status: 200,
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: 400,
        success: false,
        err: err,
      });
    });
};

module.exports.deleteuser = (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id })
    .then((docs) => {
      return res.status(200).send({
        status: 200,
        success: true,
        message: "user is deleted",
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: 400,
        success: false,
        err: err,
      });
    });
};

module.exports.chatroom = async (req, res) => {
    try{
  const chatroom_name = req.body.chatroom_name;
  const chatroomexsist = await Chatroom.findOne({ chatroom_name });
  if (chatroomexsist){
     return res.status(401).send({
          status:401,
          message:"its is alerady exsists please try with another name",
      })
  }
  const chatname = new Chatroom({
    chatroom_name,
  });

  chatname.save().then((data) => {
    return res.status(200).send({
      status: 200,
      data: data,
      message: "Chatroom is created",
    });
  });
}
catch(error){
 return res.status(401).send({
     status:400,
     message:'There is some error',
     err:error,
 })
}
};

module.exports.allchatrooms = async(req, res) => {
  try {
    const details = await Chatroom.find({});
    return res.status(200).send({
      status: 200,
      message: "all the chatroom",
      data:details,
    });
  }
  catch (error) {
    return res.status(400).send({
      status: 00,
      err: error,
    });
  }
};

//delete the chat room in the from db;

module.exports.deletechatroom = async (req, res) => {
  try {
    const deleted = await Chatroom.findByIdAndRemove({ _id: req.params.id });
    return res.status(200).send({
      status: 200,
      message: "chat room is deleted",
      data: deleted,
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      err: error,
    });
  }
};


//login  api 
exports.userlogin = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) res.status(404).json({
        status:400,
          success:false,
          err:err,
      });
      if (user)
        return res.status(200).json({
          status:200,
          success:true,
          token: jwt.sign({ id: user.id }, "SECRETKEY007", {
            expiresIn: "60m",
          })
        });
      if (info) return res.status(401).json({
        status:401,
          success:false,
          err:info,
      });
    })(req, res, next);
  };

