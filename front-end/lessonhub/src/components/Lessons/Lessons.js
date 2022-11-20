import React from "react";
import LessonCardList from "../LessonCardList/LessonCardList";

class Lessons extends React.Component {

    constructor(){
		super();
		this.state = {
			lessonData: [],
		}
	}

    componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({lessonData: users}));
	}

    render() {

        const { lessonData } = this.state;

        return (
            <div className='tc'>
                <LessonCardList lessonData={lessonData} />
            </div>

        );

    }
}

export default Lessons;