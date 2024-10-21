// Verified.js in React
import React from 'react';
import { Link } from 'react-router-dom';

const Verified = () => {
    return (
        <div style={{padding:"4rem 2rem", width:"100%", display:"flex", alignItems:"center", flexDirection:"column"}}>
            <h1 style={{fontSize:"3.5rem"}}> Your email has been successfully verified!</h1>
            <p style={{fontSize:"2.5rem"}}>You can now log in to your account.</p>
            <Link to="/login" style={{color:"blue", fontSize:"1.6rem", marginTop:"1rem"}}>
                Login
            </Link>
        </div>
    );
};

export default Verified;
  