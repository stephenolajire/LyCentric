import React, { useState } from "react";
import styles from "../password/ResetPassword.module.css";
import api from "../../constant/api";
import Swal from "sweetalert2";
import { useNavigate , useParams} from "react-router-dom";

const ResetPassword = () => {
  const { uid, token } = useParams();

  const navigate = useNavigate ()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "passwords do not match!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
      // setMessage(" ")
    }
    const user = {
      password: password,
      confirm_password:confirmPassword
    };

    try {
      const response = await api.put(`setpassword/${uid}/${token}/`, user);
      if (response.status === 202) {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Successfully changed password!",
          showConfirmButton: false,
          timer: 1500,
        });
        setError("");
        navigate ("/login")
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
        <h3>Please set your new password</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.errorMsg}>{error}</p>}
          {message && <p className={styles.messageMsg}>{message}</p>}
          <div className={styles.formDiv} id={styles.div}>
            <label className={styles.emailLabel}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formDiv}>
            <label className={styles.emailLabel}>Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
