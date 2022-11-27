//Node Modules
const crypto = require('crypto')

//data 
const { accountTypes } = require('../config/data')

//util methods
const {wasProvided} = require('../utils/validation')
const ResponseError = require("../utils/responseError")

//MODELS
const User = require('../models/User')
const RegisterToken = require('../models/RegisterToken')

//method for login route
//request body must be of format {username: username, password: password}
//returns response with accesstoken and refreshtoken
exports.loginUser = async(req, res, next) => {
    //extract username and password from body
    const {username, password} = req.body

    //ensure values are provided
    wasProvided(username, "username")
    wasProvided(password, "password")

    try{
        //get user from database, only retrieve password field
        const user = await User.findOne({username: username},{_id: 1, password: 1, username: 1, firstname: 1, lastname: 1})
        //save user for new requests
        req.user = user
        
        //check if user exists
        if(!user)
            return next(new ResponseError("Invalid Credentials."),401)
        
        //check password in database matches password provided
        const isPasswordMatch = await user.matchPassword(password)

        if(!isPasswordMatch)
            return next(new ResponseError("Invalid Credentials."),401)

        
        res.cookie("access-token", user.getSignedAccessToken(),{
            path: '/',
            httpOnly: true,
            sameSite: 'lax'
        })
        res.cookie("refresh-token", user.getSignedRefreshToken(),{
            path: '/',
            httpOnly: true,
            sameSite: 'lax'
        })
        //return access token and refresh token with 200 response
        res.status(200).send({
            success: true,
            user:{
                _id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }
        })

    }
    catch (error) {
        next(error)
    }
}

exports.logoutUser = async(req,res,next) =>{
    console.log("logout user")
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    res.status(200).send({
        success: true
    })
}

//method for register user route
//request parameter must include the register token
//request body must be of format {username: username, firstname: firstname, lastname: lastname, password: password}
//returns access token and refresh token
exports.registerUser = async(req, res, next) =>{
   
    try{
        const token = req.params.token
        const {username, email, firstname, lastname, password} = req.body
        
        //check the required fields were passed with request
        wasProvided(username, "username")
        wasProvided(email, "email")
        wasProvided(firstname, "firstname")
        wasProvided(lastname, "lastname")
        wasProvided(password, "password")

        //check if token is valid and delete
        const tokenObject = await RegisterToken.findOneAndDelete({token:token});

        //if token does not exist, throw error
        if(!tokenObject)
        {
            return next(new ResponseError("Invalid Token", 400))
        }

        //create user object
        const newUser = new User({
            username: username,
            password: password,
            email: email,
            firstname: firstname,
            lastname: lastname,
            accountType: tokenObject.accountType
        });

        //save user to database
        const savedUser = await newUser.save()

        //send access tokena and refresh token
        res.status(201).send({
            success: true,
            username: username,
            firstname: firstname,
            lastname: lastname,
            access_token: savedUser.getSignedAccessToken(),
            refresh_token: savedUser.getSignedRefreshToken()
        })
    }
    catch (error) {

        next(error)
    }
}

//method for creating a user registration token
//request body must include the accountType for the registration token, e.g. {accountType: accountType}
//where accountType can be any of the values specified in /config/data.js -> accountTypes
//returns registration token that can be used in registration route
exports.createUser = async(req, res, next) =>{
    const token = crypto.randomBytes(48).toString("hex")
   
    try{
        //get account type from request body
        const {accountType} = req.body
        
        //check if account type is valid
        if(!accountTypes.includes(accountType))
        {
            return next(new ResponseError("Invalid Account Type. Account must of types: "+ accountTypes.toString(), 400))
        }

        //create and save register token
        const regToken = await new RegisterToken({
            token:token,
            accountType:accountType
        })

        //save the registration token in the database
        const savedToken = await regToken.save()

        //return response to user
        return res.status(200).json({
            success:200,
            registerToken: savedToken
        })

    }catch (error)
    {
        next(error)
    }
}