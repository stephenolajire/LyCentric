import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../css/Hero.module.css";
import api from "../constant/api";
import Spinner from "./Spinner";
import { GlobalContext } from "../context/GlobalContext";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {heroes, loading} = useContext(GlobalContext)
  
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === heroes.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [heroes.length]);

  if (loading) {
    return <Spinner/>
  }

  return (
    <div className={styles.heroContainer}>
      {heroes.map((slide, id) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${
            id === currentSlide ? styles.active : ""
          }`}
          style={{
            backgroundImage: `url(${slide.image})`, // Using the valid image URL directly
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className={styles.contHeight}>
            <div className={styles.content}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.description}>{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
