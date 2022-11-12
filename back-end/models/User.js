//Node Modules
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Data
const {accountTypes} = require('../config/data')

const UserSchema = new mongoose.Schema(
{
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    accountType:{
        type: String,
        enum: accountTypes
    }
});

//function for pre save of user, if password has changed, we encrypt it and save it
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.matchPassword = async function(password)
{
     return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedAccessToken = function()
 {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}

UserSchema.methods.getSignedRefreshToken = function()
{
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET)
    
}


const User = mongoose.model("User", UserSchema);

module.exports = User;