import React from 'react'
import { MdOutgoingMail } from "react-icons/md";

const Message = () => {
  return (
    <div style={{ width:"100%", display: "flex", alignItems: "center", height: "100vh", flexDirection:"column", justifyContent:"center" }}>
      <MdOutgoingMail  style={{color:"grey", height:"10rem", width:"10rem"}}/>
      <p
        style={{
          color: "black",
          fontSize: "1.6rem",
          padding: "2rem 2rem",
          textAlign: "center",
          color:"grey"
        }}
      >
        Please check your email to verify your email address
      </p>
    </div>
  );
}

export default Message