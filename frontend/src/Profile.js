import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase"; // Import Firebase auth and Firestore
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

function ProfilePage() {
  const [userData, setUserData] = useState(null); // State for storing user data
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get the current authenticated user
      console.log("Current User:", user); // Proveri da li je korisnik autentifikovan

      if (user) {
        try {
          // Query Firestore to get user document by email
          const q = query(
            collection(db, "users"), 
            where("email", "==", user.email)
          );

          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserData(doc.data()); // Set user data
            });
          } else {
            setError("No user data found");
          }
        } catch (err) {
          setError("Error fetching user data: " + err.message); // If error occurs
        }
      } else {
        setError("User is not logged in.");
        navigate("/login"); // Redirect to login page if not authenticated
      }
    };

    fetchUserData();
  }, [navigate]); // Empty array to run only on mount, and include navigate to avoid warnings

  const handleLogout = () => {
    auth.signOut(); // Sign out the user
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-lightest">
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightest">
        <div className="bg-gradient-to-b from-lightblue to-lightest p-8 rounded-2xl shadow-lg w-80 flex flex-col space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {userData ? (
            <>
              <h2 className="text-xl font-semibold text-center">Profile</h2>
              <p>Name: {userData.name}</p>
              <p>Surname: {userData.surname}</p>
              <p>Email: {userData.email}</p>
              <button
                onClick={handleLogout}
                className="bg-midnight text-lightest py-2 rounded-md hover:bg-blue transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-center">Loading user data...</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProfilePage;
