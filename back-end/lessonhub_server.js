//modules
const express = require('express')
require('dotenv').config({path: "./.env"});
const cors = require('cors')
const cookieParser = require('cookie-parser')

//imported functions
const connectDB = require('./config/db')
const errorHandler = require("./middleware/errorHandler");

//connect to database
connectDB()

//create express web server
const app = express();

//used to deconstruct json from requests
app.use(cors({
    origin: ["http://www.lessonhub.tk:3006", "http://www.lessonhub.tk","http://localhost:3000"],
    preflightContinue: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }))
app.use(cookieParser())
app.use(express.json())

//include routes
app.use('/api/lesson', require('./routes/lesson'))
app.use('/api/user', require('./routes/user'))
app.use('/api/activity', require('./routes/activity'))
app.use('/api/course', require('./routes/course'))

//last middleware (ERROR HANDLER)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise)=>{
    console.log(`Logged Error ${err}`)
    server.close(()=> process.exit(1))
})