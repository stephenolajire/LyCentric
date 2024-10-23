import React, { useContext, useState } from "react";
import styles from "../css/Cart.module.css";
import { GlobalContext } from "../context/GlobalContext";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import api from '../constant/api'

const Cart = ({ item }) => {
  const { fetchData } = useContext(GlobalContext);

  const increament = async () => {
    try {
      const cart_code = localStorage.getItem("cart_code");
      if (cart_code) {
        const payload = {
          cart_code: cart_code,
          item_id: item.id, // Corrected the typo from itemd_id to item_id
        };

        const response = await api.patch(
          "api/cart/increment",
          payload
        );

        if (response.status === 200) {
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Item quantity has been updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Fetch updated cart data only after successful update
          fetchData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Please try again.",
          });
        }
      } else {
        console.log("cart_code is missing");
      }
    } catch (err) {
      console.error("Error details:", err.response || err); // Log full error response for debugging
      Swal.fire({
        icon: "error",
        title: "An error occurred!",
        text: err.response ? err.response.data.error : "Please try again.",
      });
    }
  };

  const decreament = async () => {
    try {
      const cart_code = localStorage.getItem("cart_code");
      if (cart_code) {
        const payload = {
          cart_code: cart_code,
          item_id: item.id, // Corrected the typo from itemd_id to item_id
        };

        const response = await api.patch(
          "api/cart/decrement",
          payload
        );

        if (response.status === 200) {
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Item quantity has been updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Fetch updated cart data only after successful update
          fetchData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Please try again.",
          });
        }
      } else {
        console.log("cart_code is missing");
      }
    } catch (err) {
      console.error("Error details:", err.response || err); // Log full error response for debugging
      Swal.fire({
        icon: "error",
        title: "An error occurred!",
        text: err.response ? err.response.data.error : "Please try again.",
      });
    }
  };

  const deleteItem = async () => {
    try {
      const cart_code = localStorage.getItem("cart_code");
      if (cart_code) {
        const payload = {
          cart_code: cart_code,
          item_id: item.id,
        };
        console.log(payload);
  
        const response = await api.delete(
          "api/cart/item/delete/",
          { data: payload }  // Send payload in the 'data' property
        );
  
        if (response.status === 200) {
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Item has been removed!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Fetch updated cart data only after successful update
          fetchData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Please try again.",
          });
        }
      } else {
        console.log("cart_code is missing");
      }
    } catch (err) {
      console.error("Error details:", err.response || err); // Log full error response for debugging
      Swal.fire({
        icon: "error",
        title: "An error occurred!",
        text: err.response ? err.response.data.error : "Please try again.",
      });
    }
  };
  

  return (
    <div className={styles.outer}>
      <div className={styles.containerGrid}>
        <div className={styles.leftGrid}>
          <div className={styles.imageText}>
            <img src={item.product.images[0].image} alt={item.product.name} />
            <div>
              <h3>{item.product.name}</h3>
              <h3>Size: {item.product.size}</h3>
            </div>
          </div>
          <div className={styles.RemoveCont}>
            <p className={styles.remove}>Remove</p>
            <MdDeleteForever className={styles.delete} onClick={deleteItem}/>
          </div>
        </div>
        <div className={styles.RightGrid}>
          <div className={styles.priceCont}>
            <h3>${item.product.price}</h3>
            {/* <h3>${item.product.old_price}</h3> */}
          </div>
          <div className={styles.priceCont}>
            <button
              onClick={decreament}
              disabled={item.quantity === 1}
              className={item.quantity === 1 ? styles.disabled : ""}
            >
              -
            </button>
            <h2 className={styles.quantitys}>{item.quantity}</h2>
            <button onClick={increament}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
