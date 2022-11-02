const mongoose = require('mongoose')

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
    visibility:{
        type: Boolean,
        default: 0
    }
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;