import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}<br />
              <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} - ${item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
