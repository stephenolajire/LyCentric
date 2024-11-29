import React, { useContext } from "react";
import style from "../css/DashboardOrder.module.css";
import { GlobalContext } from "../../context/GlobalContext";

const DashboardOrder = () => {
  const { orderHistory, loading } = useContext(GlobalContext);

  // Get the first five orders
  const firstFiveOrders = orderHistory?.slice(0, 5) || [];

  return (
    <section className={style.section}>
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : firstFiveOrders.length > 0 ? (
              firstFiveOrders.map((order, index) => (
                <tr key={index}>
                  <td>{new Date(order.created).toLocaleDateString()}</td>
                  <td>
                    {order.firstName} {order.lastName}
                  </td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.email}</td>
                  <td>{order.status}</td>
                  <td>N{order.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashboardOrder;
