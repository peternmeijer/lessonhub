const mongoose = require('mongoose')

const Activity = require('./Activity')

const LessonSchema = new mongoose.Schema(
{
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    tags: [String],
    activities:[mongoose.Types.ObjectId],
    visibility:{
        type: Boolean,
        default: 0
    }
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;