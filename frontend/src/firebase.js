// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtDScmjSFspKqtbgfxjXkL2AEXDOIEaxg",
  authDomain: "hrc-dipl.firebaseapp.com",
  projectId: "hrc-dipl",
  storageBucket: "hrc-dipl.firebasestorage.app",
  messagingSenderId: "159012660735",
  appId: "1:159012660735:web:150a5c0dc1b6c7fd2e33ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db };