import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/Card";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "../css/Category.module.css";
import api from "../constant/api";
import { GlobalContext } from "../context/GlobalContext";


const Audience = () => {
  const { categoryId, audienceId } = useParams(); // Capture both params
  const [products, setProducts] = useState([]);

  const {audience, fetchAudience} = useContext(GlobalContext)
  

  // Fetch products based on category and audience
  const fetchProducts = async () => {
    try {
      const response = await api.get(
        `products/${categoryId}/${audienceId}`
      );
      if (response.data) {
        console.log(response.data);
        setProducts(response.data);
      } else {
        console.error("Error: No response data");
      }
    } catch (err) {
      console.error("Error fetching product data:", err.message);
    }
  };

  useEffect(() => {
    fetchAudience();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [categoryId, audienceId]);

  return (
    <section>
      <div className={styles.flex}>
        <Link to={`/category/${categoryId}`}>
          <h3 className={styles.all}>All Products</h3>
        </Link>
        <div className={styles.buttonCat}>
          {audience.map((item) => (
            <Link
              key={item.id}
              to={`/category/${categoryId}/audience/${item.id}`}
            >
              <button key={item.id}>{item.name}</button>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.grid}>
        {products.length === 0 ? (
          <div className={styles.item}>No items are available</div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Audience;
