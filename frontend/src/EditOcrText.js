import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase"; // Firebase imports
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";

function EditOcrText() {
  const { textId } = useParams(); // ID teksta iz URL-a
  const [ocrText, setOcrText] = useState(""); // OCR sadržaj
  const [loading, setLoading] = useState(true); // Učitavanje
  const [error, setError] = useState(null); // Greške
  const navigate = useNavigate(); // Navigacija

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && textId) {
        try {
          const textRef = doc(db, "users", user.uid, "ocrTexts", textId);
          const docSnap = await getDoc(textRef);

          if (docSnap.exists()) {
            setOcrText(docSnap.data().ocrText);
          } else {
            setError("OCR text not found.");
          }
        } catch (err) {
          setError("Error fetching OCR text: " + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        // Korisnik nije prijavljen
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Clean-up listener
  }, [textId, navigate]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const textRef = doc(db, "users", user.uid, "ocrTexts", textId);
        await updateDoc(textRef, {
          ocrText: ocrText,
          timestamp: new Date()
        });
        navigate("/profile"); // Povratak na profil
      } catch (err) {
        setError("Error saving OCR text: " + err.message);
      }
    }
  };


  

  return (
    <div className="min-h-screen bg-lightest">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-gradient-to-b from-lightblue to-lightest p-8 rounded-2xl shadow-lg w-96 flex flex-col space-y-4">
          {loading ? (
            <p>Loading OCR text...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center">Edit OCR Text</h2>
              <textarea
                value={ocrText}
                onChange={(e) => setOcrText(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md"
                rows="10"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate("/profile")}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleSave}
                  className="bg-midnight text-lightest py-2 px-4 rounded-md hover:bg-blue transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditOcrText;
