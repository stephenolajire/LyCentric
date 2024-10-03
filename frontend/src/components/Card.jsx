import React from "react";
import styles from "../css/Card.module.css";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCardContainer}>
      <Link to={`/product/${product.id}`}>
        <div className={styles.productCard}>
          <img
            src={product.images[0].image} // Assuming images is an array of URLs
            alt="Product"
            className={styles.productImage}
          />
          {/* Product Info */}
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.Cont}>
              {/* Display shortened description if it's longer than 30 characters */}
              <p className={styles.productDescription}>
                {product.description.length > 30
                  ? `${product.description.slice(0, 50)}...`
                  : product.description}
              </p>
            </div>
            <p className={styles.productPrice}>{`$ ${product.price}`}</p>

            {/* Product Rating - Example with 4 filled stars and 1 empty star */}
            <div className={styles.productRating}>
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className={styles.starFilled}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049.927c-.3-.921-1.598-.921-1.898 0L5.27 4.09l-4.206.611c-.967.14-1.355 1.331-.654 2.013l3.046 2.968-.719 4.18c-.165.958.847 1.688 1.688 1.24L10 13.187l3.756 1.975c.84.448 1.853-.282 1.688-1.24l-.719-4.18 3.046-2.968c.701-.682.313-1.873-.654-2.013l-4.206-.61-1.881-3.163z" />
                </svg>
              ))}
              <svg
                className={styles.starEmpty}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049.927c-.3-.921-1.598-.921-1.898 0L5.27 4.09l-4.206.611c-.967.14-1.355 1.331-.654 2.013l3.046 2.968-.719 4.18c-.165.958.847 1.688 1.688 1.24L10 13.187l3.756 1.975c.84.448 1.853-.282 1.688-1.24l-.719-4.18 3.046-2.968c.701-.682.313-1.873-.654-2.013l-4.206-.61-1.881-3.163z" />
              </svg>
            </div>

            {/* Buy Now Button */}
          </div>
        </div>
      </Link>
      <AddToCartButton styles="none" productId={product.id} />
    </div>
  );
};

export default ProductCard;
