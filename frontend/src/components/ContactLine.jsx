import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { SlPhone } from "react-icons/sl";
import style from "../css/ContactLine.module.css"

const ContactLine = () => {
  return (
    <div className={style.container}>
      <div className={style.divIcon}>
        <a href="tel:+2348025056939">
            <SlPhone className={style.icon}/>
        </a>
        <a href='www.wa.me'>
            <FaWhatsapp className={style.icon}/>
        </a>
      </div>
    </div>
  )
}

export default ContactLine
