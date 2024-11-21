import React, { useContext } from "react";
import style from "../css/Dashboard.module.css";
import {
  MdLocalShipping,
  MdShoppingCart,
  MdMonetizationOn,
  MdPeopleOutline,
} from "react-icons/md";
import MonthlyEarnings from "../components/MonthlyEarnings";
import DashboardOrder from "../components/DashboardOrder";

import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const { orderHistory, totalUsers } = useContext(GlobalContext); // Ensure GlobalContext provides orderHistory

  // Filter completed orders
  const completedOrders =
    orderHistory?.filter((order) => order.status === "completed") || [];

  // Count completed orders
  const completedOrderCount = completedOrders.length;

  // Count all orders
  const orderCount = orderHistory ? orderHistory.length : 0;

  // Sum up the amounts of completed orders
  const totalCompletedAmount = completedOrders.reduce(
    (sum, order) => sum + parseFloat(order.amount || 0),
    0
  );

  return (
    <main className={style.main}>
      <div className={style.container}>
        <h3 className={style.analytic}>Analytic Dashboard</h3>
      </div>
      <div className={style.containerGrid}>
        <div className={style.leftGrid}>
          {/* Sales */}
          <Link>
            <div className={style.innerGrid}>
              <p className={style.sales}>Sales</p>
              <p className={style.number}>{completedOrderCount}</p>
              <p className={style.monthly}>all sales</p>
              <div className={style.div}>
                <MdLocalShipping className={style.icon} />
              </div>
            </div>
          </Link>
          {/* Orders */}
          <Link to="/admin/orders">
            <div className={style.innerGrid}>
              <p className={style.sales}>Orders</p>
              <p className={style.number}>{orderCount}</p>
              <p className={style.monthly}>all orders</p>
              <div className={style.div}>
                <MdShoppingCart className={style.icon} />
              </div>
            </div>
          </Link>
          {/* Earnings */}
          <div className={style.innerGrid}>
            <p className={style.sales}>Earnings</p>
            {totalCompletedAmount>= 1000000 ? (
              <p className={style.number}>
                {(totalCompletedAmount / 1000000).toFixed(2)}M
              </p>
            ) : totalCompletedAmount >= 1000 ? (
              <p className={style.number}>{(totalCompletedAmount / 1000).toFixed(2)}K</p>
            ) : (
              <p className={style.number}>{totalCompletedAmount}</p>
            )}
            <p className={style.monthly}>All earnings</p>
            <div className={style.div}>
              <MdMonetizationOn className={style.icon} />
            </div>
          </div>
          {/* Customers */}
          <div className={style.innerGrid}>
            <p className={style.sales}>Customers</p>
            {totalUsers >= 1000000 ? (
              <p className={style.number}>
                {(totalUsers / 1000000).toFixed(1)}M
              </p>
            ) : totalUsers >= 1000 ? (
              <p className={style.number}>{(totalUsers / 1000).toFixed(1)}K</p>
            ) : (
              <p className={style.number}>{totalUsers}</p>
            )}
            <p className={style.monthly}>All Customers</p>
            <div className={style.div}>
              <MdPeopleOutline className={style.icon} />
            </div>
          </div>
        </div>
        <div className={style.rightGrid}>
          <h3 className={style.graph}>All Earnings</h3>
          <MonthlyEarnings />
        </div>
      </div>
      <div className={style.section}>
        <h3 className={style.order}>Order History</h3>
        <DashboardOrder />
      </div>
    </main>
  );
};

export default Dashboard;
