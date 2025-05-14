import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <nav className="bg-midnight text-lightest font-serif py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                
                <Link to="/" className="text-xl font-bold">
                DigiWrite.
                </Link>
                
                {/* Hamburger button */}
                <button
                    className="md:hidden text-lightest text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>

                {/* Desktop menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link to={user ? "/personal-page" : "/"} className="hover:text-lightblue">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="hover:text-lightblue">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="hover:text-lightblue">
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col items-center space-y-4 mt-4">
                    <li>
                        <Link to={user ? "/personal-page" : "/"}  className="hover:text-lightblue" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="hover:text-lightblue" onClick={() => setMenuOpen(false)}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="hover:text-lightblue" onClick={() => setMenuOpen(false)}>
                            Profile
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
