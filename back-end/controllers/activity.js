const Activity = require('../models/Activity')

exports.createActivity = async(req, res, next) =>{
    console.log("Create Activity")

    //TODO: Modify this to add the tasks and user objects
    try{
        const {title, duration, equipment, materials, description, tasks, tags, visibility} = req.body

        //create new activity with data from the request body
        const activity = new Activity({
            title: title,
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

exports.updateActivity = async(req, res, next) => {
    console.log("Update Activity")

    //TODO: Modify this to add user and task objects as well
    try{
        //grab ID and data from URL
        const activityId = req.params.id

        const {title, duration, equipment, materials, description, tasks, tags, visibility} = req.body

        //create an update json query
        const updates={
            title: title,
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

        res.status(200).send({
            success: true,
            lesson: updatedActivity
        })

    }catch(error){ //error handling
        console.log(error)
    }
}

exports.deleteActivity = async(req, res, next) =>{
    console.log("Delete Activity")

    try{
        const activityId = req.params.id

    }catch(error){
        console.log(error)
    }
}