import React from "react";

const Welcome = () => {

    return (
        <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <div>
                <h1>Welcome to Lesson Hub</h1>
            </div>
            <div>
                <p>Blah Blah Blah subheading here</p>
            </div>
            <div>
                <button>Create Lesson</button>
            </div>
        </div>
    );
}

export default Welcome;