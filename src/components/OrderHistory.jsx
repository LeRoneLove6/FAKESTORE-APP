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

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="container mt-4">
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order.id} className="list-group-item">
              <p>
                <strong>Order ID:</strong> {order.id}<br />
                <strong>Date:</strong>{" "}
                {order.createdAt && order.createdAt.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : "Unknown"}<br />
                <strong>Total:</strong> {formatCurrency(order.totalPrice)}
              </p>

              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} - {formatCurrency(item.price)} × {item.quantity}
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
