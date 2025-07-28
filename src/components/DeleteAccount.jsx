import React from "react";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const DeleteAccount = () => {
  const handleDelete = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;

    try {
      // Delete user document from Firestore
      await deleteDoc(doc(db, "users", uid));

      // Delete user from Auth
      await deleteUser(auth.currentUser);

      alert("Account deleted.");
      // Redirect to home/login if needed
    } catch (error) {
      console.error("Error deleting account:", error.message);
      alert("Error: " + error.message);
    }
  };

  return <button onClick={handleDelete} style={{ color: "red" }}>Delete Account</button>;
};

export default DeleteAccount;
