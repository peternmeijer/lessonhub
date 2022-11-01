const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true});

    console.log("connected to DB")
}

module.exports = connectDB;