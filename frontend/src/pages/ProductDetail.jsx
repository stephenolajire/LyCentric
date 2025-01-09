import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import styles from "../css/ProductDetail.module.css";
import AddToCartButton from "../components/AddToCartButton";
import { GlobalContext } from "../context/GlobalContext";
import Spinner from "../components/Spinner";
import "../css/Carousel.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useContext(GlobalContext);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Find the product by ID
  const filteredProduct = products?.find(
    (product) => product.id === (productId)
  );

  // console.log (filteredProduct)
  // Display a loader if the product is not found yet
  if (!filteredProduct) {
    return <Spinner />;
  }

  return (
    <section>
      <div className={styles.productDetail}>
        {/* Product Images */}
        <div className={styles.slider}>
          {filteredProduct.images && filteredProduct.images.length > 0 ? (
            <Carousel showThumbs={false} infiniteLoop autoPlay>
              {filteredProduct.images.map((image) => (
                <div className={styles.imageContainer} key={image.id}>
                  <img
                    src={image.image}
                    alt={filteredProduct.name}
                    className={styles.productImage}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No images available</p>
          )}
        </div>

        {/* Product Details */}
        <div className={styles.details}>
          <div>
            <h2 className={styles.productName}>{filteredProduct.name}</h2>
            <p className={styles.description}>{filteredProduct.description}</p>
          </div>
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Price:</p>
            <h4 className={styles.price}>N{filteredProduct.price}</h4>
          </div>

          {/* Sizes */}
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Size:</p>
            {filteredProduct.sizes && filteredProduct.sizes.length > 0 ? (
              <div className={styles.sizeCont}>
                {filteredProduct.sizes.map((size) => (
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
            ) : (
              <p
                style={{ fontSize: "1.6rem", color: "#131313", opacity: "0.7" }}
              >
                Size information not available
              </p>
            )}
          </div>

          {/* Colors */}
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>Color:</p>
            {filteredProduct.colors && filteredProduct.colors.length > 0 ? (
              <div className={styles.sizeCont}>
                {filteredProduct.colors.map((color) => (
                  <button
                    style={{
                      backgroundColor: `${color.color}`,
                      border: `1px solid ${
                        color.color === "white" ? "#b9b9b9" : color.color
                      }`,
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
              <p
                style={{ fontSize: "1.6rem", opacity: "0.7", color: "#131313" }}
              >
                Color information not available
              </p>
            )}
          </div>

          {/* Stock */}
          <div className={styles.priceDiv}>
            <p className={styles.priceName}>In Store:</p>
            <h4 className={styles.price}>
              {filteredProduct.stock > 0 ? filteredProduct.stock : 0}
            </h4>
          </div>

          {/* Add to Cart */}
          <div className={styles.buttonDiv}>
            {filteredProduct.stock <= 0 ? (
              <p className={styles.outStock}>Out of stock</p>
            ) : (
              <AddToCartButton
                styles="block"
                productId={filteredProduct.id}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                product={filteredProduct}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
