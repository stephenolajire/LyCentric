import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../css/SearchPage.module.css";
import api from "../constant/api";
import ProductCard from "../components/Card";
import Spinner from "../components/Spinner";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get the search term from the query parameter
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const response = await api.get(`api/products/search/?q=${query}`);
      setProducts(response.data.results);
      setLoading(false);
      console.log(response.data.results); // Update state with search results
    } catch (err) {
      setError("Error fetching search results. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.all}>Search Results for "{query}"</h3>
      <div className={styles.grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.query}>No products found for "{query}".</p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
