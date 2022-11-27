import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import { BsBoxArrowUpRight,BsPlusLg } from "react-icons/bs";

const ActivityListItem = (props) =>{
    const {activity, setModalActivity, setShowModal, addLessonActivity} = props
    return (
        <tr>
        <td style={{"width":"30%"}}>{activity.name}</td>
        <td style={{"width":"40%"}}>{activity.description}</td>
        <td style={{"width":"20%"}}><Button  className = "m-1" onClick={() => {setModalActivity(activity); setShowModal(true)}} variant="primary" size="sm" ><BsBoxArrowUpRight/></Button> <Button onClick={()=>addLessonActivity(activity)} className = "ms-3" variant="secondary" size="sm"><BsPlusLg/></Button></td>
        </tr>
        
    )
}

export default ActivityListItem