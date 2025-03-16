import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import image2 from "./images/image2.jpg";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-lightest">
            <Navbar />
            <div className="flex flex-row justify-center items-center min-h-[80vh] px-10">
                
            <div className="w-1/2 text-center pl-20">
             <h1 className="text-4xl font-bold text-midnight mb-4">
                 Welcome to DigiWrite.
             </h1>
             <p className="text-lg text-midnight">
             Tired of losing important notes or struggling to organize handwritten documents? With DigiWrite.,
              you can effortlessly scan, digitize, and store your handwritten text in seconds. 
             Say goodbye to clutter and hello to a smarter, more efficient way of managing your notes.
             </p>
             <button 
             onClick={() => navigate("/login")} 
             className="bg-midnight text-lightest px-6 py-3 mt-3 rounded-lg text-lg font-semibold shadow-md hover:bg-lightblue transition duration-300"
            >
                Try Now
             </button>
            </div>

                
                <div className="w-1/2 flex justify-center">
                    <img src={image2} alt="Handwriting recognition" className="max-w-lg rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
