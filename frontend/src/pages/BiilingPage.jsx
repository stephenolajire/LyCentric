import React, { useContext, useEffect, useState } from "react";
import PaymentsOption from "../components/PaymentsOption";
import styles from "../css/BillingPage.module.css";
import api from "../constant/api";
import { GlobalContext } from "../context/GlobalContext";

const BillingPage = () => {
  const { userProfile, Profile} = useContext(GlobalContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [orderForSelf, setOrderForSelf] = useState(true); // New state for selecting "Order for myself" or "Order for other"
  const cart_code = localStorage.getItem("cart_code");
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleOrderOptionChange = (selfOrder) => {
    setOrderForSelf(selfOrder);
    if (selfOrder) {
      // Fill form with userProfile data if ordering for self
      setFormData({
        firstName: userProfile.first_name || "",
        lastName: userProfile.last_name || "",
        phoneNumber: userProfile.phone_number || "",
        email: userProfile.email || "",
        state: userProfile.state || "",
        city: userProfile.city_or_town || "",
        localGovernment: userProfile.local_government || "",
        nearestBusStop: userProfile.nearest_bus_stop || "",
        homeAddress: userProfile.house_address || "",
      });
    } else {
      // Reset form to empty if ordering for someone else
      setFormData({
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
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      alert("Please select a payment option.");
      return;
    }

    // Check if all required fields are filled
    const isFormValid = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    if (!isFormValid) {
      alert("Please fill out all required fields.");
      return;
    }

    const orderData = {
      ...formData,
      paymentOption: selectedPaymentMethod,
      cart_code: cart_code,
    };

    try {
      setLoading(true);
      const response = await api.post("api/payment/", orderData);
      if (response.status === 200 && response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        console.error("Order failed:", response);
      }
    } catch (error) {
      console.error("Error in payment submission:", error);
    } finally {
      setLoading(false);
      setFormData({
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
      setSelectedPaymentMethod("");
    }
  };


  useEffect(()=>{
    Profile()
  }, [])

  return (
    <div className={styles.billingContainer}>
      <div className={styles.small}>
        <p
          style={{
            fontSize: "1.6rem",
            textAlign: "center",
            marginTop: "3rem",
          }}
        >
          Please select payment option
        </p>
        {/* <p
          style={{
            fontSize: "1.4rem",
            color: "green",
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          (ONLY PAYSTACK IS WORKING)
        </p> */}
        <PaymentsOption onPaymentMethodChange={handlePaymentMethodChange} />
      </div>
      <div className={styles.billingForm}>
        <div className={styles.optionButtons}>
          <button
            className={styles.self}
            onClick={() => handleOrderOptionChange(true)}
          >
            Order for Myself
          </button>
          <button
            className={styles.other}
            onClick={() => handleOrderOptionChange(false)}
          >
            Order for Other
          </button>
        </div>
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
          {loading ? (
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              Submit
            </button>
          )}
        </form>
      </div>
      <div className={styles.PaymentsOptionDiv}>
        <h3 className={styles.PaymentsOption}>Payment Options</h3>
        <p
          style={{
            fontSize: "1.4rem",
            color: "green",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          (ONLY PAYSTACK IS WORKING)
        </p>
        <PaymentsOption onPaymentMethodChange={handlePaymentMethodChange} />
      </div>
    </div>
  );
};

export default BillingPage;
