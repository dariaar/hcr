import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-midnight text-lightest font-serif py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold px-4">DigiWrite</h1>
        <ul className="flex space-x-6 px-4">
          <li><Link to="/personal-page" className="hover:text-lightblue">Home</Link></li>
          <li><Link to="/login" className="hover:text-lightblue">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
