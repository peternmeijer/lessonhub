import React, {useState} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FormMultiAdd from "../Utils/FormMultiAdd"
import ActivityTask from "./ActivityTask"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ActivityBuilder = () => {

    const blankTask = {name: "", description: "", position: 1}
    const [material, setMaterial] = useState("")
    const [materialList, setMaterialList] = useState(new Array())

    const [equipment, setEquipment] = useState("")
    const [equipmentList, setEquipmentList] = useState(new Array())

    const [tag, setTag] = useState("")
    const [tagList, setTagList] = useState(new Array())

    const [numTasks, setNumTasks] = useState(0)
    const [newTask, setNewTask] = useState(blankTask)
    const [tasks, setTasks] = useState(new Array())
    
    const handleTaskNameChange = (taskName) =>{
            setNewTask({
                name: taskName,
                description: newTask.description,
                position : numTasks + 1
            })
    }

    const handleTaskDescriptionChange = (taskDescription) =>{
            setNewTask({
                name: newTask.name,
                description: taskDescription,
                position : numTasks + 1
            })
    }

    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };

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

    const removeTask = (task) => {
        let taskList = tasks.filter(t => t.position != task.position)
        for(let x = 0; x < taskList.length; x ++)
        {
            if(taskList[x].position > task.position)
            {
                taskList[x].position = taskList[x].position - 1
            }
        }
        setNumTasks(numTasks - 1)
        setTasks(taskList)
    }

    return (
        
        <Container style={{ flexDirection: "column", display: 'flex', justifyContent: 'center', height: '90vh', paddingTop: "200px" }}>
            <Row>
                <h1>Create Activity</h1>
                <hr></hr>
            </Row>
            <Row>
                <Col style={{width: "70%"}}>
                <Form>
                    <h3>Details</h3>
                    <br></br>
                    <Form.Group className="mb-3">
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control placeholder="Enter Activity Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Estimated Duration (mins)</Form.Label>
                        <Form.Control type="number" placeholder="Enter Duration (mins)" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Activity Description" />
                    </Form.Group>
                    <FormMultiAdd title="Materials" placeholder="Enter Material Name" buttonText = "Add" input={material} setInput={setMaterial} list={materialList} setList={setMaterialList}></FormMultiAdd>
                    <FormMultiAdd title="Equipment" placeholder="Enter Equipment Name"  buttonText = "Add" input={equipment} setInput={setEquipment} list={equipmentList} setList={setEquipmentList}></FormMultiAdd>
                    <FormMultiAdd title="Tags" placeholder="Enter Tag Name"  buttonText = "Add" input={tag} setInput={setTag} list={tagList} setList={setTagList}></FormMultiAdd>
                    
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
                    <div id="tasks_list">{tasks.map(task => <ActivityTask name={task.name} description={task.description} position={task.position} maxPos={tasks.length} incPos={() => incTaskPos(task)} decPos={() => decTaskPos(task)} rmTask={()=> removeTask(task)}></ActivityTask>)}
                    </div>
                </Col>
            </Row>
            <Row style={{alignItems: 'center',  justifyContent: 'center'}}>
                <hr></hr>
                
                <Button className= "mb-3" variant="primary" style={{width: "70%"}}>
                        Create Activity
                </Button>
                <hr></hr>
            </Row>
        </Container>
    );
}

export default ActivityBuilder;