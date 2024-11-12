import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../constant/api";
import style from "../css/Flutterwave.module.css";

const FlutterwaveCallback = () => {
  const { cart_code } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const { status, tx_ref, transaction_id } = Object.fromEntries(
      queryParams.entries()
    );

    const verifyPayment = async () => {
      try {
        // Send a request to the backend to verify the payment
        const response = await api.get(`api/flutterwave/callback/${cart_code}/`, {
          params: { transaction_id, tx_ref, status },
        });

        // Check for a successful verification from the backend
        if (
          response.status === 200 &&
          response.data.message === "Payment successful"
        ) {
          localStorage.removeItem("cart_code");
          navigate("/success");
        }
      } catch (error) {
        console.error("Verification error:", error);
        alert("An error occurred while verifying the payment.");
      }
    };

    // Trigger verification only if the required parameters are present
    if (status === "successful" && transaction_id && tx_ref) {
      verifyPayment();
    } else {
      alert("Invalid payment callback data.");
    }
  }, [cart_code, location, navigate]);

  return (
    <div className={style.container}>
      <div className={style.cont}>
        <h2 className={style.text}>Verifying Payment...</h2>
      </div>
    </div>
  );
};

export default FlutterwaveCallback;
