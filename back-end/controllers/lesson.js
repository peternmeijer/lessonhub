const Lesson = require('../models/Lesson')

exports.getLesson = async(req, res, next) => {
    console.log(req.params.id)

    //do whatever logic to get the lesson

    const lesson = {
        title: "My Lesson"
    }
    
    res.status(200).send({
        lesson: lesson
    })
}

exports.createLesson = async(req, res, next) =>{
    console.log("accessing create lesson route")
    /*const lesson = new Lesson({
        title: "abc",
        description: "123"
    })

    const savedLesson = await lesson.save()*/
}

exports.updateLesson = async(req, res, next) =>{

}