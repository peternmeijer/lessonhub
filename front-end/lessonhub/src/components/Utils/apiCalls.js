import axios from 'axios';


export const saveActivity = async (payload, callback, errorCallback) => {
    try{
        let response = await axios.post('http://localhost:5000/api/activity', payload, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
        errorCallback(error)
    }
}

export const getActivities = async (callback, errorCallback) => {
    
    try{
        let response = await axios.get('http://localhost:5000/api/activity/', { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const deleteActivity = async (activity_id, callback, errorCallback) => {
    
    try{
        let response = await axios.delete('http://localhost:5000/api/activity/'+activity_id, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const editActivity = async (activity_id, payload, callback, errorCallback) => {
    
    try{
        let response = await axios.patch('http://localhost:5000/api/activity/'+activity_id, payload, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const createLesson = async(payload, callback, errorCallback) => {

    try{
        let response = await axios.post('http://localhost:5000/api/lesson/', payload, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}