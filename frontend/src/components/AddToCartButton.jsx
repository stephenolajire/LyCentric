import "../css/AddToCartButton.css"; 
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function AddToCartButton({ productId, styles }) {

  const {loading, addToCart} = useContext(GlobalContext)

  return (
    <div className="btnDiv">
      <button style={{ display: styles }} className="cartBtn" onClick={() => addToCart(productId)} disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default AddToCartButton;
