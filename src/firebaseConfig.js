// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbBaKq2xWJ0anorVJ0DVZOwTbYs7eXT7E",
  authDomain: "fakestore-app-e1a78.firebaseapp.com",
  projectId: "fakestore-app-e1a78",
  storageBucket: "fakestore-app-e1a78.appspot.com", // ❗ Fix typo here: "firebasestorage.app" → "appspot.com"
  messagingSenderId: "508518752995",
  appId: "1:508518752995:web:573baf162c95e0c7dfdbd6",
  measurementId: "G-LMMWQ4M97H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: can be removed if unused
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

