import React, { useState, useEffect } from "react";
import styles from "./password/ResetPassword.module.css";
import api from "../constant/api";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmEmail = () => {
  const [error, setError] = useState("");
  const { uid, token } = useParams();
  const navigate = useNavigate();

    const confirmEmail = async () => {
      try {
        const response = await api.get(`confirm-email/${uid}/${token}/`);
        if (response.status === 200) {
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Your email has been confirmed!",
            showConfirmButton: false,
            timer: 1500,
          });
          setError("");
          navigate("/login");
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

    useEffect (() => {
        confirmEmail();
    }, [])

  return (
    <div className={styles.center}>
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};

export default ConfirmEmail;