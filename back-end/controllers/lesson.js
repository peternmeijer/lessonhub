const Lesson = require('../models/Lesson')

exports.getLesson = async(req, res, next) => {
    console.log("Get Lesson")

    try{
        //get lesson id from url request param
        const lesson_id = req.params.id

        //attempt to find the lesson with id from the database
        const lesson = await Lesson.findById({_id: lesson_id})
        
        //if the lesson exists, return it, else, not found error
        if(!lesson)
        {
            res.status(404).send({
                success: false,
                message: "Lesson not found."
            })
        }
        else{
            res.status(200).send({
                lesson: lesson
            })
        }
    }
    catch (error){
        console.log(error)

        res.status(500).send({
            success: false,
            message: error
        })
    }
}

exports.getLessons = async(req,res,next) => {
    try{
        const owner = req.user._id
        const lessons = await Lesson.find({ $or: [ { owner: owner }, { visibility: 1 } ] })

        if(!lessons){ //if nothing returned, send error
            res.status(404).send({
                success: false,
                message: "Lessons not found."
            })
        }
        else{ //return activity with matchin id if found
            res.status(200).send({
                lessons: lessons
            })
        }

    }catch(error){ //error handling
        next(error)
    }
}

exports.createLesson = async(req, res, next) =>{
    console.log("Create Lesson")
    //get user id for owner of lesson creation
    const owner = req.user._id
    //extract the variables body of the request
    try{
        const {title, description, tags, visibility, activities} = req.body
        
        //create new lesson object
        const lesson = new Lesson({
            title: title,
            description: description,
            tags: tags,
            visibility: visibility,
            activities: activities,
            owner: owner
        })

        //save lesson object
        const result = await lesson.save()
        console.log(result)
        res.status(201).send({
            success: true,
            lesson: lesson
        })
    }
    catch (error) {
        next(error)
    }
    
}

exports.updateLesson = async(req, res, next) =>{
    console.log("Update Lesson")

    try{
        //get id from request parameter
        const lesson_id = req.params.id
        //extract updates from req body
        const {title, description, tags, visibility} = req.body

        //create update query json
        const updates={
            title: title,
            description: description,
            tags: tags,
            visibility: visibility
        }

        //send update request to database
        const updatedLesson = await Lesson.findOneAndUpdate({_id: lesson_id}, updates, {new: true})

        //send response
        res.status(200).send({
            success: true,
            lesson: updatedLesson
        })
    }
    catch (error)
    {
        next(error)
    }
}