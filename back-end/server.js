const express = require('express')

const app = express();

app.use(express.json())

app.use('/api/lesson', require('./routes/lesson'))

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise)=>{
    console.log(`Logged Error ${err}`)
    server.close(()=> process.exit(1))
})