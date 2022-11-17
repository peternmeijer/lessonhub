import React from "react";
import ParticlesBg from "particles-bg";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./contexts/user.context";
import Navigation from "./components/Navigation/Navigation"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Signup from "./components/Signup/Signup";
import Calendar from "./components/Calendar/Calendar";
import Lessons from "./components/Lessons/Lessons";
import Activity from "./components/Activity/Activity";
import About from "./components/About/About";


function App() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={200} color="#FFFFFF" bg={true} />
      <BrowserRouter>
        {/* We are wrapping our whole app with UserProvider so that */}
        {/* our user is accessible through out the app from any page*/}
        <UserProvider>
          <Navigation />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            {/* We are protecting our Home Page from unauthenticated */}
            {/* users by wrapping it with PrivateRoute here. */}
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/calendar" element={<Calendar />} />
              <Route exact path="/lessons" element={<Lessons />} />
              <Route exact path="/activity" element={<Activity />} />
              <Route exact path="/about" element={<About />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
