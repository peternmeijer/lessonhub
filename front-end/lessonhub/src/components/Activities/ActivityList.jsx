import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Fuse from 'fuse.js'
import ActivityListItem from "./ActivityListItem"

import Table from 'react-bootstrap/Table';



const ActivityList = (props) => {
    const {title, maxItemsDisplayed, activities, setActivities, setModalActivity, setShowModal, setEditActivity} = props
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searched, setSearched] = useState(false)
    
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

    return (
        <>
        <Container className="mb-4">
            <h5>{title}</h5>
            <hr></hr>
            <Row>
                <InputGroup>
                    <Form.Control
                    placeholder="Search"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Button onClick={()=> {setSearchTerm(""); setSearched(false); setSearchResults([])}}variant="outline-secondary" id="button-addon2">
                        Clear
                    </Button>
                    <Button onClick={() => searchList(searchTerm)}variant="outline-success" id="button-addon3">
                        Search
                    </Button>
                 </InputGroup>
                 
                 {searchResults.length > 0 ? <Table style={{"background" : '#ededed'}} className="mt-3" borderless size="sm">{searchResults.map(activity => <ActivityListItem  key={activity._id} activity={activity} setModalActivity={setModalActivity} setShowModal={setShowModal} activities = {activities} setActivities = {setActivities} setEditActivity={setEditActivity}></ActivityListItem>)}</Table> : searched ? <span style={{"color":"red"}} className="mt-2">No Results.</span> : <></>}
            </Row>
            
            <hr></hr>
            <Row>
                <Table borderless size="sm">
                    {activities.map(activity => 
                        <ActivityListItem key={activity._id} activity={activity} setModalActivity={setModalActivity} setShowModal={setShowModal} activities = {activities} setActivities = {setActivities} setEditActivity={setEditActivity}></ActivityListItem>
                    )}
                </Table>
            </Row>
        </Container>
        
        </>
    )
}

export default ActivityList