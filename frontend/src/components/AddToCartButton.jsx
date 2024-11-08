import "../css/AddToCartButton.css";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function AddToCartButton({ productId, styles, selectedSize, selectedColor, product }) {
  const {cartNumber, loading, addToCart } = useContext(GlobalContext);

  const handleAddToCart = () => {
    // Check if sizes are available
    const sizeRequired = product.sizes.length > 0;

    if (sizeRequired && !selectedSize) {
      alert("Please select a size before adding to cart.");
    } else if (!selectedColor) {
      alert("Please select a color before adding to cart.");
    } else {
      addToCart(productId, selectedSize, selectedColor);
    }
  };

  return (
    <div className="btnDiv">
      <button
        style={{ display: styles }}
        className="cartBtn"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}

export default AddToCartButton;
