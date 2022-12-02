/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, {useState} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FormMultiAdd from "../Utils/FormMultiAdd"
import ActivityTask from "./ActivityTask"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {saveActivity} from "../Utils/apiCalls"
import { useNavigate } from 'react-router-dom';


//component for the activity builder page and associated state methods
const ActivityBuilder = () => {
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

    //use state for input fields
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")

    //states for materials form   
    const [material, setMaterial] = useState("")
    const [materialList, setMaterialList] = useState(new Array())

    //states for equipment
    const [equipment, setEquipment] = useState("")
    const [equipmentList, setEquipmentList] = useState(new Array())

    //states for tags
    const [tag, setTag] = useState("")
    const [tagList, setTagList] = useState(new Array())

    const [visibility, setVisibility] = useState(false)
    //default blank task object for new task creation, used to initialize state
    const blankTask = {name: "", description: "", position: 1}
    //set states to keep track of number of tasks, new task fields, and task list
    const [numTasks, setNumTasks] = useState(0)
    const [newTask, setNewTask] = useState(blankTask)
    const [tasks, setTasks] = useState(new Array())
    
    //new task creation form field for task name change, update the task state
    const handleTaskNameChange = (taskName) =>{
            setNewTask({
                name: taskName,
                description: newTask.description,
                position : numTasks + 1
            })
    }

    //new task creation form field for description change, update the task state
    const handleTaskDescriptionChange = (taskDescription) =>{
            setNewTask({
                name: newTask.name,
                description: taskDescription,
                position : numTasks + 1
            })
    }

    //adds the new task to the task list
    const addTask = () => {
        if(newTask.name.trim() != "" && newTask.description != "")
        {
            setNumTasks(numTasks + 1)
            setTasks([...tasks, newTask])
            setNewTask(blankTask)
        }
        else
        {
            alert("Task Fields cannot be empty.")
        }
    }

    //make prototype method for swapping array values, used in incPos and decPos
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

    //method to reorder the task incrementing the position
    const incTaskPos = (task) => {
        //clone tasks state list
        const taskList = JSON.parse(JSON.stringify(tasks))
        
        //get two tasks to swap
        const taskObject1 = taskList.filter(t => t.position == task.position)[0]
        const taskObject2 = taskList.filter(t => t.position == task.position + 1)[0]
        
        //reverse position identifier
        taskObject1.position = task.position + 1
        taskObject2.position = task.position
        //swap in array
        taskList.move(task.position - 1, task.position)

        //update tasks list
        setTasks(taskList)
        
    }

    //method to reorder the task decrementing the position
    const decTaskPos = (task) => {
        //clone tasks state list
        const taskList = JSON.parse(JSON.stringify(tasks))
                
        //get two tasks to swap
        const taskObject1 = taskList.filter(t => t.position == task.position)[0]
        const taskObject2 = taskList.filter(t => t.position == task.position - 1)[0]

        //reverse position identifier
        taskObject1.position = task.position - 1
        taskObject2.position = task.position
        //swap in array
        taskList.move(task.position - 1, task.position - 2)

        //update tasks list
        setTasks(taskList)
        
    }

    //method to remove task from the task list
    const removeTask = (task) => {
        //remove the tasks from the list
        let taskList = tasks.filter(t => t.position != task.position)
        //update the position variables
        for(let x = 0; x < taskList.length; x ++)
        {
            if(taskList[x].position > task.position)
            {
                taskList[x].position = taskList[x].position - 1
            }
        }
        //decrement the num of tasks and update the task list state
        setNumTasks(numTasks - 1)
        setTasks(taskList)
    }

    const saveNewActivity = () => {
        //validate name and description are provided
        if(name.trim() == "" || description.trim() == "")
        {
            alert("Must provide activity name and description.")
            return
        }

        //convert duration entered to integer
        let integer_duration = parseInt(duration)

        //check if duration entered is valid, otherwise alert
        if(isNaN(integer_duration))
        {
            alert("Duration must be a valid number.")
            setDuration(0)
            return
        }
        if(integer_duration < 1)
        {
            alert("Duration must be larger than zero.")
            return
        }   

        //create json to deliver activity to backend
        const activity_object_payload = {
            name: name,
            description: description,
            duration: parseInt(duration),
            tasks: tasks,
            equipment: equipmentList,
            materials: materialList,
            tags: tagList,
            visibility: visibility
        }

        //call api call with payload to save activity
        saveActivity(activity_object_payload, function(response){
            
            if(response.data.success)
            {
                alert("Successfully added activity: " + response.data.activity.name)
                navigate('/activities');
            }
        }, function(error){console.log(error)})
    }

    return (
        
        <Container style={{ flexDirection: "column",  justifyContent: 'center', height: '90vh',  paddingTop: "20px" }}>
            <Row>
                <h1 style={{textAlign: 'center'}}>Create Activity</h1>
                <hr></hr>
            </Row>
            <Row>
                <Col style={{width: "70%"}}>
                <Form>
                    <h3>Details</h3>
                    <br></br>
                    <Form.Group className="mb-3">
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control placeholder="Enter Activity Name" value={name} onChange={(event)=>{setName(event.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Estimated Duration (mins)</Form.Label>
                        <Form.Control type="number" placeholder="Enter Duration (mins)"value={duration} onChange={(event)=>{setDuration(event.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Activity Description" value={description} onChange={(event)=>{setDescription(event.target.value)}}/>
                    </Form.Group>
                    <FormMultiAdd title="Materials" placeholder="Enter Material Name" buttonText = "Add" input={material} setInput={setMaterial} list={materialList} setList={setMaterialList}></FormMultiAdd>
                    <FormMultiAdd title="Equipment" placeholder="Enter Equipment Name"  buttonText = "Add" input={equipment} setInput={setEquipment} list={equipmentList} setList={setEquipmentList}></FormMultiAdd>
                    <FormMultiAdd title="Tags" placeholder="Enter Tag Name"  buttonText = "Add" input={tag} setInput={setTag} list={tagList} setList={setTagList}></FormMultiAdd>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Visibility</Form.Label>
                        <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Make activity public?"
                        value={visibility}
                        onChange={()=>setVisibility(!visibility)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Tasks</Form.Label>
                        <Form.Control className="mb-3"placeholder="Enter Task Name, e.g. Mixing Ingredients" value={newTask.name} onChange={(event) => {handleTaskNameChange(event.target.value)}}/>
                        <Form.Control className="mb-3" as="textarea" value = {newTask.description} placeholder="Enter Task Details, e.g. Mix 3 eggs and 1/2 cup of flour together in a large bowl." onChange={(event) => {handleTaskDescriptionChange(event.target.value)}}/>
                        <Button onClick={addTask} className= "mb-3" variant="outline-secondary" style={{width: "70%"}}>
                        Add Task
                        </Button>
                    </Form.Group>
                </Form>
                </Col>
                <Col style={{width: "40%"}}>
                    <h3>Activity Tasks</h3>
                    <br></br>
                    <div id="tasks_list">{tasks.map(task => <ActivityTask key={task.position} name={task.name} description={task.description} position={task.position} maxPos={tasks.length} incPos={() => incTaskPos(task)} decPos={() => decTaskPos(task)} rmTask={()=> removeTask(task)}></ActivityTask>)}
                    </div>
                </Col>
            </Row>
            <Row style={{alignItems: 'center',  justifyContent: 'center'}}>
                <hr></hr>
                
                <Button onClick={saveNewActivity} className= "mb-3" variant="primary" style={{width: "70%"}}>
                        Create Activity
                </Button>
                <hr></hr>
            </Row>
        </Container>
    );
}

export default ActivityBuilder;