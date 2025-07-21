import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const getCartFromStorage = () => {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = getCartFromStorage();
    setCartItems(cart);

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotal(totalPrice);
  }, []);

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setPlacingOrder(true);

    try {
      const order = {
        userId: user.uid,
        items: cartItems,
        totalPrice: total,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), order);

      sessionStorage.removeItem("cart");
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("❌ Something went wrong. Try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <span>{item.title} × {item.quantity || 1}</span>
                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <h4>Total: ${total.toFixed(2)}</h4>

          <button
            className="btn btn-primary"
            onClick={handlePlaceOrder}
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
