import React, { useContext } from "react";
import Checkout from "../components/Checkout";
import styles from "../css/CheckoutPage.module.css";
import { GlobalContext } from "../context/GlobalContext";
// import Payment from "../components/Payment";
import PaymentsOption from '../components/PaymentsOption'

const CheckoutPage = () => {
  const { items, total } = useContext(GlobalContext);
  console.log(items);
  return (
    <div>
      <section>
        <div className={styles.grid}>
          <div className={styles.cartGrid}>
            <div className={styles.div}>Cart Summary</div>
            {items.map((item) => (
              <Checkout item={item} key={item.id} />
            ))}
            <div className={styles.CheckoutPrice}>
              <h3>Total:</h3>
              <h3>$ {total.total_cart_price}</h3>
            </div>
          </div>
          <div className={styles.shadowBox}>
            <div className={styles.div}>Payment Option</div>
            <PaymentsOption />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
