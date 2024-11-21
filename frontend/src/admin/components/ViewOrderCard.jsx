import React from "react";
import style from "../css/ViewOrderCard.module.css";

const ViewOrderCard = ({ order }) => {
  return (
    <div className={style.card}>
      <a href={order.product_image} target="_blank" rel="noopener noreferrer">
        <img
          src={order.product_image}
          alt={order.product_name}
          className={style.productImage}
        />
      </a>
      <div className={style.details}>
        <h3 className={style.productName}>{order.product_name}</h3>
        <p className={style.productColor}>Color: {order.product_color}</p>
        <p className={style.productSize}>Size: {order.product_size}</p>
        <p className={style.productQuantity}>
          Quantity: {order.product_quantity}
        </p>
      </div>
    </div>
  );
};

export default ViewOrderCard;

