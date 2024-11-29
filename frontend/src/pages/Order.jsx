import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/Order.module.css";
import api from "../constant/api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("api/order")
        console.log(response.data)
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className={styles.loading}>Loading your orders...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Orders</h2>
      {orders.length === 0 ? (
        <p className={styles.empty}>You have no orders yet.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Items</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.created).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[order.status.toLowerCase()]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.product_name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.items
                      .reduce(
                        (total, item) => total + item.quantity * item.price,
                        0
                      )
                      .toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
