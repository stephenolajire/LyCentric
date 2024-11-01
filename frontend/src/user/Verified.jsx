// Verified.js in React
import React from 'react';
import { Link } from 'react-router-dom';
import { MdVerified } from "react-icons/md";
import style from "../css/Verified.module.css";

const Verified = () => {
    return (
      <div className={style.containers}>
        <h2>Your Email Address has been Verified</h2>
        <div className={style.conts}>
          <MdVerified className={style.icon} />
        </div>
        <Link to="/login">
          <button className={style.homeBtn}>click to login</button>
        </Link>
      </div>
    );
};

export default Verified;
  