import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    return (
        <nav className="bg-midnight text-lightest font-serif py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold px-4">DigiWrite</h1>
                <ul className="flex space-x-6 px-4">
                    <li>
                        <Link 
                            to={user ? "/personal-page" : "/login"} 
                            className="hover:text-lightblue"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="hover:text-lightblue">About Us</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="hover:text-lightblue">Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
