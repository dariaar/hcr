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

        <div className="flex flex-col items-center justify-center space-y-4 px-4 self-center">

        <input type="text" className="border-2 rounded-md px-2 py-2" placeholder="Username" onChange={ (e) => setUsername(e.target.value)}/>
        <input type="password" className="border-2 rounded-md px-2 py-2" placeholder="Password" onChange={ (e) => setPassword(e.target.value)}/>

        <button onClick={handleLogin}>Login</button>
        </div>

    );
}

export default LoginPage;