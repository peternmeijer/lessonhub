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