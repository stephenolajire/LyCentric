import React from "react";
import styles from "../css/ContactHero.module.css"; // Create this CSS file

const ContactHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.header}>Contact Us</h1>
        <p className={styles.text}>
          We would love to hear from you! Whether you have a question about our products,
          need assistance with your order, or just want to share feedback, our team is 
          here to help. Our mission at Lycentric is to provide you with the best shopping 
          experience possible, and your input helps us achieve that.
          <br /><br />
        </p>
        <p className={styles.text2}>
          You can reach out to us through email, phone, or our social media channels. We aim 
          to respond to all inquiries within 24-48 hours. Your satisfaction is our priority, 
          and we are committed to making sure that every interaction with us leaves you feeling 
          valued and heard.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;

