import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../constant/api";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartNumber, setCartNumber] = useState(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState([]);
  const [audience, setAudience] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [products, setProducts] = useState([]);

  const link2 = "https://llcentric-backend.onrender.com"
  const link1 = "http://127.0.0.1:8000"

  const fetchData = async () => {
    const cart_code = localStorage.getItem("cart_code");

    try {
      if (cart_code) {
        const response = await api.get(
          `api/cart/${cart_code}`
        );
        setCartNumber(response.data[0].total_quantity);
        setItems(response.data[0].items);
        setTotal(response.data[0]);
        console.log(response.data);
      } else {
        setCartNumber(null);
      }
    } catch (err) {
      console.log(err);
      setCartNumber(null); // Handle errors by resetting cart number
    }
  };

  const fetchRecent = async () => {
    const recent_code = localStorage.getItem("recent_code");

    try {
      if (recent_code) {
        const response = await api.get(
          `api/recent/${recent_code}`
        );
        setProducts(response.data);
        console.log(response.data);
      } 
    } catch (err) {
      console.log(err);
    }
  };


  const auth = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiryDate = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiryDate > currentTime) {
        setIsAuthenticated(true); // Token is still valid
      } else {
        setIsAuthenticated(false); // Token has expired
        localStorage.removeItem("access"); // Optionally remove expired token
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false); // Set as false if decoding fails
    }
  };

  useEffect(() => {
    fetchData();
    auth();
  }, []);

  const generateCartCode = () => {
    let cartCode = localStorage.getItem("cart_code");
    if (!cartCode) {
      cartCode = "cart_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("cart_code", cartCode);
    }
    return cartCode;
  };

  const generateRecentlyViewedCode = () => {
    let recentCode = localStorage.getItem( "recent_code");
    if (!recentCode) {
     recentCode =  "recent_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("recent_code", recentCode);
    }
    return recentCode;
  };

  const addToCart = async (productId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const cartCode = generateCartCode(); // Get or create cart code
    const payload = {
      cart_code: cartCode,
      product_id: productId,
      quantity: 1,
    };

    try {
      const response = await api.post("api/cart/", payload);
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Item added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(response.data);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again.",
      });
    }
    fetchData();
  };

  const addToRecentlyViewed = async (productId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const recentCode = generateRecentlyViewedCode(); // Get or create cart code
    const payload = {
      recent_code: recentCode,
      product_id: productId,
    };

    try {
      const response = await api.post("api/recentlyviewed/", payload);
      if (response.status === 200) {
        setLoading(false);
        setSuccess(true);
        console.log(response.data);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  const fetchAudience = async () => {
    try {
      const response = await api.get("api/audience"); // Adjusted endpoint
      if (response.data) {
        console.log(response.data);
        setAudience(response.data);
      } else {
        console.error("Error: No response data");
      }
    } catch (err) {
      console.error("Error fetching product data:", err.message);
    }
  };

  const Profile = async () => {
    const response = await api.get("api/profile");
    try {
      if (response.status === 200) {
        console.log(response.data);
        setUserProfile(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <GlobalContext.Provider
      value={{
        addToCart,
        loading,
        cartNumber,
        items,
        total,
        fetchData,
        fetchRecent,
        fetchAudience,
        audience,
        isAuthenticated,
        auth,
        Profile,
        userProfile,
        addToRecentlyViewed,
        products,
        link1,
        link2,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
