/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, {useState} from 'react';
import { BsBoxArrowUpRight,BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import {deleteActivity} from "../Utils/apiCalls"
import { useNavigate } from 'react-router-dom';

const ActivityListItem = (props) => {
    //use navigator for reload after delete
    const navigate = useNavigate();

    //get data from component props
    const {activity, setModalActivity, setShowModal, setEditActivity, activities, setActivities} = props

    //get user to check if we own it, if so show the delete button
    const user_id = JSON.parse(localStorage.getItem("user"))._id
    const displayTrash = activity.owner == user_id

    const deleteActivityFromDB = (activity) =>{
        deleteActivity(activity._id, function(response){
            if(response.data.success)
            {
                setActivities(activities.filter(a => a._id != activity._id))
                //alert("Successfully deleted activity: " + activity.name)
                //window.location.reload();
            }
            else
            {
                alert("Error occured while triyng to delete.")
            }
        }, function(error){
            console.log(error)
            alert("Error occured while trying to delete: " + error.response.data.message)
        })
    }

    return (<tbody>
        <tr>
        <td style={{"width":"30%"}}>{activity.name}</td>
        <td style={{"width":"40%"}}>{activity.description}</td>
        <td style={{"width":"20%"}}><Button  className = "ms-3" onClick={() => {setModalActivity(activity); setShowModal(true)}}variant="primary" size="sm" ><BsBoxArrowUpRight/></Button> {displayTrash ? <><Button onClick={() => setEditActivity(activity)} className = "ms-3" variant="secondary" size="sm"><BsPencilSquare/></Button>  <Button className = "ms-3" variant="danger" size="sm" onClick={() => deleteActivityFromDB(activity)}><BsFillTrashFill/></Button></> : <></>}</td>
        
        </tr>
        
    </tbody>)

}

export default ActivityListItem;