import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      localStorage.setItem("auth", "true");
      navigate("/personal-page");
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login error:", err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-row space-x-10 items-center justify-center min-h-screen bg-lightest">
      <div className="pr-10 flex flex-col justify-center">
        <h1 className="text-[100px] font-bold font-serif text-midnight leading-tight">
          Write.<br /> Scan.<br /> Digitize.
        </h1>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-center text-midnight">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          className="border-2 border-midnight rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border-2 border-midnight rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
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