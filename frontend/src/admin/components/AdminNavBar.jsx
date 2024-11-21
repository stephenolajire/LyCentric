import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "../css/AdminNavBar.module.css";
import logo from "../../assets/image4.png";
import {
  MdCalendarViewMonth,
  MdFeedback,
  MdPersonOutline,
  MdOutlineSubtitles,
  MdPayments,
  MdPayment,
} from "react-icons/md";
import { GlobalContext } from "../../context/GlobalContext";

const AdminNavBar = () => {
  const { open } = useContext(GlobalContext);

  return (
    <nav className={`${style.adminNav} ${open ? style.open : style.close}`}>
      <div>
        <p className={style.admin}>Lycentric Dashboard</p>
        <div className={style.adminDetails}>
          <img src={logo} alt="Admin Profile" />
          <p className={style.name}>Stephen Olajire</p>
        </div>
      </div>
      <div className={style.outerpage}>
        <p className={style.pages}>Pages</p>
        <div>
          <Link to="/admin">
            <div className={style.linkContainer}>
              <MdCalendarViewMonth className={style.icon} />
              <p className={style.dashboard}>Dashboard</p>
            </div>
          </Link>
          <Link to="/admin/orders">
            <div className={style.linkContainer}>
              <MdOutlineSubtitles className={style.icon} />
              <p className={style.dashboard}>All Orders</p>
            </div>
          </Link>
          <Link to="/admin/completed">
            <div className={style.linkContainer}>
              <MdPayments className={style.icon} />
              <p className={style.dashboard}>Completed Orders</p>
            </div>
          </Link>
          <Link to="/admin/pending">
            <div className={style.linkContainer}>
              <MdPayment className={style.icon} />
              <p className={style.dashboard}>Pending Orders</p>
            </div>
          </Link>
          <Link to="/admin/complaints">
            <div className={style.linkContainer}>
              <MdFeedback className={style.icon} />
              <p className={style.dashboard}>Complaints</p>
            </div>
          </Link>
          <Link to="/admin/profile">
            <div className={style.linkContainer}>
              <MdPersonOutline className={style.icon} />
              <p className={style.dashboard}>Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
