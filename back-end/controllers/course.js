const Course = require('../models/Course')
const mongoose = require('mongoose')

exports.createCourse = async(req, res, next) =>{
    console.log("Create Course")

    //TODO: Modify this to add the tasks and user objects
    try{
        const {name} = req.body
        const owner = req.user._id
        //create new activity with data from the request body
        const course = new Course({
            owner: owner,
            name: name
        })
        
        //save the new activity to the DB
        const result = await course.save()
        
        res.status(201).send({
            success: true,
            course: result
        })

    }catch(error){ //error handling
        console.log(error)

        res.status(500).send({
            success: false,
            message: error
        })
    }
}

exports.getCourse = async(req, res, next) => {
    console.log("Get Course")

    try{
        const courseId = req.params.id //get activity id from the url
        const user_id = req.user._id
        const course = await Course.findById({ //search for activity with id in database
            _id: courseId
        })

        if(!course){ //if nothing returned, send error
            res.status(404).send({
                success: false,
                message: "Course not found."
            })
        }
        else if(!course.owner.equals(user_id) && course.members.includes(user_id))
        {
            res.status(404).send({
                success: false,
                message: "You do not have access to this course."
            })
        }
        else{ //return activity with matchin id if found
            res.status(200).send({
                success: true,
                course: course
            })
        }

    }catch(error){ //error handling
        console.log(error)

        res.status(500).send({
            success: false, 
            message: error
        })
    }
}

exports.getCourses = async(req,res,next) =>{
    
    try{
        const user_id = req.user._id
        const courses = await Course.find({ $or: [ { owner: user_id }, { members: user_id } ] }).populate("members").populate("scheduledLessons.lesson")

        if(!courses){ //if nothing returned, send error
            res.status(404).send({
                success: false,
                message: "Courses not found."
            })
        }
        else{ //return activity with matchin id if found
            res.status(200).send({
                success: true,
                courses: courses
            })
        }

    }catch(error){ //error handling
        next(error)
    }
}

exports.updateCourse = async(req, res, next) => {
   
    try{
        const user_id = req.user._id
        const courseId = req.params.id
        console.log(courseId)
        const courseToEdit = await Course.findById(courseId)

        if(!courseToEdit)
        {
            return res.status(404).send({
                success:false,
                message: "Course not found."
            })
        }
       
        if(courseToEdit.owner.equals(user_id))
        {
            const {name, scheduledLessons, members} = req.body

            //create an update json query
            const updates={
                name: name,
                scheduledLessons: scheduledLessons,
                members: members
            }
    
            //update the specified lesson plan
            const updatedCourse = await Course.findOneAndUpdate({_id: courseId}, updates, {new: true}).populate("members").populate("scheduledLessons.lesson")
    
            return res.status(200).send({
                success: true,
                course: updatedCourse
            })
        }
        else
        {
            return res.status(401).send({
                success:false,
                message: "Unauthorized"
            })
        }

    }catch(error){ //error handling
        console.log(error)
    }
}

exports.deleteCourse = async(req, res, next) =>{
    console.log("Delete Course")
   
    try{
        const user_id = req.user._id
        const course_id = req.params.id

        const courseToDelete = await Course.findById(course_id)

        if(!courseToDelete)
        {
            return res.status(404).send({
                success:false,
                message: "Course not found."
            })
        }
       
        if(courseToDelete.owner.equals(user_id))
        {
            const deletedCourse = await Course.deleteOne({_id: course_id})

            console.log(deletedCourse)

            return res.status(200).send({
                success: deletedCourse.acknowledged
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