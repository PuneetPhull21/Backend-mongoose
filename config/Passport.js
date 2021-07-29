const localpassport = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport  = require('passport');
var  User = require('../model/UserModel');


passport.use(
    new localpassport({usernameField:'email'},
    async (email,password,done)=>{
        const user = await User.findOne({email:email},
            function(err){
            if(err) return done(err)
            })
            if(!user){
                return done(null,false,{message:" email is Incorrect"})
            }
            const result = user;
            const value =  bcrypt.compareSync(password,result.password); 
            if(value === true){
                return done(null,user)
            }
            else{
                return done(null,false,{message:"password is wrong"})
            }
              
    }
    )
)


