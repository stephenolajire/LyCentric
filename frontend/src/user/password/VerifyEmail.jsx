import React, { useState } from "react";
import styles from "../password/VerifyEmail.module.css";
import api from "../../constant/api";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
    };

    try {
      const response = await api.post("api/verify/email/", user);
      if (response.status === 200) {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Please check your email!",
          showConfirmButton: false,
          timer: 1500,
        });
        setError(""); // Clear error message if successful
      }
    } catch (error) {
      console.log(error);
      // Set the error message based on the response
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.center}>
      <div className={styles.Container}>
        <h3>Please enter your valid email to reset your password</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.errorMsg}>{error}</p>}
          <div className={styles.formDiv}>
            <label className={styles.emailLabel}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
