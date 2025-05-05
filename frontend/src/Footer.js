import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Footer() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

  return (
    <footer className="bg-midnight text-lightest py-4 mt-10 w-full">
      <div className="container mx-auto text-center">
        <div className="flex flex-row space-x-8 justify-between">
            <h1 className="font-serif pl-3">DigiWrite.</h1>
            <ul className="flex flex-col ml-8">
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
            <div className="flex flex-col pr-3">
                <h1>Contact Us</h1>
                <p>+385 123 4567</p>
                <p>info@digiwrite.com</p>

            </div>
        </div>
        <p className="text-sm pt-4">
         Copyright @ 2025 DigiWrite. All Rights Reserved.
        </p>
        
      </div>
    </footer>
  );
}

export default Footer;
