import React from "react";
import ProductCard from "./Card";
import styles from '../css/AllProduct.module.css'

const AllProduct = () => {

  return (
    <div className={styles.AllContainer}>
      <div>All Product</div>
      <div className={styles.grid}>
        <ProductCard />
      </div>
    </div>
  );
};

export default AllProduct;
