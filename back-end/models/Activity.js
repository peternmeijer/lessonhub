const mongoose = require('mongoose')

const User = require("./User")
//TODO: Add the sections to store the creator objects as well
//TODO: Add the sections to store the tasks

const ActivitySchema = new mongoose.Schema(
{
    owner: mongoose.Types.ObjectId,
    name:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    tasks:[{
        name: String,
        description: String,
        position: Number
    }],
    equipment: [String],
    materials: [String],
    description:{
        type: String
    },
    tags:[String],
    visibility:{
        type: Boolean,
        default: 0
    }

})

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;