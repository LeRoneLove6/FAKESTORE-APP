import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchUser();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Address:</strong> {userData.address}</p>
    </div>
  );
};

export default UserProfile;
