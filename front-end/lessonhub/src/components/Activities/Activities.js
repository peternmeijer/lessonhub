import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ActivityList from './ActivityList'
import {getActivities} from "../Utils/apiCalls"
import EditActivity from './EditActivity'

const Activities = () => {

    //getActivities(function(response){console.log(response)}, function(error){console.log(error)})
    const [publicActivities, setPublicActivities] = useState([])
    const [myActivities, setMyActivities] = useState([])
    const [modalActivity, setModalActivity] = useState({name:"",description:"",tags:[], materials:[], equipment:[], tasks:[]})
    const [showModal, setShowModal] = useState(false)
    const [editActivity, setEditActivity] = useState(null)

    useEffect(() => {
        getActivities(function(response){
            //set the list of all public opportunities
            setPublicActivities(response.data.activities.filter(activity => activity.visibility));

            //get user id for checking which ones we own
            const user_id = JSON.parse(localStorage.getItem("user"))._id

            //set the list of my activities (owned by user) but not public
            setMyActivities(response.data.activities.filter(activity => activity.owner == user_id && !activity.visibility));
        }, function(error){console.log(error)})
    }, [editActivity]);
    
   
    
    return (
        <>
        {!editActivity ? 
        <><Container style={{ flexDirection: "column",  justifyContent: 'center', height: '90vh',  paddingTop: "20px" }}>
            <Row>
                <h1>Activities</h1>
                <hr></hr>
            </Row>
            <ActivityList title="Public Activities" activities={publicActivities} setActivities={setPublicActivities} setModalActivity={setModalActivity} setShowModal = {setShowModal} setEditActivity={setEditActivity}></ActivityList>
            <hr></hr>
            <ActivityList title="Private Activities" activities={myActivities} setActivities={setMyActivities} setModalActivity={setModalActivity} setShowModal = {setShowModal} setEditActivity={setEditActivity}></ActivityList>
        </Container>
        
        <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
        <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
            {modalActivity.name}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Description</h5>
            <p className="mb-4">{modalActivity.description}</p>
            
            <h5>Duration</h5>
            <p className="mb-4">{modalActivity.duration + (modalActivity.duration > 1 ? " mins" : " min")}</p>
            
            <h5>Materials</h5>
            <p className="mb-4">{modalActivity.materials.length > 0 ? modalActivity.materials.map((material, i) => <span key={i+"M"}>{i > 0 && ", "}{material}</span>) : "None"}</p>
            
            <h5>Equipment</h5>
            <p className="mb-4">{modalActivity.equipment.length > 0 ? modalActivity.equipment.map((equipment, i) => <span key={i+"E"}>{i > 0 && ", "}{equipment}</span>) : "None"}</p>
          
            <h5>Tags</h5>
            <p className="mb-4">{modalActivity.tags.length > 0 ? modalActivity.tags.map((tag, i) => <span key={i+"TG"}> {i > 0 && ", "} {tag} </span>) : "None"}</p>

            <h5 className="mb-3">Tasks</h5>
            {modalActivity.tasks.map((task, i) => <><h6 key={i + "TP"}>{task.position}. {task.name}</h6> <p key={i + "TN"}>{task.description}</p></>)}
        </Modal.Body>
        </Modal></>
        : <EditActivity activity={editActivity} setEditActivity={setEditActivity}></EditActivity>}
        </>
        
    );
    

}

export default Activities;