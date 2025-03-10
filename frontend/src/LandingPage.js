import React from "react";
import { useNavigate } from "react-router-dom";

function LangingPage() {
    const navigate = useNavigate();


    return (
    <div className="LandingPage">
        <h1>Welcome</h1>
        <button onClick={ () => navigate("/login")}>Login</button>
    </div>

    );

}

export default LangingPage;