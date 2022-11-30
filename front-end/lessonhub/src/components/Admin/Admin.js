import React from "react";
import logo from '../../assets/logo-color.png'

const Admin = () => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%', position: 'absolute', right: '0em', height: '100%', paddingTop: '100px'}}>
                    <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem' }}>
                        <img src={logo}></img>
                        <div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                            <p>&copy; Peter Meijer, Nolan Morris, Nathan Pogue 2022</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Admin;