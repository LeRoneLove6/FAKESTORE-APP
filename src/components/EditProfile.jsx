import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const EditProfile = () => {
  const [form, setForm] = useState({ name: "", address: "" });

  useEffect(() => {
    const fetchData = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setForm({ name: data.name, address: data.address });
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      name: form.name,
      address: form.address,
    });
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Profile</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
