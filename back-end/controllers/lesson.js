const Lesson = require('../models/Lesson')
const Course = require('../models/Course')

exports.getLesson = async(req, res, next) => {
    console.log("Get Lesson")

    try{
        const owner_id = req.user._id
        //get lesson id from url request param
        const lesson_id = req.params.id

        //attempt to find the lesson with id from the database
        const lesson = await Lesson.findById({_id: lesson_id})
        
        if(!lesson.owner.equals(owner_id))
        {
            return res.status(401).send({
                success: false,
                message: "You do not have access to this lesson."
            })
        }
        //if the lesson exists, return it, else, not found error
        if(!lesson)
        {
            return res.status(404).send({
                success: false,
                message: "Lesson not found or you do not have access to this lesson."
            })
        }
        else{
            return res.status(200).send({
                success: true,
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
        const lessons = await Lesson.find({ $or: [ { owner: owner }, { visibility: 1 } ] }).populate("activities")

        if(!lessons){ //if nothing returned, send error
            res.status(404).send({
                success: false,
                message: "Lessons not found."
            })
        }
        else{ //return activity with matchin id if found
            res.status(200).send({
                success: true,
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
        const {title, description, tags, visibility, activities, video_link} = req.body
        
        //create new lesson object
        const lesson = new Lesson({
            title: title,
            description: description,
            tags: tags,
            visibility: visibility,
            activities: activities,
            owner: owner,
            video_link:video_link
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
        const user_id = req.user._id
        //get id from request parameter
        const lesson_id = req.params.id
        //extract updates from req body
        const {title, description, tags, visibility, activities, video_link} = req.body

        //create update query json
        const updates={
            title: title,
            description: description,
            tags: tags,
            visibility: visibility,
            activities: activities,
            video_link: video_link
        }

        //send update request to database
        const updatedLesson = await Lesson.findOneAndUpdate({_id: lesson_id, owner: user_id}, updates, {new: true})

        if(updatedLesson)
        {
            //send response
            return res.status(200).send({
                success: true,
                lesson: updatedLesson
            })
        }
        else
        {
            return res.status(400).send({
                success: false,
                message: "Could not update lesson"
            })
        }
        
    }
    catch (error)
    {
        next(error)
    }
}

exports.deleteLesson = async(req, res, next) =>{
    console.log("Delete Lesson")
    console.log(req.params.id)
    try{
        const user_id = req.user._id
        const lessonId = req.params.id

        const lessonToDelete = await Lesson.findById(lessonId)

        if(!lessonToDelete)
        {
            return res.status(404).send({
                success:false,
                message: "Lesson not found."
            })
        }
       
        if(lessonToDelete.owner.equals(user_id))
        {
            const deletedLesson = await Lesson.deleteOne({_id: lessonId})

            const deleteReferences = await Course.updateMany(
                {  },
                { $pull: { "scheduledLessons": {"lesson":lessonId} } }
             )

            console.log(deletedLesson)

            return res.status(200).send({
                success: deletedLesson.acknowledged
            })

        }
        else
        {
            return res.status(401).send({
                success:false,
                message: "Unauthorized"
            })
        }

    }catch(error){
        console.log(error)
        next(error)
    }
}