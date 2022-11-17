//node modules
const jwt = require('jsonwebtoken')

//utils
const ResponseError = require("../utils/responseError")

//models
const User = require('../models/User')

exports.checkAccess = async(req,res,next) =>{

    const cookies = req.cookies;
    
    const accessToken = cookies['access-token']

    //check if no token exists
    if(!accessToken)
        return next(new ResponseError("Not Authorized to Access this Route",401));
    

    try
    {
        //decode JWT into the object endcoded, we have the user id encoded
        const decodedJWT = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        //find the user by id from the database
        const user = await User.findById(decodedJWT.id);

        if(!user)
            return next(new ResponseError("No user found with this id", 404))
        
        //save user to request for use in later methods
        req.user = user

        //call next function in request route
        next()

    }catch (error){
        return next(error);
    }
}

exports.accountTypeGuard = (...accountTypes) => {
    return async(req,res,next) =>{
        const user = req.user

        if(accountTypes.includes(user.accountType))
        {
            next()
        }
        else
        {
            return next(new ResponseError("Not authorized to access this route.",401))
        }
    }
}