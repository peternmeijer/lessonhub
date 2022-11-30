/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import axios from 'axios';

export const getLessons = async (callback, errorCallback) => {
    
    try{
        let response = await axios.get('http://localhost:5000/api/lesson/', { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
        errorCallback(error)
    }
}

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

export const editLesson = async (lesson_id, payload, callback, errorCallback) => {
    
    try{
        let response = await axios.patch('http://localhost:5000/api/lesson/'+lesson_id, payload, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const getCourses = async (callback, errorCallback) => {
    
    try{
        let response = await axios.get('http://localhost:5000/api/course/', { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const createCourse = async(payload, callback, errorCallback) =>
{
    try{
        let response = await axios.post('http://localhost:5000/api/course/', payload, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const deleteCourse = async (course_id, callback, errorCallback) => {
    
    try{
        let response = await axios.delete('http://localhost:5000/api/course/'+course_id, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const updateCourseDB = async (course_id, payload, callback, errorCallback) => {
    console.log(course_id)
    try{
        let response = await axios.patch('http://localhost:5000/api/course/'+course_id, payload, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
} 

export const getStudentsList = async (callback, errorCallback) => {
    
    try{
        let response = await axios.get('http://localhost:5000/api/user/students', { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const registerUser = async(register_token, payload, callback, errorCallback) =>
{
    try{
        let response = await axios.post('http://localhost:5000/api/user/register/'+register_token, payload);

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}

export const createRegisterToken = async(payload, callback, errorCallback) =>
{
    try{
        let response = await axios.post('http://localhost:5000/api/user/create/', payload, { withCredentials: true });

        callback(response)
    }
    catch(error)
    {
       
        errorCallback(error)
    }
}