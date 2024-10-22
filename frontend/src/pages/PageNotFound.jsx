import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/PageNotFound.module.css'; // Importing the CSS module for styling

const PageNotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorMessage}>Oops! Page Not Found</h2>
      <p className={styles.errorDescription}>
        We can’t seem to find the page you’re looking for.
      </p>
      <Link to="/" className={styles.homeLink}>
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
