import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/PageNotFound.module.css'; // Importing the CSS module for styling
import { jwtDecode } from 'jwt-decode';


const PageNotFound = () => {
  const token = localStorage.getItem ("access")
  const decodedToken = jwtDecode(token)
  const admin = decodedToken.is_admin
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>Oops! Page Not Found</h2>
      <p className={styles.errorDescription}>
        We can’t seem to find the page you’re looking for.
      </p>
      {admin ? (
        <Link to="/admin" className={styles.homeLink}>
          Go to Dashboard
        </Link>
      ) : (
        <Link to="/" className={styles.homeLink}>
          Go Back Home
        </Link>
      )}
    </div>
  );
};

export default PageNotFound;
