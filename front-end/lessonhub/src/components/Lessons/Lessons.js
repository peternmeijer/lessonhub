import React from "react";
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

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ lessonData: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {

        const { lessonData, searchfield } = this.state;
		const filteredLessons = lessonData.filter(lessonData =>{
			return lessonData.name.toLowerCase().includes(searchfield.toLowerCase());
		})

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