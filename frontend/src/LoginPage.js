import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "admin" && password === "password") {
          localStorage.setItem("auth", "true");
          navigate("/personal-page");
        } else {
          alert("Invalid credentials");
        }
      };



    return (

        <div className="LoginPage">

        <input type="text" placeholder="Username" onChange={ (e) => setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value)}/>

        <button onClick={handleLogin}>Login</button>
        </div>

    );
}

export default LoginPage;