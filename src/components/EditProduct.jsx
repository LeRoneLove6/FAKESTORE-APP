import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "products", id), {
      ...form,
      price: parseFloat(form.price),
    });
    alert("Product updated!");
    navigate("/products");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Product</h2>
      <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Title" />
      <input name="price" value={form.price || ""} onChange={handleChange} placeholder="Price" type="number" />
      <input name="description" value={form.description || ""} onChange={handleChange} placeholder="Description" />
      <input name="category" value={form.category || ""} onChange={handleChange} placeholder="Category" />
      <input name="image" value={form.image || ""} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProduct;
