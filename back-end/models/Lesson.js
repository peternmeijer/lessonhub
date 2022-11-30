const mongoose = require('mongoose')

const Activity = require('./Activity')

const LessonSchema = new mongoose.Schema(
{
    owner: mongoose.Types.ObjectId,
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    video_link:{
        type: String
    },
    tags: [String],
    activities:[{
        type: mongoose.Types.ObjectId,
        ref: 'Activity'}
    ],
    visibility:{
        type: Boolean,
        default: 0
    }
});

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;