/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

/**
 * THE SOURCE CODE FOR USING A USER PROVIDER WAS REFERENCED FROM THIS ARTICLE:
 * ALL CREDIT GOES TO CREATOR
 * https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/
 */

import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./contexts/user.context";
import Navigation from "./components/Navigation/Navigation"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Calendar from "./components/Calendar/Calendar";
import Courses from "./components/Courses/Courses";
import Lessons from "./components/Lessons/Lessons";
import LessonBuilder from "./components/LessonBuilder/LessonBuilder";
import Activities from "./components/Activities/Activities";
import ActivityBuilder from "./components/ActivityBuilder/ActivityBuilder";
import Admin from "./components/Admin/Admin";
import About from "./components/About/About";
import Register from "./components/Register/Register"
function App() {
  
  return (
    <div className="App">
      <style type="text/css">
        {`
    .btn-primary {
      background-color: #fadfa8 !important;
      color: #664D1B;
      border-color: #fadfa8 !important;
    }
    .btn-primary:hover {
      background-color: #fadfa8 !important;
      color: black;
      border-color: #fadfa8 !important;
      font-weight: bold;
    }

    .btn-logout{
      background-color: white !important;
      color: #664D1B;
      border-color: #fadfa8 !important;
    }

    
    `}
      </style>
      <BrowserRouter>
        {/* We are wrapping our whole app with UserProvider so that */}
        {/* our user is accessible through out the app from any page*/}
        <UserProvider>
          <Navigation />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/about" element={<About />} />
            {/* We are protecting our Home Page from unauthenticated */}
            {/* users by wrapping it with PrivateRoute here. */}
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/calendar" element={<Calendar />} />
              <Route exact path="/courses" element={<Courses />} />
              <Route exact path="/lessons" element={<Lessons />} />
              <Route exact path="/lessonbuilder" element={<LessonBuilder />} />
              <Route exact path="/activities" element={<Activities />} />
              <Route exact path="/activitybuilder" element={<ActivityBuilder />} />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/about" element={<About />} />
            </Route>
            
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
