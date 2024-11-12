import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/Card';
import styles from '../css/Home.module.css';
import CategoryList from '../components/CategoryList';
import api from '../constant/api'
import { GlobalContext } from '../context/GlobalContext';
import Spinner from '../components/Spinner'

const Home = () => {
  const {category, products, loading, pagination} = useContext(GlobalContext)

  useEffect(() => {
    const checkUserVerification = async () => {
      try {
        const response = await api.get("api/check_user");
        console.log(response.data.message);
      } catch (error) {
        console.error("Error checking user verification:", error);
      }
    };

    checkUserVerification();
  }, []);

  


  if (loading) {
    return <Spinner/>
  }

  return (
    <main>
      <div className={styles.Catgrid}>
        <CategoryList category={category}/>
        <Hero />
      </div>
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

        {/* Pagination Controls */}
        <div className={styles.paginationControls}>
          {/* Only show "Previous" button if there is a previous page */}
          {pagination.previous && (
            <button 
              onClick={() => fetchData(pagination.previous)} 
              className={styles.prevBtn}
            >
              Previous
            </button>
          )}

          {/* Only show "Next" button if there is a next page */}
          {pagination.next && (
            <button 
              onClick={() => fetchData(pagination.next)} 
              className={styles.nextBtn}
            >
              Next
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
