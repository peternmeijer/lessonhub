/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React from "react";
import { getLessons } from "../Utils/apiCalls";
import LessonCardList from "../LessonCardList/LessonCardList";
import SearchBox from "../SearchBox/SearchBox";

class Lessons extends React.Component {

    constructor() {
        super();
        this.state = {
            lessonData: [],
            searchfield: ''
        }
    }

    //fetch lesson data and populate to each lesson card
    componentDidMount() {
        getLessons((response)=>{
            this.setState({lessonData: response.data.lessons})
        },
        (error)=>{
            console.log(error)
        })
        
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {

        const { lessonData, searchfield } = this.state;
		const filteredLessons = lessonData.filter(lessonData =>{
			return lessonData.title.toLowerCase().includes(searchfield.toLowerCase());
		})

        //Render lessons on page and the filtered cards when user searches
        return (
            <div className='tc'>
                <br></br>
                <h1>Current Lessons</h1>
                <br></br>
                <SearchBox searchChange={this.onSearchChange} />
                <br></br>
                <LessonCardList lessonData={filteredLessons} />
            </div>

        );

    }
}

export default Lessons;