import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase"; // Firebase auth i Firestore
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [ocrTexts, setOcrTexts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Dohvati korisničke podatke koristeći UID
          const userRef = doc(db, "users", user.uid); // Koristi UID za dohvat dokumenta korisnika
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setError("No user data found");
          }

          // Dohvati OCR tekstove iz podkolekcije (preko UID-a korisnika)
          const ocrTextsCol = collection(db, "users", user.uid, "ocrTexts");
          const ocrTextsSnapshot = await getDocs(ocrTextsCol);

          const texts = ocrTextsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOcrTexts(texts); // Spremi OCR tekstove u stanje
        } catch (err) {
          setError("Error fetching user data: " + err.message);
        }
      } else {
        setError("User is not logged in.");
        navigate("/login"); // Ako nije prijavljen, preusmjeri na login
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login"); // Preusmjeravanje na login stranicu nakon odjave
  };

  const handleDownload = (textContent, id) => {
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `ocr_text_${id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-lightest">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightest px-4 py-8">
        <div className="bg-gradient-to-b from-lightblue to-lightest p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          {userData ? (
            <>
              <h2 className="text-xl font-semibold text-center">Profile</h2>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Surname:</strong> {userData.surname}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <button
                onClick={handleLogout}
                className="bg-midnight text-lightest py-2 rounded-md hover:bg-blue transition duration-300 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-center">Loading user data...</p>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Saved OCR Texts</h3>
            {ocrTexts.length === 0 ? (
              <p>No saved texts found.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {ocrTexts.map((text) => (
                  <div
                    key={text.id}
                    className="bg-lightest p-4 rounded-md shadow-md flex justify-between items-center"
                  >
                    <span className="text-sm">
                      {text.ocrText.slice(0, 50)}...
                    </span> {/* Prikazivanje prvih 50 znakova OCR teksta */}
                    <div className="flex flex-col space-y-2 items-end">
                      <a
                          href={`/edit/${text.id}`}
                          className="text-midnight hover:underline"
                        >
                          Edit
                        </a>
                        <button
                          onClick={() => handleDownload(text.ocrText, text.id)}
                          className="text-midnight hover:underline"
                        >
                          Download
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
