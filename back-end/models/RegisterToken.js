//Node Modules
const mongoose = require('mongoose');

//data
const {accountTypes} = require('../config/data')

const RegisterTokenSchema = mongoose.Schema({
    token:{
        type:String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        require: true,
        expires: Number(process.env.REGISTER_TOKEN_EXPIRE)*60*60,
        default: new Date()
    },
    accountType:{
        type: String,
        enum: accountTypes
    }
    

})

module.exports = mongoose.model('RegisterToken', RegisterTokenSchema)