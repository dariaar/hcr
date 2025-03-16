import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LangingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import PersonalPage from "./PersonalPage";
import AboutUs from "./AboutUs";
import ProfilePage from "./Profile";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LangingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/personal-page" element={<PersonalPage/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;