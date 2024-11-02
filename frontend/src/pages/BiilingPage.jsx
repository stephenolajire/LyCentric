import React, { useEffect, useState } from "react";
import PaymentsOption from "../components/PaymentsOption";
import styles from "../css/BillingPage.module.css"; // Using CSS module
import api from "../constant/api";

const BillingPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const cart_code = localStorage.getItem ("cart_code")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    state: "",
    city: "",
    localGovernment: "",
    nearestBusStop: "",
    homeAddress: "",
  });

  // State for selected payment method

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method); // Update selected payment method
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the order data including payment method and cart code
    const orderData = {
      ...formData,
      paymentOption: selectedPaymentMethod, // Ensure the backend expects this field
      cart_code: cart_code,
    };

    try {
      const response = await api.post("api/payment/", orderData);

      // Handle response based on success or failure
      if (response.status === 200 && response.data.payment_url) {
        window.location.href = response.data.payment_url;  // Redirect to payment page
      } else {
        console.error("Order failed:", response);
      }
    } catch (error) {
      console.error("Error in payment submission:", error);
    }

    console.log("Submitted order data:", orderData);
  };

  useEffect (() => {
     window.scrollTo(0, 0);
  })

  return (
    <div className={styles.billingContainer}>
      <div className={styles.small}>
        <p
          style={{ fontSize: "1.6rem", textAlign: "center", marginTop: "3rem" }}
        >
          Please select payment option
        </p>
        <p style={{fontSize:"1.4rem", color:"green", marginTop:"3rem", textAlign:"center"}}>(ONLY PAYSTACK IS WORKING)</p>
        <PaymentsOption onPaymentMethodChange={handlePaymentMethodChange} />
      </div>
      <div className={styles.billingForm}>
        <h1 className={styles.formTitle}>Receiver's Details</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="localGovernment">Local Government</label>
              <input
                type="text"
                id="localGovernment"
                name="localGovernment"
                value={formData.localGovernment}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="nearestBusStop">Nearest Bus Stop</label>
              <input
                type="text"
                id="nearestBusStop"
                name="nearestBusStop"
                value={formData.nearestBusStop}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.formField}>
            <label htmlFor="homeAddress">Home Address</label>
            <textarea
              cols={10}
              rows={5}
              type="text"
              className={styles.homeAddress}
              id="homeAddress"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
      <div className={styles.PaymentsOptionDiv}>
        <h3 className={styles.PaymentsOption}>Payment Options</h3>
        <PaymentsOption onPaymentMethodChange={handlePaymentMethodChange} />
      </div>
    </div>
  );
};

export default BillingPage;
