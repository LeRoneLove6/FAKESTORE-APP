// src/components/Logout.jsx
import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Logout = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("You have been logged out.");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
