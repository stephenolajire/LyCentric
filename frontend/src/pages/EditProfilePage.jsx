import React, { useEffect, useState } from "react";
import styles from "../css/EditProfilePage.module.css";
import { statesAndLgas } from "../constant/constant";
import api from "../constant/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/newlogo.jpg";
import Spinner from "../components/Spinner";

const EditProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await api.get("api/profile");
      if (response.status === 200) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [localGovernments, setLocalGovernments] = useState([]);
  const [selectedLocalGovernment, setSelectedLocalGovernment] = useState("");
  const [cityTown, setCityTown] = useState("");
  const [nearestBusStop, setNearestBusStop] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null); // Initialize as null

  // Update form fields when userProfile is fetched
  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.first_name || "");
      setLastName(userProfile.last_name || "");
      setEmail(userProfile.email || "");
      setState(userProfile.state || "");
      setCountry(userProfile.country || "");
      setLocalGovernments(statesAndLgas[userProfile.state] || []);
      setSelectedLocalGovernment(userProfile.local_government || "");
      setCityTown(userProfile.city_or_town || "");
      setNearestBusStop(userProfile.nearest_bus_stop || "");
      setPhoneNumber(userProfile.phone_number || "");
      setHouseAddress(userProfile.house_address || "");
    }
  }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Create a new FormData object

    // Append form data
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    formData.append("phone_number", phonenumber);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("city_or_town", cityTown);
    formData.append("local_government", selectedLocalGovernment);
    formData.append("nearest_bus_stop", nearestBusStop);
    formData.append("house_address", houseAddress);
     if (profileImage) {
       formData.append("profile_image", profileImage); // Corrected key name
     }

    try {
      const response = await api.patch("api/user/update/", formData)
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Your profile has been updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchProfile();
        navigate("/profile");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong while updating your profile.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "An error occurred while updating your profile.",
      });
    }
  };

  if (!userProfile) {
    return <Spinner/>; 
  }

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.plogodiv}>
          <img className={styles.plogo} src={logo} alt="logo" />
        </div>
        <h3 className={styles.welcome}>
          Update Your <span className={styles.lycen}>Lycentric</span> Profile
        </h3>
        <p className={styles.details}>
          Please provide all the information correctly
        </p>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={firstname}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])} // Store the file
            />
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <select
              value={state}
              onChange={(e) => {
                const selectedState = e.target.value;
                setState(selectedState);
                setLocalGovernments(statesAndLgas[selectedState] || []);
                setSelectedLocalGovernment(""); // Reset local government when state changes
              }}
              required
            >
              <option value="">Select State</option>
              {Object.keys(statesAndLgas).map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <select
              value={selectedLocalGovernment}
              onChange={(e) => setSelectedLocalGovernment(e.target.value)}
              required
            >
              <option value="">Select Local Government</option>
              {localGovernments.map((lga, index) => (
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
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={nearestBusStop}
              onChange={(e) => setNearestBusStop(e.target.value)}
              placeholder="Nearest Bus-stop"
              required
            />
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={cityTown}
              onChange={(e) => setCityTown(e.target.value)}
              placeholder="City/Town"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="house_address"
            value={houseAddress}
            onChange={(e) => setHouseAddress(e.target.value)}
            placeholder="House Address"
            rows="3"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Update Profile
        </button>

        <div>
          <p className={styles.textSign}>
            Want to go back? Please click{" "}
            <Link to="/profile">
              <span className={styles.link}>here</span>
            </Link>{" "}
            to return to profile.
          </p>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
