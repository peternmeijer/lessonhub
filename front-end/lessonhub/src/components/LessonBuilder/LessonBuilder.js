/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button"
import {createLesson, getActivities} from "../Utils/apiCalls"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import FormMultiAdd from "../Utils/FormMultiAdd"
import Fuse from 'fuse.js'
import ActivityListItem from "./ActivityListItem"
import LessonActivity from "./LessonActivity"
import { useNavigate } from 'react-router-dom';

const LessonBuilder = () => {
    //used for redirection of requests
    const navigate = useNavigate();
    
    try{
        const user_accountType = JSON.parse(localStorage.getItem("user")).accountType
        
        if(user_accountType== "Administrator")
        {
            window.location.replace('/admin');
        }
        else if(user_accountType=="Student")
        {
            window.location.replace('/courses');
        }
    }catch (error)
    {
        window.location.replace('/about');
    }
    //state to store title of lesson and description of lesson
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [videoURL, setVideoURL] = useState("")

    //state to store list of available activities
    const [activities, setActivities] = useState([])

    //state for visibility
    const [visibility, setVisibility] = useState(false)

    //states for tags
    const [tag, setTag] = useState("")
    const [tagList, setTagList] = useState(new Array())

    const [lessonActivities, setLessonActivities] = useState([])

    //states for activity search
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searched, setSearched] = useState(false)
    const [modalActivity, setModalActivity] = useState({name:"",description:"",tags:[], materials:[], equipment:[], tasks:[]})
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getActivities(function(response){
            //set the list of all public opportunities
            setActivities(response.data.activities);
            
        }, function(error){console.log(error)})
    }, []);


    const searchList = (query) => {
        if(query.trim() == "")
        {
            return
        }
        else
        {
            const options = {
                 isCaseSensitive: false,
                // includeScore: false,
                 shouldSort: true,
                // includeMatches: false,
                // findAllMatches: false,
                // minMatchCharLength: 1,
                // location: 0,
                threshold: 0.1,
                // distance: 100,
                // useExtendedSearch: false,
                 ignoreLocation: true,
                // ignoreFieldNorm: false,
                // fieldNormWeight: 1,
                keys: [
                  "name",
                  "description",
                  "materials",
                  "equipment",
                  "tags",
                  "tasks.name",
                  "tasks.description"
                ]
              };

            const fuse = new Fuse(activities, options);
            
            let fuse_results = fuse.search(query)
            
            let activity_results = fuse_results.map(result => result.item)
            setSearched(true)
            setSearchResults(activity_results)
        }
        
    }

    const addLessonActivity = (activity) => {
        if(!lessonActivities.includes(activity))
        {
            setLessonActivities([...lessonActivities, activity])
            setActivities(activities.filter(a => a != activity))
            setSearchResults(searchResults.filter(a=> a!= activity))
        }
    }

    const removeActivity = (index) =>
    {
        let activity = [lessonActivities[index]];
        
        let newArray = lessonActivities.filter(element => !activity.includes(element));
        setLessonActivities(newArray)
        setActivities([...activities, activity[0]])
        clearSearch()
    }

    const clearSearch = () => {
        setSearchTerm(""); setSearched(false); setSearchResults([]);
    }

    //make prototype method for swapping array values, used in incPos and decPos
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    const incPosActivity = (index) => {
        const activityList = JSON.parse(JSON.stringify(lessonActivities)) 
        activityList.move(index, index + 1)
        setLessonActivities(activityList)
    }

    const decPosActivity = (index) => {
        const activityList = JSON.parse(JSON.stringify(lessonActivities)) 
        activityList.move(index, index - 1 )
        setLessonActivities(activityList)
    }

    const saveCreatedLesson = ()  => {
        //verify inputs 
        if(!title || !description)
        {
            alert("Title and description must be provided.")
            return
        }
        //
        const lesson_object = {
            title: title,
            description: description,
            activities: lessonActivities.map(activity => activity._id),
            tags: tagList,
            video_link: videoURL,
            visibility: visibility
        }

        createLesson(lesson_object, (response) =>{
            if(response.data.success == true)
            {
                alert("Successfully added " + response.data.lesson.title + ".")
                navigate('/lessons');
            }
        }, (error) => {
            alert("An error occured while trying to save the lesson. Please try again.")
        })
    }

    return (

        <>
        <Container style={{ flexDirection: "column",  justifyContent: 'center', height: '90vh',  paddingTop: "20px" }}>
            <Row>
                <h1 style={{textAlign: 'center'}}>Create Lesson</h1>
                <hr></hr>
            </Row>
            <Row>
                <Col style={{width: "60%"}}>
                    <Form>
                        <h3>Details</h3>
                        <br></br>
                        <Form.Group className="mb-3">
                            <Form.Label>Lesson Title</Form.Label>
                            <Form.Control placeholder="Enter Lesson Title" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Lesson Description" value={description} onChange={(event)=>{setDescription(event.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Video Link (optional)</Form.Label>
                            <Form.Control placeholder="Enter Video URL (optional)" value={videoURL} onChange={(event)=>{setVideoURL(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Visibility</Form.Label>
                            <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Make lesson public?"
                            value={visibility}
                            onChange={()=>setVisibility(!visibility)}
                            />
                        </Form.Group>

                        <FormMultiAdd title="Tags" placeholder="Enter Tag Name"  buttonText = "Add" input={tag} setInput={setTag} list={tagList} setList={setTagList}></FormMultiAdd>
                    </Form>
                
            
            <Form.Label>Add Activities</Form.Label>
                <InputGroup>
                    
                    <Form.Control
                    placeholder="Search"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button onClick={()=> clearSearch()}variant="outline-secondary" id="button-addon2">
                        Clear
                    </Button>
                    <Button onClick={() => searchList(searchTerm)}variant="outline-success" id="button-addon3">
                        Search
                    </Button>
                 </InputGroup>
    
            {searchResults.length > 0 ? <Table style={{"background" : '#ededed'}} className="mt-3" borderless size="sm"><tbody>{searchResults.map(activity => <ActivityListItem  key={activity._id} activity={activity} setModalActivity={setModalActivity} setShowModal={setShowModal} addLessonActivity = {addLessonActivity}></ActivityListItem>)}</tbody></Table> : searched ? <span style={{"color":"red"}} className="mt-2">No Results.</span> : <></>}
            <br></br>
            </Col>
            <Col style={{width: "40%"}}>
            <h3>Lesson Activities</h3>
            {lessonActivities.map((activity, i) => <LessonActivity key={i} num={i} activity={activity} maxPos={lessonActivities.length-1} rmActivity={removeActivity} incPos={incPosActivity} decPos={decPosActivity}></LessonActivity>)}
            </Col>
            </Row>
            <Row style={{alignItems: 'center',  justifyContent: 'center',}}>
                <hr></hr>
                
                <Button onClick={()=>saveCreatedLesson()} className= "mb-3" variant="primary" style={{width: "70%"}}>
                        Create Lesson
                </Button>
                <hr></hr>
            </Row>
            
        </Container>
        
        <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
         <h1 style={{textAlign: 'center', paddingTop: '10px'}}>{modalActivity.name}</h1>
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
        </Modal>
        </>
    );
}

export default LessonBuilder;