import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LangingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import PersonalPage from "./PersonalPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LangingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/personal-page" element={<PersonalPage/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;