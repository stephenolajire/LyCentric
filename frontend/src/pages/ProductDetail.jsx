import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import styles from "../css/ProductDetail.module.css";
import ProductCard from "../components/Card";
import AddToCartButton from "../components/AddToCartButton";
import { GlobalContext } from "../context/GlobalContext";
import Spinner from "../components/Spinner";
import "../css/Carousel.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { link1, link2 } = useContext(GlobalContext);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${link2}/api/product/${productId}`);
      if (response.data.product) {
        setProduct(response.data.product);
        setProducts(response.data.similar_products);
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
    return <Spinner />;
  }

  return (
    <section>
      <div className={styles.productDetail}>
        <div className={styles.slider}>
          {product.images && product.images.length > 0 && (
            <Carousel showThumbs={false} infiniteLoop autoPlay>
              {product.images.map((image) => (
                <div className={styles.imageContainer} key={image.id}>
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
          <div>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Price:</p>
            <h4 className={styles.price}> N{product.price}</h4>
          </div>

          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Size:</p>
            {product.sizes.length > 0 && (
              <div className={styles.sizeCont}>
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    className={`${styles.btnSize} ${
                      selectedSize === size.size ? styles.select : ""
                    }`}
                    onClick={() => setSelectedSize(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Color:</p>
            {product.colors.length > 0 ? (
              <div className={styles.sizeCont}>
                {product.colors.map((color) => (
                  <button
                    style={{
                      backgroundColor: `${color.color}`,
                      border: `1px solid ${color.color}`,
                    }}
                    key={color.id}
                    className={`${styles.btnColor} ${
                      selectedColor === color.color ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedColor(color.color)}
                    aria-label={`Color ${color.color}`}
                  ></button>
                ))}
              </div>
            ) : (
              <button className={styles.btnSize}>{product.colors[0]}</button>
            )}
          </div>
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>In Store:</p>
            <h4 className={styles.price}>{product.stock}</h4>
          </div>

          <div className={styles.buttonDiv}>
            {!product.available ? (
              <p className={styles.outStock}>Out of stock</p>
            ) : (
              <AddToCartButton
                styles="block"
                productId={product.id}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                product={product}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
