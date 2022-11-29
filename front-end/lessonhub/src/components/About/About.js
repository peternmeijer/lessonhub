import React from "react";
import logo from '../../assets/logo-color.png'
import learn from '../../assets/learn.jpeg'

const About = () => {
    return (
        <>
            <div style={{ display: 'flex', height: '90%' }}>
                <div style={{ width: '65%', position: 'absolute', left: '65%', top: '50%', transform: 'translate(-50%, -50%)', paddingLeft: '10rem', paddingRight: '5rem'}}>
                    <div style={{ textAlign: 'center', marginTop: '5em'}}>
                        <img src={logo}></img>
                        <div>
                            <p>Community centres offer a wide variety of programs for local residents to enjoy.
                                These range from activities like swimming lessons, sports clubs and other recreational programs.
                                However, overtime, instructors who teach these programs will eventually leave, taking a vast majority of their experience with them.
                                When new instructors are hired to take over for the outgoing instructors, they don’t have the same level of experience, leading to a decrease in the quality of programs.
                            </p>                
                            <p><b>Lesson Hub was created to solve this problem.</b></p>
                            <p>With Lesson Hub, instructors can develop and publish lesson plans and activities with others that they find work particularly well to teach difficult skills or teach skills in a very effective manner.</p>
                            <p>Start by simply creating activities, assign the activities to a lesson, and share your knowledge with the world.</p>
                            <p></p>
                            <p>&copy; Peter Meijer, Nolan Morris, Nathan Pogue 2022</p>
                        </div>
                    </div>
                </div>
                <img src={learn} style={{ width: '35%', backgroundRepeat: 'no-repeat', position: "absolute", left: "0px", height: '90%' }}></img>
            </div>
        </>
    );
}

export default About;