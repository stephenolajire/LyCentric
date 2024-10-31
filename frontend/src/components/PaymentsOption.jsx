import React, { useState } from "react";
import styles from "../css/PaymentsOption.module.css";

const PaymentsOption = ({ onPaymentMethodChange }) => {
  // State to track the selected payment method
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleButtonClick = (method) => {
    setSelectedMethod(method); // Update local state
    onPaymentMethodChange(method); // Send the selected method to BillingPage
  };

  return (
    <div className={styles.grid}>
      <div className={styles.outer}>
        <button
          className={`${styles.b1} ${
            selectedMethod === "Flutterwave" ? styles.selected : ""
          }`}
          onClick={() => handleButtonClick("Flutterwave")}
        >
          Flutterwave
        </button>
        <button
          className={`${styles.b2} ${
            selectedMethod === "Paystack" ? styles.selected : ""
          }`}
          onClick={() => handleButtonClick("Paystack")}
        >
          Paystack
        </button>
        <button
          className={`${styles.b3} ${
            selectedMethod === "Olaiya Dotun" ? styles.selected : ""
          }`}
          onClick={() => handleButtonClick("Olaiya Dotun")}
        >
          Olaiya Dotun
        </button>
      </div>
    </div>
  );
};

export default PaymentsOption;
