import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
                <div>
                    <h1>Welcome to Lesson Hub</h1>
                </div>
                <div>
                    <h5>Build and share lesson plans.</h5>
                    <h5>From anywhere. For anyone.</h5>
                </div>
                <div>
                    <Link to="/lessons">
                        <button>Create Lesson</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;