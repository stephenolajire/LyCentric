import React, { useContext, useEffect } from "react";
import styles from "../css/ProfilePage.module.css";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom"; // Create a CSS file for styling

const ProfilePage = () => {


  useEffect(() => {
    Profile()
  }, [])
  const { userProfile, Profile } = useContext(GlobalContext);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileImage}>
        <div className={styles.profileCont}>
          <img src={userProfile.profile_image}/>
        </div>
      </div>
      <div className={styles.profileDetails}>
        <div className={styles.detailItem}>
          <strong>First Name:</strong> {userProfile.first_name}
        </div>
        <div className={styles.detailItem}>
          <strong>Last Name:</strong> {userProfile.last_name}
        </div>
        <div className={styles.detailItem}>
          <strong>Email:</strong> {userProfile.email}
        </div>
        <div className={styles.detailItem}>
          <strong>Phone Number:</strong> {userProfile.phone_number}
        </div>
        <div className={styles.detailItem}>
          <strong>City/Town:</strong> {userProfile.city_or_town}
        </div>
        <div className={styles.detailItem}>
          <strong>State:</strong> {userProfile.state}
        </div>
        <div className={styles.detailItem}>
          <strong>Local Government:</strong> {userProfile.local_government}
        </div>
        <div className={styles.detailItem}>
          <strong>Country:</strong> {userProfile.country}
        </div>
        <div className={styles.detailItem}>
          <strong>Nearest Bus Stop:</strong> {userProfile.nearest_bus_stop}
        </div>
        <div className={styles.detailItem}>
          <strong>House Address:</strong> {userProfile.house_address}
        </div>
        <div className={styles.detailItem}>
          <strong>Date Joined:</strong>{" "}
          {new Date(userProfile.date_joined).toLocaleDateString()}
        </div>
        <div>
          <Link to='/editprofile'>
            <button className={styles.profileBtn}>Edit Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
