import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo-color.png'
import { Button } from '@mui/material';

const Home = () => {
    return (
        <>
            <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
                <img src={logo}></img>
                <div>
                    <h1>Welcome to Lesson Hub</h1>
                </div>
                <div style={{ textAlign: 'center', paddingLeft: '10rem', paddingRight: '10rem' }}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                </div>
                <div>
                    <Link to="/lessonbuilder">
                        <Button variant="contained">Create Lesson</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;