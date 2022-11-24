const mongoose = require('mongoose')

//TODO: Add the sections to store the creator objects as well
//TODO: Add the sections to store the tasks

const ActivitySchema = new mongoose.Schema(
{
    title:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    tasks:{
        name: String,
        description: String
    },
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