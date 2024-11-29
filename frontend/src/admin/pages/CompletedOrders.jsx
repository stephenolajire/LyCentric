import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "../css/DashboardOrder.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import api from "../../constant/api";
import { Link } from "react-router-dom";

const CompletedOrder = () => {
  const { allPaid, loading, fetchPaidOrders, allPaidPagination } =
    useContext(GlobalContext);

  // Function to handle send button click
  const handleSendOrder = async (orderId) => {
    try {
      const response = await api.post("api/send", {
        order_id: orderId,
      });
      console.log(response.data.message); // Log the response message
      fetchPaidOrders(); // Refetch the orders to reflect the updated state
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  const handleDeliverOrder = async (orderId) => {
    try {
      const response = await api.post("api/deliver", {
        order_id: orderId,
      });
      console.log(response.data.message); // Log the response message
      fetchPaidOrders(); // Refetch the orders to reflect the updated state
    } catch (error) {
      console.error("Error delivering order:", error);
    }
  };

  useEffect(() => {
    fetchPaidOrders();
  }, []);

  return (
    <div className={style.AllOrder}>
      <section className={style.section}>
        <h1 style={{ fontSize: "2.5rem", color: "#131313", opacity: "0.7" }}>
          Paid Orders
        </h1>
        <div className={style.orderHistory}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Send Order</th>
                <th>Deliver Order</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : allPaid.length > 0 ? (
                allPaid.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link to={`/admin/vieworder/${order.id}`}>
                       {new Date(order.created).toLocaleDateString()}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/vieworder/${order.id}`}>
                        {order.firstName} {order.lastName}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/vieworder/${order.id}`}>
                        {order.phoneNumber}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/vieworder/${order.id}`}>
                        {order.email}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/vieworder/${order.id}`}>
                        {order.status}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/vieworder/${order.id}`}>
                        N{order.amount}
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleSendOrder(order.id)}
                        className={style.sent}
                        disabled={order.delivery === "sent" || order.delivery === "delivered"} 
                        style={{
                          opacity: order.delivery === "sent" || order.delivery === "delivered" ? 0.5 : 1,
                        }}
                      >
                        {order.delivery === "sent" || order.delivery === "delivered" ? "Sent" : "Send"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeliverOrder(order.id)}
                        className={style.delivered}
                        disabled={order.delivery === "delivered"} // Disable if order is already delivered
                        style={{
                          opacity: order.delivery === "delivered" ? 0.5 : 1,
                        }}
                      >
                        {order.delivery === "delivered"
                          ? "Delivered"
                          : "Deliver"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={style.paginationControls}>
          {/* Only show "Previous" button if there is a previous page */}
          {allPaidPagination.previous && (
            <button
              onClick={() => fetchPaidOrders(allPaidPagination.previous)}
              className={style.prevBtn}
            >
              Previous
            </button>
          )}

          {/* Only show "Next" button if there is a next page */}
          {allPaidPagination.next && (
            <button
              onClick={() => fetchPaidOrders(allPaidPagination.next)}
              className={style.nextBtn}
            >
              Next
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default CompletedOrder;
