import React from 'react'
import { Link } from 'react-router-dom';
import style from '../css/AdminNavBar.module.css'
import logo from '../../assets/image4.png'
import { MdCalendarViewMonth } from "react-icons/md";
import { MdFeedback, MdPersonOutline, MdOutlineSubtitles, MdPayments, MdPayment } from "react-icons/md";

const AdminNavBar = () => {
  return (
    <nav className={style.adminNav}>
      <div>
        <p className={style.admin}>Lycentric Dashboard</p>
        <div className={style.adminDetails}>
          <img src={logo} alt="admin image" />
          <p className={style.name}>Stephen Olajire</p>
        </div>
      </div>
      <div className={style.outerpage}>
        <p className={style.pages}>pages</p>
        <div>
          <Link>
            <div className={style.linkContainer}>
              <MdCalendarViewMonth className={style.icon} />
              <p className={style.dashboard}>Dashboard</p>
            </div>
          </Link>
          <Link to="/admin/orders">
            <div className={style.linkContainer}>
              <MdOutlineSubtitles className={style.icon} />
              <p className={style.dashboard}>all orders</p>
            </div>
          </Link>
          <Link>
            <div className={style.linkContainer}>
              <MdPayments className={style.icon} />
              <p className={style.dashboard}>completed orders</p>
            </div>
          </Link>
          <Link>
            <div className={style.linkContainer}>
              <MdPayment className={style.icon} />
              <p className={style.dashboard}>Pending Orders</p>
            </div>
          </Link>
          <Link>
            <div className={style.linkContainer}>
              <MdFeedback className={style.icon} />
              <p className={style.dashboard}>Complaints</p>
            </div>
          </Link>
          <Link>
            <div className={style.linkContainer}>
              <MdPersonOutline className={style.icon} />
              <p className={style.dashboard}>Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavBar