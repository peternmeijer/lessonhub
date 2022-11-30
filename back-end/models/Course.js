const mongoose = require('mongoose')

//TODO: Add the sections to store the creator objects as well
//TODO: Add the sections to store the tasks

const CourseSchema = new mongoose.Schema(
{
    owner: mongoose.Types.ObjectId,
    name: String,
    scheduledLessons: [{
        lesson: {
            type: mongoose.Types.ObjectId,
            ref: "Lesson"
        },
        date: Date
    }],
    members: [{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    }]
    
})

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;