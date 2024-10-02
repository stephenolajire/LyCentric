import React, { useState, useEffect, useContext } from "react";
import api from "../constant/api";
import { statesAndLgas } from "../constant/constant";
import styles from "../css/EditProfilePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const EditProfilePage = () => {
  const { userProfile, Profile } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    state: "",
    country: "",
    city_or_town: "",
    local_government: "",
    nearest_bus_stop: "",
    house_address: "",
  });

  const [lgas, setLgas] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for redirecting

  // Load user profile data into formData when the component mounts
  useEffect(() => {
    Profile()
  })
  useEffect(() => {
    if (userProfile) {
      setFormData({
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
        phone_number: userProfile.phone_number,
        state: userProfile.state,
        country: userProfile.country,
        city_or_town: userProfile.city_or_town,
        local_government: userProfile.local_government,
        nearest_bus_stop: userProfile.nearest_bus_stop,
        house_address: userProfile.house_address,
      });

      // Load LGAs based on the user's state
      const selectedState = userProfile.state;
      setLgas(statesAndLgas[selectedState] || []); // Load LGAs based on selected state
    }
  }, [userProfile]); // Dependency array ensures this runs when userProfile changes

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Update LGAs when the state is selected
    if (e.target.name === "state") {
      const selectedState = e.target.value;
      setLgas(statesAndLgas[selectedState] || []); // Load LGAs based on selected state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("api/user/update/", formData); // Update endpoint
      console.log("Profile Updated Successfully:", response.data);
      navigate("/profile"); // Redirect to profile page after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h3 className="welcome">Edit Your Profile</h3>
        <p className="detail">Please provide the updated information correctly</p>
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
              disabled // Disable email field if you don't want it to be editable
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
          <textarea
            name="house_address"
            value={formData.house_address}
            onChange={handleChange}
            placeholder="House Address"
            rows="3"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Update Profile
        </button>

        <div>
          <p className="signupText">
            Want to go back? Click{" "}
            <Link to="/profile">
              <span className="link">here</span>
            </Link>{" "}
            to return to your profile
          </p>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
