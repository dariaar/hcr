import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-midnight text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyApp</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-lightblue">Home</Link></li>
          <li><Link to="/login" className="hover:text-lightblue">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
