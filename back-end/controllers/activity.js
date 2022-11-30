const Activity = require('../models/Activity')
const mongoose = require('mongoose')

exports.createActivity = async(req, res, next) =>{
    console.log("Create Activity")

    //TODO: Modify this to add the tasks and user objects
    try{
        const {name, duration, equipment, materials, description, tasks, tags, visibility} = req.body
        const owner = req.user._id
        //create new activity with data from the request body
        const activity = new Activity({
            owner: owner,
            name: name,
            duration: duration,
            equipment: equipment,
            materials: materials,
            description: description,
            tasks: tasks,
            tags: tags,
            visibility: visibility
        })
        
        //save the new activity to the DB
        const result = await activity.save()
        console.log(result)
        res.status(201).send({
            success: true,
            activity: activity
        })

    }catch(error){ //error handling
        console.log(error)

        res.status(500).send({
            success: false,
            message: error
        })
    }
}

exports.getActivity = async(req, res, next) => {
    console.log("Get Activity")

    try{
        const activityId = req.params.id //get activity id from the url
        
        const activity = await Activity.findById({ //search for activity with id in database
            _id: activityId
        })

        if(!activity){ //if nothing returned, send error
            res.status(404).send({
                success: false,
                message: "Lesson not found."
            })
        }
        else{ //return activity with matchin id if found
            res.status(200).send({
                success: true,
                activity: activity
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

exports.getActivities = async(req,res,next) =>{
    
    try{
        const owner = req.user._id
        const activities = await Activity.find({ $or: [ { owner: owner }, { visibility: 1 } ] })

        if(!activities){ //if nothing returned, send error
            res.status(404).send({
                success: false,
                message: "Activities not found."
            })
        }
        else{ //return activity with matchin id if found
            res.status(200).send({
                success: true,
                activities: activities
            })
        }

    }catch(error){ //error handling
        next(error)
    }
}

exports.updateActivity = async(req, res, next) => {
   
    try{
        const user_id = req.user._id
        const activityId = req.params.id

        const activityToEdit = await Activity.findById(activityId)

        if(!activityToEdit)
        {
            return res.status(404).send({
                success:false,
                message: "Activity not found."
            })
        }
       
        if(activityToEdit.owner.equals(user_id))
        {
            const {name, duration, equipment, materials, description, tasks, tags, visibility} = req.body

            //create an update json query
            const updates={
                name: name,
                duration: duration,
                equipment: equipment,
                materials: materials,
                description: description,
                tasks: tasks,
                tags: tags,
                visibility: visibility
            }
    
            //update the specified lesson plan
            const updatedActivity = await Activity.findOneAndUpdate({_id: activityId}, updates, {new: true})
    
            return res.status(200).send({
                success: true,
                activity: updatedActivity
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

exports.deleteActivity = async(req, res, next) =>{
    console.log("Delete Activity")
    console.log(req.params.id)
    try{
        const user_id = req.user._id
        const activityId = req.params.id

        const activityToDelete = await Activity.findById(activityId)

        if(!activityToDelete)
        {
            return res.status(404).send({
                success:false,
                message: "Activity not found."
            })
        }
       
        if(activityToDelete.owner.equals(user_id))
        {
            const deletedActivity = await Activity.deleteOne({_id: activityId})

            console.log(deletedActivity)

            return res.status(200).send({
                success: deletedActivity.acknowledged
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