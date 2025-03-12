import React from "react";
import { useNavigate } from "react-router-dom";

function LangingPage() {
    const navigate = useNavigate();


    return (
        <div className="bg-lightest min-h-screen flex items-center justify-center">
        <div className="text-center border-2 border-blue px-4 py-7 rounded-lg">
          <h1 className="text-midnight text-4xl font-bold mb-6">Welcome to HCR</h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue text-lightest py-2 px-4 rounded-md hover:bg-lightblue transition"
          >
            Login
          </button>
        </div>
      </div>
    );

}

export default LangingPage;