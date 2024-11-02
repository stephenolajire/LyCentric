import React, { useState } from "react";
import api from "../constant/api";
import { statesAndLgas } from "../constant/constant";
import styles from "../css/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/newlogo.jpg";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    state: "",
    country: "",
    city_or_town: "",
    local_government: "",
    nearest_bus_stop: "",
    house_address: "",
  });

  const [lgas, setLgas] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update LGAs when the state is selected
    if (name === "state") {
      setLgas(statesAndLgas[value] || []);
      setFormData((prevData) => ({
        ...prevData,
        local_government: "", // Reset local government when state changes
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    // Append form data to FormData
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (profileImage) {
      data.append("profile_image", profileImage);
    }

    try {
      const response = await api.post("api/signup/", data);
      console.log("Signup Successful:", response.data);
      navigate("/message");
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.signupContainer}>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <div className={styles.plogodiv}>
            <img className={styles.plogo} src={logo} alt="logo" />
          </div>
          <h3 className={styles.welcome}>
            Welcome to <span className={styles.lycen}>Lycentric</span> Home of
            Wears
          </h3>
          <p className={styles.detail}>
            Please provide all the information correctly
          </p>

          {error && (
            <p
              style={{ color: "red", fontSize: "1.6rem", marginBottom: "1rem" }}
            >
              {error}
            </p>
          )}

          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {Object.keys(statesAndLgas).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <select
                name="local_government"
                value={formData.local_government}
                onChange={handleChange}
                required
              >
                <option value="">Select Local Government</option>
                {lgas.map((lga, index) => (
                  <option key={index} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="nearest_bus_stop"
                value={formData.nearest_bus_stop}
                onChange={handleChange}
                placeholder="Nearest Bus-stop"
                required
              />
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="city_or_town"
                value={formData.city_or_town}
                onChange={handleChange}
                placeholder="City/Town"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              name="house_address"
              value={formData.house_address}
              onChange={handleChange}
              placeholder="House Address"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Loading ..." : "SignUp"}
          </button>

          <div>
            <p className={styles.signupText}>
              Already have an account? Please click{" "}
              <Link to="/login">
                <span className={styles.link}>here</span>
              </Link>{" "}
              to login.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
