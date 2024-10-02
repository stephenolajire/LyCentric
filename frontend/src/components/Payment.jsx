import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styles from "../css/Payment.module.css";
import { Link } from "react-router-dom";

const Payment = () => {
  const { total } = useContext(GlobalContext);
  return (
    <div className={styles.grid}>
      <div className={styles.outer}>
        <h3 className={styles.summary}>Cart Summary</h3>
        <div className={styles.subTotal}>
          <p>Subtotal</p>
          <h3>$ {total.total_cart_price}</h3>
        </div>
        <p className={styles.delivery}>Delivery fee is not included</p>
        
        <Link to='/checkout'><button>Checkout</button></Link>
      </div>
      <div className={styles.outer2}>
        <h3>Return Policy</h3>
        <p>There is no return after a week</p>
      </div>
    </div>
  );
};

export default Payment;
