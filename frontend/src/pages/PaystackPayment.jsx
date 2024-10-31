// src/components/PaystackCallback.js
import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../constant/api";
import style from '../css/PaystackPayment.module.css'

const PaystackPayment = () => {
  const { cart_code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get("reference");

    const verifyPayment = async () => {
      try {
        // Send a request to the backend to verify the payment
        const response = await api.get(
          `api/paystack/callback/${cart_code}/`,
          {
            params: { reference },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem ("cart_code")
          navigate("/success");
        } else {
          alert("Payment verification failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        alert("An error occurred while verifying payment.");
      }
    };

    verifyPayment();
  }, [cart_code, location.search, navigate]);

  return (
    <div className={style.container}>
      <div className={style.cont}>
        <h2 className={style.text}>Verifying Payment...</h2>
      </div>
    </div>
  );
};

export default PaystackPayment;
