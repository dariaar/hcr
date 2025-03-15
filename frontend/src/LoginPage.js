import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-row space-x-10 items-center justify-center min-h-screen bg-lightest">
      <div className="pr-10 flex flex-col justify-center">
          <h1 className="text-[100px] font-bold font-serif text-black leading-tight">
            Write.<br /> Scan.<br /> Digitize.
          </h1>
        </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center text-midnight">Login</h2>
        <input
          type="text" 
          className="border-2 border-midnight rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border-2 border-midnight rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-midnight text-lightest py-2 rounded-md hover:bg-blue transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
