/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo-color.png'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    //used for redirection of requests
    const navigate = useNavigate();

    try{
        const user_accountType = JSON.parse(localStorage.getItem("user")).accountType
        if(user_accountType== "Administrator")
        {
            navigate('/admin');
        }
        else if(user_accountType=="Student")
        {
            navigate('/courses');
        }
    }catch (error)
    {
        navigate('/about');
    }
    //Render home screen with welcome message and link to lesson builder
    return (
        <>
            <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
                <img src={logo}></img>
                <div>
                    <h1>Bring your lesson plans to life</h1>
                </div>
                <div style={{ textAlign: 'center', paddingLeft: '20rem', paddingRight: '20rem' }}>
                    <br></br>
                    <div style={{fontSize: '25px'}}>
                        <p>Lesson Hub helps community centre instructors build more effective lessons for their participants. Share your unique lesson plans filled with creative activities for your local community centre today.</p>
                    </div>
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