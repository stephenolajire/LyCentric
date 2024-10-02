import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Cart from "../components/Cart";
import styles from "../css/CartPage.module.css";
import Payment from "../components/Payment";

const CartPage = () => {
  const { items } = useContext(GlobalContext);
  console.log(items);

  return (
    <section>
      <div className={styles.grid}>
        <div className={styles.cartGrid}>
          {items.map((item) => (
            <Cart item={item} key={item.id}/>
          ))}
        </div>
        <div>
          <Payment/>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
