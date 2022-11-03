import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Calendar from "./components/Calendar/Calendar";
import Lessons from "./components/Lessons/Lessons";
import About from "./components/About/About";

import ParticlesBg from "particles-bg";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <ParticlesBg type="cobweb" num={200} color="#FFFFFF" bg={true} />
        <Navigation />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='/lessons' element={<Lessons/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
