import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import styles from "../css/ProductDetail.module.css";
import ProductCard from "../components/Card";
import AddToCartButton from "../components/AddToCartButton";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/product/${productId}`
      );
      if (response.data.product) {
        setProduct(response.data.product);
        setProducts(response.data.similar_products);
        console.log(product);
        console.log(products);
      } else {
        console.error("Error: No response data");
      }
    } catch (err) {
      console.error("Error fetching product details:", err.message);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className={styles.productDetail}>
        <div className={styles.slider}>
          {product.images && product.images.length > 0 && (
            <Carousel showThumbs={false} infiniteLoop autoPlay>
              {product.images.map((image) => (
                <div key={image.id}>
                  <img
                    src={image.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>
        <div className={styles.details}>
          <h2>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Price:</p>
            <h4 className={styles.price}>${product.price}</h4>
          </div>
          {product.old_price && (
            <div className={styles.priceDiv}>
              <p className={styles.priceName}>Price:</p>
              <h4 className={styles.price}>${product.old_price}</h4>
            </div>
          )}
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Size:</p>
            <h4 className={styles.price}>{product.size}</h4>
          </div>

          <div className={styles.priceDiv}>
            <p className={styles.priceName}>In Stock:</p>
            <h4 className={styles.price}>{product.stock}</h4>
          </div>
          <p className={styles.priceName}>
            Availability: {product.available ? "In Stock" : "Out of Stock"}
          </p>

          <AddToCartButton styles="block" productId={product.id} />
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.other}>
        <h3 className={styles.all}>Related Products</h3>
        <div>
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
      </div>
    </section>
  );
};

export default ProductDetail;
