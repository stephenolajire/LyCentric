import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/Hero.module.css';
import api from '../constant/api';

const Hero = () => {
  const [heroes, setHeroes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchHeroData = async () => {
    try {
      const response = await api.get('hero');
      setHeroes(response.data); // Set heroes state with the fetched data
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === heroes.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [heroes.length]);

  return (
    <div className={styles.heroContainer}>
      {heroes.map((slide, id) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${id === currentSlide ? styles.active : ''}`}
          style={{
            backgroundImage: `url(${slide.image})`, // Using the valid image URL directly
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className={styles.content}>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.description}>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
