import React from 'react'
import style from '../css/Social.module.css'
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { SlPhone } from "react-icons/sl";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { CiFacebook } from "react-icons/ci";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

const Social = () => {
  return (
    <div className={style.outer}>
      <div className={style.top}>
        <h5>My Contacts and Socials</h5>
        <h3>How to Find Me</h3>
      </div>

      <div className={style.container}>
        <div>
          <div className={style.iconCont}>
            <div>
              <IoLocationOutline className={style.icon}/> 
            </div>
          </div>
          <div className={style.textCont}>
            <p>1250 Welton St, Denver, CO 80204</p>
          </div>
        </div>

        <div>
          <div className={style.iconCont}>
            <div>
              <AiOutlineMail className={style.icon}/> 
            </div>
          </div>
          <div className={style.textCont}>
            <p>1250 Welton St, Denver, CO 80204</p>
          </div>
        </div>

        <div>
          <div className={style.iconCont}>
            <div>
              <SlPhone className={style.icon}/> 
            </div>
          </div>
          <div className={style.textCont}>
            <p>1250 Welton St, Denver, CO 80204</p>
          </div>
        </div>

        <div>
          <div className={style.iconCont}>
            <div>
              <LiaNetworkWiredSolid className={style.icon}/> 
            </div>
          </div>
          <div className={style.textCont} id={style.textCon}>
            <CiFacebook className={style.icon}/>
            <TiSocialTwitterCircular className={style.icon}/>
            <CiYoutube className={style.icon}/>
            <FaWhatsapp className={style.icon}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Social