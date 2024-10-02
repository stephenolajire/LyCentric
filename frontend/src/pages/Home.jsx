import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/Card';
import styles from '../css/Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/allproduct');
      if (response) {
        console.log(response.data);
        setProducts(response.data);
      } else {
        console.error('Error: No response data');
      }
    } catch (err) {
      console.error('Error fetching product data:', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <Hero />
      <section>
        <h3 className={styles.all}>All Products</h3>
        <div className={styles.grid}>
          {
            products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
              />
            ))
          }
        </div>
      </section>
    </main>
  );
};

export default Home;
