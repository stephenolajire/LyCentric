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
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [category, setCategory] = useState([])
  const {link1, link2} = useContext(GlobalContext)
  const [loading, setLoading] = useState (true)

  const fetchCategory = async () => {
    setLoading (true)
    const response = await api.get("api/category")
    try{
      if (response){
        console.log(response.data)
        setCategory(response.data)
      }else{
        console.log(response.error)
      }
    }catch(err){
      console.log(err.message)
    }finally {
      setLoading(false)
    }
  }

  useEffect (() => {
    fetchCategory()
  }, [])

  const fetchData = async (url = `${link2}/api/allproduct`) => {
    try {
      const response = await axios.get(url);
      if (response) {
        setProducts(response.data.results);  // Update products with the results
        setPagination({ 
          next: response.data.next, 
          previous: response.data.previous 
        });  // Update pagination URLs
      } else {
        console.error('Error: No response data');
      }
    } catch (err) {
      console.error('Error fetching product data:', err.message);
    }
  };

  useEffect(() => {
    fetchData();  // Fetch initial data on component mount
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
