import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function ImportProducts() {
  const [loading, setLoading] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [error, setError] = useState(null);

  const importProducts = async () => {
    setLoading(true);
    setSuccessCount(0);
    setError(null);

    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();

      const productsCollection = collection(db, 'products');

      let count = 0;
      for (const product of products) {
        const newProduct = {
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        };

        await addDoc(productsCollection, newProduct);
        count++;
      }

      setSuccessCount(count);
    } catch (err) {
      console.error('Error importing products:', err);
      setError('Failed to import products.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Import Products from FakeStore API</h2>
      <button className="btn btn-primary" onClick={importProducts} disabled={loading}>
        {loading ? 'Importing...' : 'Start Import'}
      </button>
      {successCount > 0 && (
        <div className="alert alert-success mt-3">
          Successfully imported {successCount} products!
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}
    </div>
  );
}

export default ImportProducts;
