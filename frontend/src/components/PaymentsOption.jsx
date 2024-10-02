import React from "react";
import { Link } from "react-router-dom";
import styles from '../css/PaymentsOption.module.css'

const PaymentsOption = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.outer}>
        <Link to="/checkout">
          <button className={styles.b1}>Flutterwave</button>
        </Link>
        <Link to="/checkout">
          <button className={styles.b2}>Paystack</button>
        </Link>
        <Link to="/checkout">
          <button className={styles.b3}>Olaiya Dotun</button>
        </Link>
      </div>

    </div>
  );
};

export default PaymentsOption;
