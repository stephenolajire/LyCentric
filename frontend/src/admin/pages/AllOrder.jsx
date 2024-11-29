import React, { useContext } from "react";
import style from "../css/DashboardOrder.module.css";
import { GlobalContext } from "../../context/GlobalContext";

const AllOrder = () => {
  const { allOrder, loading, fetchOrders, orderPagination } =
    useContext(GlobalContext);

  return (
    <div className={style.AllOrder}>
      <section className={style.section}>
        <h1 style={{ fontSize: "2.5rem", color: "#131313", opacity: "0.7" }}>
          All Orders
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
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : allOrder.length > 0 ? (
                allOrder.map((order, index) => (
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

        <div className={style.paginationControls}>
          {/* Only show "Previous" button if there is a previous page */}
          {orderPagination.previous && (
            <button
              onClick={() => fetchOrders(orderPagination.previous)}
              className={style.prevBtn}
            >
              Previous
            </button>
          )}

          {/* Only show "Next" button if there is a next page */}
          {orderPagination.next && (
            <button
              onClick={() => fetchOrders(orderPagination.next)}
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

export default AllOrder;
