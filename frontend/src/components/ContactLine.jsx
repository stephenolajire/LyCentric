import React from 'react'
import { FaRegMessage } from "react-icons/fa6";
import style from "../css/ContactLine.module.css"
import { Link } from 'react-router-dom';

const ContactLine = () => {
  return (
    <div className={style.container}>
      <div className={style.divIcon}>
        <Link to="/ai">
            <FaRegMessage className={style.icon}/>
        </Link>
        {/* <p>Chat us</p> */}
      </div>
    </div>
  )
}

export default ContactLine
