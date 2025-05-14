import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import image2 from "./images/image2.jpg";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function LandingPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-lightest">
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-center items-center min-h-[80vh] px-4 lg:px-10 py-10 gap-10">
                
                <div className="w-full lg:w-1/2 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-midnight mb-4">
                        Welcome to DigiWrite.
                    </h1>
                    <p className="text-base sm:text-lg text-midnight mb-4">
                        Tired of losing important notes or struggling to organize handwritten documents?
                        With DigiWrite, you can effortlessly scan, digitize, and store your handwritten text in seconds.
                        Say goodbye to clutter and hello to a smarter, more efficient way of managing your notes.
                    </p>
                    <button 
                        onClick={() => navigate(user ? "/personal-page" : "/login")}
                        className="bg-midnight text-lightest px-6 py-3 mt-2 rounded-lg text-base font-semibold shadow-md hover:bg-lightblue transition duration-300"
                    >
                        Try Now
                    </button>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center">
                    <img src={image2} alt="Handwriting recognition" className="w-full max-w-md rounded-lg shadow-lg" />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default LandingPage;
