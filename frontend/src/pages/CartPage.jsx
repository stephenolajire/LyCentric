import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Cart from "../components/Cart";
import styles from "../css/CartPage.module.css";
import Payment from "../components/Payment";
import RecentCard from "../components/RecentCard";
// import ProductCard from '../components/Card'
import Empty from "../components/Empty";

const CartPage = () => {
  const { items, fetchRecent, products } = useContext(GlobalContext);

  useEffect(() => {
    fetchRecent();
  }, []);

  if (items.length == 0) {
    return <Empty/>
  }

  return (
    <section>
      <div className={styles.grid}>
        <div className={styles.cartGrid}>
          {items.map((item) => (
            <Cart item={item} key={item.id} />
          ))}
        </div>
        <div>
          <Payment to="/checkout" text="checkout" />
        </div>
      </div>

      {/* Recently Viewed Products */}
      <div>
        <h3 className={styles.recently}>Recently Viewed Products</h3>
      </div>
      <div className={styles.grids}>
        {products.length > 0 ? (
          products.map((product) => (
            <RecentCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.no}>No recently viewed products.</p>
        )}
      </div>
    </section>
  );
};

export default CartPage;
